import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

export default function Bond() {
  const [bondMovies, setBondMovies] = useState([]);
  const apiKey = import.meta.env.VITE_APP_API_KEY;

  useEffect(() => {
    const getBondMovies = async () => {
      const response = await fetch(`https://www.omdbapi.com/?s=james+bond&apikey=${apiKey}`);
      const data = await response.json();
      if (data.Search) {
        setBondMovies(data.Search.slice(0, 10));
      }
    };
    getBondMovies();
  }, [apiKey]);

  return (
    <>
      {bondMovies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </>
  );
}