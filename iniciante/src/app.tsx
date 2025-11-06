import { useState } from 'react'
import { Background } from './components/background'
import { Chat } from './components/chat'
import { Home } from './components/home'

export type Screen = 'home' | 'chat'

export type Animation = 'home-enter' | 'home-exit' | 'chat-enter' | 'chat-exit'

export interface FormDataProps {
  apiKey: string
  game: string
  question: string
}

export function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [questions, setQuestions] = useState([''])
  const [answers, setAnswers] = useState([''])
  const [animation, setAnimation] = useState<Animation>('home-enter')

  function handleFormSubmit(formData: FormDataProps) {
    setAnimation('home-exit')

    setTimeout(() => {
      setAnimation('chat-enter')
      const { question } = formData
      setQuestions([question])
      setScreen('chat')
    }, 500)
  }

  function handleTextareaSubmit(question: string) {
    console.log(question)
  }

  function handleBackHome() {
    setAnimation('chat-exit')

    setTimeout(() => {
      setAnimation('home-enter')
      setScreen('home')
    }, 500)
  }

  return (
    <Background>
      <main className="flex h-screen w-screen flex-col items-center justify-evenly overflow-hidden">
        {screen === 'home' && (
          <Home animation={animation} handleFormSubmit={handleFormSubmit} />
        )}

        {screen === 'chat' && (
          <Chat
            animation={animation}
            answers={answers}
            handleBackHome={handleBackHome}
            handleTextareaSubmit={handleTextareaSubmit}
            questions={questions}
          />
        )}
      </main>
    </Background>
  )
}
