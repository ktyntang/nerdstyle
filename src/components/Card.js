import { useCallback, useEffect, useRef, useState } from "react";
import { arraysAreEqual, getRegeneratedSequence } from "../utils/calculations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAnglesLeft,
	faAnglesRight,
	faCaretLeft,
	faCaretRight,
	faLock,
	faLockOpen,
	faRefresh,
	faSliders,
} from "@fortawesome/free-solid-svg-icons";
import "./Card.css";
import { PICK_ONE } from "../constants/constants";

export const Card = ({ eightsElapsed, count, exerciseObj }) => {
	const { category, name, options, seqType, seqLength } = exerciseObj;

	const [sequence, setSequence] = useState([]);
	const [practiceEights, setPracticeEights] = useState(2);
	const [isLocked, setIsLocked] = useState(false);
	const [controlIsOpen, setControlIsOpen] = useState(false);

	let backCounter = useRef(0);
	let storedSequences = useRef([]);

	// ---------- EFFECTS ---------------------------------------
	useEffect(() => {
		setSequence(
			options.slice(0, seqLength > 0 ? seqLength : options.length)
		);
	}, [options, seqLength, seqType]);
	console.log({ options, sequence, seqLength });

	const storeSeq = useCallback(
		(seq) => {
			storedSequences.current = [...storedSequences.current, seq];
		},
		[storedSequences]
	);
	console.log(storedSequences.current[storedSequences.current.length - 1]);

	const regenerateSequence = useCallback(() => {
		let result;
		do {
			result = getRegeneratedSequence(seqType)(options, seqLength).join(
				" "
			);
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
		if (
			eightsElapsed &&
			count === 1 &&
			!(eightsElapsed % practiceEights) &&
			!isLocked
		) {
			regenerateSequence();
		}
	}, [eightsElapsed, count, practiceEights, isLocked, regenerateSequence]);

	// ---------- HANDLERS ---------------------------------------
	const handleBack = () => {
		if (!storedSequences.current.length) {
			backCounter.current = 0;
			return null;
		}
		setIsLocked(true);
		setSequence(
			storedSequences.current[
				storedSequences.current.length - 2 - backCounter.current
			]
		);
		backCounter.current = backCounter.current + 1;
	};

	const handleNext = () => {
		if (!backCounter.current) {
			return null;
		}
		setIsLocked(true);
		backCounter.current = backCounter.current - 1;
		setSequence(
			storedSequences.current[
				storedSequences.current.length - 1 - backCounter.current
			]
		);
	};
	const handleRefresh = () => {
		backCounter.current = 0;
		regenerateSequence();
	};
	const toggleLock = () => {
		setIsLocked(!isLocked);
	};
	const toggleControls = () => {
		setControlIsOpen(!controlIsOpen);
	};

	return (
		<div className="card fc">
			<button
				className="card-control-button icon clickable"
				onClick={() => toggleControls()}
			>
				<FontAwesomeIcon icon={faSliders} />
			</button>
			<div
				className={`card-control fr ${
					controlIsOpen ? "is-shown" : "is-hidden"
				}`}
			>
				<button onClick={() => handleBack()}>
					<FontAwesomeIcon icon={faAnglesLeft} />
				</button>
				<button onClick={() => handleNext()}>
					<FontAwesomeIcon icon={faAnglesRight} />
				</button>
				<button onClick={() => handleRefresh()}>
					<FontAwesomeIcon icon={faRefresh} />
				</button>
				<button onClick={() => toggleLock()}>
					<FontAwesomeIcon icon={isLocked ? faLock : faLockOpen} />
				</button>
				<div
					className="fr input-container"
					id="practice-input-container"
				>
					<label>Change every </label>
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
					<span>eights</span>
				</div>
			</div>
			<div className="category-display">
				<h5>{`${category}:${name}`}</h5>
			</div>
			<div className="display-container">
				<div className="seq-display">{`${sequence}`}</div>
			</div>
		</div>
	);
};
