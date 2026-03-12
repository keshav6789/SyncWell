import MentalHealthArticlePage from "../components/MentalHealthArticlePage"

function DepressionPage() {
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
        <source src="/video/depressionBG.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={styles.overlay} />

      <div style={styles.content}>
        <MentalHealthArticlePage
          pageStyle={styles.articlePage}
          title="Depression"
          intro="Depression is more than temporary sadness. It can change energy, motivation, sleep, appetite, and the way a person sees themselves and the future. This page is set up so you can continue adding detailed content and images later."
          disorderPoints={[
            "Symptoms can include persistent sadness, low energy, loss of interest, hopelessness, and withdrawal from others.",
            "Depression can affect school, work, routines, relationships, and physical health.",
            "The reasons behind depression are often a mix of emotional, social, biological, and environmental factors."
          ]}
          solutionPoints={[
            "Professional support is important when low mood becomes intense, frequent, or long-lasting.",
            "Small routines such as getting sunlight, eating regularly, moving the body, and maintaining sleep can help support recovery.",
            "Reaching out early to trusted people can reduce isolation and make recovery more manageable."
          ]}
          imageLabel="Add a depression-related image here later"
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
  }
}

export default DepressionPage
