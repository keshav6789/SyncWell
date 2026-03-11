import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.overlay}>
        <div style={styles.container}>
          <div style={styles.brandSection}>
            <div style={styles.logoRow}>
              <div style={styles.logoIcon}>S</div>
              <div>
                <h2 style={styles.logo}>SyncWell</h2>
                <p style={styles.tagline}>Mind • Body • Balance</p>
              </div>
            </div>

            <p style={styles.description}>
              SyncWell helps users improve mental and physical health through
              wellness tools, guided support, healthy habits, and better daily
              balance.
            </p>
          </div>

          <div style={styles.linkCard}>
            <h3 style={styles.heading}>Quick Links</h3>

            <div style={styles.linksList}>
              <Link to="/" style={styles.link}>Home</Link>
              <Link to="/mental" style={styles.link}>Mental Health</Link>
              <Link to="/physical" style={styles.link}>Physical Health</Link>
              <Link to="/account" style={styles.link}>Account</Link>
            </div>
          </div>

          <div style={styles.linkCard}>
            <h3 style={styles.heading}>Contact</h3>

            <div style={styles.contactList}>
              <p style={styles.contactItem}>
                <span style={styles.label}>Email:</span> keshav98486@gmail.com
              </p>
              <p style={styles.contactItem}>
                <span style={styles.label}>Phone:</span> +91 9350349757
              </p>
              <p style={styles.contactItem}>
                <span style={styles.label}>Project:</span> Health & Wellness Web App
              </p>
            </div>
          </div>
        </div>

        <div style={styles.bottomBar}>
          <p style={styles.copy}>© 2026 SyncWell. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: "70px",
    background:
      "linear-gradient(135deg, rgba(34,197,94,0.95), rgba(59,130,246,0.90))",
    color: "white",
    position: "relative",
    overflow: "hidden",
  },

  overlay: {
    background: "rgba(15, 23, 42, 0.18)",
    padding: "60px 20px 20px",
  },

  container: {
    maxWidth: "1280px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr 0.9fr",
    gap: "28px",
    alignItems: "start",
  },

  brandSection: {
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: "24px",
    padding: "26px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.10)",
  },

  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "16px",
  },

  logoIcon: {
    width: "54px",
    height: "54px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.18)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#ffffff",
    border: "1px solid rgba(255,255,255,0.18)",
  },

  logo: {
    margin: 0,
    fontSize: "30px",
    fontWeight: "800",
    color: "#ffffff",
  },

  tagline: {
    margin: "4px 0 0",
    color: "rgba(255,255,255,0.85)",
    fontSize: "14px",
  },

  description: {
    margin: 0,
    fontSize: "16px",
    lineHeight: "1.8",
    color: "rgba(255,255,255,0.92)",
  },

  linkCard: {
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: "24px",
    padding: "26px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.10)",
  },

  heading: {
    margin: "0 0 18px",
    fontSize: "24px",
    fontWeight: "700",
    color: "#ffffff",
  },

  linksList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  link: {
    color: "rgba(255,255,255,0.92)",
    textDecoration: "none",
    fontSize: "17px",
    fontWeight: "500",
    transition: "0.3s",
  },

  contactList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  contactItem: {
    margin: 0,
    color: "rgba(255,255,255,0.92)",
    fontSize: "16px",
    lineHeight: "1.7",
  },

  label: {
    fontWeight: "bold",
    color: "#ffffff",
  },

  bottomBar: {
    maxWidth: "1280px",
    margin: "30px auto 0",
    borderTop: "1px solid rgba(255,255,255,0.18)",
    paddingTop: "18px",
    textAlign: "center",
  },

  copy: {
    margin: 0,
    fontSize: "14px",
    color: "rgba(255,255,255,0.88)",
    letterSpacing: "0.3px",
  },
};

export default Footer;