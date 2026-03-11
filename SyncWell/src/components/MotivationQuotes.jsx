import { useState, useEffect } from "react"

function MentalHealthSection(){

const quotes = [
"Believe in yourself and all that you are.",
"You are stronger than your anxiety.",
"Small progress is still progress.",
"Peace begins with a deep breath.",
"Your mental health matters.",
"Growth takes time, keep going."
]

const [quote,setQuote] = useState(quotes[0])

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

{/* Motivation Quote */}
<div style={styles.quoteCard}>
<h3>✨ Daily Motivation</h3>
<p style={styles.quote}>{quote}</p>
</div>


{/* Overthinking */}
<div style={styles.card}>
<h2>🧠 Overthinking</h2>

<p>
Overthinking happens when the mind continuously analyzes situations or thoughts,
which can create stress and anxiety.
</p>

<h4>How to Deal With Overthinking</h4>

<ul>
<li>Practice mindfulness and focus on the present moment.</li>
<li>Write your thoughts in a journal.</li>
<li>Limit negative self-talk.</li>
<li>Take breaks and do relaxing activities.</li>
</ul>

</div>


{/* Anxiety */}
<div style={styles.card}>
<h2>😌 Anxiety</h2>

<p>
Anxiety is a feeling of worry or fear that can affect how you think,
feel and behave.
</p>

<h4>How to Manage Anxiety</h4>

<ul>
<li>Practice deep breathing exercises.</li>
<li>Exercise regularly.</li>
<li>Talk with friends, family or a therapist.</li>
<li>Reduce caffeine and improve sleep habits.</li>
</ul>

</div>


{/* Depression */}
<div style={styles.card}>
<h2>🌿 Depression</h2>

<p>
Depression can cause feelings of sadness, lack of motivation and loss of
interest in daily activities.
</p>

<h4>Ways to Cope With Depression</h4>

<ul>
<li>Stay connected with supportive people.</li>
<li>Create small achievable daily goals.</li>
<li>Exercise or take short walks.</li>
<li>Seek professional help when needed.</li>
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