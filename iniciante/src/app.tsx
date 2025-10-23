import { useState } from 'react'

import { Background } from './components/background'
import { Chat } from './components/chat'
import { Form } from './components/form'
import { Header } from './components/header'

export function App() {
  const [game, setGame] = useState<string | null>(null)
  const [questions, setQuestions] = useState<string[] | null>(null)
  const [answers, setAnswers] = useState<string[] | null>(null)

  return (
    <Background>
      {!questions && <Header />}

      <main className="m-auto max-w-xl ">
        {questions ? (
          <Chat answers={answers} game={game} questions={questions} />
        ) : (
          <Form
            setAnswers={setAnswers}
            setGame={setGame}
            setQuestions={setQuestions}
          />
        )}
      </main>
    </Background>
  )
}
