import { useState } from "react";
import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../service/movieService";
import { toast } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setError(false);
      setIsLoading(true);
      setMovies([]);
      const fetchedMovies = await fetchMovies(query);
      if (fetchedMovies.length === 0) {
        toast.error("No movies found for your request.");
      }

      setMovies(fetchedMovies);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.app}>
      <SearchBar handleSearch={handleSearch} disabled={isLoading} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={(movie) => setSelectedMovie(movie)} />
          )}
        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        )}
    </div>
  );
};

export default App;
