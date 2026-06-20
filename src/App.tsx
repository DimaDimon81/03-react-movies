import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import SearchBar from "./components/SearchBar/SearchBar";
import MovieGrid from "./components/MovieGrid/MovieGrid";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import MovieModal from "./components/MovieModal/MovieModal";

import type { Movie } from "./types/movie";
import { fetchMovies } from "./services/movieService";


function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] =
    useState<Movie | null>(null);


  const handleSearch = async (query: string) => {
    setMovies([]);
    setLoading(true);
    setError(false);


    try {
      const data = await fetchMovies(query);


      if (data.length === 0) {
        toast.error("No movies found for your request.");
      }


      setMovies(data);

    } catch {
      setError(true);

    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Toaster />

      <SearchBar onSubmit={handleSearch} />


      <main>
        {loading && <Loader />}

        {error && <ErrorMessage />}


        {!loading && !error && movies.length > 0 && (
          <MovieGrid
            movies={movies}
            onSelect={setSelectedMovie}
          />
        )}
      </main>


      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

    </>
  );
}


export default App;