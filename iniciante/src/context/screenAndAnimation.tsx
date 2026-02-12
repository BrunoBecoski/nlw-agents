import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

export type ScreenType = 'home' | 'chat'

export type AnimationVariantType = 'enter' | 'exit'

type TailwindType =
  | 'animate-fade-in'
  | 'animate-fade-out'
  | 'animate-slide-in-bottom'
  | 'animate-slide-out-bottom'
  | 'animate-slide-in-right'
  | 'animate-slide-out-right'
  | 'animate-slide-in-left'
  | 'animate-slide-out-left'

interface ScreenAndAnimationProps {
  children: ReactNode
}

type ScreenAndAnimationState = {
  screen: ScreenType
  changeScreen: (newScreen: ScreenType) => void
  changeAnimationVariant: (newAnimationVariant: AnimationVariantType) => void
  logoAnimation: TailwindType
  homeFormAnimation: TailwindType
  chatButtonAnimation: TailwindType
  chatFormAnimation: TailwindType
  questionAnimation: TailwindType
  answerAnimation: TailwindType
}

const initialState: ScreenAndAnimationState = {
  screen: 'home',
  logoAnimation: 'animate-fade-in',
  homeFormAnimation: 'animate-slide-in-bottom',
  chatButtonAnimation: 'animate-fade-in',
  chatFormAnimation: 'animate-slide-in-bottom',
  questionAnimation: 'animate-slide-in-right',
  answerAnimation: 'animate-slide-in-left',
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

  const [homeFormAnimation, setHomeFormAnimation] = useState<TailwindType>(
    'animate-slide-in-bottom'
  )
  const [logoAnimation, setLogoAnimation] =
    useState<TailwindType>('animate-fade-in')
  const [chatButtonAnimation, setChatButtonAnimation] =
    useState<TailwindType>('animate-fade-in')
  const [chatFormAnimation, setChatFormAnimation] = useState<TailwindType>(
    'animate-slide-in-bottom'
  )
  const [questionAnimation, setQuestionAnimation] = useState<TailwindType>(
    'animate-slide-in-right'
  )
  const [answerAnimation, setAnswerAnimation] = useState<TailwindType>(
    'animate-slide-in-left'
  )

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
    logoAnimation,
    homeFormAnimation,
    chatButtonAnimation,
    chatFormAnimation,
    questionAnimation,
    answerAnimation,
  }

  useEffect(() => {
    switch (animation) {
      case 'enter':
        setLogoAnimation('animate-fade-in')
        setHomeFormAnimation('animate-slide-in-bottom')
        setChatButtonAnimation('animate-fade-in')
        setChatFormAnimation('animate-slide-in-bottom')
        setQuestionAnimation('animate-slide-in-right')
        setAnswerAnimation('animate-slide-in-left')
        break

      case 'exit':
        setLogoAnimation('animate-fade-out')
        setHomeFormAnimation('animate-slide-out-bottom')
        setChatButtonAnimation('animate-fade-out')
        setChatFormAnimation('animate-slide-out-bottom')
        setQuestionAnimation('animate-slide-out-right')
        setAnswerAnimation('animate-slide-out-left')
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
