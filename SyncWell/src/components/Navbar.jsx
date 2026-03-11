import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav style={styles.navbar}>
      
      <h2 style={styles.logo}>SyncWell</h2>

      <div style={styles.navLinks}>
        <Link to="/" className="nav-btn">Home</Link>
        <Link to="/mental" className="nav-btn">Mental Health</Link>
        <Link to="/physical" className="nav-btn">Physical Health</Link>
        <Link to="/tracker" className="nav-btn">Habit Tracker</Link>
        <Link to="/account" className="nav-btn">Account</Link>
      </div>

    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "#86793d",
    color: "white",
    position: "relative",
    zIndex: 20,
  },

  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#ffffff",
  },

  navLinks: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  }
};

export default Navbar;
