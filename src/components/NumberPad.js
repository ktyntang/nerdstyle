import "./NumberPad.css";

export const NumberPad = ({ sequence, activeNumIndex }) => {
	return (
		<section className="number-pad" id="number-pad">
			<div className="grid-container">
				{Array.from({ length: 9 }, (_, i) => i + 1).map((num, i) => (
					<div
						className={`grid-item ${
							num === sequence[activeNumIndex]
								? "activeNum"
								: "nonActiveNum"
						}`}
						key={num}
					>
						<p id="grid-item-num">{`${num}`}</p>
					</div>
				))}
			</div>
			<div className="gradient-display">{`${sequence
				.toString()
				.replaceAll(",", " ")}`}</div>
		</section>
	);
};
