import { useEffect, useState } from 'react'
import type { AnimationType } from '@/context/screenAndAnimation'
import logoImg from '../../assets/logo.svg'

interface LogoProps {
  animation: AnimationType
}

export function Logo({ animation }: LogoProps) {
  const [currentAnimation, setCurrentAnimation] = useState('')

  useEffect(() => {
    switch (animation) {
      case 'home-enter':
        setCurrentAnimation('animate-fade-in')
        break

      case 'home-exit':
        setCurrentAnimation('animate-fade-out')
        break

      default:
        break
    }
  }, [animation])

  return (
    <picture className={`h-1/4 ${currentAnimation}`}>
      <img alt="Esports" className="h-full w-full" src={logoImg} />
    </picture>
  )
}
