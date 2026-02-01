import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

export type QuestionType = {
  id: string
  type: 'question'
  text: string
}

export type AnswerType = {
  id: string
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
  addQuestion: (text: string) => void
  addAnswer: (text: string) => void
}

const initialState: QuestionsAndAnswersState = {
  questions: [],
  answers: [],
  questionsAndAnswers: [],
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

  function resetQuestionsAndAnswers() {
    setQuestions([])
    setAnswers([])
    setQuestionsAndAnswers([])
  }

  function addQuestion(text: string) {
    const newQuestion: QuestionType = {
      id: crypto.randomUUID(),
      type: 'question',
      text,
    }

    setQuestions((prev) => [...prev, newQuestion])
    setQuestionsAndAnswers((prev) => [...prev, newQuestion])

    setTimeout(() => {
      const emptyAnswer: AnswerType = {
        id: crypto.randomUUID(),
        type: 'answer',
        text: null,
      }

      setQuestionsAndAnswers((prev) => [...prev, emptyAnswer])
    }, 500)
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
    questionsAndAnswers,
  }

  useEffect(() => {
    const text = answers.pop()?.text
    const id = questionsAndAnswers.at(-1)?.id

    const filtered = questionsAndAnswers.filter((item) => item.id !== id)

    if (id && text) {
      filtered.push({
        id,
        text,
        type: 'answer',
      })

      setQuestionsAndAnswers(filtered)
    }
  }, [answers, questionsAndAnswers.at, questionsAndAnswers.filter])

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
