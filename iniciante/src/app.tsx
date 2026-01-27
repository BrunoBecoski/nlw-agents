import { useState } from 'react'
import { Background } from './components/background'
import { Chat } from './components/chat'
import { Home } from './components/home'
import { fakeGenerateAnswer } from './services/fakeGemini'
import { generateAnswer } from './services/gemini'

export type Screen = 'home' | 'chat'

export type Animation = 'home-enter' | 'home-exit' | 'chat-enter' | 'chat-exit'

export interface FormDataProps {
  apiKey: string
  game: string
  question: string
}

export type ChatItemType = {
  id: string
  type: 'question' | 'answer'
  value?: string
}

export function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [animation, setAnimation] = useState<Animation>('home-enter')
  const [contextConversation, setContextConversation] = useState('')
  const [questions, setQuestions] = useState<ChatItemType[]>([])
  const [answers, setAnswers] = useState<ChatItemType[]>([])

  function updateQuestions(value?: string) {
    const currentQuestions = questions

    const newQuestion: ChatItemType = {
      id: crypto.randomUUID(),
      type: 'question',
      value,
    }

    setQuestions([...currentQuestions, newQuestion])
  }

  function updateAnswers(value?: string) {
    const currentAnswers = answers

    const newAnswer: ChatItemType = {
      id: crypto.randomUUID(),
      type: 'answer',
      value,
    }

    setAnswers([...currentAnswers, newAnswer])
  }

  async function handleFormSubmit(formData: FormDataProps) {
    const { apiKey, game, question } = formData
    setAnimation('home-exit')

    setTimeout(() => {
      setAnimation('chat-enter')
      updateQuestions(question)
      setScreen('chat')
      document.title = `Esports | ${game}`
    }, 500)

    // const { answer, context, successfully } = await generateAnswer({
    //   apiKey,
    //   game,
    //   question,
    //   contextConversation,
    // })

    const { answer, context, successfully } = await fakeGenerateAnswer({
      successfully: true,
    })

    if (successfully === false) {
      setAnimation('chat-exit')

      setTimeout(() => {
        setAnimation('home-enter')
        setScreen('home')
        setQuestions([])
        setAnswers([])
        document.title = 'Esports'
      }, 500)

      return
    }

    if (answer && context) {
      updateAnswers(answer)
      setContextConversation(context)
    }
  }

  function handleTextareaSubmit(question: string) {
    updateQuestions(question)
  }

  function handleBackHome() {
    setAnimation('chat-exit')

    setTimeout(() => {
      setAnimation('home-enter')
      setScreen('home')
      setQuestions([])
      setAnswers([])
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
