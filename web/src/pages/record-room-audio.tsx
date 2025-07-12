import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";

type RecordRoomParams = {
	roomId: string;
};

const isRecordingSupported =
	!!navigator.mediaDevices &&
	typeof navigator.mediaDevices.getUserMedia === "function" &&
	typeof window.MediaRecorder === "function";

export function RecordRoomAudio() {
	const params = useParams<RecordRoomParams>();

	const [isRecording, setIsRecording] = useState(false);
	const recorder = useRef<MediaRecorder | null>(null);

	function stopRecording() {
		setIsRecording(false);

		if (recorder.current && recorder.current.state !== "inactive") {
			recorder.current.stop();
		}
	}

	async function uploadAudio(audio: Blob) {
		const formData = new FormData();

		formData.append("file", audio, "audio.webm");

		const response = await fetch(
			`http://localhost:3333/rooms/${params.roomId}/audio`,
			{
				method: "POST",
				body: formData,
			},
		);

		const result = await response.json();

		console.log(result);
	}

	async function startRecording() {
		if (!isRecordingSupported) {
			alert("O seu navegador não suporta gravação");
			return;
		}

		setIsRecording(true);

		try {
			const audio = await navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: true,
					noiseSuppression: true,
					sampleRate: 44_100,
				},
			});

			recorder.current = new MediaRecorder(audio, {
				mimeType: "audio/webm",
				audioBitsPerSecond: 64_000,
			});

			recorder.current.ondataavailable = (event) => {
				if (event.data.size > 0) {
					uploadAudio(event.data);
				}
			};

			recorder.current.onstart = () => {
				console.log("Gravação iniciada!");
			};

			recorder.current.onstop = () => {
				console.log("Gravação encerrada/pausada");
			};

			recorder.current.start();
		} catch (error) {
			alert(error);
		}
	}

	if (!params.roomId) {
		return <Navigate replace to="/" />;
	}

	return (
		<div className="flex flex-col h-screen items-center justify-center gap-3">
			{isRecording ? (
				<>
					<Button onClick={stopRecording} size="lg" className="cursor-pointer">
						Pausar gravação
					</Button>
					<p className="animate-pulse text-red-500 italic">Gravando...</p>
				</>
			) : (
				<Button onClick={startRecording} size="lg" className="cursor-pointer">
					Gravar áudio
				</Button>
			)}
		</div>
	);
}
