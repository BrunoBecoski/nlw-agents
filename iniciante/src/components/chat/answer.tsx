import { Bot } from 'lucide-react'
import Markdown from 'react-markdown'
import { Card, CardContent } from '@/components/ui/card'
import { useScreenAndAnimation } from '@/context/screenAndAnimation'

interface AnswerProps {
  answer: string
}

export function Answer({ answer }: AnswerProps) {
  const { answerAnimation } = useScreenAndAnimation()

  return (
    <div className={`flex flex-col ${answerAnimation}`}>
      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
        <Bot className="size-8 text-[#9572FC]" />
      </div>

      <Card className="mx-12 w-fit rounded-4xl rounded-ss-none bg-[#2A2634]">
        <CardContent className="flex-1">
          <div className="whitespace-pre-line text-md leading-relaxed">
            <Markdown>{answer}</Markdown>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
