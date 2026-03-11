import Hero from "../components/Hero";
import FeatureCards from "../components/FeatureCards";
// import MotivationQuotes from "../components/MotivationQuotes";
import MotivationQuotes from "../components/MotivationQuotes";
import CommunityFeed from "../components/CommunityFeed";
import colors from "../theme/colors";
function Home() {
  return (
    <main
      style={{
        background: colors.background,
        color: colors.text,
        minHeight: "100vh",
        paddingBottom: "40px"
      }}
    >
      <Hero />

      <FeatureCards />



      {/* Motivation preview section */}
      <section style={{padding:"60px 20px", textAlign:"center"}}>
        {/* <h2>Daily Motivation</h2> */}
        {/* <MotivationQuotes /> */}
      </section>

      <MotivationQuotes />

      {/* <MotivationQuotes /> */}



      <CommunityFeed />
    </main>
  );
}

export default Home;