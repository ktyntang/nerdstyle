import { FOOTWORK } from "../constants/constants";
import {
	BOUNCE,
	CONCEPTS,
	ENERGY,
	ISOLATIONS,
	MUSICALITY,
	PICK_ONE,
	REPLACE_SOME,
	RHYTHM,
	SHUFFLE,
	SHUFFLE_NO_CONSECUTIVE,
	TEXTURE,
} from "../constants/constants";

export const colorScheme = {
	BOUNCE: "royalBlue",
	RHYTHM: "mediumSpringGreen",
	TEXTURE: "cyan",
	ENERGY: "orange",
	ISOLATIONS: "hotPink",
	FOOTWORK: "yellow",
	CONCEPTS: "lightSteelBlue",
};

export const exercises = [
	{
		category: RHYTHM,
		name: "RandFour",
		options: [1, 2, 3, 4],
		seqType: REPLACE_SOME,
		seqLength: "_",
	},
	{
		category: BOUNCE,
		name: "Bounce",
		options: ["up", "down", "front", "back"],
		seqType: PICK_ONE,
		seqLength: 1,
	},
	{
		category: BOUNCE,
		name: "Bounce Transitions",
		options: ["up", "down", "front", "back"],
		seqType: SHUFFLE_NO_CONSECUTIVE,
		seqLength: 3,
	},
	// {
	// 	category: BOUNCE,
	// 	name: "Party Moves Single",
	// 	options: [],
	// 	seqType: PICK_ONE,
	// 	seqLength: 1,
	// },
	// {
	// 	category: BOUNCE,
	// 	name: "Party Moves Combo",
	// 	options: [],
	// 	seqType: SHUFFLE_NO_CONSECUTIVE,
	// 	seqLength: 3,
	// },
	{
		category: RHYTHM,
		name: "doubleBounce",
		options: ["dbl", "dbl", "dbl", "dbl"],
		seqType: REPLACE_SOME,
		seqLength: "_",
	},

	{
		category: ISOLATIONS,
		name: "Single Part Iso",
		options: ["head", "shoulder", "chest", "hips", "knee"],
		seqType: PICK_ONE,
		seqLength: 1,
	},
	{
		category: ISOLATIONS,
		name: "Multi Part Iso",
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
	{
		category: ISOLATIONS,
		name: "Plane",
		options: ["XY lateral", "Z lateral", "rotational", "twist"],
		seqType: PICK_ONE,
		seqLength: 1,
	},

	{
		category: ISOLATIONS,
		name: "Iso Concepts",
		options: [
			"Lead with..",
			"Draw circles",
			"Draw squares",
			"Draw your name",
			"Draw your birth date",
			"Internal Pathway",
			"External Pathway (indirect)",
		],
		seqType: PICK_ONE,
		seqLength: 1,
	},

	{
		category: ENERGY,
		name: "Energy %",
		options: [10, 30, 50, 80, 100],
		seqType: PICK_ONE,
		seqLength: 1,
	},
	{
		category: TEXTURE,
		name: "Overall Texture",
		options: ["soft (neutral)", "hard", "fluid", "staccato"],
		seqType: PICK_ONE,
		seqLength: 1,
	},
	{
		category: TEXTURE,
		name: "Hits",
		options: ["neutral", "hard stop", "fast-slow", "slow-fast", "rebound"],
		seqType: PICK_ONE,
		seqLength: 1,
	},
	{
		category: FOOTWORK,
		name: "Number Pad",
		options: [1, 2, 3, 4, 5, 6, 7, 8, 9],
		seqType: SHUFFLE,
		seqLength: 8,
	},
	{
		category: FOOTWORK,
		name: "Leg",
		options: ["R leg", "L leg", "Both Legs"],
		seqType: PICK_ONE,
		seqLength: 1,
	},
	{
		category: FOOTWORK,
		name: "Leg Level",
		options: ["on ground", "in air (kick/knee"],
		seqType: PICK_ONE,
		seqLength: 1,
	},
	{
		category: FOOTWORK,
		name: "Foot Placement",
		options: ["heel", "toe", "whole"],
		seqType: PICK_ONE,
		seqLength: 1,
	},
	{
		category: FOOTWORK,
		name: "Extra Footwork Concepts",
		options: [
			"frame upper body",
			"body level",
			"slides",
			"turns/twists/pivot",
			"direction",
		],
		seqType: PICK_ONE,
		seqLength: 1,
	},
	{
		category: MUSICALITY,
		name: "Layer",
		options: ["drums", "melody", "vocals", "sfx"],
		seqType: PICK_ONE,
		seqLength: 1,
	},
	{
		category: CONCEPTS,
		name: "Extras",
		options: ["Energy Ball", "Threading", "Tracing"],
		seqType: PICK_ONE,
		seqLength: 1,
	},
];

export const categories = [...new Set(exercises.map((obj) => obj.category))];
