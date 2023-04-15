import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAnglesLeft,
	faAnglesRight,
	faLock,
	faLockOpen,
	faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { Modal } from "./Modal";

export const CardControl = ({
	isShown,
	isLocked,
	handleControls,
	practiceEights,
}) => {
	return (
		<Modal isShown={isShown}>
			<div
				className={`card-control fc ${
					isShown ? "is-shown" : "is-hidden"
				}`}
			>
				<div className="btn-container fr">
					<button
						className="refresh-btn clickable"
						onClick={handleControls("refresh")}
					>
						<FontAwesomeIcon icon={faRefresh} />
					</button>
					<button
						className="lock-btn clickable"
						onClick={handleControls("lock")}
					>
						<FontAwesomeIcon
							icon={isLocked ? faLock : faLockOpen}
						/>
					</button>
				</div>
				<div className="back-next-container fr">
					<button
						className="clickable"
						onClick={handleControls("back")}
					>
						<FontAwesomeIcon icon={faAnglesLeft} />
					</button>
					<button
						className="clickable"
						onClick={handleControls("next")}
					>
						<FontAwesomeIcon icon={faAnglesRight} />
					</button>
				</div>

				<div
					className="fr input-container"
					id="practice-input-container"
				>
					<label>Change every </label>
					<input
						type="number"
						id="practice-eights-input-card"
						value={practiceEights ? practiceEights : ""}
						onChange={handleControls("input-eights")}
					></input>
					<span>eights</span>
				</div>
			</div>
		</Modal>
	);
};
