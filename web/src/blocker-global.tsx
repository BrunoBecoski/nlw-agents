import { useContext, useEffect, useRef } from 'react'
import { Outlet, useBlocker, useLocation } from 'react-router-dom'
import { AppContext } from './app'

export function BlockerGlobal() {
  const location = useLocation()
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const appContext = useContext(AppContext)

  if (!appContext) {
    return
  }

  const { createRoomRef, roomRef, recordRoomAudioRef } = appContext

  const blocker = useBlocker(({ nextLocation }) => {
    if (location.pathname !== nextLocation.pathname) {
      const currentRoute = location.pathname
      const nextRoute = nextLocation.pathname

      console.log('FROM: ' + currentRoute)
      console.log('TO: ' + nextRoute)
    }
  })

  useEffect(() => {
    if (blocker.state === 'blocked') {
      const delay = 500

      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      timerRef.current = setTimeout(() => {
        blocker.proceed()
      }, delay)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [blocker.state, blocker.proceed])

  return <Outlet />
}
