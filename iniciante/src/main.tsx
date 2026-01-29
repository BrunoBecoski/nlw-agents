import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app'
import { QuestionsAndAnswersProvider } from './context/questionsAndAnswers'
import { ScreenAndAnimationProvider } from './context/screenAndAnimation'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ScreenAndAnimationProvider>
      <QuestionsAndAnswersProvider>
        <App />
      </QuestionsAndAnswersProvider>
    </ScreenAndAnimationProvider>
  </StrictMode>
)
