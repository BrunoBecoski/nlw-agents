import { Bot } from 'lucide-react'
import Markdown from 'react-markdown'

import { Card, CardContent } from '@/components/ui/card'

interface AnswerProps {
  answer: string
}

export function Answer({ answer }: AnswerProps) {
  return (
    <div>
      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
        <Bot className="size-8 text-[#9572FC]" />
      </div>

      <Card className="ml-12 rounded-4xl rounded-ss-none bg-[#2A2634]">
        <CardContent className="flex-1">
          <div className="whitespace-pre-line text-md leading-relaxed">
            <Markdown>{answer}</Markdown>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
