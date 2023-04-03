import "./App.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { randNumberSeqInRange } from "./utils/calculations";
import { NumberPad } from "./components/NumberPad";
import { UserInputs } from "./components/UserInputs";

// Select the category -> select base exercise -> add/reorder options default is all:

// BOUNCE: up/down/front/back/wave
// RHYTHM : diff prompts for when to do the bounce emphasis.  e.g. "12_4" "__34"
// ISOLATIONS: either prompt 1 body part, or prompt is array of numbers (number each body part and explore iso pathway)
// LEVELS: low, mid, high
// ENERGY: low, mid, high
// TEXTURE: hard, soft, fluid, fast-slow, (+ sub categories)
// DIRECTIONS: "...."
// CONCEPTS: "..."

// Logic: SetInterval (Rand number generator)

// props = [{Exercise,Prompts[] }],
// <ExerciseCard exercise={} prompts={[]} eightCounter promptFreq=_ >
// isDisabled, isLocked, currentPrompt

// useEffect=when eightCounter = modulo PromptFreq, changePrompt()
// useEffect=when eightCounter, toggleDisable()
// onClick=toggleLock()

// ?? Separate exercise controller?
// ExerciseOrder=[a,b,c,d]

function App() {
	const [oneEight, setOneEight] = useState(5000); //milliseconds. defaults? fast 10, med 20, slow 40)
	const [practiceEights, setPracticeEights] = useState(2); // eights per prompt. change prompt aft _ eights.
	const [exerciseEights, setExerciseEights] = useState(16); // eights per exercise. add new exercise aft _ eights. If 0,  enable all?
	const [eightsElapsed, setEightsElapsed] = useState(1); // TODO: aop logic for how to handle practice eights loop

	const [category, setCategory] = useState("FOOTWORK");
	const [sequence, setSequence] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
	const [activeNumIndex, setActiveNumIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);

	// console.log(oneEight, practiceEights, exerciseEights);

	// After 2 eights, exercise change prompt.
	// After 16 eights, add new exercise.
	// const eightsElapsed = useRef(0);
	let promptTimer = useRef(null);
	let numHighlightTimer = useRef(null);
	let activeNumRef = useRef(null);
	const prevSeqRef = useRef(null);

	useEffect(() => {
		prevSeqRef.current = sequence;
		console.log(prevSeqRef.current);
	}, [sequence]); // when the value of sequence changes, assign the previous value to ref.

	const regenerateSequence = useCallback(() => {
		setSequence(randNumberSeqInRange(1, 9, sequence.length));
	}, [sequence]);

	useEffect(() => {
		if (activeNumRef.current) {
			activeNumRef.current.className = "grid-item activeNum";
		}
	}, [activeNumRef]);

	//regenerate seq at set freq. intervals and  set active num ref every freq./seqLength
	useEffect(() => {
		if (isPlaying && sequence.length && oneEight) {
			promptTimer.current = setInterval(() => {
				regenerateSequence();
				setEightsElapsed((eightsElapsed) => eightsElapsed + 1);
			}, oneEight * (practiceEights ? practiceEights : 1));

			let i = 0;
			numHighlightTimer.current = setInterval(() => {
				setActiveNumIndex(i);
				i === sequence.length - 1 ? (i = 0) : (i = i + 1);
			}, oneEight / sequence.length);
		} else {
			clearInterval(promptTimer.current);
			promptTimer.current = null;
			clearInterval(numHighlightTimer.current);
			numHighlightTimer.current = null;
		}
		return () => {
			clearInterval(promptTimer.current);
			promptTimer.current = null;
			clearInterval(numHighlightTimer.current);
			numHighlightTimer.current = null;
		};
	}, [regenerateSequence, sequence, oneEight, practiceEights, isPlaying]);

	const handlePlay = () => {
		setIsPlaying(true);
	};

	const handlePause = () => {
		setIsPlaying(false);
	};

	const handleUserChange = (newValue, state) => {
		switch (state) {
			case "oneEight":
				return setOneEight(newValue);
			case "practiceEights":
				return setPracticeEights(newValue);
			case "exerciseEights":
				return setExerciseEights(newValue);
			default:
				return null;
		}
	};

	return (
		<div className="App">
			<header>
				<h1>Freestyle Prompter</h1>
			</header>
			<div className="page fc">
				<h2 style={{ margin: 0, padding: 0 }}>{`${category}`}</h2>
				<h3 style={{ margin: 0, padding: 0 }}>Number Pad</h3>
				<NumberPad
					sequence={prevSeqRef.current ?? sequence}
					activeNumIndex={activeNumIndex}
				/>
			</div>

			<div className="page">
				<section style={{ margin: "2em 0" }}>
					<button onClick={handlePlay}>Play</button>
					<button onClick={handlePause}>Pause</button>
				</section>
				<UserInputs
					oneEight={oneEight}
					practiceEights={practiceEights}
					exerciseEights={exerciseEights}
					handleUserChange={handleUserChange}
				/>
			</div>
		</div>
	);
}

export default App;
