import MentalHealthArticlePage from "../components/MentalHealthArticlePage"

function OverthinkingPage() {
  return (
    <section style={styles.page}>
      <video
        style={styles.backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/video/overthinkBG.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={styles.overlay} />

      <div style={styles.content}>
        <MentalHealthArticlePage
          pageStyle={styles.articlePage}
          heroCardStyle={styles.heroCard}
          title="Overthinking"
          intro="Overthinking happens when the mind keeps replaying situations, decisions, or future possibilities without reaching clarity. This dedicated page gives you a place to expand that topic later with more explanation and visuals."
          disorderPoints={[
            "People who overthink often repeat the same thoughts, replay conversations, or imagine negative outcomes again and again.",
            "It can lead to stress, indecision, poor concentration, and reduced productivity.",
            "Overthinking usually grows stronger when someone feels pressure to be perfect or avoid mistakes."
          ]}
          solutionPoints={[
            "Writing thoughts down can stop them from circling endlessly in the mind.",
            "Time-limited decision making helps reduce repeated second-guessing.",
            "Mindfulness, movement, and breaks from screens can interrupt the overthinking loop.",
            "Practice deep breathing",
            "Write your thoughts in a journal",
            "Focus on the present moment",
            "Limit negative self-talk"
          ]}
          imageLabel="Add an overthinking-related video here later"
          mediaType="video"
          mediaSrc="/video/overthinking.mp4"
        />
      </div>
    </section>
  )
}

const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
    zIndex: 0
  },
  backgroundVideo: {
    position: "fixed",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -2
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15, 23, 42, 0.45)",
    zIndex: -1
  },
  content: {
    position: "relative",
    zIndex: 1
  },
  articlePage: {
    background: "transparent"
  },
  heroCard: {
    background: "rgba(235, 237, 240, 0.67)",
    backdropFilter: "none",
    boxShadow: "none"
  }
}

export default OverthinkingPage
