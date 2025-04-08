import { useEffect, useState } from 'react';
import { fetchMovieById, fetchRecommendedMovies } from '../api/MovieAPIs';
import { Movie } from '../types/Movie';
import { useParams } from 'react-router-dom';

function MoviesPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movie, setMovie] = useState<Movie>();
  const [loadingRec, setLoadingRec] = useState(true);
  const [errorRec, setErrorRec] = useState(null);
  const [recMovies, setRecMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        if (!movieId) return;
        setLoading(true);
        const data = await fetchMovieById(movieId);
        setMovie(data);
      } catch (error: any) {
        setError(error);
        console.error('Error fetching movie:', error);
      } finally {
        setLoading(false);
      }
    };
    loadMovie();
  }, []);

  useEffect(() => {
    const loadRecMovies = async () => {
      try {
        if (!movieId) return;
        setLoadingRec(true);
        const data = await fetchRecommendedMovies(movieId);
        setRecMovies(data);
      } catch (error: any) {
        setErrorRec(error);
        console.error('Error fetching movie:', error);
      } finally {
        setLoadingRec(false);
      }
    };
    loadRecMovies();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading movie.</p>}
      {movie && (
        <>
          <div className="row">
            <div className="col-3">
              <p>image here</p>
            </div>
            <div className="col-9">
              <h1>{movie.title}</h1>
              <p>{movie.description}</p>
              <p>Director: {movie.director}</p>
              <p>Cast: {movie.cast}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MoviesPage;
