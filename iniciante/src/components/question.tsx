import { User } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

interface QuestionProps {
  question: string
}

export function Question({ question }: QuestionProps) {
  return (
    <div className="flex flex-col items-end">
      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
        <User className="size-8 text-[#9572FC]" />
      </div>
      <Card className=" mr-12 w-fit rounded-4xl rounded-se-none bg-[#2A2634]">
        <CardContent className="flex items-center justify-end">
          <p className="text-right text-sm leading-relaxed">{question}</p>
        </CardContent>
      </Card>
    </div>
  )
}
