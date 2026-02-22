import { ChevronLeft } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useQuestionsAndAnswers } from '@/context/questionsAndAnswers'
import { useScreenAndAnimation } from '@/context/screenAndAnimation'
import { Answer } from './answer'
import { Form } from './form'
import { LoadingAnswer } from './loadingAnswer'
import { Question } from './question'

type ChatProps = {
  isLoadingAnswer: boolean
  handleBackHome: () => void
  handleTextareaSubmit: (question: string) => void
}

export function Chat({
  isLoadingAnswer,
  handleBackHome,
  handleTextareaSubmit,
}: ChatProps) {
  const { questionsAndAnswers } = useQuestionsAndAnswers()

  const { animation } = useScreenAndAnimation()

  const divRef = useRef<HTMLDivElement>(null)

  function handleTextareaSubmitMiddleware(question: string) {
    handleTextareaSubmit(question)
  }

  function scroll() {
    const div__element = divRef.current
    const lastItem = questionsAndAnswers.at(-1)

    if (div__element && lastItem) {
      let top = 0

      if (lastItem.type === 'question' || lastItem.text === null) {
        top = div__element.scrollHeight
      }

      if (lastItem.type === 'answer' && questionsAndAnswers.length > 2) {
        top = div__element.scrollTop + div__element.clientHeight - 260
      }

      div__element.scroll({
        behavior: 'smooth',
        top,
      })
    }
  }

  useEffect(() => {
    scroll()
  }, [questionsAndAnswers])

  return (
    <section className="flex h-screen w-screen flex-col p-12 pt-0">
      <Button
        className={`absolute top-6 left-0 size-12 animate-scale cursor-pointer hover:text-[#9572FC] ${animation.fade}`}
        onClick={handleBackHome}
        title="Voltar"
        variant="link"
      >
        <ChevronLeft className="size-12" />
      </Button>

      <div
        className="mask-b-from-95% mask-b-to-100% mask-t-from-95% mask-t-to-100% my-2 h-full space-y-1 overflow-x-hidden overflow-y-scroll p-4 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#9572FC]/80 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#2A2634] [&::-webkit-scrollbar]:w-2"
        id="chat"
        ref={divRef}
      >
        {questionsAndAnswers.map((item) => {
          if (item.type === 'question') {
            return <Question key={item.id} question={item.text} />
          }

          if (item.type === 'answer') {
            if (item.text) {
              return <Answer answer={item.text} key={item.id} />
            }
            return <LoadingAnswer key={item.id} />
          }

          return null
        })}
      </div>

      <Form
        handleTextareaSubmit={handleTextareaSubmitMiddleware}
        isLoadingAnswer={isLoadingAnswer}
      />
    </section>
  )
}
