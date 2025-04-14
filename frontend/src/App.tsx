import { useEffect, useState } from 'react'
import axios from 'axios'
import BetsyMagicBall from './assets/magic8ball-betsy.png'
import './index.css'

interface Reason {
  id: string
  title: string
  reasonType: string
  explanation: string
  imageUrl?: string
}

function App() {
  const [reason, setReason] = useState<Reason | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const getEmoji = (type: string) => {
    switch (type) {
      case 'TECHNICAL': return '💻'
      case 'PROFESSIONAL': return '📈'
      case 'SOFT_SKILL': return '🧠'
      case 'PERSONALITY': return '💁‍♀️'
      case 'BETSY_ENERGY': return '✨'
      default: return '🎯'
    }
  }

  const getRandomReason = async () => {
    setLoading(true)
    try {
      const res = await axios.get<Reason>(`${import.meta.env.VITE_API_URL}/api/reasons/random`);
      setReason(res.data)
    } catch (error) {
      console.error("Error fetching reason:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getRandomReason()
  }, [])

  return (
    <div className="container">
      <img
        src={BetsyMagicBall}
        alt="Betsy holding a magic 8-ball with dogs"
        className="betsy-hero"
      />
  
      <div className="magic-ball">8</div>
      <h1>Reasons to Hire Betsy</h1>
      <button onClick={getRandomReason} disabled={loading}>
        {loading ? 'Shaking...' : 'Shake the Magic 8-Ball'}
      </button>
  
      {reason && (
        <div className="card">
          <h2>{reason.title}</h2>
          <p>{reason.explanation}</p>
          <span>{getEmoji(reason.reasonType)} {reason.reasonType}</span>
        </div>
      )}
    </div>
  )  
}

export default App
