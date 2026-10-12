import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MagicEightBallApp from './MagicEightBallApp'
import './magic-8-ball.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MagicEightBallApp />
  </StrictMode>,
)
