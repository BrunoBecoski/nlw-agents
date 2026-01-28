import { createContext, type ReactNode, useContext, useState } from 'react'

export type ScreenType = 'home' | 'chat'
export type AnimationType =
  | 'home-enter'
  | 'home-exit'
  | 'chat-enter'
  | 'chat-exit'

interface ScreenAndAnimationProps {
  children: ReactNode
}

type ScreenAndAnimationState = {
  screen: ScreenType
  animation: AnimationType
  changeScreen: (newScreen: ScreenType) => void
  changeAnimation: (newAnimation: AnimationType) => void
}

const initialState: ScreenAndAnimationState = {
  screen: 'home',
  animation: 'home-exit',
  changeScreen: () => {
    undefined
  },
  changeAnimation: () => {
    undefined
  },
}

const ScreenAndAnimationProviderContext =
  createContext<ScreenAndAnimationState>(initialState)

export function ScreenAndAnimationProvider({
  children,
  ...props
}: ScreenAndAnimationProps) {
  const [screen, setScreen] = useState<ScreenType>('home')
  const [animation, setAnimation] = useState<AnimationType>('home-enter')

  function changeScreen(newScreen: ScreenType) {
    setScreen(newScreen)
  }

  function changeAnimation(newAnimation: AnimationType) {
    setAnimation(newAnimation)
  }

  const value: ScreenAndAnimationState = {
    screen,
    animation,
    changeScreen,
    changeAnimation,
  }

  return (
    <ScreenAndAnimationProviderContext.Provider value={value} {...props}>
      {children}
    </ScreenAndAnimationProviderContext.Provider>
  )
}

export const useScreenAndAnimation = () => {
  const context = useContext(ScreenAndAnimationProviderContext)

  return context
}
