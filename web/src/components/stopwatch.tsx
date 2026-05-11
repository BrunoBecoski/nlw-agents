import { useEffect, useState } from 'react'

interface StopwatchProps {
  time: number
}

export function Stopwatch({ time }: StopwatchProps) {
  const [seconds, setSeconds] = useState('00')
  const [minutes, setMinutes] = useState('00')

  useEffect(() => {
    const currentTime = time

    if (currentTime > 0) {
      setSeconds((currentTime % 60).toString().padStart(2, '0'))

      setMinutes(
        Math.floor(currentTime / 60)
          .toString()
          .padStart(2, '0')
      )
    }
  }, [time])

  return (
    <div className="flex items-center gap-3">
      <span
        className="repeat-1 flex size-18 animate-pulse items-center justify-center font-bold text-6xl"
        key={minutes}
      >
        {minutes}
      </span>
      <span className="font-bold text-6xl ">:</span>
      <span
        className="repeat-1 flex size-18 animate-pulse items-center justify-center font-bold text-6xl"
        key={seconds}
      >
        {seconds}
      </span>
    </div>
  )
}
