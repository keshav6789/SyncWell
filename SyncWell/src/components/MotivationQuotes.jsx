import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function MentalHealthSection() {
  const quotes = [
    "Believe in yourself and all that you are.",
    "You are stronger than your anxiety.",
    "If you wanna win work hard",
    "Small progress is still progress.",
    "Peace begins with a deep breath.",
    "Don't give up",
    "Every day is a fresh start.",
    "Your mental health matters.",
    "Growth takes time, keep going.",
    "As long as you are alive. There are infinite chances",
    "Don't cry for what you lost, Be greatfull for what you have",
    "Don't depend on others",
    "The world is cruel, but also very beautiful",
    "Life is short so live it",
    "You ,ust be the one to determine your own value and path",
    "Stop waiting for luck and actively change your situation "

  ]

  const [quote, setQuote] = useState(quotes[0])
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * quotes.length)
      setQuote(quotes[random])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const openDisorderPage = (slug) => {
    navigate(`/mental/${slug}`)
  }

  const handleKeyDown = (event, slug) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      openDisorderPage(slug)
    }
  }

  return (
    <section style={styles.section}>
      <h1 style={styles.mainHeading}>Mental Health Support</h1>

      <div style={styles.quoteCard}>
        <h3>Daily Motivation</h3>
        <p style={styles.quote}>{quote}</p>
      </div>

      <div
        style={styles.clickableCard}
        onClick={() => openDisorderPage("overthinking")}
        onKeyDown={(event) => handleKeyDown(event, "overthinking")}
        role="button"
        tabIndex={0}
      >
        <h2>Overthinking</h2>
        <p>
          Overthinking happens when the mind continuously analyzes the same
          thoughts. It can create stress and reduce productivity.
        </p>

        <ul>
          <li>Practice deep breathing</li>
          <li>Write your thoughts in a journal</li>
          <li>Focus on the present moment</li>
          <li>Limit negative self-talk</li>
        </ul>
      </div>

      <div
        style={styles.clickableCard}
        onClick={() => openDisorderPage("anxiety")}
        onKeyDown={(event) => handleKeyDown(event, "anxiety")}
        role="button"
        tabIndex={0}
      >
        <h2>Anxiety</h2>
        <p>
          Anxiety is a natural response to stress, but when it becomes
          excessive it can affect daily life and mental well-being.
        </p>

        <ul>
          <li>Try mindfulness meditation</li>
          <li>Take slow deep breaths</li>
          <li>Exercise regularly</li>
          <li>Talk with supportive people</li>
        </ul>
      </div>

      <div
        style={styles.clickableCard}
        onClick={() => openDisorderPage("stress-management")}
        onKeyDown={(event) => handleKeyDown(event, "stress-management")}
        role="button"
        tabIndex={0}
      >
        <h2>Stress Management</h2>
        <p>
          Stress is a part of life, but managing it in healthy ways can improve
          focus, energy and emotional balance.
        </p>

        <ul>
          <li>Take short breaks during the day</li>
          <li>Follow a consistent sleep routine</li>
          <li>Spend time doing relaxing activities</li>
          <li>Break big tasks into smaller steps</li>
        </ul>
      </div>

      <div
        style={styles.clickableCard}
        onClick={() => openDisorderPage("self-concept")}
        onKeyDown={(event) => handleKeyDown(event, "self-concept")}
        role="button"
        tabIndex={0}
      >
        <h2>Self Concept</h2>
        <p>
          Self concept is the way you see and understand yourself. A healthy
          self concept helps build confidence, emotional stability and better
          decision making.
        </p>

        <ul>
          <li>Accept yourself and your imperfections</li>
          <li>Focus on personal growth</li>
          <li>Set realistic goals</li>
          <li>Practice positive self-talk</li>
        </ul>
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: "80px 20px",
    background: "#f5f7fb",
    textAlign: "center"
  },

  mainHeading: {
    fontSize: "40px",
    marginBottom: "40px"
  },

  quoteCard: {
    background: "#22c55e",
    color: "white",
    padding: "30px",
    borderRadius: "10px",
    maxWidth: "600px",
    margin: "0 auto 40px auto"
  },

  quote: {
    fontSize: "20px"
  },

  clickableCard: {
    background: "white",
    padding: "30px",
    margin: "20px auto",
    maxWidth: "700px",
    borderRadius: "10px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    textAlign: "left",
    cursor: "pointer"
  }
}

export default MentalHealthSection