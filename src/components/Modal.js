import { useState } from "react";
import "./Modal.css";

export const Modal = ({ children, isShown }) => {
	return (
		<div className={`modal-overlay ${isShown ? "show" : "hide"}`}>
			<div className="modal-container">{children}</div>
		</div>
	);
};

export const useModal = () => {
	const [isShown, setIsShown] = useState(false);
	const toggleModal = () => {
		setIsShown(!isShown);
	};

	return { isShown, toggleModal };
};
