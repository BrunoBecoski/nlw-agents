import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app'
import { ScreenAndAnimationProvider } from './context/screenAndAnimation'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ScreenAndAnimationProvider>
      <App />
    </ScreenAndAnimationProvider>
  </StrictMode>
)
