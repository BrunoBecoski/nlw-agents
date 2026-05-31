import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createContext, type RefObject, useRef } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { BlockerGlobal } from './blocker-global'
import { CreateRoom } from './pages/create-room'
import { RecordRoomAudio } from './pages/record-room-audio'
import { Room } from './pages/room'

interface AppContextProps {
  createRoomRef: RefObject<HTMLDivElement | null>
  roomRef: RefObject<HTMLDivElement | null>
  recordRoomAudioRef: RefObject<HTMLDivElement | null>
}

export const AppContext = createContext<AppContextProps | null>(null)

const queryClient = new QueryClient()

export function App() {
  const createRoomRef = useRef<HTMLDivElement>(null)
  const roomRef = useRef<HTMLDivElement>(null)
  const recordRoomAudioRef = useRef<HTMLDivElement>(null)

  const router = createBrowserRouter([
    {
      path: '/',
      element: <BlockerGlobal />,
      children: [
        {
          path: '/',
          element: <CreateRoom ref={createRoomRef} />,
        },
        {
          path: '/room/:roomId',
          element: <Room ref={roomRef} />,
        },
        {
          path: '/room/:roomId/audio',
          element: <RecordRoomAudio ref={recordRoomAudioRef} />,
        },
      ],
    },
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider
        value={{ createRoomRef, roomRef, recordRoomAudioRef }}
      >
        <RouterProvider router={router} />
      </AppContext.Provider>
    </QueryClientProvider>
  )
}
