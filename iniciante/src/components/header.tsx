import logoImg from '../assets/logo.svg'

export function Header() {
  return (
    <header className="flex justify-center py-8">
      <img alt="Esports" className="w-64" src={logoImg} />
    </header>
  )
}
