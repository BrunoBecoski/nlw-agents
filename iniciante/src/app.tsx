import { useState } from 'react'
import { Background } from './components/background'
import { Chat } from './components/chat'
import { Home } from './components/home'
import { useScreenAndAnimation } from './context/screenAndAnimation'
import { fakeGenerateAnswer } from './services/fakeGemini'
import { generateAnswer } from './services/gemini'

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
  const [contextConversation, setContextConversation] = useState('')
  const [questions, setQuestions] = useState<ChatItemType[]>([])
  const [answers, setAnswers] = useState<ChatItemType[]>([])

  const { screen, changeScreen, changeAnimation } = useScreenAndAnimation()

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
    changeAnimation('home-exit')

    setTimeout(() => {
      changeScreen('chat')
      changeAnimation('chat-enter')
      updateQuestions(question)
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
      changeAnimation('chat-exit')

      setTimeout(() => {
        changeScreen('home')
        changeAnimation('home-enter')
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
    changeAnimation('chat-exit')

    setTimeout(() => {
      changeScreen('home')
      changeAnimation('home-enter')
      setQuestions([])
      setAnswers([])
      document.title = 'Esports'
    }, 500)
  }

  return (
    <Background>
      <main className="flex h-screen w-screen flex-col items-center justify-evenly overflow-hidden">
        {screen === 'home' && <Home handleFormSubmit={handleFormSubmit} />}

        {screen === 'chat' && (
          <Chat
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
