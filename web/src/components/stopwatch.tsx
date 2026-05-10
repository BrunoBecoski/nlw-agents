import { useEffect, useState } from 'react'

interface StopwatchProps {
  time: number
}

export function Stopwatch({ time }: StopwatchProps) {
  const [hours, setHours] = useState('00')
  const [minutes, setMinutes] = useState('00')
  const [seconds, setSeconds] = useState('00')

  useEffect(() => {
    if (time > 0) {
      const currentTime = time

      const currentSeconds = currentTime.toString().padStart(2, '0')
      const currentMinutes = '00'
      const currentHours = '00'

      setSeconds(currentSeconds)
      setMinutes(currentMinutes)
      setHours(currentHours)
    }
  }, [time])

  return (
    <div>
      <span>{hours}</span>
      <strong>:</strong>
      <span>{minutes}</span>
      <strong>:</strong>
      <span>{seconds}</span>
    </div>
  )
}
