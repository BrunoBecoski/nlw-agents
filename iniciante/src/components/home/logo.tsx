import { useScreenAndAnimation } from '@/context/screenAndAnimation'
import logoImg from '../../assets/logo.svg'

export function Logo() {
  const { logoAnimation } = useScreenAndAnimation()

  return (
    <picture className={`h-1/4 ${logoAnimation}`}>
      <img alt="Esports" className="h-full w-full" src={logoImg} />
    </picture>
  )
}
