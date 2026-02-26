import { Bot } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useScreenAndAnimation } from '@/context/screenAndAnimation'

export function LoadingAnswer() {
  const { animation } = useScreenAndAnimation()

  return (
    <div className={`flex flex-col ${animation.slideLeft}`}>
      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
        <Bot className="size-8 text-[#9572FC]" />
      </div>

      <Card className="relative mx-12 w-fit rounded-4xl rounded-ss-none border-none bg-[#2A2634]">
        <div className="-z-10 -top-0.5 -left-0.5 -bottom-0.5 -right-0.5 absolute animate-bg-gradient rounded-4xl rounded-ss-none bg-gradient bg-size-[200%]" />
        <CardContent className="flex-1">
          <div className="whitespace-pre-line text-md leading-relaxed">
            <div className="flex animate-pulse gap-4 pt-0.5">
              <span className="size-2 animate-bounce rounded-full bg-white" />
              <span className="size-2 animate-bounce rounded-full bg-white delay-100" />
              <span className="size-2 animate-bounce rounded-full bg-white delay-200" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
