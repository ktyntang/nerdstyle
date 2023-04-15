import {
	PICK_ONE,
	REPLACE_SOME,
	SHUFFLE,
	SHUFFLE_NO_CONSECUTIVE,
} from "../constants/constants";

/**
 * Randomly shuffle options.
 *
 * @param   options  Array of options to generate sequence with.
 * @param   seqLength  Length of new seq.
 * @returns New sequence of seqLength.
 */
export const shuffleSeq = (options, seqLength) => {
	let newSeq = [];
	for (let i = 0; i < seqLength; i++) {
		let randIndex = ~~(Math.random() * options.length);
		newSeq.push(options[randIndex]);
	}
	return newSeq;
};

/**
 * Randomly pick one option.
 *
 * @param   options  Array of options to pick one from.
 * @returns Array of length 1.
 */
export const pickOneInSeq = (options) => {
	return shuffleSeq(options, 1);
};

/**
 * Randomly shuffle options with no consecutive repeats.
 *
 * @param   options  Array of options to generate sequence with.
 * @param   seqLength  Length of new seq.
 * @returns New sequence of seqLength. No consecutive repeat.
 */
export const shuffleSeqNoConsecutive = (options, seqLength) => {
	let newSeq = [];
	while (newSeq.length < seqLength) {
		let randIndex = ~~(Math.random() * options.length);
		if (newSeq[newSeq.length - 1] === options[randIndex]) {
			continue;
		}
		newSeq.push(options[randIndex]);
	}
	return newSeq;
};

/**
 * Randomly replace option in sequence with the replacement string.
 *
 * @param   options  Array of options to generate sequence with.
 * @param   replacement  String.
 * @returns New sequence with some options replaced. Same length as options. Will not return all same.
 */
export const replaceSomeInSeq = (options, replacement) => {
	const allSame = (arr) => arr.every((v) => v === arr[0]);
	const generateSeq = () => {
		let newSeq = [];
		for (let i = 0; i < options.length; i++) {
			// let showOpt = ~~(Math.random() * 2); // either 0 or 1
			// 16 total unique permutations possible of length 4 array with 0 or 1
			// 4/16 (25%) chance of newSeq having 3 zeroes
			// 6/16 (37.5%) chance of newSeq having 2 zeroes
			// 4/16 (25%) chance of newSeq having 1 zero
			// 1/16 (6.25%) chance of newSeq having 0 zeroes

			let showOpt = ~~(Math.random() * 3); // either 0, 1, 2
			// 81 total unique permutations possible of length 4 array with 0, 1, 2
			// 8 / 81 (9.9%) chance of newSeq having 3 zeroes
			// 24 / 81 (29.6%) chance of newSeq having 2 zeroes
			// 16 / 81 (19.8%) chance of newSeq having 1 zero
			// 32 / 81 (39.5%) chance of newSeq having 0 zeroes

			// let showOpt = ~~(Math.random() * 4); // either 0, 1, 2, 3
			// 256 total unique permutations possible of length 4 array with 0, 1, 2,3
			// 12 / 256 (4.7%) chance of newSeq having 3 zeroes
			// 54 / 256 (21.1%) chance of newSeq having 2 zeroes
			// 108 / 256 (42.2%) chance of newSeq having 1 zero
			// 81 / 256 (31.7%) chance of newSeq having 0 zeroes
			showOpt ? newSeq.push(options[i]) : newSeq.push(replacement);
		}

		return newSeq;
	};
	let res = [];
	do {
		res = generateSeq();
	} while (allSame(res));
	return res;
};

/**
 * Switch for type of regeneration.
 *
 * @param   regenType  String constant.
 * @returns Regeneration function suitable for that type. Can be curried e.g. getRegeneratedSequence(regenType)(options,seqLength||replacement)
 */
export const getRegeneratedSequence = (regenType) => {
	switch (regenType) {
		case SHUFFLE: {
			return shuffleSeq;
		}
		case SHUFFLE_NO_CONSECUTIVE: {
			return shuffleSeqNoConsecutive;
		}
		case PICK_ONE: {
			return pickOneInSeq;
		}
		case REPLACE_SOME: {
			return replaceSomeInSeq;
		}
		default:
			return null;
	}
};

/**
 * Check if array of arrays are equivalent. Do not use if arr has obj.
 *
 * @param   a  Array
 * @param   b  Array
 * @returns Bool
 */
export const arraysAreEqual = (a, b) => {
	return a && b
		? a.length === b.length &&
				new Array(a).every((item) => b.includes(item)) &&
				new Array(b).every((item) => a.includes(item))
		: false;
};

/**
 * Check if last N items of stored seq array contain result array. Do not use if arr has obj.
 *
 * @param   numOptions  Number of options. If less than 5, n = numOptions/2. Else n = 3.
 * @param   a  Seq Array of Arrays
 * @param   b  Result Array
 * @returns Bool
 */
export const lastNArraysIncludes = (numOptions, a, b) => {
	let n;
	numOptions < 5 ? (n = Math.floor(numOptions / 2)) : (n = 3);
	let strA = JSON.stringify(a.slice(a.length - n, a.length));
	let strB = JSON.stringify(b);
	let c = strA.indexOf(strB);

	return c !== -1 ? true : false;
};
