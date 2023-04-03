export const randNumberSeqInRange = (min, max, seqLength) => {
	// get number between min (inclusive) and max (inclusive)
	let result = [];
	for (let i = 0; i < seqLength; i++) {
		result.push(Math.floor(Math.random() * (max - min + 1)) + min);
	}
	return result;
};
