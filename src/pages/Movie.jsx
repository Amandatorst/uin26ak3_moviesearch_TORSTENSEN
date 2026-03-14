import { useEffect, useState } from "react"
import History from "../components/History"
import Bond from "../components/Bond"
import OtherMovies from "../components/OtherMovies"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"

export default function Movie() {
  // 1. Endre fra { movie } til { id }
  const { id } = useParams(); 
  const [film, setFilm] = useState(null);
  const apiKey = import.meta.env.VITE_APP_API_KEY;

  useEffect(() => {
    const getMovie = async () => {
      const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
      const data = await response.json();
      
      console.log(data);
      setFilm(data);
    };

    getMovie();
  }, [id, apiKey]);

  if (!film) {
    return <p>Laster film...</p>;
  }

const placeholder = "https://placehold.jp/24/ffffff/888888/100x160.png?text=Ingen%20bilde"
const poster =
film.Poster && film.Poster !== "N/A"
? film.Poster
: placeholder

return(

<main className="movie-page">

<section className="movie-card">

<img
src={poster}
alt={film.Title}
onError={(e) => {
e.target.src = placeholder
}}
/>

<section className="movie-info">

<h1>{film.Title}</h1>

<p><strong>Utgivelsesår:</strong> {film.Year}</p>
<p><strong>Sjanger:</strong> {film.Genre}</p>
<p><strong>Regissør:</strong> {film.Director}</p>
<p><strong>Skuespillere:</strong> {film.Actors}</p>

<Link to="/">
<button>Tilbake til forsiden</button>
</Link>

</section>
</section>

</main>

)

}