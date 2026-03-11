import { Link } from "react-router-dom";

import mentalImg from "../assets/mental.png";
import physicalImg from "../assets/physical.png";
import habitImg from "../assets/habits.png";

function FeatureCards() {
  return (
    <section style={styles.container}>

      <h2 style={styles.heading}>Explore SyncWell</h2>

      <div style={styles.cards}>

        <div style={styles.card}>
          <img src={mentalImg} style={styles.image} />

          <h3>🧠 Mental Health</h3>

          <p>
            Reduce stress, practice mindfulness, and improve emotional wellbeing.
          </p>

          <Link to="/mental">
            <button style={styles.button}>Explore</button>
          </Link>
        </div>

        <div style={styles.card}>
          <img src={physicalImg} style={styles.image} />

          <h3>💪 Physical Health</h3>

          <p>
            Discover workouts, track progress, and stay physically active.
          </p>

          <Link to="/physical">
            <button style={styles.button}>Explore</button>
          </Link>
        </div>

<<<<<<< HEAD
        {/* <div style={styles.card}>
=======
        <div style={styles.card}>
          <img src={habitImg} style={styles.image} />

>>>>>>> fb837c6a818ce36bc47447c4e9aa0d8526835554
          <h3>📊 Habit Tracker</h3>

          <p>
            Build better routines and track your daily healthy habits.
          </p>

          <Link to="/tracker">
            <button style={styles.button}>Start</button>
          </Link>
        </div> */}

      </div>

    </section>
  );
}

const styles = {
  container: {
    padding: "70px 40px",
    textAlign: "center",
  },

  heading: {
    fontSize: "34px",
    marginBottom: "50px",
    color: "#2f2f2f"
  },

  cards: {
    display: "flex",
    justifyContent: "center",
    gap: "35px",
    flexWrap: "wrap",
  },

  card: {
    width: "280px",
    padding: "30px",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    background: "white",
    transition: "0.25s",
  },

  image: {
    width: "250px",
    marginBottom: "15px",
  },

  button: {
    marginTop: "18px",
    padding: "10px 20px",
    border: "none",
    backgroundColor: "#86793d",
    color: "white",
    cursor: "pointer",
    borderRadius: "6px",
    fontSize: "14px",
  },
};

export default FeatureCards;