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
    <div className="h-[54px] w-[300px] rounded-full bg-white">
      <div className="flex h-full w-full items-center justify-center font-bold text-4xl text-primary-foreground">
        <span
          className="flex size-14 items-center justify-center"
          key={`${minutes}_minutes`}
        >
          {minutes}
        </span>
        <span>:</span>
        <span
          className="flex size-14 items-center justify-center"
          key={`${seconds}_seconds`}
        >
          {seconds}
        </span>
        <span>:</span>
        <span
          className="flex size-14 items-center justify-center"
          key={`${centiseconds}_centiseconds`}
        >
          {centiseconds}
        </span>
      </div>
    </div>
  )
}
