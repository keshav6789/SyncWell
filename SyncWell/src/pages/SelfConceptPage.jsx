import MentalHealthArticlePage from "../components/MentalHealthArticlePage"
import SelfConceptDiary from "../components/SelfConceptDiary"

function SelfConceptPage() {
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
        <source src="/video/selfBG.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={styles.overlay} />

      <div style={styles.content}>
        <MentalHealthArticlePage
          pageStyle={styles.articlePage}
          title="Self Concept"
          intro="Self concept is the way a person sees their own identity, worth, strengths, habits, and potential. This page includes a private diary so users can reflect on themselves and save their thoughts."
          disorderPoints={[
            "A weak self concept can appear as constant self-doubt, negative self-talk, and feeling unsure about your own abilities or decisions.",
            "People with a poor self concept often compare themselves with others and may feel that they are not good enough.",
            "It can lead to low confidence, fear of failure, difficulty expressing opinions, and hesitation when trying new opportunities.",
            "Negative self concept may develop from past experiences such as criticism, rejection, bullying, or lack of emotional support.",
            "A weak self concept can show up as harsh inner criticism, fear of judgment, or difficulty trusting your own abilities.",
            "It often affects confidence, communication, and the willingness to try new things.",
            "Self concept usually develops through life experiences, relationships, feedback, and repeated self-talk."
          ]}
          solutionPoints={[
            "Positive self-reflection helps build a more realistic and compassionate view of yourself.",
            "Tracking wins, habits, and effort over time helps confidence grow from evidence instead of mood.",
            "Supportive people, therapy, and journaling can improve self-awareness and emotional stability.",
            "Reach out to someone you trust.",
            "Follow a simple daily routine.",
            "Spend time in sunlight and fresh air.",
            "Seek professional support when needed.",
            "Accept yourself and your imperfections.",
            "Focus on personal growth.",
            "Set realistic goals.",
            "Practice positive self-talk."
          ]}
          imageLabel="Add a self concept-related image here later"
        >
          <SelfConceptDiary />
        </MentalHealthArticlePage>
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
    transform: "rotate(-90deg) scale(1.78)",
    transformOrigin: "center",
    zIndex: -2
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15, 23, 42, 0.42)",
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

export default SelfConceptPage
