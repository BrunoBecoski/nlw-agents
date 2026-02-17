import { useState } from 'react'
import { Background } from './components/background'
import { Chat } from './components/chat'
import { Home } from './components/home'
import { useQuestionsAndAnswers } from './context/questionsAndAnswers'
import { useScreenAndAnimation } from './context/screenAndAnimation'
import { fakeGenerateAnswer } from './services/fakeGemini'
import { generateAnswer } from './services/gemini'

export interface FormDataProps {
  apiKeyForm: string
  gameForm: string
  questionForm: string
}

export function App() {
  const { screen, changeScreen, changeAnimationVariant } =
    useScreenAndAnimation()
  const {
    resetQuestionsAndAnswers,
    createQuestion,
    createAnswer,
    addLoadingAnswer,
    removeLoadingAnswer,
  } = useQuestionsAndAnswers()

  const [contextConversation, setContextConversation] = useState('')
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [game, setGame] = useState('')

  async function handleFormSubmit(formData: FormDataProps) {
    const { apiKeyForm, gameForm, questionForm } = formData
    changeAnimationVariant('exit')

    setApiKey(apiKeyForm)
    setGame(gameForm)

    setTimeout(() => {
      setIsLoadingAnswer(true)
      changeScreen('chat')
      changeAnimationVariant('enter')
      createQuestion(questionForm)
      document.title = `Esports | ${gameForm}`

      setTimeout(() => {
        addLoadingAnswer()
      }, 500)
    }, 500)

    const { answer, context, successfully } = await generateAnswer({
      apiKey: apiKeyForm,
      game: gameForm,
      question: questionForm,
      contextConversation,
    })

    // const { answer, context, successfully } = await fakeGenerateAnswer({
    //   successfully: true,
    // })

    if (successfully === false) {
      changeAnimationVariant('exit')

      setTimeout(() => {
        changeScreen('home')
        changeAnimationVariant('enter')
        resetQuestionsAndAnswers()
        document.title = 'Esports'
      }, 500)

      return
    }

    if (answer && context) {
      removeLoadingAnswer()
      createAnswer(answer)
      setContextConversation(context)
      setIsLoadingAnswer(false)
    }
  }

  async function handleTextareaSubmit(question: string) {
    createQuestion(question)
    setIsLoadingAnswer(true)

    setTimeout(() => {
      addLoadingAnswer()
    }, 500)

    const { answer, context, successfully } = await generateAnswer({
      apiKey,
      game,
      question,
      contextConversation,
    })

    // const { answer, context, successfully } = await fakeGenerateAnswer({
    //   successfully: true,
    // })

    if (successfully === false) {
      changeAnimationVariant('exit')

      setTimeout(() => {
        changeScreen('home')
        changeAnimationVariant('enter')
        resetQuestionsAndAnswers()
        document.title = 'Esports'
      }, 500)

      return
    }

    if (answer && context) {
      removeLoadingAnswer()
      createAnswer(answer)
      setContextConversation(context)
      setIsLoadingAnswer(false)
    }
  }

  function handleBackHome() {
    changeAnimationVariant('exit')
    setIsLoadingAnswer(false)

    setTimeout(() => {
      changeScreen('home')
      changeAnimationVariant('enter')
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
            isLoadingAnswer={isLoadingAnswer}
          />
        )}
      </main>
    </Background>
  )
}
