import {
	faAngleDown,
	faCaretDown,
	faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import "./Accordion.css";
import { useEffect } from "react";
import { exercises } from "../utils/exercises";

export const Accordion = ({
	sortedExercises,
	currentSelection,
	handleSubmitExercises,
}) => {
	const [activeCategory, setActiveCategory] = useState([]);
	const [selectedExercises, setSelectedExercises] = useState([]);

	useEffect(() => {
		if (currentSelection) {
			setSelectedExercises(currentSelection);
		}
	}, [currentSelection]);

	const handleCategoryClick = (category) => {
		activeCategory.includes(category)
			? setActiveCategory(
					activeCategory.filter((item) => item !== category)
			  )
			: setActiveCategory([...activeCategory, category]);
	};

	const handleExerciseSelection = (exerciseName) => {
		let exerciseObj = exercises.filter(
			(item) => item.name === exerciseName
		)[0];

		selectedExercises.filter(
			(selected) => selected.name === exerciseObj.name
		).length
			? setSelectedExercises(
					selectedExercises.filter(
						(item) => item.name !== exerciseObj.name
					)
			  )
			: setSelectedExercises([...selectedExercises, exerciseObj]);
	};

	return (
		<div className="exercise-selection">
			{sortedExercises.map((category) => (
				<div className="accordion" key={category.category}>
					<div
						className="accordion-title fr"
						onClick={() => handleCategoryClick(category)}
						style={{ color: `var(--${category.category})` }}
					>
						<h3>{category.category}</h3>
						<FontAwesomeIcon icon={faAngleDown} className="icon" />
					</div>

					<ul
						className={`accordion-content fc ${
							activeCategory.includes(category) ? "active" : ""
						}`}
					>
						{category.exercises.map((exercise, i) => (
							<li
								className="accordion-item fr"
								onClick={() =>
									handleExerciseSelection(exercise)
								}
								style={{ "--anim-delay": i + 1 }}
								key={exercise}
							>
								<h4>{`${exercise}`}</h4>
								<input
									type="checkbox"
									checked={
										selectedExercises.filter(
											(selected) =>
												selected.name === exercise
										).length
									}
									onChange={() =>
										handleExerciseSelection(exercise)
									}
								/>
							</li>
						))}
					</ul>
				</div>
			))}
			<button
				id="submit-exercise-btn"
				className="clickable"
				onClick={() => handleSubmitExercises(selectedExercises)}
			>
				<FontAwesomeIcon icon={faCheck} className="icon" />
			</button>
		</div>
	);
};
