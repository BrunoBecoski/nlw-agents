import { ChevronLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Animation } from '@/app'
import { Button } from '@/components/ui/button'
import { Answer } from './answer'
import { Form } from './form'
import { Question } from './question'

type ChatProps = {
  animation: Animation
  handleTextareaSubmit: (question: string) => void
  handleBackHome: () => void
  answers: string[]
  questions: string[]
}

export function Chat({
  animation,
  handleTextareaSubmit,
  handleBackHome,
  questions,
  answers,
}: ChatProps) {
  const [currentAnimation, setCurrentAnimation] = useState('')

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
    <section className="flex h-screen w-1/2 flex-col py-6">
      <Button
        className={`absolute top-6 left-6 size-12 animate-scale cursor-pointer rounded-full ${currentAnimation}`}
        onClick={handleBackHome}
        title="Voltar"
        variant="outline"
      >
        <ChevronLeft className="size-10" />
      </Button>

      <div className="mask-b-from-95% mask-b-to-100% mb-2 h-full space-y-1 overflow-x-hidden overflow-y-scroll pr-2 pb-8 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#9572FC]/80 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#2A2634] [&::-webkit-scrollbar]:w-2">
        {questions.map((question) => (
          <Question
            animation={animation}
            key={Math.random() * Date.now()}
            question={question}
          />
        ))}

        {answers.map((answer) => (
          <Answer
            animation={animation}
            answer={answer}
            key={Math.random() * Date.now()}
          />
        ))}
      </div>

      <Form animation={animation} handleTextareaSubmit={handleTextareaSubmit} />
    </section>
  )
}
