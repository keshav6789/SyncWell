function Workout(){

const workouts = [
"Pushups",
"Squats",
"Plank",
"Jumping Jacks",
"Lunges"
]

return(

<section>

<h2>Home Workout</h2>

<ul>

{workouts.map((workout,index)=>(
<li key={index}>{workout}</li>
))}

</ul>

</section>

)

}

export default Workout