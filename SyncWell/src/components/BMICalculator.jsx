import { useState } from "react"

function BMICalculator(){

const [height,setHeight] = useState("")
const [weight,setWeight] = useState("")
const [bmi,setBmi] = useState("")

function calculateBMI(){

const h = height/100
const result = weight/(h*h)

setBmi(result.toFixed(2))

}

return(

<section>

<h2>BMI Calculator</h2>

<input
type="number"
placeholder="Height in cm"
onChange={(e)=>setHeight(e.target.value)}
/>

<input
type="number"
placeholder="Weight in kg"
onChange={(e)=>setWeight(e.target.value)}
/>

<button onClick={calculateBMI}>Calculate</button>

<h3>Your BMI: {bmi}</h3>

</section>

)

}

export default BMICalculator