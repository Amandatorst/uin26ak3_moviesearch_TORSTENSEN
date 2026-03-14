import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"


export default function OtherMovies(){

  const [movies, setMovies] = useState([])
  const apiKey = import.meta.env.VITE_APP_API_KEY

  useEffect(() => {

    const getMovies = async () => {
      const response = await fetch(`https://www.omdbapi.com/?s=movie&type=movie&apikey=${apiKey}`)
      const data = await response.json()

      if(data.Search){
        setMovies(data.Search.slice(0,10))
      }
    }

    getMovies()

  }, [])

  return(

    <>
      {movies.map(movie => (

       <li key={movie.imdbID}>
  <article>

<Link to={`/${movie.imdbID}`}>      
{movie.Poster !== "N/A" 
  ? <img src={movie.Poster} alt={movie.Title} /> 
  : <img src="https://placeholder.co/10x10" alt="Bildet er utilgjengelig" />
}
      <h3>{movie.Title}</h3>
    </Link>
    <p>{movie.Year}</p>
  </article>
</li>

      ))}
    </>
  )
}