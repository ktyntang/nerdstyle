import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MusicTempo from "music-tempo";
import { useEffect, useRef, useState } from "react";

export const AudioAnalyzer = () => {
	const [bpm, setBpm] = useState(0);
	const [beats, setBeats] = useState([]);
	const [isPending, setIsPending] = useState(false);

	function handleFileSubmit(files) {
		setIsPending(true);
		var context = new AudioContext({ sampleRate: 88200 });
		console.log(files);
		if (!files.length) return;
		var reader = new FileReader();

		reader.onload = function (fileEvent) {
			context.decodeAudioData(fileEvent.target.result, calcTempo);
		};
		console.log(context);
		reader.readAsArrayBuffer(files[0]);
	}

	var calcTempo = function (buffer) {
		var audioData = [];
		// Take the average of the two channels
		if (buffer.numberOfChannels === 2) {
			var channel1Data = buffer.getChannelData(0);
			var channel2Data = buffer.getChannelData(1);
			var length = channel1Data.length;
			for (var i = 0; i < length; i++) {
				audioData[i] = (channel1Data[i] + channel2Data[i]) / 2;
			}
		} else {
			audioData = buffer.getChannelData(0);
		}
		var mt = new MusicTempo(audioData);
		setBpm(parseInt(mt.tempo));
		setBeats(mt.beats);
		console.log(mt);

		let beatInterval = mt.beatInterval;
		setIsPending(false);
	};

	return (
		<div>
			<input type='file' id='fileInput' onChange={(e) => handleFileSubmit(e.target.files)} />
			<h4>{`BPM ${bpm}`}</h4>
			<h4>{`Beats ${beats}`}</h4>
			{isPending && (
				<FontAwesomeIcon
					icon={faSpinner}
					className='icon'
					style={{
						animation: "rotateR 1s ease-out infinite",
						color: "white",
					}}
				/>
			)}
		</div>
	);
};
