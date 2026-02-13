import { useScreenAndAnimation } from '@/context/screenAndAnimation'
import logoImg from '../../assets/logo.svg'

export function Logo() {
  const { animationAction } = useScreenAndAnimation()

  return (
    <picture className={`h-1/4 animate-fade-${animationAction}`}>
      <img alt="Esports" className="h-full w-full" src={logoImg} />
    </picture>
  )
}
