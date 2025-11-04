import { useState } from 'react'
import { Background } from './components/background'
import { Chat } from './components/chat'
import { Home } from './components/home'

type Screen = 'home' | 'chat'

export interface FormDataProps {
  apiKey: string
  game: string
  question: string
}

export function App() {
  const [screen, setScreen] = useState<Screen>('home')

  function handleReset() {
    setFormData(null)
  }

  function handleFormSubmit(formData: FormDataProps) {
    console.log(formData)
  }

  function handleChangeScreen(screen: Screen) {
    setScreen(screen)
  }

  return (
    <Background>
      <main className="flex h-screen w-screen flex-col items-center justify-evenly overflow-hidden">
        {screen === 'home' && <Home handleFormSubmit={handleFormSubmit} />}

        {screen === 'chat' && (
          <Chat
            answers={['reposta']}
            handleReset={handleReset}
            questions={['pergunta']}
          />
        )}
      </main>
    </Background>
  )
}
