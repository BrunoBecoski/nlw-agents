import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

export type QuestionType = {
  id: string
  date: Date
  type: 'question'
  text: string
}

export type AnswerType = {
  id: string
  date: Date
  type: 'answer'
  text: string | null
}

export type QuestionsAndAnswersType = Array<QuestionType | AnswerType>

interface QuestionsAndAnswersProps {
  children: ReactNode
}

type QuestionsAndAnswersState = {
  questions: QuestionType[]
  answers: AnswerType[]
  questionsAndAnswers: QuestionsAndAnswersType
  resetQuestionsAndAnswers: () => void
  createQuestion: (text: string) => void
  createAnswer: (text: string | null) => void
}

const initialState: QuestionsAndAnswersState = {
  questions: [],
  answers: [],
  questionsAndAnswers: [],
  resetQuestionsAndAnswers: () => {
    undefined
  },
  createQuestion: () => {
    undefined
  },
  createAnswer: () => {
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
  const [questionsAndAnswers, setQuestionsAndAnswers] =
    useState<QuestionsAndAnswersType>([])

  function resetQuestionsAndAnswers() {
    setQuestions([])
    setAnswers([])
    setQuestionsAndAnswers([])
  }

  function createQuestion(text: string) {
    const question: QuestionType = {
      id: crypto.randomUUID(),
      date: new Date(),
      type: 'question',
      text,
    }

    setQuestions((prev) => [...prev, question])
  }

  function createAnswer(text: string | null) {
    const answer: AnswerType = {
      id: crypto.randomUUID(),
      date: new Date(),
      type: 'answer',
      text,
    }

    setAnswers((prev) => [...prev, answer])
  }

  const value: QuestionsAndAnswersState = {
    questions,
    answers,
    questionsAndAnswers,
    resetQuestionsAndAnswers,
    createQuestion,
    createAnswer,
  }

  useEffect(() => {
    const orderedQuestionsAndAnswers = [...questions, ...answers].sort(
      (item_1, item_2) => {
        if (item_1.date < item_2.date) {
          return -1
        }
        if (item_1.date > item_2.date) {
          return 1
        }
        return 0
      }
    )

    setQuestionsAndAnswers(orderedQuestionsAndAnswers)
  }, [questions, answers])

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
