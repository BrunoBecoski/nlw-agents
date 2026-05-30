import { ArrowLeft, Radio } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { QuestionForm } from '@/components/question-form'
import { QuestionList } from '@/components/question-list'
import { Button } from '@/components/ui/button'
import { useRoom } from '@/http/use-room'

type RoomParams = {
  roomId: string
}

interface RoomProps {
  ref: React.RefObject<HTMLDivElement | null>
}

export function Room({ ref }: RoomProps) {
  const params = useParams<RoomParams>()

  if (!params.roomId) {
    return <Navigate replace to="/" />
  }

  const { data } = useRoom(params.roomId)

  if (!data) {
    return <Navigate replace to="/" />
  }

  document.title = `Let me Ask | ${data.name}`

  return (
    <div className="min-h-screen bg-zinc-950" ref={ref}>
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 size-4" />
                Voltar ao Início
              </Button>
            </Link>

            <Link to={`/room/${params.roomId}/audio`}>
              <Button className="flex items-center gap-2" variant="secondary">
                <Radio className="size-4" />
                Gravar Áudio
              </Button>
            </Link>
          </div>
          <h1 className="mt-10 mb-4 text-center font-bold text-4xl text-foreground">
            {data.name}
          </h1>
          <p className="text-center text-lg text-muted-foreground">
            {data.description}
          </p>
          <p className="mt-10 text-muted-foreground">
            Faça perguntas e receba respostas com IA
          </p>
        </div>
        <div className="mb-8">
          <QuestionForm roomId={params.roomId} />
        </div>

        <QuestionList roomId={params.roomId} />
      </div>
    </div>
  )
}
