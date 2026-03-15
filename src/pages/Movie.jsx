import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Movie() {
  const { movie } = useParams(); // 'movie' inneholder nå "tittel-slug-ttID"
  const [film, setFilm] = useState(null);
  const apiKey = import.meta.env.VITE_APP_API_KEY;

  useEffect(() => {
    const getMovie = async () => {
      // Vi henter ut selve ID-en (det som starter på 'tt') fra slutten av sluggen
      const imdbID = movie.split("-").pop(); 
      
      // Vi bruker i=${imdbID} i stedet for t=
      // Dette garanterer at vi finner filmen hver gang!
      const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`);
      const data = await response.json();
      setFilm(data);
    };

    if (movie) getMovie();
  }, [movie, apiKey]);

  if (!film) return <p style={{color: "white", textAlign: "center"}}>Laster film...</p>;

  const placeholder = "https://placehold.co/300x450?text=Ingen+plakat";

  return (
    <main className="movie-page">
      <article className="movie-card">
        <h1>{film.Title}</h1>
        <img 
          src={film.Poster !== "N/A" ? film.Poster : placeholder} 
          alt={film.Title} 
          onError={(e) => { e.target.src = placeholder; }}
        />
        <section className="movie-info">
          <p><strong>Utgivelsesår:</strong> {film.Year}</p>
          <p><strong>Sjanger:</strong> {film.Genre}</p>
          <p><strong>Regissør:</strong> {film.Director}</p>
          <p><strong>Skuespillere:</strong> {film.Actors}</p>
          <section className="movie-plot">
            <p><strong>Handling:</strong></p>
            <p>{film.Plot !== "N/A" ? film.Plot : "Ingen beskrivelse tilgjengelig."}</p>
          </section>
          <Link to="/"><button type="button">Tilbake til forsiden</button></Link>
        </section>
      </article>
    </main>
  );
}