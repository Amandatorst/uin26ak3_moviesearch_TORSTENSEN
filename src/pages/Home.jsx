import { useEffect, useState } from "react"
import History from "../components/History"
import Bond from "../components/Bond"
import OtherMovies from "../components/OtherMovies"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"


export default function Home(){

const [search, setSearch] = useState("")
const storedHistory = localStorage.getItem("search")
const [focused, setFocused] = useState(false)

const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : [])
const [movies, setMovies] = useState([])

console.log("Denne kommer fra storage", storedHistory)

const apiKey = import.meta.env.VITE_APP_API_KEY

useEffect(()=>{
    localStorage.setItem("search", JSON.stringify(history))
}, [history])


// HENT FILMER FRA API
const getMovies = async (value) => {

    if(value.length < 3){
        setMovies([])
        return
    }

    try{

        const response = await fetch(`https://www.omdbapi.com/?s=${value}&type=movie&apikey=${apiKey}`)
        const data = await response.json()

        console.log(data)

        if(data.Search){
            setMovies(data.Search.slice(0,10))
        }

    }

    catch(err){
        console.error(err)
    }

}


// NÅR MAN SKRIVER I INPUT
const handleChange = (e)=>{

    const value = e.target.value
    setSearch(value)
    getMovies(value)

}


// NÅR MAN TRYKKER SØK
const handleSubmit = (e)=>{
    e.preventDefault()
    e.target.reset()

    setHistory((prev) => [...prev, search])
}


console.log(history)


return(
<main>

<h1>Filmregister</h1>

<form onSubmit={handleSubmit}>
<label>
    Søk etter film
<input 
type="search" 
placeholder="Care Bears" 
onChange={handleChange} 
onFocus={()=> setFocused(true)}
></input>
</label>

{focused ? <History history={history} setSearch={setSearch}/> : null}
<button>Søk</button>
</form>


{/* HVIS 3+ BOKSTAVER → VIS SØKERESULTAT */}
{search.length >= 3 ? (

<section id="searchresults">

<h2>Søkeresultat</h2>
<ul className="screen">
{movies.map(movie => (
<li key={movie.imdbID}>
<Link to={`/${movie.imdbID}`}>
{movie.Poster !== "N/A" 
  ? <img src={movie.Poster} alt={movie.Title} /> 
  : <img src="https://placeholder.co/10x10" alt="Bildet er utilgjengelig" />
}

<h3>{movie.Title}</h3>
</Link>
<p>{movie.Year}</p>

</li>

))}

</ul>

</section>

) : (

<>

<h2>James Bond</h2>
<section id="bondFilmer">
<ul className="screen">
    <Bond />
</ul>
</section>


<h2>Andre filmer</h2>
<section id="alleFilmer">
    <ul className="screen">
        <OtherMovies />
    </ul>
</section>
</>

)}

</main>
)
}