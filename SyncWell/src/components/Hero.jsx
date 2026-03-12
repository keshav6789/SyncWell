import { Link } from "react-router-dom";

function Hero() {
  return (
    <section style={styles.hero}>
      <video
        style={styles.backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/video/home.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={styles.backgroundOverlay} />

      <div style={styles.overlay}>
        <h1 style={styles.title}>Improve Your Mental & Physical Health</h1>

        <p style={styles.description}>
          SyncWell helps you track your habits, improve mental wellness, and
          stay physically active with simple daily tracking tools.
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
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden"
  },
  backgroundVideo: {
    position: "fixed",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -2
  },
  backgroundOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0, 0, 0, 0.35)",
    zIndex: -1
  },
  overlay: {
    textAlign: "center",
    color: "white",
    background: "rgba(0,0,0,0.4)",
    padding: "40px",
    borderRadius: "10px",
    maxWidth: "960px",
    margin: "0 20px"
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
