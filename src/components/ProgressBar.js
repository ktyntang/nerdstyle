import "./ProgressBar.css";

export const ProgressBar = ({ rangeBg, progress, height }) => {
	const RangeDiv = {
		height: height,
		width: "100%",
		backgroundColor: rangeBg,
		borderRadius: 40,
		position: "relative",
	};

	const ProgressBg = {
		height: "100%",
		width: `${progress * 12.5}%`,
		position: "absolute",
		top: 0,
		left: 0,
		zIndex: 0,
		borderRadius: `${progress === 8 ? "40px" : "40px 0 0 40px"}`,
	};

	const ProgressDivActive = {
		height: "100%",
		width: "12.5%",
		backgroundColor: "transparent",
		borderLeft: "1px solid whitesmoke",
		borderRight: "1px solid whitesmoke",
		boxShadow: "0 0 5px whitesmoke",
		zIndex: 1,
	};

	const ProgressDivInactive = {
		height: "100%",
		width: "12.5%",
		backgroundColor: rangeBg,
		borderRadius: 40,
	};
	return (
		<div style={RangeDiv} className=" progress-container fr">
			{[...Array(8).keys()].map((div, i) => {
				return (
					<div
						className="progress-div"
						style={
							i < progress
								? ProgressDivActive
								: ProgressDivInactive
						}
						key={i}
					></div>
				);
			})}
			<div style={ProgressBg} className="progress-bg"></div>
		</div>
	);
};
