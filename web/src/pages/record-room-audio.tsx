import { useEffect, useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Stopwatch } from '@/components/stopwatch'
import { Button } from '@/components/ui/button'

type Status = '' | 'recording' | 'pause' | 'stop'

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

  const [status, setStatus] = useState<Status>('')
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
    setStatus('recording')

    if (!isRecordingSupported) {
      alert('O seu navegador não suporta gravação')
      return
    }

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
    setStatus('stop')

    setIsRecording(false)

    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      recorderRef.current.stop()
    }
  }

  function pauseRecording() {
    setStatus('pause')

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
      {status === '' && (
        <Button className="cursor-pointer" onClick={startRecording} size="lg">
          Gravar áudio
        </Button>
      )}

      {status === 'recording' && (
        <div>
          <Stopwatch time={time} />
          <p className="animate-pulse text-center text-red-500 italic">
            Gravando...
          </p>

          <div className="flex gap-8">
            <Button
              className="cursor-pointer"
              onClick={pauseRecording}
              size="lg"
            >
              Pausar gravação
            </Button>

            <Button
              className="cursor-pointer"
              onClick={stopRecording}
              size="lg"
            >
              Parar gravação
            </Button>
          </div>
        </div>
      )}

      {status === 'pause' && (
        <div>
          <Stopwatch time={time} />
          <p className="animate-pulse text-center text-red-500 italic">
            Gravação pausada
          </p>

          <div className="flex gap-8">
            <Button
              className="cursor-pointer"
              onClick={resumeRecording}
              size="lg"
            >
              Voltar gravação
            </Button>

            <Button
              className="cursor-pointer"
              onClick={stopRecording}
              size="lg"
            >
              Parar gravação
            </Button>
          </div>
        </div>
      )}

      {status === 'stop' && (
        <div className="flex flex-col gap-8">
          <Button className="cursor-pointer" onClick={startRecording} size="lg">
            Começar outro gravação
          </Button>

          <audio controls src={recording} />

          <Button className="cursor-pointer" size="lg">
            Mandar a api
          </Button>
        </div>
      )}
    </div>
  )
}
