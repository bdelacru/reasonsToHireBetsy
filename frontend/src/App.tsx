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
  const [affirmation, setAffirmation] = useState<string | null>(null);
  const API_BASE = import.meta.env.VITE_API_URL;

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

  const magic8BallAnswers = [
    "Without a doubt.",
    "Absolutely yes.",
    "Most definitely.",
    "You’d be crazy not to.",
    "Signs point to yes.",
    "As certain as the sun rising.",
    "The universe agrees.",
    "1000% yes.",
    "Heck yeah.",
    "Yes, yes, YES!"
  ];
  

  const getRandomReason = async () => {
    setLoading(true)
    try {
      const res = await axios.get<Reason>(`${API_BASE}/api/reasons/random`);
      setReason(res.data)
      const randomAnswer = magic8BallAnswers[Math.floor(Math.random() * magic8BallAnswers.length)];
      setAffirmation(randomAnswer);
      
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
      <h1>Is Betsy your next great hire?</h1>
      <button onClick={getRandomReason} disabled={loading}>
        {loading ? 'Shaking...' : 'Shake the Magic 8-Ball'}
      </button>
  
      <h2 className="text-xl mt-6 italic text-purple-600 text-center fade-in">
  “{affirmation}”
</h2>
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
