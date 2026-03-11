import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function MentalHealthSection(){

const quotes = [
"Every day is a fresh start.",
"Your mental health matters.",
"Growth takes time, keep going.",
"As long as you are alive, there are infinite chances.",
"Don't cry for what you lost, be grateful for what you have.",
"Don't depend on others.",
"The world is cruel, but also very beautiful.",
"Life is short so live it.",
"You must be the one to determine your own value and path.",
"Stop waiting for luck and actively change your situation."
]

const [quote,setQuote] = useState(quotes[0])
const navigate = useNavigate()

useEffect(()=>{

const interval = setInterval(()=>{

const random = Math.floor(Math.random()*quotes.length)
setQuote(quotes[random])

},5000)

return ()=>clearInterval(interval)

},[])

const openPage = (slug)=>{
navigate(`/mental/${slug}`)
}

const handleKeyDown = (event,slug)=>{
if(event.key==="Enter" || event.key===" "){
event.preventDefault()
openPage(slug)
}
}

return(

<section style={styles.section}>

<h1 style={styles.mainHeading}>Mental Health Support</h1>

<div style={styles.quoteCard}>
<h3>✨ Daily Motivation</h3>
<p style={styles.quote}>{quote}</p>
</div>


{/* Overthinking */}

<div
style={styles.card}
onClick={()=>openPage("overthinking")}
onKeyDown={(event)=>handleKeyDown(event,"overthinking")}
role="button"
tabIndex={0}
>

<h2 style={styles.cardTitle}>🧠 Overthinking</h2>

<p>
Overthinking happens when the mind repeatedly analyzes the same thoughts,
which can lead to stress and mental fatigue.
</p>

<ol>
<li>Practice deep breathing.</li>
<li>Write your thoughts in a journal.</li>
<li>Focus on the present moment.</li>
<li>Limit negative self-talk.</li>
</ol>

</div>


{/* Anxiety */}

<div
style={styles.card}
onClick={()=>openPage("anxiety")}
onKeyDown={(event)=>handleKeyDown(event,"anxiety")}
role="button"
tabIndex={0}
>

<h2 style={styles.cardTitle}>😌 Anxiety</h2>

<p>
Anxiety is a feeling of worry or fear that can affect daily life and
emotional well-being.
</p>

<ol>
<li>Practice mindfulness meditation.</li>
<li>Take slow deep breaths.</li>
<li>Exercise regularly.</li>
<li>Talk with supportive people.</li>
</ol>

</div>


{/* Stress */}

<div
style={styles.card}
onClick={()=>openPage("stress")}
onKeyDown={(event)=>handleKeyDown(event,"stress")}
role="button"
tabIndex={0}
>

<h2 style={styles.cardTitle}>🌿 Stress Management</h2>

<p>
Stress is a natural part of life, but managing it properly improves focus,
energy and emotional balance.
</p>

<ol>
<li>Take regular breaks.</li>
<li>Follow a consistent sleep routine.</li>
<li>Spend time doing relaxing activities.</li>
<li>Break big tasks into smaller steps.</li>
</ol>

</div>


{/* Self Concept */}

<div
style={styles.card}
onClick={()=>openPage("self-concept")}
onKeyDown={(event)=>handleKeyDown(event,"self-concept")}
role="button"
tabIndex={0}
>

<h2 style={styles.cardTitle}>🌸 Self Concept</h2>

<p>
Self concept is the way you see and understand yourself.
A positive self concept builds confidence and emotional stability.
</p>

<ol>
<li>Accept yourself and your imperfections.</li>
<li>Focus on personal growth.</li>
<li>Set realistic goals.</li>
<li>Practice positive self-talk.</li>
</ol>

</div>

</section>

)

}


const styles={

section:{
padding:"80px 20px",
background:"#f5f7fb"
},

mainHeading:{
textAlign:"center",
fontSize:"40px",
marginBottom:"40px"
},

quoteCard:{
background:"#22c55e",
color:"white",
padding:"30px",
borderRadius:"10px",
maxWidth:"600px",
margin:"0 auto 40px auto",
textAlign:"center"
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
cursor:"pointer"
},

cardTitle:{
textAlign:"center",
marginBottom:"15px",
fontSize:"26px"
}

}

export default MentalHealthSection