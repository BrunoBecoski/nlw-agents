import { useEffect, useState } from 'react'

interface StopwatchProps {
  time: number
}

export function Stopwatch({ time }: StopwatchProps) {
  const [centiseconds, setCentiseconds] = useState('00')
  const [seconds, setSeconds] = useState('00')
  const [minutes, setMinutes] = useState('00')

  useEffect(() => {
    const currentTime = time

    if (currentTime > 0) {
      setCentiseconds(
        Math.floor(currentTime % 100)
          .toString()
          .padStart(2, '0')
      )

      setSeconds(
        Math.floor((currentTime / 100) % 60)
          .toString()
          .padStart(2, '0')
      )

      setMinutes(
        Math.floor((currentTime / 6000) % 60)
          .toString()
          .padStart(2, '0')
      )
    }
  }, [time])

  return (
    <div className="flex items-center gap-3">
      <span
        className="repeat-1 flex size-18 items-center justify-center font-bold text-6xl"
        key={`${minutes}_minutes`}
      >
        {minutes}
      </span>
      <span className="font-bold text-6xl ">:</span>
      <span
        className="repeat-1 flex size-18 items-center justify-center font-bold text-6xl"
        key={`${seconds}_seconds`}
      >
        {seconds}
      </span>
      <span className="font-bold text-6xl ">:</span>
      <span
        className="repeat-1 flex size-18 items-center justify-center font-bold text-6xl"
        key={`${centiseconds}_centiseconds`}
      >
        {centiseconds}
      </span>
    </div>
  )
}
