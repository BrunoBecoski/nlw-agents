import { ChevronLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Animation, ChatItemType } from '@/app'
import { Button } from '@/components/ui/button'
import { Answer } from './answer'
import { Form } from './form'
import { Question } from './question'

type ChatProps = {
  animation: Animation
  handleTextareaSubmit: (question: string) => void
  handleBackHome: () => void
  questions: ChatItemType[]
  answers: ChatItemType[]
}

export function Chat({
  animation,
  handleTextareaSubmit,
  handleBackHome,
  questions,
  answers,
}: ChatProps) {
  const [currentAnimation, setCurrentAnimation] = useState('')
  const [list, setList] = useState<ChatItemType[]>([...questions])

  function handleTextareaSubmitMiddleware(question: string) {
    handleTextareaSubmit(question)

    setTimeout(() => {
      setList((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: 'answer',
          value: undefined,
        },
      ])
    }, 500)
  }

  useEffect(() => {
    const lastedQuestion = questions.at(-1)

    const existeId = list.find((item) => item.id === lastedQuestion?.id)

    if (lastedQuestion && !existeId) {
      setList((prev) => [...prev, lastedQuestion])
    }
  }, [questions, list.find])

  useEffect(() => {
    const lastedAnswers = answers.at(-1)

    const existeId = list.find((item) => item.id === lastedAnswers?.id)

    if (lastedAnswers && !existeId) {
      setList((prev) => [...prev, lastedAnswers])
    }
  }, [answers, list.find])

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
      <div className="mask-b-from-95% mask-b-to-100% mask-t-from-95% mask-t-to-100% my-2 h-full space-y-1 overflow-x-hidden overflow-y-scroll p-4 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#9572FC]/80 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#2A2634] [&::-webkit-scrollbar]:w-2">
        {list.map((item) => {
          if (item.type === 'question') {
            return (
              <Question
                animation={animation}
                key={item.id}
                question={item.value}
              />
            )
          }

          if (item.type === 'answer') {
            return (
              <Answer animation={animation} answer={item.value} key={item.id} />
            )
          }

          return null
        })}
      </div>

      <Form
        animation={animation}
        handleTextareaSubmit={handleTextareaSubmitMiddleware}
      />
    </section>
  )
}
