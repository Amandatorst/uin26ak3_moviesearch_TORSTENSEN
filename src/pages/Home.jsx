import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import History from "../components/History";
import Bond from "../components/Bond";
import OtherMovies from "../components/OtherMovies";

export default function Home() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  const [history, setHistory] = useState(() => {
  const saved = localStorage.getItem("movie_history");
  return saved ? JSON.parse(saved) : [];
});

// Lagrer historikken hver gang den endres
useEffect(() => {
  localStorage.setItem("movie_history", JSON.stringify(history));
}, [history]);  const apiKey = import.meta.env.VITE_APP_API_KEY;

  const fetchMovies = async (query) => {
    if (query.length < 3) return; // sjekk på lengde

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`
      );
      const data = await response.json();

      if (data.Search) {
        setMovies(data.Search);
      }
    } catch (error) {
      console.error("Feil ved henting av filmer:", error);
    }
  };

  // Lytter etter endringer i 'search'
  useEffect(() => {
    if (search.length >= 3) {
      fetchMovies(search);
    }
  }, [search]); // Kjører hver gang 'search' endres

  // Håndterer manuelt søk (når man trykker på knappen)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.length >= 3) {
      fetchMovies(search);
      
      // Legger til i historikk hvis det ikke allerede finnes
      if (!history.includes(search)) {
        setHistory([search, ...history]);
      }
    }
  };

  return (
  <main>
    <header>
      <h1>Filmregister</h1>
    </header>
      
      <section className="search-section">
        <label htmlFor="search-input">Søk etter film</label>
        <form onSubmit={handleSubmit}>
          <input
            id="search-input"
            type="text"
            placeholder="Søk etter film..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Søk</button>
        </form>

        <History history={history} setSearch={setSearch} />
      </section>

     <section>
    {search.length < 3 ? (
        <> 
            <h2>
                James Bond
            </h2>
            <ul className="screen">
                <Bond />
            </ul>
            <h2>
                Andre filmer
            </h2>
            <ul className="screen">
                <OtherMovies />
            </ul>
        </>
    ) : (
        <>
            <h2 style={{ textAlign: "center", color: "white" }}>Søkeresultat</h2>
            <ul className="screen">
                {movies.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </ul>
        </>
    )}
</section>
    </main>
  );
}