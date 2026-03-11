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
    backgroundColor: "#22c55e",
    color: "white",
    position: "relative",
    zIndex: 20,
  },

  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#feffff",
  }
};

export default Navbar;
