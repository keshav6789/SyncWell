import Hero from "../components/Hero";
import FeatureCards from "../components/FeatureCards";
// import MotivationQuotes from "../components/MotivationQuotes";

function Home() {
  return (
    <main>

      {/* Hero section */}
      <Hero />

      {/* Main features of the website */}
      <FeatureCards />

      {/* Motivation preview section */}
      <section style={{padding:"60px 20px", textAlign:"center"}}>
        {/* <h2>Daily Motivation</h2> */}
        {/* <MotivationQuotes /> */}
      </section>

    </main>
  );
}

export default Home;