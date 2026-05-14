import { Mic, MicOff, Pause, Play, Square } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Stopwatch } from '@/components/stopwatch'
import { Button } from '@/components/ui/button'

type Status = 'none' | 'recording' | 'paused' | 'stopped'

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

  const [status, setStatus] = useState<Status>('none')
  const [isRecording, setIsRecording] = useState(false)
  const [recording, setRecording] = useState('')
  const [time, setTime] = useState(0)

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
      console.log('Gravação obtida')
      setRecording(URL.createObjectURL(event.data))
    }

    recorderRef.current.onstart = () => {
      console.log('Gravação iniciada')
    }

    recorderRef.current.onresume = () => {
      console.log('Gravação continuada')
    }

    recorderRef.current.onpause = () => {
      console.log('Gravação pausada')
    }

    recorderRef.current.onstop = () => {
      console.log('Gravação parada')
    }

    recorderRef.current.start()
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert('O seu navegador não suporta gravação')
      return
    }

    setStatus('recording')
    setTime(0)
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
    setStatus('stopped')

    setIsRecording(false)

    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      recorderRef.current.stop()
    }
  }

  function pauseRecording() {
    setStatus('paused')

    setIsRecording(false)

    if (recorderRef.current && recorderRef.current.state === 'recording') {
      recorderRef.current.pause()
    }
  }

  function resumeRecording() {
    setStatus('recording')

    setIsRecording(true)

    if (recorderRef.current && recorderRef.current.state === 'paused') {
      recorderRef.current.resume()
    }
  }

  useEffect(() => {
    if (isRecording === true) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1)
      }, 10)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
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
      {(status === 'none' || status === 'stopped') && (
        <Button
          className="cursor-pointer"
          onClick={startRecording}
          size="icon"
          title="Iniciar gravação"
        >
          <Play className="size-16" />
        </Button>
      )}

      {isRecording ? (
        <Mic className="size-36 animate-pulse" />
      ) : (
        <MicOff className="size-36" />
      )}

      <Stopwatch time={time} />
      {(status === 'recording' || status === 'paused') && (
        <div>
          <div className="flex gap-10">
            <Button
              className="cursor-pointer"
              disabled={status !== 'paused'}
              onClick={resumeRecording}
              size="icon"
              title="Continuar gravação"
            >
              <Play className="size-16" />
            </Button>

            <Button
              className="cursor-pointer"
              disabled={status !== 'recording'}
              onClick={pauseRecording}
              size="icon"
              title="Pausar gravação"
            >
              <Pause className="size-16" />
            </Button>

            <Button
              className="cursor-pointer"
              disabled={status !== 'recording' && status !== 'paused'}
              onClick={stopRecording}
              size="icon"
              title="Parar gravação"
            >
              <Square className="size-16" />
            </Button>
          </div>
        </div>
      )}

      {status === 'stopped' && <audio controls src={recording} />}
    </div>
  )
}
