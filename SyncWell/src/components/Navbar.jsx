import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.navbar}>
      
       <h2>SyncWell</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/">Home</Link>
        <Link to="/mental">Mental Health</Link>
        <Link to="/physical">Physical Health</Link>
        <Link to="/tracker">Habit Tracker</Link>
        <Link to="/account">Account</Link>
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