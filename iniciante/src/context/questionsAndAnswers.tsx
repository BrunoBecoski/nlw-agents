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
  addLoadingAnswer: () => void
  removeLoadingAnswer: () => void
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
  addLoadingAnswer: () => {
    undefined
  },
  removeLoadingAnswer: () => {
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
    const newQuestion: QuestionType = {
      id: crypto.randomUUID(),
      date: new Date(),
      type: 'question',
      text,
    }

    const newQuestions = [...questions, newQuestion]

    setQuestions(newQuestions)
    scrollChat()
  }

  function createAnswer(text: string | null) {
    const newAnswer: AnswerType = {
      id: crypto.randomUUID(),
      date: new Date(),
      type: 'answer',
      text,
    }

    const newAnswers = [...answers, newAnswer]

    setAnswers(newAnswers)
    scrollChat()
  }

  function addLoadingAnswer() {
    const loadingAnswer: AnswerType = {
      id: crypto.randomUUID(),
      date: new Date(),
      type: 'answer',
      text: null,
    }

    const newAnswers = [...answers, loadingAnswer]

    setAnswers(newAnswers)
    scrollChat()
  }

  function removeLoadingAnswer() {
    const newAnswers = answers.filter((answer) => answer.text != null)

    setAnswers(newAnswers)
  }

  const value: QuestionsAndAnswersState = {
    questions,
    answers,
    questionsAndAnswers,
    resetQuestionsAndAnswers,
    createQuestion,
    createAnswer,
    addLoadingAnswer,
    removeLoadingAnswer,
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

  function scrollChat() {
    const last__element = document.querySelector('#chat > div:last-child')

    if (last__element) {
      last__element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
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
