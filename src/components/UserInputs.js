export const UserInputs = ({
	oneEight,
	practiceEights,
	exerciseEights,
	handleUserChange,
}) => {
	return (
		<div className="page user-inputs">
			<section
				className="fr input-container"
				id="one-eight-input-container"
			>
				<label>One Eight</label>
				<input
					type="number"
					id="oneEight-input"
					value={oneEight ? oneEight / 1000 : ""}
					onChange={(e) =>
						handleUserChange(
							e.target.value
								? parseInt(e.target.value * 1000)
								: 0,
							"oneEight"
						)
					}
				></input>
			</section>
			<section
				className="fr input-container"
				id="practice-input-container"
			>
				<label>Eights per prompt</label>
				<input
					type="number"
					id="practice-eights-input"
					value={practiceEights ? practiceEights : ""}
					onChange={(e) =>
						handleUserChange(
							e.target.value ? parseInt(e.target.value) : 0,
							"practiceEights"
						)
					}
				></input>
			</section>
			<section
				className="fr input-container"
				id="exercise-input-container"
			>
				<label>Eights per exercise</label>
				<input
					type="number"
					id="exercise-eights-input"
					value={exerciseEights ? exerciseEights : ""}
					onChange={(e) =>
						handleUserChange(
							e.target.value ? parseInt(e.target.value) : 0,
							"exerciseEights"
						)
					}
				></input>
			</section>
		</div>
	);
};
