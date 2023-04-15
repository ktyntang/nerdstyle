import { CardControl } from "./CardControl";
import { useCallback, useEffect, useRef, useState } from "react";
import {
	getRegeneratedSequence,
	lastNArraysIncludes,
} from "../utils/calculations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import "./Card.css";
import { useModal } from "./Modal";

export const Card = ({ eightsElapsed, count, exerciseObj, masterEights }) => {
	const { category, name, options, seqType, seqLength } = exerciseObj;
	const { isShown, toggleModal } = useModal();

	const [sequence, setSequence] = useState([]);
	const [practiceEights, setPracticeEights] = useState(masterEights);
	const [isLocked, setIsLocked] = useState(false);

	let backCounter = useRef(0);
	let storedSequences = useRef([]);

	// ---------- EFFECTS ---------------------------------------

	const storeSeq = useCallback(
		(seq) => {
			storedSequences.current = [...storedSequences.current, seq];
		},
		[storedSequences]
	);
	const regenerateSequence = useCallback(() => {
		let result;
		do {
			result = getRegeneratedSequence(seqType)(options, seqLength).join(
				" "
			);
		} while (
			result &&
			lastNArraysIncludes(options.length, storedSequences.current, result)
		);
		setSequence(result);
		storeSeq(result);
	}, [options, seqType, seqLength, storeSeq]);

	// initial sequence
	useEffect(() => {
		setSequence(
			options.slice(0, seqLength > 0 ? seqLength : options.length)
		);
		storeSeq(options.slice(0, seqLength > 0 ? seqLength : options.length));
	}, [options, seqLength, seqType, storeSeq]);

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

	// override practiceEights if exerciseEights is set
	useEffect(() => {
		return masterEights ? setPracticeEights(masterEights) : null;
	}, [masterEights]);

	// ---------- HANDLERS ---------------------------------------
	const handleBack = () => {
		backCounter.current = backCounter.current + 1;

		if (storedSequences.current.length === backCounter.current) {
			backCounter.current = 0;
			return null;
		}
		setIsLocked(true);
		setSequence(
			storedSequences.current[
				storedSequences.current.length - 1 - backCounter.current < 0
					? 0
					: storedSequences.current.length - 1 - backCounter.current
			]
		);
	};

	const handleRefresh = () => {
		backCounter.current = 0;
		regenerateSequence();
	};

	const handleNext = () => {
		if (!backCounter.current) {
			handleRefresh();
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

	const toggleLock = () => {
		setIsLocked(!isLocked);
	};

	const handleControls = (btnClick) => {
		switch (btnClick) {
			case "refresh":
				return () => handleRefresh();
			case "lock":
				return () => toggleLock();
			case "back":
				return () => handleBack();
			case "next":
				return () => handleNext();
			case "input-eights":
				return (e) => {
					let result = e.target.value ? parseInt(e.target.value) : 0;
					setPracticeEights(result);
				};
			default:
				return null;
		}
	};

	const toggleControls = () => {
		toggleModal();
	};

	return (
		<div
			className="card fc"
			style={{
				border: `1px solid var(--${category})`,
				boxShadow: `0 0 5px var(--${category}), 0 0 7px rgba(255, 0, 0, 0.6)`,
			}}
		>
			<button
				className="card-control-button icon clickable"
				onClick={() => toggleControls()}
			>
				<FontAwesomeIcon icon={faSliders} />
			</button>
			<CardControl
				isShown={isShown}
				isLocked={isLocked}
				handleControls={handleControls}
				practiceEights={practiceEights}
			/>
			<div className="info-display">
				<h5>{`${name}`}</h5>
			</div>
			<div className="display-container">
				<div
					className="seq-display"
					style={{ color: `var(--${category})` }}
				>{`${sequence}`}</div>
			</div>
		</div>
	);
};
