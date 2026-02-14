import { useScreenAndAnimation } from '@/context/screenAndAnimation'
import logoImg from '../../assets/logo.svg'

export function Logo() {
  const { animation } = useScreenAndAnimation()

  return (
    <picture className={`h-1/4 ${animation.fade}`}>
      <img alt="Esports" className="h-full w-full" src={logoImg} />
    </picture>
  )
}
