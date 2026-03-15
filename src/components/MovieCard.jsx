import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  const placeholder = "https://placehold.co/300x450?text=Ingen+plakat";
  
  const slug = movie.Title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
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