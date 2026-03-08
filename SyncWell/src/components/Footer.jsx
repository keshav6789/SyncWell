function Footer() {
  return (
    <footer style={styles.footer}>

      <div style={styles.container}>

        <div>
          <h2 style={styles.logo}>Healthify</h2>
          <p>Track your habits and improve your mental and physical health.</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <p>Home</p>
          <p>Mental Health</p>
          <p>Physical Health</p>
          <p>Habit Tracker</p>
        </div>

        <div>
          <h3>Contact</h3>
          <p>Email: healthify@gmail.com</p>
          <p>Phone: +91 9876543210</p>
        </div>

      </div>

      <p style={styles.copy}>© 2026 Healthify. All rights reserved.</p>

    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#0f172a",
    color: "white",
    padding: "40px 20px",
    marginTop: "60px"
  },

  container: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginBottom: "20px"
  },

  logo: {
    color: "#22c55e"
  },

  copy: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "14px"
  }
};

export default Footer;