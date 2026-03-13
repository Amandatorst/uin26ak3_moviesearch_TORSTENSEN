import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Bond(){

    

  const [bondMovies, setBondMovies] = useState([])
  const apiKey = import.meta.env.VITE_APP_API_KEY

  useEffect(() => {

    const getBondMovies = async () => {

      const response = await fetch(`https://www.omdbapi.com/?s=james+bond&apikey=${apiKey}`)
      const data = await response.json()

      if(data.Search){
        setBondMovies(data.Search.slice(0,10))
      }
    }

    getBondMovies()

  }, [])

  return (

    <>
      {bondMovies.map(movie => (

        <article key={movie.imdbID}>

          <Link to={`/${movie.Title}`}>

            {movie.Poster !== "N/A"
              ? <img src={movie.Poster} alt={movie.Title}/>
              : <p>No image</p>
            }

            <h3>{movie.Title}</h3>

          </Link>

          <p>{movie.Year}</p>

        </article>

      ))}
    </>
  )
}