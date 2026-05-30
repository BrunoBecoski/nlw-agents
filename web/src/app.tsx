import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useBlocker,
  useLocation,
} from 'react-router-dom'
import { CreateRoom } from './pages/create-room'
import { RecordRoomAudio } from './pages/record-room-audio'
import { Room } from './pages/room'

const queryClient = new QueryClient()

function BlockerGlobal() {
  const location = useLocation()
  const timerRef = useRef(null)

  const blocker = useBlocker(({ nextLocation }) => {
    console.log(`FROM: ${location.pathname}`)

    console.log(`TO: ${nextLocation.pathname}`)

    return false
  })

  useEffect(() => {
    if (blocker.state === 'blocked') {
      const tempoDeEspera = 2000

      if (timerRef.current) clearTimeout(timerRef.current)

      timerRef.current = setTimeout(() => {
        blocker.proceed()
      }, tempoDeEspera)
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [blocker.state]) // E

  return <Outlet />
}

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
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
