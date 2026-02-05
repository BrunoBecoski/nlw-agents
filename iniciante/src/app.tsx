import { useState } from 'react'
import { Background } from './components/background'
import { Chat } from './components/chat'
import { Home } from './components/home'
import { useQuestionsAndAnswers } from './context/questionsAndAnswers'
import { useScreenAndAnimation } from './context/screenAndAnimation'
import { fakeGenerateAnswer } from './services/fakeGemini'
import { generateAnswer } from './services/gemini'

export interface FormDataProps {
  apiKey: string
  game: string
  question: string
}

export function App() {
  const { screen, changeScreen, changeAnimation } = useScreenAndAnimation()
  const { resetQuestionsAndAnswers, createAndAddQuestion, createAndAddAnswer } =
    useQuestionsAndAnswers()

  const [contextConversation, setContextConversation] = useState('')

  async function handleFormSubmit(formData: FormDataProps) {
    const { apiKey, game, question } = formData
    changeAnimation('home-exit')

    setTimeout(() => {
      changeScreen('chat')
      changeAnimation('chat-enter')
      createAndAddQuestion(question)
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
        resetQuestionsAndAnswers()
        document.title = 'Esports'
      }, 500)

      return
    }

    if (answer && context) {
      createAndAddAnswer(answer)
      setContextConversation(context)
    }
  }

  function handleTextareaSubmit(question: string) {
    createAndAddQuestion(question)
  }

  function handleBackHome() {
    changeAnimation('chat-exit')

    setTimeout(() => {
      changeScreen('home')
      changeAnimation('home-enter')
      resetQuestionsAndAnswers()
      document.title = 'Esports'
    }, 500)
  }

  return (
    <Background>
      <main className="flex h-screen w-screen flex-col items-center justify-evenly overflow-hidden">
        {screen === 'home' && <Home handleFormSubmit={handleFormSubmit} />}

        {screen === 'chat' && (
          <Chat
            handleBackHome={handleBackHome}
            handleTextareaSubmit={handleTextareaSubmit}
          />
        )}
      </main>
    </Background>
  )
}
