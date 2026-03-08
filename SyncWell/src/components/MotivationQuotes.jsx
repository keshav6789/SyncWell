import { useState } from "react"

function MotivationQuotes() {

const quotes = [
"Believe in yourself",
"Your mental health matters",
"Small progress is still progress",
"Take care of your body and mind"
]

const [quote,setQuote] = useState(quotes[0])

function newQuote(){
const random = Math.floor(Math.random()*quotes.length)
setQuote(quotes[random])
}

return(
<section>
<h2>Motivation</h2>

<p>{quote}</p>

<button onClick={newQuote}>New Quote</button>

</section>
)

}

export default MotivationQuotes