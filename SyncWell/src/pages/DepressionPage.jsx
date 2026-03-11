import MentalHealthArticlePage from "../components/MentalHealthArticlePage"

function DepressionPage() {
  return (
    <MentalHealthArticlePage
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
  )
}

export default DepressionPage
