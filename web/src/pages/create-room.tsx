import { CreateRoomForm } from '@/components/create-room-form'
import { RoomList } from '@/components/room-list'

interface CreateRoomProps {
  ref: React.RefObject<HTMLDivElement | null>
}

export function CreateRoom({ ref }: CreateRoomProps) {
  return (
    <div className="min-h-screen animate-slide-in-right px-4 py-8" ref={ref}>
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
          <CreateRoomForm />
          <RoomList />
        </div>
      </div>
    </div>
  )
}
