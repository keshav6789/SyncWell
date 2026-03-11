import { Link } from "react-router-dom";

import mentalImg from "../assets/mental.png";
import physicalImg from "../assets/physical.png";
import habitImg from "../assets/habits.png";
import "./FeatureCards.css";

function FeatureCards() {
  const cards = [
    {
      title: "Mental Health",
      description:
        "Reduce stress, practice mindfulness, and improve emotional wellbeing.",
      image: mentalImg,
      path: "/mental",
      buttonLabel: "Explore"
    },
    {
      title: "Physical Health",
      description:
        "Discover workouts, track progress, and stay physically active.",
      image: physicalImg,
      path: "/physical",
      buttonLabel: "Explore"
    },
    {
      title: "Habit Tracker",
      description: "Build better routines and track your daily healthy habits.",
      image: habitImg,
      path: "/tracker",
      buttonLabel: "Start"
    }
  ];

  return (
    <section style={styles.container}>
      <h2 style={styles.heading}>Explore SyncWell</h2>

      <div style={styles.cards}>
        {cards.map((card) => (
          <div key={card.title} style={styles.card} className="feature-card">
            <img src={card.image} alt={card.title} style={styles.image} />

            <h3 style={styles.cardTitle}>{card.title}</h3>

            <p style={styles.cardDescription}>{card.description}</p>

            <Link to={card.path}>
              <button style={styles.button}>{card.buttonLabel}</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  container: {
    padding: "80px 40px",
    textAlign: "center"
  },
  heading: {
    fontSize: "36px",
    marginBottom: "60px",
    color: "#2f2f2f",
    letterSpacing: "1px"
  },
  cards: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    flexWrap: "wrap"
  },
  card: {
    width: "300px",
    padding: "35px",
    borderRadius: "18px",
    backdropFilter: "blur(8px)",
    background: "rgba(255,255,255,0.65)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    transition: "all 0.35s ease"
  },
  image: {
    width: "95px",
    marginBottom: "20px"
  },
  cardTitle: {
    marginBottom: "12px",
    color: "#1f2937"
  },
  cardDescription: {
    margin: 0,
    color: "#475569",
    lineHeight: "1.7"
  },
  button: {
    marginTop: "20px",
    padding: "11px 22px",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "500",
    color: "white",
    cursor: "pointer",
    background: "linear-gradient(135deg,#86793d,#b4a25a)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    transition: "all 0.3s ease"
  }
};

export default FeatureCards;
