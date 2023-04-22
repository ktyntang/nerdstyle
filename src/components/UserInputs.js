import { abs } from "mathjs";

export const UserInputs = ({
	oneEight,
	practiceEights,
	exerciseEights,
	handleUserChange,
}) => {
	return (
		<div className="user-inputs">
			<section
				className="fr input-container"
				id="one-eight-input-container"
			>
				<label>One Eight</label>
				<input
					type="number"
					id="oneEight-input"
					value={oneEight ? oneEight : ""}
					onChange={(e) =>
						handleUserChange(
							e.target.value ? parseInt(e.target.value) : 0,
							"oneEight"
						)
					}
				></input>
			</section>
			<section
				className="fr input-container"
				id="practice-input-container-master"
			>
				<label>Eights per exercise</label>
				<input
					type="number"
					id="practice-eights-input-master"
					value={practiceEights}
					min={1}
					onChange={(e) => {
						return handleUserChange(
							e.target.value ? abs(parseInt(e.target.value)) : 1,
							"practiceEights"
						);
					}}
				></input>
			</section>
		</div>
	);
};
