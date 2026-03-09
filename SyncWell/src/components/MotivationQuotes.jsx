import { useState, useEffect } from "react"

function MentalHealthSection(){

const quotes = [
"Believe in yourself and all that you are.",
"You are stronger than your anxiety.",
"Small progress is still progress.",
"Peace begins with a deep breath.",
"Every day is a fresh start.",
"Your mental health matters.",
"Growth takes time, keep going."
]

const [quote,setQuote] = useState(quotes[0])

// Auto change quote every 5 seconds
useEffect(()=>{
const interval = setInterval(()=>{
const random = Math.floor(Math.random()*quotes.length)
setQuote(quotes[random])
},5000)

return ()=>clearInterval(interval)

},[])

return(

<section style={styles.section}>

<h1 style={styles.mainHeading}>🧠 Mental Health Support</h1>

{/* Random Motivation Quote */}

<div style={styles.quoteCard}>
<h3>✨ Daily Motivation</h3>
<p style={styles.quote}>{quote}</p>
</div>

{/* Overthinking Section */}

<div style={styles.card}>
<h2>🧠 Overthinking</h2>

<p>
Overthinking happens when the mind continuously analyzes the same thoughts.
It can create stress and reduce productivity.
</p>

<ul>
<li>Practice deep breathing</li>
<li>Write your thoughts in a journal</li>
<li>Focus on the present moment</li>
<li>Limit negative self-talk</li>
</ul>

</div>

{/* Anxiety Section */}

<div style={styles.card}>
<h2>😌 Anxiety</h2>

<p>
Anxiety is a natural response to stress, but when it becomes excessive it can
affect daily life and mental well-being.
</p>

<ul>
<li>Try mindfulness meditation</li>
<li>Take slow deep breaths</li>
<li>Exercise regularly</li>
<li>Talk with supportive people</li>
</ul>

</div>

{/* Self Concept Section */}

<div style={styles.card}>
<h2>🌱 Self Concept</h2>

<p>
Self concept is the way you see and understand yourself. A healthy self concept
helps build confidence, emotional stability and better decision making.
</p>

<ul>
<li>Accept yourself and your imperfections</li>
<li>Focus on personal growth</li>
<li>Set realistic goals</li>
<li>Practice positive self-talk</li>
</ul>

</div>

</section>

)

}

const styles = {

section:{
padding:"80px 20px",
background:"#f5f7fb",
textAlign:"center"
},

mainHeading:{
fontSize:"40px",
marginBottom:"40px"
},

quoteCard:{
background:"#22c55e",
color:"white",
padding:"30px",
borderRadius:"10px",
maxWidth:"600px",
margin:"0 auto 40px auto"
},

quote:{
fontSize:"20px"
},

card:{
background:"white",
padding:"30px",
margin:"20px auto",
maxWidth:"700px",
borderRadius:"10px",
boxShadow:"0 6px 15px rgba(0,0,0,0.1)",
textAlign:"left"
}

}

export default MentalHealthSection