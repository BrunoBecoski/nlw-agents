import { ChevronLeft } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import type { Animation } from '@/app'
import { Button } from '@/components/ui/button'
import { Answer } from './answer'
import { Form } from './form'
import { Question } from './question'

type ChatProps = {
  animation: Animation
  handleTextareaSubmit: (question: string) => void
  handleBackHome: () => void
  questions: string[]
  answers: string[]
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

  function renderQuestion() {
    const div = divRef.current

    if (!div) {
      return null
    }

    const wrapper = document.createElement('div')
    const root = createRoot(wrapper)

    root.render(
      <Question
        animation={animation}
        question={questions[questions.length - 1]}
      />
    )

    div.appendChild(wrapper)

    return () => {
      if (div.contains(wrapper)) {
        div.removeChild(wrapper)

        setTimeout(() => root.unmount(), 0)
      }
    }
  }

  function renderAnswer() {
    const div = divRef.current

    if (!div) {
      return null
    }

    const wrapper = document.createElement('div')
    const root = createRoot(wrapper)

    root.render(
      <Answer animation={animation} answer={answers[answers.length - 1]} />
    )

    div.appendChild(wrapper)

    return () => {
      if (div.contains(wrapper)) {
        div.removeChild(wrapper)

        setTimeout(() => root.unmount(), 0)
      }
    }
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
    const cleanup = renderQuestion()

    return cleanup
  }, [questions])

  useEffect(() => {
    const cleanup = renderAnswer()

    return cleanup
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
