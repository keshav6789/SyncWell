import { Link } from "react-router-dom";
import hero from "../assets/hero.png";

function Hero() {
  return (
    <section style={styles.hero}>

      <div style={styles.textSection}>
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

      <div>
        <img src={hero} alt="health" style={styles.image}/>
      </div>

    </section>
  );
}

const styles = {
  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "60px 80px",
  },

  textSection: {
    maxWidth: "500px"
  },

  title: {
    fontSize: "40px",
    marginBottom: "20px"
  },

  description: {
    fontSize: "18px",
    marginBottom: "25px",
    color: "#555"
  },

  button: {
    padding: "12px 25px",
    fontSize: "16px",
    backgroundColor: "#22c55e",
    border: "none",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer"
  },

  image: {
    width: "420px"
  }
};

export default Hero;