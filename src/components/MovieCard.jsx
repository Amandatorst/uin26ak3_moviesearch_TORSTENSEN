import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  // Din originale placeholder-link
  const placeholder = "https://placehold.co/300x450?text=Ingen+plakat";

  // Vi bruker imdbID som slug for å være 100% sikre på at Movie.jsx finner filmen
  return (
    <li>
      <article>
        <Link to={`/${movie.imdbID}`}>
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : placeholder}
            alt={movie.Title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = placeholder;
            }}
          />
          <h3>{movie.Title}</h3>
        </Link>
        <p>{movie.Year}</p>
      </article>
    </li>
  );
}