import MentalHealthArticlePage from "../components/MentalHealthArticlePage"
import SelfConceptDiary from "../components/SelfConceptDiary"

function SelfConceptPage() {
  return (
    <MentalHealthArticlePage
      title="Self Concept"
      intro="Self concept is the way a person sees their own identity, worth, strengths, habits, and potential. This page includes a private diary so users can reflect on themselves and save their thoughts."
      disorderPoints={[
        "A weak self concept can show up as self-doubt, harsh inner criticism, fear of judgment, or difficulty trusting your own abilities.",
        "It often affects confidence, communication, and the willingness to try new things.",
        "Self concept usually develops through life experiences, relationships, feedback, and repeated self-talk."
      ]}
      solutionPoints={[
        "Positive self-reflection helps build a more realistic and compassionate view of yourself.",
        "Tracking wins, habits, and effort over time helps confidence grow from evidence instead of mood.",
        "Supportive people, therapy, and journaling can improve self-awareness and emotional stability."
      ]}
      imageLabel="Add a self concept-related image here later"
    >
      <SelfConceptDiary />
    </MentalHealthArticlePage>
  )
}

export default SelfConceptPage
