import { useEffect, useRef, useState } from "react";
import { createRealTimeBpmProcessor, getBiquadFilters } from "realtime-bpm-analyzer";

const AudioRecorder = () => {
	const [permission, setPermission] = useState(false);
	const [stream, setStream] = useState(null);
	console.log(stream);
	const getMicrophonePermission = async () => {
		if ("MediaRecorder" in window) {
			try {
				const streamData = await navigator.mediaDevices.getUserMedia({
					audio: true,
				});
				setPermission(true);
				setStream(streamData);
			} catch (err) {
				alert(err.message);
			}
		} else {
			alert("The MediaRecorder API is not supported in your browser.");
		}
	};

	useEffect(() => {
		async function getRtNode() {
			const audioContext = new AudioContext();
			const source = audioContext.createMediaStreamSource(stream);
			const realtimeAnalyzerNode = await createRealTimeBpmProcessor(audioContext);
			// Set the source with the HTML Audio Node
			// const source = audioContext.createMediaElementSource(trackRef.current);

			// The library provides built in biquad filters, so no need to configure them
			const { lowpass, highpass } = getBiquadFilters(audioContext);
			// Connect nodes together
			source.connect(lowpass).connect(highpass).connect(realtimeAnalyzerNode);
			source.connect(audioContext.destination);

			console.log({ realtimeAnalyzerNode, source, lowpass, highpass });
			// Set continuousAnalysis to true
			realtimeAnalyzerNode.port.postMessage({
				message: "ASYNC_CONFIGURATION",
				parameters: {
					continuousAnalysis: true,
					stabilizationTime: 20000, // Default value is 20_000ms after what the library will automatically delete all collected data and restart analysing BPM
				},
			});

			realtimeAnalyzerNode.port.onmessage = (event) => {
				console.log(event);
				if (event.data.message === "BPM") {
					console.log("BPM", event.data.result);
				}
				if (event.data.message === "BPM_STABLE") {
					console.log("BPM_STABLE", event.data.result);
				}
			};
		}
		if (stream) {
			getRtNode();
		}
	}, [stream]);
	return (
		<div>
			<h2>Audio Recorder</h2>
			<main>
				<div className='audio-controls'>
					{!permission ? (
						<button onClick={getMicrophonePermission} type='button'>
							Get Microphone
						</button>
					) : null}
					{permission ? <button type='button'>Record</button> : null}
				</div>
			</main>
		</div>
	);
};

export const RTAudioAnalyzer = () => {
	const trackRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);

	// useEffect(() => {
	// 	trackRef.current && isPlaying ? trackRef.current.play() : trackRef.current.pause();
	// }, [isPlaying]);

	// useEffect(() => {
	// 	if (!trackRef.current && !isPlaying) {
	// 		return;
	// 	}
	// 	console.log(trackRef.current);

	// 	let audioContext = new AudioContext();

	// 	async function getRtNode(audioContext) {
	// 		const realtimeAnalyzerNode = await createRealTimeBpmProcessor(audioContext);
	// 		// Set the source with the HTML Audio Node
	// 		const source = audioContext.createMediaElementSource(trackRef.current);

	// 		// The library provides built in biquad filters, so no need to configure them
	// 		const { lowpass, highpass } = getBiquadFilters(audioContext);
	// 		// Connect nodes together
	// 		source.connect(lowpass).connect(highpass).connect(realtimeAnalyzerNode);
	// 		source.connect(audioContext.destination);

	// 		console.log({ realtimeAnalyzerNode, source, lowpass, highpass });
	// 		// Set continuousAnalysis to true
	// 		realtimeAnalyzerNode.port.postMessage({
	// 			message: "ASYNC_CONFIGURATION",
	// 			parameters: {
	// 				continuousAnalysis: true,
	// 				stabilizationTime: 20_000, // Default value is 20_000ms after what the library will automatically delete all collected data and restart analysing BPM
	// 			},
	// 		});

	// 		// realtimeAnalyzerNode.port.onmessage = (event) => {
	// 		// 	console.log(event);
	// 		// 	if (event.data.message === "BPM") {
	// 		// 		console.log("BPM", event.data.result);
	// 		// 	}
	// 		// 	if (event.data.message === "BPM_STABLE") {
	// 		// 		console.log("BPM_STABLE", event.data.result);
	// 		// 	}
	// 		// };
	// 	}
	// 	getRtNode(audioContext);
	// }, [isPlaying]);

	return (
		<div>
			<button
				onClick={() => {
					setIsPlaying(!isPlaying);
				}}
			>
				{isPlaying ? "pause" : "play"}
			</button>
			<audio src='https://ssl1.viastreaming.net:7005/listen.mp3' id='track' ref={trackRef}></audio>

			<AudioRecorder />
		</div>
	);
};
