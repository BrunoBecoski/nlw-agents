import { useEffect, useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'

type RecordRoomParams = {
  roomId: string
}

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function'

export function RecordRoomAudio() {
  const params = useParams<RecordRoomParams>()

  const recorderRef = useRef<MediaRecorder | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const [isRecording, setIsRecording] = useState(false)
  const [recording, setRecording] = useState('')
  const [timer, setTimer] = useState(0)

  // async function uploadAudio(audio: Blob) {
  //   const formData = new FormData()

  //   formData.append('file', audio, 'audio.webm')

  //   const response = await fetch(
  //     `http://localhost:3333/rooms/${params.roomId}/audio`,
  //     {
  //       method: 'POST',
  //       body: formData,
  //     }
  //   )

  //   const result = await response.json()

  //   console.log(result)
  // }

  function createRecorder(audio: MediaStream) {
    recorderRef.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    })

    recorderRef.current.ondataavailable = (event) => {
      setRecording(URL.createObjectURL(event.data))
    }

    recorderRef.current.onstart = () => {
      console.log('Gravação iniciada!')
    }

    recorderRef.current.onstop = () => {
      console.log('Gravação encerrada/pausada')
    }

    recorderRef.current.start()
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert('O seu navegador não suporta gravação')
      return
    }

    setIsRecording(true)

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    })

    createRecorder(audio)
  }

  function stopRecording() {
    setIsRecording(false)

    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      recorderRef.current.stop()
    }
  }

  useEffect(() => {
    if (isRecording === true) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      setTimer(0)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRecording])

  if (!params.roomId) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      {isRecording ? (
        <>
          <Button className="cursor-pointer" onClick={stopRecording} size="lg">
            Pausar gravação
          </Button>
          <p className="animate-pulse text-red-500 italic">Gravando...</p>
          <span>{timer}</span>
        </>
      ) : (
        <Button className="cursor-pointer" onClick={startRecording} size="lg">
          Gravar áudio
        </Button>
      )}

      {recording && <audio controls src={recording} />}
    </div>
  )
}
