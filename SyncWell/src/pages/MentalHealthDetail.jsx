import { useParams } from "react-router-dom"

function MentalHealthDetail() {
  const { slug } = useParams()

  return (
    <section style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>{formatTitle(slug)}</h1>
        <p style={styles.text}>Content for this section will be added later.</p>
      </div>
    </section>
  )
}

function formatTitle(slug = "") {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

const styles = {
  page: {
    minHeight: "70vh",
    padding: "80px 20px",
    background: "#f5f7fb"
  },
  card: {
    maxWidth: "800px",
    margin: "0 auto",
    background: "white",
    borderRadius: "12px",
    padding: "40px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
  },
  heading: {
    marginBottom: "12px"
  },
  text: {
    margin: 0
  }
}

export default MentalHealthDetail
