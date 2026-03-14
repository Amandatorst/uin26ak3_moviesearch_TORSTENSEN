import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Movie() {
  const { id } = useParams(); // Dette er nå imdbID
  const [film, setFilm] = useState(null);
  const apiKey = import.meta.env.VITE_APP_API_KEY;

  useEffect(() => {
    const getMovie = async () => {
      // Vi søker med 'i=' (ID) i stedet for 't=' (tittel) for 100% treffsikkerhet
      const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
      const data = await response.json();
      setFilm(data);
    };
    getMovie();
  }, [id, apiKey]);

  if (!film) return <p>Laster film...</p>;

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
            <p><strong>Plot:</strong> {film.Plot}</p>
          <Link to="/">
            <button type="button">Tilbake til forsiden</button>
          </Link>
        </section>
      </article>
    </main>
  );
}