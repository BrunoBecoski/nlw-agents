import { useContext, useEffect, useRef } from 'react'
import { Outlet, useBlocker, useLocation } from 'react-router-dom'
import { AppContext } from './app'

export function BlockerGlobal() {
  const location = useLocation()
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const currentOutClassRef = useRef<string>('')
  const nextInClassRef = useRef<string>('')

  const appContext = useContext(AppContext)

  if (!appContext) {
    return
  }

  const { createRoomRef, roomRef, recordRoomAudioRef } = appContext

  function getRouteType(path: string): 'home' | 'room' | 'audio' | 'unknown' {
    if (path === '/') return 'home'
    if (path.endsWith('/audio')) return 'audio'
    if (path.startsWith('/room/')) return 'room'
    return 'unknown'
  }

  function getRefByType(type: 'home' | 'room' | 'audio' | 'unknown') {
    if (type === 'home') return createRoomRef
    if (type === 'room') return roomRef
    if (type === 'audio') return recordRoomAudioRef
    return null
  }

  function getTransitionClasses(from: string, to: string) {
    const fromType = getRouteType(from)
    const toType = getRouteType(to)

    if (
      (fromType === 'home' && toType === 'room') ||
      (fromType === 'room' && toType === 'audio')
    ) {
      return {
        outClass: 'animate-slide-out-left',
        inClass: 'animate-slide-in-right'
      }
    }

    if (
      (fromType === 'audio' && toType === 'room') ||
      (fromType === 'room' && toType === 'home')
    ) {
      return {
        outClass: 'animate-slide-out-right',
        inClass: 'animate-slide-in-left'
      }
    }

    return {
      outClass: 'animate-fade-out',
      inClass: 'animate-fade-in'
    }
  }

  function removeAnimateClasses() {
    const classes = [
      'animate-slide-in-left',
      'animate-slide-in-right',
      'animate-slide-out-left',
      'animate-slide-out-right',
    ]

    createRoomRef.current?.classList.remove(...classes)
    roomRef.current?.classList.remove(...classes)
    recordRoomAudioRef.current?.classList.remove(...classes)
  }

  const blocker = useBlocker(({ nextLocation }) => {
    if (location.pathname !== nextLocation.pathname) {
      const currentRoute = getRouteType(location.pathname)
      const currentRef = getRefByType(currentRoute)

      removeAnimateClasses()

      const { outClass, inClass } = getTransitionClasses(location.pathname, nextLocation.pathname)

      nextInClassRef.current = inClass
      currentOutClassRef.current = outClass

      if (currentRef && currentRef.current) {
        currentRef.current.classList.add(outClass)
      }

      return true
    }
    return false
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

  useEffect(() => {
    const newRoute = getRouteType(location.pathname)
    const newRef = getRefByType(newRoute)

    if (newRef && newRef.current && nextInClassRef.current) {
      removeAnimateClasses()

      newRef.current.classList.add(nextInClassRef.current)
    }
  }, [location.pathname])

  return <Outlet />
}
