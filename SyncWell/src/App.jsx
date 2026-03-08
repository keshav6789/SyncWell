import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import MentalHealth from "./pages/MentalHealth"
import PhysicalHealth from "./pages/PhysicalHealth"
import HabitTracker from "./components/HabitTracker"

import { Routes, Route } from "react-router-dom"

function App(){

return(

<>

<Navbar/>

<Routes>

<Route path="/" element={<Home/>} />
<Route path="/mental" element={<MentalHealth/>} />
<Route path="/physical" element={<PhysicalHealth/>} />
<Route path="/tracker" element={<HabitTracker/>} />

</Routes>

<Footer/>

</>

)

}

export default App