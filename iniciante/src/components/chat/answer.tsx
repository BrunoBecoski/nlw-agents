import { Bot } from 'lucide-react'
import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import type { Animation } from '@/app'
import { Card, CardContent } from '@/components/ui/card'

interface AnswerProps {
  animation: Animation
  answer?: string
}

export function Answer({ animation, answer }: AnswerProps) {
  const [currentAnimation, setCurrentAnimation] = useState(
    'animate-slide-in-left'
  )

  useEffect(() => {
    switch (animation) {
      case 'chat-enter':
        setCurrentAnimation('animate-slide-in-left')
        break

      case 'chat-exit':
        setCurrentAnimation('animate-slide-out-left')
        break

      default:
        break
    }
  }, [animation])

  return (
    <div className={`flex flex-col ${currentAnimation}`}>
      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
        <Bot className="size-8 text-[#9572FC]" />
      </div>

      <Card className="mx-12 w-fit rounded-4xl rounded-ss-none bg-[#2A2634]">
        <CardContent className="flex-1">
          <div className="whitespace-pre-line text-md leading-relaxed">
            {answer ? (
              <Markdown>{answer}</Markdown>
            ) : (
              <div className="flex animate-pulse gap-4 pt-0.5">
                <span className="size-2 animate-bounce rounded-full bg-white" />
                <span className="size-2 animate-bounce rounded-full bg-white delay-100" />
                <span className="size-2 animate-bounce rounded-full bg-white delay-200" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
