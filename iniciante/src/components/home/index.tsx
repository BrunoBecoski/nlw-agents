import type { Animation, FormDataProps } from '@/app'
import { Form } from './form'
import { Logo } from './logo'

interface HomeProps {
  animation: Animation
  handleFormSubmit: (formData: FormDataProps) => void
}

export function Home({ animation, handleFormSubmit }: HomeProps) {
  return (
    <div
      className="flex h-screen w-1/2 flex-col items-center justify-evenly gap-6 py-6"
      id="home"
    >
      <Logo animation={animation} />

      <Form animation={animation} handleFormSubmit={handleFormSubmit} />
    </div>
  )
}
