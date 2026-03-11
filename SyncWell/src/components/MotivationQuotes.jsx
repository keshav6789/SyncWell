import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function MentalHealthSection() {
  const quotes = [
    "Believe in yourself and all that you are.",
    "You are stronger than your anxiety.",
    "Small progress is still progress.",
    "Peace begins with a deep breath.",
    "Every day is a fresh start.",
    "Your mental health matters.",
    "Growth takes time, keep going."
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

  const cards = [
    {
      title: "Overthinking",
      path: "/mental/overthinking",
      description:
        "Overthinking happens when the mind continuously analyzes the same thoughts. It can create stress and reduce productivity.",
      tips: [
        "Practice deep breathing",
        "Write your thoughts in a journal",
        "Focus on the present moment",
        "Limit negative self-talk"
      ]
    },
    {
      title: "Anxiety",
      path: "/mental/anxiety",
      description:
        "Anxiety is a natural response to stress, but when it becomes excessive it can affect daily life and mental well-being.",
      tips: [
        "Try mindfulness meditation",
        "Take slow deep breaths",
        "Exercise regularly",
        "Talk with supportive people"
      ]
    },
    {
      title: "Depression",
      path: "/mental/depression",
      description:
        "Depression can affect emotions, energy, motivation, sleep, and everyday functioning when low mood stays for a long time.",
      tips: [
        "Reach out to someone you trust",
        "Follow a simple daily routine",
        "Spend time in sunlight and fresh air",
        "Seek professional support when needed"
      ]
    },
    {
      title: "Self Concept",
      path: "/mental/self-concept",
      description:
        "Self concept is the way you see and understand yourself. A healthy self concept helps build confidence, emotional stability and better decision making.",
      tips: [
        "Accept yourself and your imperfections",
        "Focus on personal growth",
        "Set realistic goals",
        "Practice positive self-talk"
      ]
    }
  ]

  const openPage = (path) => {
    navigate(path)
  }

  const handleKeyDown = (event, path) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      openPage(path)
    }
  }

  return (
    <section style={styles.section}>
      <h1 style={styles.mainHeading}>Mental Health Support</h1>

      <div style={styles.quoteCard}>
        <h3>Daily Motivation</h3>
        <p style={styles.quote}>{quote}</p>
      </div>

      <div style={styles.grid}>
        {cards.map((card) => (
          <div
            key={card.title}
            style={styles.clickableCard}
            onClick={() => openPage(card.path)}
            onKeyDown={(event) => handleKeyDown(event, card.path)}
            role="button"
            tabIndex={0}
          >
            <h2 style={styles.cardTitle}>{card.title}</h2>
            <p style={styles.cardDescription}>{card.description}</p>

            <ul style={styles.list}>
              {card.tips.map((tip) => (
                <li key={tip} style={styles.listItem}>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        ))}
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
    marginBottom: "40px",
    color: "#0f172a"
  },
  quoteCard: {
    background: "#22c55e",
    color: "white",
    padding: "30px",
    borderRadius: "18px",
    maxWidth: "700px",
    margin: "0 auto 40px auto",
    boxShadow: "0 20px 40px rgba(34, 197, 94, 0.2)"
  },
  quote: {
    fontSize: "20px",
    margin: 0
  },
  grid: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px"
  },
  clickableCard: {
    background: "white",
    padding: "28px",
    borderRadius: "20px",
    boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)",
    textAlign: "left",
    cursor: "pointer",
    border: "1px solid #e2e8f0"
  },
  cardTitle: {
    marginTop: 0,
    marginBottom: "14px",
    color: "#0f172a"
  },
  cardDescription: {
    marginTop: 0,
    marginBottom: "14px",
    color: "#475569",
    lineHeight: "1.7"
  },
  list: {
    margin: 0,
    paddingLeft: "20px",
    color: "#334155",
    lineHeight: "1.8"
  },
  listItem: {
    marginBottom: "8px"
  }
}

export default MentalHealthSection
