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
  createAndAddQuestion: (text: string) => void
  createAndAddAnswer: (text: string) => void
}

const initialState: QuestionsAndAnswersState = {
  questions: [],
  answers: [],
  questionsAndAnswers: [],
  resetQuestionsAndAnswers: () => {
    undefined
  },
  createAndAddQuestion: () => {
    undefined
  },
  createAndAddAnswer: () => {
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

  function addQuestion(question: QuestionType) {
    setQuestions((prev) => [...prev, question])
  }

  function addAnswer(answer: AnswerType) {
    setAnswers((prev) => [...prev, answer])
  }

  function createAndAddQuestion(text: string) {
    const newQuestion = createQuestion(text)

    addQuestion(newQuestion)

    setTimeout(() => {
      const emptyAnswer = createAnswer(null)
      addAnswer(emptyAnswer)
    }, 500)
  }

  function createAndAddAnswer(text: string | null) {
    const newAnswer = createAnswer(text)

    addAnswer(newAnswer)
  }

  const value: QuestionsAndAnswersState = {
    questions,
    answers,
    questionsAndAnswers,
    resetQuestionsAndAnswers,
    createAndAddQuestion,
    createAndAddAnswer,
  }

  useEffect(() => {
    const newQuestion = questions.pop()

    if (newQuestion) {
      setQuestionsAndAnswers((prev) => [...prev, newQuestion])
    }
  }, [questions])

  useEffect(() => {
    const newAnswer = answers.pop()

    if (newAnswer) {
      if (newAnswer.text === null) {
        setQuestionsAndAnswers((prev) => [...prev, newAnswer])
      } else {
        setQuestionsAndAnswers((prev) => [...prev.slice(0, -1), newAnswer])
      }
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
