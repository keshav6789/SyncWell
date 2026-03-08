import { Link } from "react-router-dom";

function FeatureCards() {
  return (
    <section style={styles.container}>

      <h2 style={styles.heading}>Our Features</h2>

      <div style={styles.cards}>

        <div style={styles.card}>
          <h3>🧠 Mental Health</h3>
          <p>Learn techniques to reduce stress and improve mental wellness.</p>
          <Link to="/mental">
            <button style={styles.button}>Explore</button>
          </Link>
        </div>

        <div style={styles.card}>
          <h3>💪 Physical Health</h3>
          <p>Discover exercises and habits to stay physically fit.</p>
          <Link to="/physical">
            <button style={styles.button}>Explore</button>
          </Link>
        </div>

        <div style={styles.card}>
          <h3>📊 Habit Tracker</h3>
          <p>Track your daily habits and build a healthy lifestyle.</p>
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
    padding: "60px 40px",
    textAlign: "center"
  },

  heading: {
    fontSize: "32px",
    marginBottom: "40px"
  },

  cards: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap"
  },

  card: {
    width: "260px",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    background: "white"
  },

  button: {
    marginTop: "15px",
    padding: "10px 18px",
    border: "none",
    backgroundColor: "#22c55e",
    color: "white",
    cursor: "pointer",
    borderRadius: "5px"
  }
};

export default FeatureCards;