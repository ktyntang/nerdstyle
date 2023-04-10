import { useEffect, useRef, useState } from "react";
import "./Intro.css";
import { categories } from "../utils/exercises";
import { getRegeneratedSequence } from "../utils/calculations";
import { PICK_ONE } from "../constants/constants";

export const Intro = () => {
	const [text, setText] = useState("");
	const [category, setCategory] = useState("");
	const finalText = "WHAT DO YOU WANT TO DRILL TODAY?";
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	let categoryShuffle = useRef(null);
	let letterRandomizer = useRef(null);
	let iterationCount = useRef(null);

	useEffect(() => {
		categoryShuffle.current = setInterval(() => {
			let newCat = getRegeneratedSequence(PICK_ONE)(categories);
			setCategory(newCat[0].toUpperCase());
		}, 1000);
		return () => {
			clearInterval(categoryShuffle.current);
			categoryShuffle.current = null;
		};
	});

	useEffect(() => {
		iterationCount.current = 0;
		if (category && iterationCount.current < category.length + 1) {
			letterRandomizer.current = setInterval(() => {
				let randomizedText = category
					.split("")
					.map((char, index) => {
						if (index < iterationCount.current) {
							return category[index];
						}
						return letters[Math.floor(Math.random() * 26)];
					})
					.join("");
				setText(randomizedText);
				iterationCount.current = iterationCount.current + 1;
			}, 30);
		} else {
			clearInterval(letterRandomizer.current);
			letterRandomizer.current = null;
			iterationCount.current = null;
		}

		return () => {
			clearInterval(letterRandomizer.current);
			letterRandomizer.current = null;
		};
	}, [category]);

	return (
		<>
			<h2 className="category-randomized">{`${text}`}</h2>
			<div className="intro-container ">
				<div className="intro fc">
					<h2>WHAT DO YOU</h2>
					<h2>WANT TO DRILL</h2>
					<h2>TODAY? </h2>
				</div>
			</div>
		</>
	);
};
