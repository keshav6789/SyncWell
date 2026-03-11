import MentalHealthArticlePage from "../components/MentalHealthArticlePage"

function AnxietyPage() {
  return (
    <MentalHealthArticlePage
      title="Anxiety"
      intro="Anxiety is a normal feeling of worry, fear, or unease. It happens when you face tough problems, like a big challange or choice. This helps you stay alert and handle stress better.
But if worry stays too long or gets too strong, it can stop you from doing daily things like work, school, or fun activities. That might mean you have an anxiety disorder."
      disorderPoints={[
        "Anxiety may show up as restlessness, overthinking, fast heartbeat, sweating, or difficulty sleeping.",
        "It can affect work, study, relationships, and confidence when stress remains high for a long time.",
        "Triggers vary from person to person and can include uncertainty, pressure, conflict, or past experiences."
      ]}
      solutionPoints={[
        "Slow breathing exercises and grounding techniques can reduce the immediate intensity of anxious thoughts.",
        "Daily routines such as regular sleep, movement, hydration, and reduced caffeine often help stabilise symptoms.",
        "Talking to a trusted person or a mental health professional can help when anxiety becomes hard to manage.",
        "Try mindfulness meditation",
        "Take slow deep breaths",
        "Exercise regularly",
        "Talk with supportive people"
      ]}
      imageLabel="Add an anxiety-related video here later"
      mediaType="video"
      mediaSrc="/video/anxiety.mp4"
      heroCardStyle={styles.heroCard}
      mediaFrameStyle={styles.mediaFrame}
      mediaStyle={styles.media}
    />
  )
}

const styles = {
  heroCard: {
    alignItems: "start"
  },
  mediaFrame: {
    height: "350px",
    minHeight: "180px"
  },
  media: {
    height: "350px",
    minHeight: "180px"
  }
}

export default AnxietyPage
