import logoImg from '../../assets/logo.svg'

export function Logo() {
  return (
    <picture className="h-1/4 animate-scale">
      <img alt="Esports" className="h-full w-full" src={logoImg} />
    </picture>
  )
}
