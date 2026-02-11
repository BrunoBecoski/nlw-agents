import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

export type ScreenType = 'home' | 'chat'

export type AnimationType =
  | 'home-enter'
  | 'home-exit'
  | 'chat-enter'
  | 'chat-exit'

type LogoAnimationType = 'animate-fade-in' | 'animate-fade-out'

type HomeFormAnimationType =
  | 'animate-slide-in-bottom'
  | 'animate-slide-out-bottom'

type ChatButtonAnimationType = 'animate-fade-in' | 'animate-fade-out'

type ChatFormAnimationType =
  | 'animate-slide-in-bottom'
  | 'animate-slide-out-bottom'

type QuestionAnimationType =
  | 'animate-slide-in-right'
  | 'animate-slide-out-right'

type AnswerAnimationType = 'animate-slide-in-left' | 'animate-slide-out-left'

interface ScreenAndAnimationProps {
  children: ReactNode
}

type ScreenAndAnimationState = {
  screen: ScreenType
  changeScreen: (newScreen: ScreenType) => void
  changeAnimation: (newAnimation: AnimationType) => void
  logoAnimation: LogoAnimationType
  homeFormAnimation: HomeFormAnimationType
  chatButtonAnimation: ChatButtonAnimationType
  chatFormAnimation: ChatFormAnimationType
  questionAnimation: QuestionAnimationType
  answerAnimation: AnswerAnimationType
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

  const [homeFormAnimation, setHomeFormAnimation] =
    useState<HomeFormAnimationType>('animate-slide-in-bottom')
  const [logoAnimation, setLogoAnimation] =
    useState<LogoAnimationType>('animate-fade-in')
  const [chatButtonAnimation, setChatButtonAnimation] =
    useState<ChatButtonAnimationType>('animate-fade-in')
  const [chatFormAnimation, setChatFormAnimation] =
    useState<ChatFormAnimationType>('animate-slide-in-bottom')
  const [questionAnimation, setQuestionAnimation] =
    useState<QuestionAnimationType>('animate-slide-in-right')
  const [answerAnimation, setAnswerAnimation] = useState<AnswerAnimationType>(
    'animate-slide-in-left'
  )

  function changeScreen(newScreen: ScreenType) {
    setScreen(newScreen)
  }

  function changeAnimation(newAnimation: AnimationType) {
    setAnimation(newAnimation)
  }

  const value: ScreenAndAnimationState = {
    screen,
    changeScreen,
    changeAnimation,
    logoAnimation,
    homeFormAnimation,
    chatButtonAnimation,
    chatFormAnimation,
    questionAnimation,
    answerAnimation,
  }

  useEffect(() => {
    switch (animation) {
      case 'home-enter':
        setLogoAnimation('animate-fade-in')
        setHomeFormAnimation('animate-slide-in-bottom')
        break

      case 'home-exit':
        setLogoAnimation('animate-fade-out')
        setHomeFormAnimation('animate-slide-out-bottom')
        break

      case 'chat-enter':
        setChatButtonAnimation('animate-fade-in')
        setChatFormAnimation('animate-slide-in-bottom')
        setQuestionAnimation('animate-slide-in-right')
        setAnswerAnimation('animate-slide-in-left')
        break

      case 'chat-exit':
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
