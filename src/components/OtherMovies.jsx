import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

export default function OtherMovies() {
  const [movies, setMovies] = useState([]);
  const apiKey = import.meta.env.VITE_APP_API_KEY;

  useEffect(() => {
    const getOtherMovies = async () => {
      // Søker etter 'random' for å få varierte resultater
      const response = await fetch(`https://www.omdbapi.com/?s=movie&type=movie&apikey=${apiKey}`);
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search.slice(0, 10));
      }
    };
    getOtherMovies();
  }, [apiKey]);

  return (
    <>
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </>
  );
}