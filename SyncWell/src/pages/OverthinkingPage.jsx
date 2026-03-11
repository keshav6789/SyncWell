import MentalHealthArticlePage from "../components/MentalHealthArticlePage"

function OverthinkingPage() {
  return (
    <MentalHealthArticlePage
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
        "Mindfulness, movement, and breaks from screens can interrupt the overthinking loop."
      ]}
      imageLabel="Add an overthinking-related image here later"
    />
  )
}

export default OverthinkingPage
