import {
	PICK_ONE,
	REPLACE_SOME,
	SHUFFLE_NO_CONSECUTIVE,
} from "../constants/constants";

export const exercises = [
	{
		category: "Rhythm",
		name: "RandFour",
		options: [1, 2, 3, 4],
		seqType: REPLACE_SOME,
		seqLength: "_",
	},
	{
		category: "Bounce",
		name: "Bounce",
		options: ["up", "down", "front", "back"],
		seqType: PICK_ONE,
		seqLength: 1,
	},
	{
		category: "Bounce",
		name: "doubleBounce",
		options: ["dbl", "dbl", "dbl", "dbl"],
		seqType: REPLACE_SOME,
		seqLength: "_",
	},
	{
		category: "Texture",
		name: "Overall Texture",
		options: ["soft", "hard", "fluid", "staccato"],
		seqType: PICK_ONE,
		seqLength: 1,
	},
	{
		category: "Isolations",
		name: "Single",
		options: ["head", "shoulder", "chest", "hips", "knee"],
		seqType: PICK_ONE,
		seqLength: 1,
	},
	{
		category: "Isolations",
		name: "Multi",
		options: [
			"head",
			"shoulder",
			"chest",
			"hips",
			"knee",
			"elbow",
			"wrist",
			"ankle",
		],
		seqType: SHUFFLE_NO_CONSECUTIVE,
		seqLength: 3,
	},
];

export const categories = [...new Set(exercises.map((obj) => obj.category))];
