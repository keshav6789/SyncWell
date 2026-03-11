import Hero from "../components/Hero";
import FeatureCards from "../components/FeatureCards";
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

      {/* <MotivationQuotes /> */}

      <CommunityFeed />
    </main>
  );
}

export default Home;