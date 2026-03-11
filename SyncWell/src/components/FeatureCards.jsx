import { Link } from "react-router-dom";

import mentalImg from "../assets/mental.png";
import physicalImg from "../assets/physical.png";
import habitImg from "../assets/habits.png";
import "./FeatureCards.css";

function FeatureCards() {
  return (
    <section style={styles.container}>

      <h2 style={styles.heading}>Explore SyncWell</h2>

      <div style={styles.cards}>

        <div style={styles.card} className="feature-card">
          <img src={mentalImg} style={styles.image} />

          <h3>🧠 Mental Health</h3>

          <p>
            Reduce stress, practice mindfulness, and improve emotional wellbeing.
          </p>

          <Link to="/mental">
            <button style={styles.button}>Explore</button>
          </Link>
        </div>

        <div style={styles.card} className="feature-card">
          <img src={physicalImg} style={styles.image} />

          <h3>💪 Physical Health</h3>

          <p>
            Discover workouts, track progress, and stay physically active.
          </p>

          <Link to="/physical">
            <button style={styles.button}>Explore</button>
          </Link>
        </div>

        <div style={styles.card} className="feature-card">
          <img src={habitImg} style={styles.image} />

          <h3>📊 Habit Tracker</h3>

          <p>
            Build better routines and track your daily healthy habits.
          </p>

          <Link to="/tracker">
            <button style={styles.button}>Start</button>
          </Link>
        </div>

      </div>

    </section>
  );
}

const styles = {
  container: {
    padding: "80px 40px",
    textAlign: "center",
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
    flexWrap: "wrap",
  },

  card: {
    width: "300px",
    padding: "35px",
    borderRadius: "18px",
    backdropFilter: "blur(8px)",
    background: "rgba(255,255,255,0.65)",

    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",

    transition: "all 0.35s ease",
  },

  image: {
    width: "95px",
    marginBottom: "20px",
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