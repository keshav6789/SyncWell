import MentalHealthArticlePage from "../components/MentalHealthArticlePage"

function AnxietyPage() {
  return (
    <MentalHealthArticlePage
      title="Anxiety"
      intro="Anxiety can feel like constant worry, physical tension, racing thoughts, and fear about what may happen next. This page now exists as a dedicated place where you can keep adding richer content and images later."
      disorderPoints={[
        "Anxiety may show up as restlessness, overthinking, fast heartbeat, sweating, or difficulty sleeping.",
        "It can affect work, study, relationships, and confidence when stress remains high for a long time.",
        "Triggers vary from person to person and can include uncertainty, pressure, conflict, or past experiences."
      ]}
      solutionPoints={[
        "Slow breathing exercises and grounding techniques can reduce the immediate intensity of anxious thoughts.",
        "Daily routines such as regular sleep, movement, hydration, and reduced caffeine often help stabilise symptoms.",
        "Talking to a trusted person or a mental health professional can help when anxiety becomes hard to manage."
      ]}
      imageLabel="Add an anxiety-related image here later"
    />
  )
}

export default AnxietyPage
