import { useState } from 'react'
import { Background } from './components/background'
import { Chat } from './components/chat'
import { Home } from './components/home'
import { generateAnswer } from './services/gemini'

export type Screen = 'home' | 'chat'

export type Animation = 'home-enter' | 'home-exit' | 'chat-enter' | 'chat-exit'

export interface FormDataProps {
  apiKey: string
  game: string
  question: string
}

export function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [animation, setAnimation] = useState<Animation>('home-enter')
  const [contextConversation, setContextConversation] = useState('')

  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([''])

  async function handleFormSubmit(formData: FormDataProps) {
    const { apiKey, game, question } = formData
    setAnimation('home-exit')

    setTimeout(() => {
      setAnimation('chat-enter')
      setQuestionsAndAnswers([question])
      setScreen('chat')
      document.title = `Esports | ${game}`
    }, 500)

    const { answer, context, successfully } = await generateAnswer({
      apiKey,
      game,
      question,
      contextConversation,
    })

    if (successfully === false) {
      setAnimation('chat-exit')

      setTimeout(() => {
        setAnimation('home-enter')
        setScreen('home')
        setQuestionsAndAnswers([''])
        document.title = 'Esports'
      }, 500)

      return
    }

    if (answer && context) {
      setQuestionsAndAnswers([...questionsAndAnswers, answer])
      setContextConversation(context)
    }
  }

  function handleTextareaSubmit(question: string) {
    setQuestionsAndAnswers([...questionsAndAnswers, question])
  }

  function handleBackHome() {
    setAnimation('chat-exit')

    setTimeout(() => {
      setAnimation('home-enter')
      setScreen('home')
      setQuestionsAndAnswers([''])
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
            handleBackHome={handleBackHome}
            handleTextareaSubmit={handleTextareaSubmit}
            questionsAndAnswers={questionsAndAnswers}
          />
        )}
      </main>
    </Background>
  )
}
