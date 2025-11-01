import { useState } from 'react'

import logoImg from './assets/logo.svg'
import { Background } from './components/background'
import { Chat } from './components/chat'
import { Form } from './components/form'

export function App() {
  const [game, setGame] = useState<string | null>(null)
  const [questions, setQuestions] = useState<string[] | null>(null)
  const [answers, setAnswers] = useState<string[] | null>(null)

  function handleReset() {
    setGame(null)
    setQuestions(null)
    setAnswers(null)
  }

  return (
    <Background>
      <main className="flex h-screen w-screen flex-col items-center justify-evenly overflow-hidden">
        {questions ? (
          <Chat
            answers={answers}
            handleReset={handleReset}
            questions={questions}
          />
        ) : (
          <>
            <img alt="Esports" className="h-1/4 animate-scale" src={logoImg} />

            <Form
              setAnswers={setAnswers}
              setGame={setGame}
              setQuestions={setQuestions}
            />
          </>
        )}
      </main>
    </Background>
  )
}
