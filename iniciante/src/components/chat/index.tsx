import { ChevronLeft } from 'lucide-react'
import type { Screen } from '@/app'
import { Button } from '@/components/ui/button'
import { Answer } from './answer'
import { Form } from './form'
import { Question } from './question'

type ChatProps = {
  handleTextareaSubmit: (question: string) => void
  setScreen: (screen: Screen) => void
  answers: string[]
  questions: string[]
}

export function Chat({
  handleTextareaSubmit,
  setScreen,
  questions,
  answers,
}: ChatProps) {
  return (
    <section className="flex h-screen w-1/2 flex-col py-6">
      <Button
        className="absolute top-6 left-6 size-12 animate-scale cursor-pointer rounded-full"
        onClick={() => setScreen('home')}
        title="Voltar"
        variant="outline"
      >
        <ChevronLeft className="size-10" />
      </Button>

      <div className="mask-b-from-80% mask-b-to-100% mb-2 h-full space-y-1 overflow-x-hidden overflow-y-scroll pr-2 pb-8 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#9572FC]/80 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#2A2634] [&::-webkit-scrollbar]:w-2">
        <Question question={questions[0]} />

        {answers && <Answer answer={answers[0]} />}
      </div>

      <Form handleTextareaSubmit={handleTextareaSubmit} />
    </section>
  )
}
