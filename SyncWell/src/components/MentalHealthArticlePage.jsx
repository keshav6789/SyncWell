import { useEffect, useRef } from "react"

function MentalHealthArticlePage({
  title,
  intro,
  disorderPoints,
  solutionPoints,
  imageLabel,
  mediaType = "image",
  mediaSrc = "",
  pageStyle = {},
  heroCardStyle = {},
  mediaFrameStyle = {},
  mediaStyle = {},
  children
}) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (mediaType !== "video" || !mediaSrc || !videoRef.current) {
      return
    }

    const attemptPlayback = async () => {
      try {
        await videoRef.current.play()
      } catch (error) {
        // Ignore autoplay failures; browser policies may still block playback.
      }
    }

    attemptPlayback()
  }, [mediaType, mediaSrc])

  return (
    <section style={{ ...styles.page, ...pageStyle }}>
      <div style={{ ...styles.heroCard, ...heroCardStyle }}>
        <div style={styles.copyColumn}>
          {/* <p style={styles.eyebrow}>Mental Health</p> */}
          <h1 style={styles.title}>{title}</h1>
          <p style={styles.intro}>{intro}</p>
        </div>

        {mediaType === "video" && mediaSrc ? (
          <div style={{ ...styles.mediaFrame, ...mediaFrameStyle }}>
            <video
              ref={videoRef}
              style={{ ...styles.media, ...mediaStyle }}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src={mediaSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div style={styles.imagePlaceholder}>
            <span style={styles.imageText}>{imageLabel}</span>
          </div>
        )}
      </div>

      <div style={styles.contentGrid}>
        <article style={styles.card}>
          <h2 style={styles.cardTitle}>About This Condition</h2>
          <ul style={styles.list}>
            {disorderPoints.map((point) => (
              <li key={point} style={styles.listItem}>
                {point}
              </li>
            ))}
          </ul>
        </article>

        <article style={styles.card}>
          <h2 style={styles.cardTitle}>Helpful Support Ideas</h2>
          <ul style={styles.list}>
            {solutionPoints.map((point) => (
              <li key={point} style={styles.listItem}>
                {point}
              </li>
            ))}
          </ul>
        </article>
      </div>

      {children}
    </section>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
    padding: "48px 20px 80px"
  },
  heroCard: {
    maxWidth: "1100px",
    margin: "0 auto 32px",
    background: "white",
    borderRadius: "24px",
    padding: "32px",
    boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.3fr) minmax(260px, 0.7fr)",
    gap: "24px",
    alignItems: "center"
  },
  copyColumn: {
    textAlign: "left"
  },
  eyebrow: {
    margin: "0 0 8px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#e6eceb",
    fontWeight: "700",
    fontSize: "20px"
  },
  title: {
    margin: "0 0 16px",
    fontSize: "42px",
    color: "#0f172a"
  },
  intro: {
    margin: 0,
    color: "#475569",
    fontSize: "18px",
    lineHeight: "1.7"
  },
  imagePlaceholder: {
    minHeight: "260px",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #c7f9cc, #bfdbfe)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px dashed #0f766e",
    textAlign: "center",
    padding: "24px"
  },
  mediaFrame: {
    minHeight: "260px",
    borderRadius: "20px",
    overflow: "hidden",
    background: "#0f172a"
  },
  media: {
    width: "100%",
    height: "100%",
    minHeight: "260px",
    display: "block",
    objectFit: "cover"
  },
  imageText: {
    color: "#0f172a",
    fontWeight: "700",
    fontSize: "18px"
  },
  contentGrid: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px"
  },
  card: {
    background: "rgba(236, 238, 242, 0.61)",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)"
  },
  cardTitle: {
    marginTop: 0,
    marginBottom: "16px",
    color: "#0f172a"
  },
  list: {
    margin: 0,
    paddingLeft: "20px",
    color: "#334155",
    lineHeight: "1.8"
  },
  listItem: {
    marginBottom: "10px"
  }
}

export default MentalHealthArticlePage
