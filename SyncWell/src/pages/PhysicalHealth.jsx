import Workout from "../components/Workout"
import BMICalculator from "../components/BMICalculator"
import CalorieCalculator from "../components/CalorieCalculator"

function PhysicalHealth(){

return(

<section style={styles.page}>
<video
style={styles.backgroundVideo}
autoPlay
loop
muted
playsInline
preload="auto"
>
<source src="/video/physical.mp4" type="video/mp4" />
Your browser does not support the video tag.
</video>

<div style={styles.overlay} />

<div style={styles.content}>
{/* <h1>Physical Health</h1> */}

<Workout pageStyle={styles.workoutPage} />

{/* <BMICalculator/> */}

<CalorieCalculator/>
</div>
</section>

)

}

const styles = {
page:{
position:"relative",
minHeight:"100vh",
overflow:"hidden"
},
backgroundVideo:{
position:"fixed",
inset:0,
width:"100%",
height:"100%",
objectFit:"cover",
zIndex:-2
},
overlay:{
position:"fixed",
inset:0,
background:"rgba(15, 23, 42, 0.38)",
zIndex:-1
},
content:{
position:"relative",
zIndex:1
},
workoutPage:{
background:"transparent"
}
}

export default PhysicalHealth
