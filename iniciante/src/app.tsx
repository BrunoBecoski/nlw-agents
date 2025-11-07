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
      const { game, question } = formData
      setQuestions([question])
      setAnswers([
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nisl neque, porttitor quis viverra vel, accumsan a ex. Aliquam quis turpis ante. Nam gravida nulla viverra nunc vestibulum molestie. Suspendisse risus justo, bibendum convallis euismod quis, accumsan ac nisi. Aliquam non dui sit amet est gravida auctor lacinia sed orci. Duis lorem ante, faucibus at tincidunt sed, bibendum sed turpis. Integer feugiat lorem sed nunc pretium, a viverra elit tincidunt. Nulla nunc metus, mattis vitae mauris eu, pulvinar dignissim est. Duis at venenatis nisl, non elementum justo. Ut finibus vitae lectus et tristique. Nulla a luctus ex. Praesent eu varius.',
      ])
      setScreen('chat')
      document.title = `Esports | ${game}`
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
      setAnswers([''])
      setQuestions([''])
      document.title = 'Esports'
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
