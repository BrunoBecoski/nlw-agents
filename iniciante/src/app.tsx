import { useState } from 'react'
import { Background } from './components/background'
import { Chat } from './components/chat'
import { Home } from './components/home'

export type Screen = 'home' | 'chat'

export interface FormDataProps {
  apiKey: string
  game: string
  question: string
}

export function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [questions, setQuestions] = useState([''])
  const [answers, setAnswers] = useState([''])

  function handleFormSubmit(formData: FormDataProps) {
    const { question } = formData
    console.log(formData)
    setScreen('chat')
    setQuestions([question])
  }

  function handleTextareaSubmit(question: string) {
    console.log(question)
  }

  return (
    <Background>
      <main className="flex h-screen w-screen flex-col items-center justify-evenly overflow-hidden">
        {screen === 'home' && <Home handleFormSubmit={handleFormSubmit} />}

        {screen === 'chat' && (
          <Chat
            answers={answers}
            handleTextareaSubmit={handleTextareaSubmit}
            questions={questions}
            setScreen={setScreen}
          />
        )}
      </main>
    </Background>
  )
}
