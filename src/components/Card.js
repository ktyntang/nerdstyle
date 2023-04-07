import { useCallback, useEffect, useRef, useState } from "react";
import { getRegeneratedSequence } from "../utils/calculations";

export const Card = ({ eightsElapsed, exerciseObj }) => {
	const { category, name, options, seqType, seqLength } = exerciseObj;

	const [storedSequences, setStoredSequences] = useState([]);
	const [sequence, setSequence] = useState([]);
	const [practiceEights, setPracticeEights] = useState(2);
	const [isLocked, setIsLocked] = useState(false);

	let prevSeq = useRef(null);
	const storePrevSeq = useCallback(() => {
		prevSeq.current = sequence;
		setStoredSequences(storedSequences.push(prevSeq.current));
		console.log(storedSequences);
		// TODO how to push arr to another arr
	}, [sequence, storedSequences]);

	let regenerateSequence = useCallback(() => {
		setSequence(getRegeneratedSequence(seqType)(options, seqLength));
		storePrevSeq();
	}, [options, seqType, seqLength, storePrevSeq]);

	// set initial sequence
	useEffect(() => {
		setSequence(options.slice(seqLength - 1));
	}, [options, seqLength]);

	// regenerate on cue if not locked and not initial
	useEffect(() => {
		if (eightsElapsed && !(eightsElapsed % practiceEights) && !isLocked) {
			regenerateSequence();
		}
	}, [
		eightsElapsed,
		practiceEights,
		isLocked,
		regenerateSequence,
		storePrevSeq,
	]);

	const handleBack = () => {
		setSequence(storedSequences[storedSequences.length]);
	};
	const handleNext = () => {
		regenerateSequence();
	};
	const handleLock = () => {
		setIsLocked(true);
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
				<button onClick={handleLock}>Lock</button>
				<button onClick={handleNext}>Next</button>
				<button onClick={handleBack}>Back</button>
			</div>
		</div>
	);
};
