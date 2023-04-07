import { useCallback, useEffect, useRef, useState } from "react";
import { arraysAreEqual, getRegeneratedSequence } from "../utils/calculations";

export const Card = ({ eightsElapsed, exerciseObj }) => {
	const { category, name, options, seqType, seqLength } = exerciseObj;

	// const [storedSequences, setStoredSequences] = useState([]);
	const [sequence, setSequence] = useState(options.slice(seqLength - 1));
	const [practiceEights, setPracticeEights] = useState(2);
	const [isLocked, setIsLocked] = useState(false);

	let prevSeq = useRef(null);
	let backCounter = useRef(0);
	let storedSequences = useRef([]);
	let seqStore = storedSequences.current;

	const storeSeq = useCallback(
		(seq) => {
			storedSequences.current = [...storedSequences.current, seq];
		},
		[storedSequences]
	);

	const regenerateSequence = useCallback(() => {
		let result;
		do {
			result = getRegeneratedSequence(seqType)(options, seqLength);
		} while (
			result &&
			arraysAreEqual(
				result,
				storedSequences.current[storedSequences.current.length - 1]
			)
		);
		setSequence(result);
		storeSeq(result);
	}, [options, seqType, seqLength, storeSeq]);

	// regenerate on cue if not locked and not initial
	useEffect(() => {
		if (eightsElapsed && !(eightsElapsed % practiceEights) && !isLocked) {
			regenerateSequence();
		}
	}, [eightsElapsed, practiceEights, isLocked, regenerateSequence]);

	const handleBack = () => {
		if (!storedSequences.current.length) {
			backCounter.current = 0;
			return null;
		}
		setSequence(
			storedSequences.current[
				storedSequences.current.length - 1 - backCounter.current
			]
		);
		backCounter.current = backCounter.current + 1;
	};
	const handleNext = () => {
		backCounter.current = 0;
		regenerateSequence();
	};
	const toggleLock = () => {
		setIsLocked(!isLocked);
	};

	return (
		<div className="card">
			<div className="category-display">
				<h5>{`${category}:${name}`}</h5>
				<h5>{`${category}`}</h5>
			</div>
			<div className="display-container">
				<div className="seq-display">{`${sequence}`}</div>
			</div>
			<div className="card-control">
				<button onClick={() => toggleLock()}>Lock</button>
				<button onClick={() => handleNext()}>Next</button>
				<button onClick={() => handleBack()}>Back</button>
				<section
					className="fr input-container"
					id="practice-input-container"
				>
					<label>Eights per exercise</label>
					<input
						type="number"
						id="practice-eights-input-card"
						value={practiceEights ? practiceEights : ""}
						onChange={(e) => {
							let result = e.target.value
								? parseInt(e.target.value)
								: 0;
							setPracticeEights(result);
						}}
					></input>
				</section>
			</div>
		</div>
	);
};
