import "./App.css";
import "./Main.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { NumberPad } from "./components/NumberPad";
import { UserInputs } from "./components/UserInputs";
import { Card } from "./components/Card";

import { ProgressBar } from "./components/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCirclePause,
	faCirclePlay,
	faPause,
	faPlay,
	faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Intro } from "./components/Intro";
import { exercises } from "./utils/exercises";

function App() {
	const [oneEight, setOneEight] = useState(5); //seconds. defaults? fast 10, med 20, slow 40)
	const [count, setCount] = useState(1);
	const [practiceEights, setPracticeEights] = useState(2); // eights per prompt. change prompt aft _ eights.
	const [exerciseEights, setExerciseEights] = useState(16); // eights per exercise. add new exercise aft _ eights. If 0,  enable all?
	const [eightsElapsed, setEightsElapsed] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);

	// After 2 eights, exercise change prompt.
	// After 16 eights, add new exercise.
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
	}, [oneEight, practiceEights, isPlaying, eightsElapsed, count]);

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
		<div className="App ">
			<header>
				<h1>lil drills</h1>
			</header>
			<div className="fr">
				<div className="page-container">
					<div className="page fc">
						<Intro />
					</div>
				</div>
				<div className="page-container">
					<div className="main page">
						<section className="progress-container">
							<ProgressBar
								progressBg={"whitesmoke"}
								rangeBg={"grey"}
								progress={count}
								height={"1rem"}
							/>
						</section>

						<section className="play-controls">
							<button
								onClick={() =>
									isPlaying ? handlePause() : handlePlay()
								}
							>
								<FontAwesomeIcon
									icon={isPlaying ? faPause : faPlay}
								/>
							</button>
						</section>
						<div className="card-container fc">
							<Card
								eightsElapsed={eightsElapsed}
								count={count}
								exerciseObj={exercises[0]}
							/>
							<Card
								eightsElapsed={eightsElapsed}
								count={count}
								exerciseObj={exercises[1]}
							/>
							<Card
								eightsElapsed={eightsElapsed}
								count={count}
								exerciseObj={exercises[2]}
							/>
						</div>
					</div>
				</div>

				<div className="page-container">
					<div className="page fc">
						<UserInputs
							oneEight={oneEight}
							practiceEights={practiceEights}
							exerciseEights={exerciseEights}
							handleUserChange={handleUserChange}
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
