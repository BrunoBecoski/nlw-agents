import { ChevronLeft } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import type { Animation, AnswerType, QuestionType } from '@/app'
import { Button } from '@/components/ui/button'
import { Answer } from './answer'
import { Form } from './form'
import { Question } from './question'

type ChatProps = {
  animation: Animation
  handleTextareaSubmit: (question: string) => void
  handleBackHome: () => void
  questions: QuestionType[]
  answers: AnswerType[]
}

export function Chat({
  animation,
  handleTextareaSubmit,
  handleBackHome,
  questions,
  answers,
}: ChatProps) {
  const [currentAnimation, setCurrentAnimation] = useState('')

  const divRef = useRef<HTMLDivElement>(null)
  const insertRef = useRef(new Set())

  function renderQuestion() {
    const div = divRef.current
    const question = questions.at(-1)

    if (!(div && question) || insertRef.current.has(question.id)) {
      return null
    }

    insertRef.current.add(question.id)

    const wrapper = document.createElement('div')
    const root = createRoot(wrapper)

    root.render(<Question animation={animation} question={question} />)
    div.appendChild(wrapper)
  }

  function renderAnswer() {
    const div = divRef.current
    const answer = answers.at(-1)

    if (!(div && answer) || insertRef.current.has(answer.id)) {
      return null
    }

    insertRef.current.add(answer.id)

    const wrapper = document.createElement('div')
    const root = createRoot(wrapper)

    root.render(<Answer animation={animation} answer={answer} />)
    div.appendChild(wrapper)
  }

  useEffect(() => {
    switch (animation) {
      case 'chat-enter':
        setCurrentAnimation('animate-fade-in')
        break

      case 'chat-exit':
        setCurrentAnimation('animate-fade-out')
        break

      default:
        break
    }
  }, [animation])

  useEffect(() => {
    renderQuestion()
  }, [questions])

  useEffect(() => {
    renderAnswer()
  }, [answers])

  return (
    <section className="flex h-screen w-screen flex-col p-12 pt-0">
      <Button
        className={`absolute top-6 left-0 size-12 animate-scale cursor-pointer hover:text-[#9572FC] ${currentAnimation}`}
        onClick={handleBackHome}
        title="Voltar"
        variant="link"
      >
        <ChevronLeft className="size-12" />
      </Button>
      <div
        className="mask-b-from-95% mask-b-to-100% mask-t-from-95% mask-t-to-100% my-2 h-full space-y-1 overflow-x-hidden overflow-y-scroll p-4 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#9572FC]/80 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#2A2634] [&::-webkit-scrollbar]:w-2"
        ref={divRef}
      />

      <Form animation={animation} handleTextareaSubmit={handleTextareaSubmit} />
    </section>
  )
}
