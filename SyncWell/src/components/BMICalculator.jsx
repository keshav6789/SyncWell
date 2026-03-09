import { useState } from "react";

function BMICalculator() {

const [height,setHeight] = useState("");
const [weight,setWeight] = useState("");
const [bmi,setBmi] = useState(null);
const [category,setCategory] = useState("");

function calculateBMI(){

if(!height || !weight) return;

const h = height/100;
const result = weight/(h*h);
const value = result.toFixed(2);

setBmi(value);

if(result < 18.5){
setCategory("Underweight");
}
else if(result < 25){
setCategory("Normal");
}
else if(result < 30){
setCategory("Overweight");
}
else{
setCategory("Obese");
}

}

const getColor = () => {
if(category === "Normal") return "#16a34a";
if(category === "Underweight") return "#3b82f6";
if(category === "Overweight") return "#f59e0b";
if(category === "Obese") return "#ef4444";
return "#374151";
}

return(

<section style={{
maxWidth:"420px",
margin:"40px auto",
padding:"30px",
borderRadius:"18px",
background:"linear-gradient(135deg,#eef2ff,#ffffff)",
boxShadow:"0 10px 25px rgba(0,0,0,0.08)",
fontFamily:"Arial"
}}>

<h2 style={{
textAlign:"center",
marginBottom:"20px",
color:"#111827"
}}>
BMI Calculator
</h2>

<input
type="number"
placeholder="Height (cm)"
value={height}
onChange={(e)=>setHeight(e.target.value)}
style={{
width:"100%",
padding:"12px",
marginBottom:"12px",
borderRadius:"10px",
border:"1px solid #d1d5db",
fontSize:"15px"
}}
/>

<input
type="number"
placeholder="Weight (kg)"
value={weight}
onChange={(e)=>setWeight(e.target.value)}
style={{
width:"100%",
padding:"12px",
marginBottom:"18px",
borderRadius:"10px",
border:"1px solid #d1d5db",
fontSize:"15px"
}}
/>

<button
onClick={calculateBMI}
style={{
width:"100%",
padding:"12px",
border:"none",
borderRadius:"10px",
background:"#2563eb",
color:"#ffffff",
fontWeight:"bold",
fontSize:"16px",
cursor:"pointer"
}}
>
Calculate BMI
</button>

{bmi && (

<div style={{
marginTop:"20px",
textAlign:"center",
padding:"18px",
borderRadius:"12px",
background:"#f9fafb"
}}>

<h3 style={{marginBottom:"6px"}}>
Your BMI: {bmi}
</h3>

<p style={{
color:getColor(),
fontWeight:"bold",
fontSize:"16px"
}}>
{category}
</p>

</div>

)}

</section>

)

}

export default BMICalculator