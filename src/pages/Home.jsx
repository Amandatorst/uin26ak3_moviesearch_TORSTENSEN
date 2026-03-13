import { useEffect, useState } from "react"
import History from "../components/History"
import Bond from "../components/Bond"
import OtherMovies from "../components/OtherMovies"

export default function Home(){
    const [search, setSearch] = useState()
    const storedHistory = localStorage.getItem("search")
    const [focused, setFocused] = useState(false)
    
    const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : [])

    console.log("Denne kommer fra storage", storedHistory)

    const baseUrl = `http://www.omdbapi.com/?s=${search}&apikey=`
    const apiKey = import.meta.env.VITE_APP_API_KEY

    useEffect(()=>{
            localStorage.setItem("search", JSON.stringify(history))
    }, [history])
 
    const getMovies = async()=>{
        try
        {
            const response = await fetch(`${baseUrl}${apiKey}`)
            const data = await response.json()
            console.log(data)
        }
        catch(err){
            console.error.err;
        }
    }

    const handleChange = (e)=>{
        setSearch(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        e.target.reset()

        setHistory((prev) => [...prev, search])

    }

    console.log(history)


    return(
    <main>
        <h1>Forside</h1>
        <form onSubmit={handleSubmit}> {/*Skjema for å søke etter filmer*/}
            <label>
                Søk etter film
            <input type="search" placeholder="Care Bears" onChange={handleChange} onFocus={()=> setFocused(true)} ></input>
            </label>
            {focused ? <History history={history} setSearch={setSearch}/> : null}
            <button onClick={getMovies}>Søk</button> {/*Endre til at søket trigges ved minimun tre tegn er skrevet*/}
        </form>
        
       


        <section id="bondFilmer">
        <h2>James Bond</h2>
            <ul className="screen">
                <Bond />        {/*Sett inn funksjon for å vise ti James Bond filmer med tittel, bilde, og utgivelsesår her */}
            </ul>
        </section>

        <section id="alleFilmer">
        <h2>Andre filmer</h2>
            <ul className="screen">
                <OtherMovies />             {/*Sett inn funksjon for å vise ti vanlige filmer med tittel, bilde, og utgivelsesår her */}
            </ul>
        </section>

    </main>
    )
}