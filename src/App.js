import "./App.css";
import "./Main.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { NumberPad } from "./components/NumberPad";
import { UserInputs } from "./components/UserInputs";
import { Card } from "./components/Card";

import { ProgressBar } from "./components/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Intro } from "./components/Intro";
import { categories, exercises } from "./utils/exercises";
import { DraggableList } from "./components/DraggableList";
import { Accordion } from "./components/Accordion";
import { AudioAnalyzer } from "./components/AudioAnalyzer";
import { RTAudioAnalyzer } from "./components/RTAudioAnalyzer";

const sortedExercises = exercises.reduce((acc, exercise) => {
	const { category } = exercise;
	const categoryIndex = acc.findIndex((obj) => obj.category === category);
	categoryIndex === -1
		? acc.push({ category, exercises: [exercise.name] })
		: acc[categoryIndex].exercises.push(exercise.name);
	return acc;
}, []);

function App() {
	const [oneEight, setOneEight] = useState(5); //seconds. defaults? fast 10, med 20, slow 40)
	const [count, setCount] = useState(1);
	const [masterEights, setMasterEights] = useState(2); // eights per prompt. change prompt aft _ eights.
	const [eightsElapsed, setEightsElapsed] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);

	const [currentSelection, setCurrentSelection] = useState([exercises[0], exercises[1], exercises[4]]);

	//to get execiseObj, filter through exercises
	// const getExercise = (selectedExercise) => {
	// 	let result = exercises.filter((item) => {
	// 		return (
	// 			selectedExercise.category === item.category &&
	// 			selectedExercise.exercises.includes(item.name)
	// 		);
	// 	});
	// 	return result;
	// };

	// let selectedExercises = currentSelection
	// 	.map((item) => getExercise(item))
	// 	.flat();
	let promptTimer = useRef(null);
	let progressTimer = useRef(null);

	useEffect(() => {
		if (isPlaying && oneEight) {
			progressTimer.current = setInterval(() => {
				if (count === 8) {
					setEightsElapsed(eightsElapsed + 1);
					setCount(1);
				} else {
					setCount(count + 1);
				}
			}, (oneEight * 1000) / 8);
		} else {
			clearInterval(progressTimer.current);
			progressTimer.current = null;
		}
		return () => {
			clearInterval(progressTimer.current);
			progressTimer.current = null;
		};
	}, [oneEight, isPlaying, eightsElapsed, count]);

	const handlePlay = () => {
		setIsPlaying(true);
	};

	const handlePause = () => {
		setIsPlaying(false);
	};

	const handleUserChange = (newValue, state) => {
		if (!newValue) {
			newValue = 1;
		}
		switch (state) {
			case "oneEight":
				return setOneEight(newValue);
			case "practiceEights":
				return setMasterEights(newValue);
			// case "exerciseEights":
			// 	return setExerciseEights(newValue);
			default:
				return null;
		}
	};

	const handleSubmitExercises = (newSelection) => {
		setCurrentSelection(newSelection);
	};

	console.log(currentSelection);

	return (
		<div className='App '>
			<header>
				<h1>Drills</h1>
			</header>
			<div className='fr'>
				<div className='page-container'>
					{/* <div className="page fc">
						<Intro />
					</div> */}
					{/* <div className="page fc">
						<div className="category-selection"></div>
					</div> */}
					<div className='page fc'>
						{/* <AudioAnalyzer /> */}
						{/* <RTAudioAnalyzer /> */}
					</div>
				</div>
				<div className='page-container'>
					<div className='main page'>
						<section className='progress-container'>
							<ProgressBar progressBg={"whitesmoke"} rangeBg={"grey"} progress={count} height={"1em"} />
						</section>

						<section className='play-controls fc' style={{ margin: "1.5em 0" }}>
							<button onClick={() => (isPlaying ? handlePause() : handlePlay())}>
								<FontAwesomeIcon className='icon large clickable' icon={isPlaying ? faPause : faPlay} />
							</button>
						</section>
						<section className='card-container fc'>
							{currentSelection.map((exercise, i) => {
								return (
									<Card
										eightsElapsed={eightsElapsed}
										count={count}
										exerciseObj={exercise}
										masterEights={masterEights}
										key={i}
									/>
								);
							})}
							{/* <Card
								eightsElapsed={eightsElapsed}
								count={count}
								exerciseObj={exercises[0]}
								masterEights={masterEights}
							/>
							<Card
								eightsElapsed={eightsElapsed}
								count={count}
								exerciseObj={exercises[1]}
								masterEights={masterEights}
							/>
							<Card
								eightsElapsed={eightsElapsed}
								count={count}
								exerciseObj={exercises[4]}
								masterEights={masterEights}
							/> */}
						</section>
						<section className='master-settings-btn fr'>
							<FontAwesomeIcon
								icon={faGear}
								className='icon large clickable'
								style={{ marginBottom: "1.5em" }}
							/>
						</section>
					</div>
				</div>

				<div className='page-container'>
					<div className='page fc'>
						<UserInputs
							oneEight={oneEight}
							practiceEights={masterEights}
							handleUserChange={handleUserChange}
						/>

						{/* <DraggableList /> */}
						<Accordion
							sortedExercises={sortedExercises}
							currentSelection={currentSelection}
							handleSubmitExercises={handleSubmitExercises}
						/>
					</div>
				</div>
			</div>
			{/* <div className="page fc">
				<h2 style={{ margin: 0, padding: 0 }}>{`${category}`}</h2>
				<h3 style={{ margin: 0, padding: 0 }}>Number Pad</h3>
				<NumberPad
				eightsElapsed={eightsElapsed}
						count={count}
						exerciseObj={}
					sequence={prevSeqRef.current ?? sequence}
					activeNumIndex={activeNumIndex}
				/>
			</div>
 */}
		</div>
	);
}

export default App;
