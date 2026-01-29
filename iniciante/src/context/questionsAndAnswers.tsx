import { createContext, type ReactNode, useContext, useState } from 'react'

export type QuestionType = {
  id: string
  type: 'question'
  text: string
}

export type AnswerType = {
  id: string
  type: 'answer'
  text: string | undefined
}

interface QuestionsAndAnswersProps {
  children: ReactNode
}

type QuestionsAndAnswersState = {
  questions: QuestionType[]
  answers: AnswerType[]
  resetQuestionsAndAnswers: () => void
  addQuestion: (text: string) => void
  addAnswer: (text: string) => void
}

const initialState: QuestionsAndAnswersState = {
  questions: [],
  answers: [],
  resetQuestionsAndAnswers: () => {
    undefined
  },
  addQuestion: () => {
    undefined
  },
  addAnswer: () => {
    undefined
  },
}

const QuestionsAndAnswersProviderContext = createContext(initialState)

export function QuestionsAndAnswersProvider({
  children,
  ...props
}: QuestionsAndAnswersProps) {
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [answers, setAnswers] = useState<AnswerType[]>([])

  function resetQuestionsAndAnswers() {
    setQuestions([])
    setAnswers([])
  }

  function addQuestion(text: string) {
    const newQuestion: QuestionType = {
      id: crypto.randomUUID(),
      type: 'question',
      text,
    }

    setQuestions((prev) => [...prev, newQuestion])
  }

  function addAnswer(text: string) {
    const newAnswer: AnswerType = {
      id: crypto.randomUUID(),
      type: 'answer',
      text,
    }

    setAnswers((prev) => [...prev, newAnswer])
  }

  const value: QuestionsAndAnswersState = {
    questions,
    answers,
    resetQuestionsAndAnswers,
    addQuestion,
    addAnswer,
  }

  return (
    <QuestionsAndAnswersProviderContext.Provider value={value} {...props}>
      {children}
    </QuestionsAndAnswersProviderContext.Provider>
  )
}

export const useQuestionsAndAnswers = () => {
  const context = useContext(QuestionsAndAnswersProviderContext)

  return context
}
