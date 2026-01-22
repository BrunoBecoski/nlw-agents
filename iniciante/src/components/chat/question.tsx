import { User } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Animation, QuestionType } from '@/app'
import { Card, CardContent } from '@/components/ui/card'

interface QuestionProps {
  animation: Animation
  question: QuestionType
}

export function Question({ animation, question }: QuestionProps) {
  const [currentAnimation, setCurrentAnimation] = useState('')

  useEffect(() => {
    switch (animation) {
      case 'chat-enter':
        setCurrentAnimation('animate-slide-in-right')
        break

      case 'chat-exit':
        setCurrentAnimation('animate-slide-out-right')
        break

      default:
        break
    }
  }, [animation])

  return (
    <div
      className={`flex flex-col items-end ${currentAnimation}`}
      id={question.id}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
        <User className="size-8 text-[#9572FC]" />
      </div>

      <Card className="mx-12 w-fit rounded-4xl rounded-se-none bg-[#2A2634]">
        <CardContent className="flex items-center justify-end">
          <p className="text-md leading-relaxed">{question.value}</p>
        </CardContent>
      </Card>
    </div>
  )
}
