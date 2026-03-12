import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.wrapper}>
      <div style={styles.navbar}>
        <Link to="/" style={styles.logoWrap}>
          <div style={styles.logoIcon}>S</div>
          <div>
            <h1 style={styles.logo}>SyncWell</h1>
            <p style={styles.tagline}>Mind • Body • Balance</p>
          </div>
        </Link>

        <div style={styles.navLinks}>
          <Link
            to="/"
            className={`nav-btn ${isActive("/") ? "active-nav" : ""}`}
          >
            Home
          </Link>

          <Link
            to="/mental"
            className={`nav-btn ${isActive("/mental") ? "active-nav" : ""}`}
          >
            Mental Health
          </Link>

          <Link
            to="/physical"
            className={`nav-btn ${isActive("/physical") ? "active-nav" : ""}`}
          >
            Physical Health
          </Link>

          <Link
            to="/account"
            className={`nav-btn ${isActive("/account") ? "active-nav" : ""}`}
          >
            Account
          </Link>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  wrapper: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    padding: "14px 20px",
    background: "rgba(248, 250, 252, 0.35)",
    backdropFilter: "blur(10px)",
  },

  navbar: {
    maxWidth: "1280px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 26px",
    borderRadius: "22px",
    background:
      "linear-gradient(135deg, rgba(34,197,94,0.92), rgba(59,130,246,0.82))",
    boxShadow: "0 14px 35px rgba(15, 23, 42, 0.18)",
    border: "1px solid rgba(255,255,255,0.25)",
  },

  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    textDecoration: "none",
  },

  logoIcon: {
    width: "52px",
    height: "52px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.18)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "26px",
    fontWeight: "bold",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
    border: "1px solid rgba(255,255,255,0.22)",
  },

  logo: {
    fontSize: "30px",
    fontWeight: "800",
    color: "#ffffff",
    margin: 0,
  },

  tagline: {
    margin: "5px 0 0",
    color: "rgba(255,255,255,0.88)",
    fontSize: "13px",
  },

  navLinks: {
    display: "flex",
    gap: "14px",
    alignItems: "center",
  },
};

export default Navbar;