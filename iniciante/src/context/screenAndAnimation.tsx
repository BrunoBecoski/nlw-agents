import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

type ScreenType = 'home' | 'chat'

type AnimationVariantType = 'enter' | 'exit'

type AnimationActionType = 'in' | 'out'

interface ScreenAndAnimationProps {
  children: ReactNode
}

type ScreenAndAnimationState = {
  screen: ScreenType
  changeScreen: (newScreen: ScreenType) => void
  changeAnimationVariant: (newAnimationVariant: AnimationVariantType) => void
  animationAction: AnimationActionType
}

const initialState: ScreenAndAnimationState = {
  screen: 'home',
  animationAction: 'in',
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
  const [animation, setAnimationVariant] =
    useState<AnimationVariantType>('enter')
  const [animationAction, setAnimationAction] =
    useState<AnimationActionType>('in')

  function changeScreen(newScreen: ScreenType) {
    setScreen(newScreen)
  }

  function changeAnimationVariant(newAnimationVariant: AnimationVariantType) {
    setAnimationVariant(newAnimationVariant)
  }

  const value: ScreenAndAnimationState = {
    screen,
    changeScreen,
    changeAnimationVariant,
    animationAction,
  }

  useEffect(() => {
    switch (animation) {
      case 'enter':
        setAnimationAction('in')
        break

      case 'exit':
        setAnimationAction('out')
        break

      default:
        break
    }
  }, [animation])

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
