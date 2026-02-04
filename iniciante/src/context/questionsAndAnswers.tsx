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
  createQuestion: (text: string) => void
  createAnswer: (text: string) => void
  resetQuestionsAndAnswers: () => void
  addQuestion: (text: string) => void
  addAnswer: (text: string) => void
}

const initialState: QuestionsAndAnswersState = {
  questions: [],
  answers: [],
  questionsAndAnswers: [],
  createQuestion: () => {
    undefined
  },
  createAnswer: () => {
    undefined
  },
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
  const [questionsAndAnswers, setQuestionsAndAnswers] =
    useState<QuestionsAndAnswersType>([])

  function createQuestion(text: string) {
    const question: QuestionType = {
      id: crypto.randomUUID(),
      date: new Date(),
      type: 'question',
      text,
    }

    return question
  }

  function createAnswer(text: string | null) {
    const answer: AnswerType = {
      id: crypto.randomUUID(),
      date: new Date(),
      type: 'answer',
      text,
    }

    return answer
  }

  function resetQuestionsAndAnswers() {
    setQuestions([])
    setAnswers([])
    setQuestionsAndAnswers([])
  }

  function addQuestion(text: string) {
    const newQuestion = createQuestion(text)

    setQuestions((prev) => [...prev, newQuestion])
    setQuestionsAndAnswers((prev) => [...prev, newQuestion])

    setTimeout(() => {
      const emptyAnswer = addAnswer(null)

      setQuestionsAndAnswers((prev) => [...prev, emptyAnswer])
    }, 500)

    return newQuestion
  }

  function addAnswer(text: string | null) {
    const newAnswer = createAnswer(text)

    setAnswers((prev) => [...prev, newAnswer])

    return newAnswer
  }

  const value: QuestionsAndAnswersState = {
    questions,
    answers,
    resetQuestionsAndAnswers,
    createQuestion,
    createAnswer,
    addQuestion,
    addAnswer,
    questionsAndAnswers,
  }

  useEffect(() => {
    const newAnswer = answers.pop()

    if (newAnswer) {
      setQuestionsAndAnswers((prev) => [...prev.slice(0, -1), newAnswer])
    }
  }, [answers])

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
