import type { FormDataProps } from '@/app'
import { Form } from './form'
import { Logo } from './logo'

interface HomeProps {
  handleFormSubmit: (formData: FormDataProps) => void
}

export function Home({ handleFormSubmit }: HomeProps) {
  return (
    <div className="flex h-screen w-1/2 flex-col items-center justify-evenly gap-6 py-6">
      <Logo />

      <Form handleFormSubmit={handleFormSubmit} />
    </div>
  )
}
