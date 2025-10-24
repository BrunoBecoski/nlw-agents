import { Bot } from 'lucide-react'
import Markdown from 'react-markdown'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface AnswerProps {
  answer: string
}

export function Answer({ answer }: AnswerProps) {
  return (
    <Card className="bg-[#2A2634]">
      <CardHeader className="flex items-center gap-4">
        <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
          <Bot className="size-4 text-primary" />
        </div>

        <p className="mb-1 font-medium text-foreground">Resposta da IA</p>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="whitespace-pre-line text-muted-foreground text-sm leading-relaxed">
          <Markdown>{answer}</Markdown>
        </div>
      </CardContent>
    </Card>
  )
}
