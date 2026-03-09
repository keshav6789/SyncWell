import { Link } from "react-router-dom";
import hero from "../assets/hero.png";

function Hero() {
  return (
    <section style={{ ...styles.hero, backgroundImage: `url(${hero})` }}>

      <div style={styles.overlay}>
        <h1 style={styles.title}>
          Improve Your Mental & Physical Health
        </h1>

        <p style={styles.description}>
          Healthify helps you track your habits, improve mental wellness,
          and stay physically active with simple daily tracking tools.
        </p>

        <Link to="/tracker">
          <button style={styles.button}>Start Tracking</button>
        </Link>
      </div>

    </section>
  );
}

const styles = {
  hero: {
    width: "100%",
    height: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  overlay: {
    textAlign: "center",
    color: "white",
    background: "rgba(0,0,0,0.4)",
    padding: "40px",
    borderRadius: "10px"
  },

  title: {
    fontSize: "48px",
    marginBottom: "20px"
  },

  description: {
    fontSize: "18px",
    marginBottom: "25px"
  },

  button: {
    padding: "12px 25px",
    fontSize: "16px",
    backgroundColor: "#22c55e",
    border: "none",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default Hero;