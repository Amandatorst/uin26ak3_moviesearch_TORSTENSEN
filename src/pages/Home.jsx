import { useEffect, useState } from "react";
import History from "../components/History";
import Bond from "../components/Bond";
import OtherMovies from "../components/OtherMovies";
import MovieCard from "../components/MovieCard"; // NY
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [focused, setFocused] = useState(false);
  
  const storedHistory = localStorage.getItem("search");
  const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : []);
  
  const apiKey = import.meta.env.VITE_APP_API_KEY;

  useEffect(() => {
    localStorage.setItem("search", JSON.stringify(history));
  }, [history]);

  const getMovies = async (value) => {
    if (value.length < 3) {
      setMovies([]);
      return;
    }

    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${value}&type=movie&apikey=${apiKey}`);
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search.slice(0, 10));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    getMovies(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setHistory((prev) => [...new Set([...prev, search])]); // Unngå duplikater i historikk
    }
  };

  // ... (imports og states som før)
return (
  <main>
    <h1>Filmregister</h1>
    <form onSubmit={handleSubmit}>
      <label>
        Søk etter film
        <input type="search" placeholder="Care Bears" onChange={handleChange} onFocus={() => setFocused(true)} />
      </label>
      {focused && <History history={history} setSearch={setSearch} />}
      <button type="submit">Søk</button>
    </form>

    {search.length >= 3 ? (
      <section id="searchresults">
        <h2>Søkeresultat</h2>
        <ul className="screen">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </ul>
      </section>
    ) : (
      <>
        <section id="bondFilmer">
          <h2>James Bond</h2>
          <ul className="screen">
            <Bond />
          </ul>
        </section>
        <section id="alleFilmer">
          <h2>Andre filmer</h2>
          <ul className="screen">
            <OtherMovies />
          </ul>
        </section>
      </>
    )}
  </main>
);
}

