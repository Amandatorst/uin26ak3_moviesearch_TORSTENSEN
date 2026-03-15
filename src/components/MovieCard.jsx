import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  const placeholder = "https://placehold.co/300x450?text=Ingen+plakat";
  
  // Vi lager en slug, men legger til ID-en til slutt for sikkerhet
  const slug = movie.Title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
  // URL-en blir nå f.eks: /skyfall-tt1074638
  const movieUrl = `/${slug}-${movie.imdbID}`;

  return (
    <li>
      <article>
        <Link to={movieUrl}>
          <img 
            src={movie.Poster !== "N/A" ? movie.Poster : placeholder} 
            alt={movie.Title} 
            onError={(e) => { e.target.src = placeholder; }}
          />
          <h3>{movie.Title}</h3>
        </Link>
        <p>{movie.Year}</p>
      </article>
    </li>
  );
}