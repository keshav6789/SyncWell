import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.navbar}>
      
      <h2 style={styles.logo}>Healthify</h2>

      <ul style={styles.navLinks}>
        <li>
          <Link style={styles.link} to="/">Home</Link>
        </li>

        <li>
          <Link style={styles.link} to="/mental">Mental Health</Link>
        </li>

        <li>
          <Link style={styles.link} to="/physical">Physical Health</Link>
        </li>

        <li>
          <Link style={styles.link} to="/tracker">Habit Tracker</Link>
        </li>
      </ul>

    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "#0f172a",
    color: "white",
  },

  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#22c55e",
  },

  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "25px",
  },

  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "16px",
    fontWeight: "500",
  }
};

export default Navbar;