import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

type ScreenType = 'home' | 'chat'
type AnimationType = typeof inAnimation | typeof outAnimation
type AnimationVariantType = 'enter' | 'exit'

const inAnimation = {
  fade: 'animate-fade-in',
  slideBottom: 'animate-slide-in-bottom',
  slideRight: 'animate-slide-in-right',
  slideLeft: 'animate-slide-in-left',
} as const

const outAnimation = {
  fade: 'animate-fade-out',
  slideBottom: 'animate-slide-out-bottom',
  slideRight: 'animate-slide-out-right',
  slideLeft: 'animate-slide-out-left',
} as const

interface ScreenAndAnimationProps {
  children: ReactNode
}

type ScreenAndAnimationState = {
  screen: ScreenType
  animation: AnimationType
  changeScreen: (newScreen: ScreenType) => void
  changeAnimationVariant: (newAnimationVariant: AnimationVariantType) => void
}

const initialState: ScreenAndAnimationState = {
  screen: 'home',
  animation: inAnimation,
  changeScreen: () => {
    undefined
  },
  changeAnimationVariant: () => {
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
  const [animation, setAnimation] = useState<AnimationType>(inAnimation)
  const [animationVariant, setAnimationVariant] =
    useState<AnimationVariantType>('enter')

  function changeScreen(newScreen: ScreenType) {
    setScreen(newScreen)
  }

  function changeAnimationVariant(newAnimationVariant: AnimationVariantType) {
    setAnimationVariant(newAnimationVariant)
  }

  const value: ScreenAndAnimationState = {
    screen,
    animation,
    changeScreen,
    changeAnimationVariant,
  }

  useEffect(() => {
    switch (animationVariant) {
      case 'enter':
        setAnimation(inAnimation)
        break

      case 'exit':
        setAnimation(outAnimation)
        break

      default:
        break
    }
  }, [animationVariant])

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
