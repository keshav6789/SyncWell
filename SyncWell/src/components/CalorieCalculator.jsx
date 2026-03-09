import { useState } from "react"

function CalorieCalculator(){

const [weight,setWeight] = useState("")
const [height,setHeight] = useState("")
const [age,setAge] = useState("")
const [gender,setGender] = useState("male")

const [maintenance,setMaintenance] = useState(null)

function calculateCalories(){

let bmr

if(gender === "male"){
bmr = 10*weight + 6.25*height - 5*age + 5
}else{
bmr = 10*weight + 6.25*height - 5*age - 161
}

// assuming moderate activity
const maintenanceCalories = Math.round(bmr * 1.55)

setMaintenance(maintenanceCalories)

}

const bulking = maintenance ? maintenance + 300 : null
const cutting = maintenance ? maintenance - 400 : null

return(

<section style={styles.container}>

<h2>🔥 Calorie & Diet Planner</h2>

<div style={styles.inputs}>

<input
type="number"
placeholder="Weight (kg)"
value={weight}
onChange={(e)=>setWeight(e.target.value)}
/>

<input
type="number"
placeholder="Height (cm)"
value={height}
onChange={(e)=>setHeight(e.target.value)}
/>

<input
type="number"
placeholder="Age"
value={age}
onChange={(e)=>setAge(e.target.value)}
/>

<select onChange={(e)=>setGender(e.target.value)}>
<option value="male">Male</option>
<option value="female">Female</option>
</select>

<button onClick={calculateCalories}>
Calculate Calories
</button>

</div>

{maintenance && (

<div style={styles.result}>

<h3>Daily Calories</h3>

<p>Maintenance Calories: <b>{maintenance} kcal</b></p>

<p>Bulking Calories: <b>{bulking} kcal</b></p>

<p>Fat Loss Calories: <b>{cutting} kcal</b></p>

</div>

)}

{maintenance && (

<div style={styles.dietSection}>

<h3>🍗 Bulking Diet Example</h3>

<ul>
<li>Breakfast: Oats + Milk + Banana</li>
<li>Lunch: Rice + Chicken + Vegetables</li>
<li>Snack: Peanut Butter Sandwich</li>
<li>Dinner: Eggs / Paneer + Roti</li>
</ul>

<h3>🥗 Fat Loss Diet Example</h3>

<ul>
<li>Breakfast: Eggs / Greek Yogurt</li>
<li>Lunch: Grilled Chicken / Paneer + Salad</li>
<li>Snack: Fruits or Nuts</li>
<li>Dinner: Vegetables + Protein source</li>
</ul>

</div>

)}

</section>

)

}

const styles = {

container:{
padding:"60px",
background:"#f6f7fb"
},

inputs:{
display:"flex",
gap:"10px",
flexWrap:"wrap",
marginBottom:"20px"
},

result:{
background:"white",
padding:"20px",
borderRadius:"10px",
marginTop:"20px"
},

dietSection:{
background:"white",
padding:"20px",
borderRadius:"10px",
marginTop:"20px"
}

}

export default CalorieCalculator