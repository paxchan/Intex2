import { useEffect, useState } from 'react';
import { fetchMovieById, fetchRecommendedMovies } from '../api/MovieAPIs';
import { Movie } from '../types/Movie';
// import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function MoviesPage() {
  // const { show_id, title } = useParams<{ show_id: string, title: string  }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [curMovie, setCurMovie] = useState<Movie>();
  const [loadingRec, setLoadingRec] = useState(true);
  const [errorRec, setErrorRec] = useState(null);
  const [recMovies, setRecMovies] = useState<Movie[]>([]);
  const location = useLocation();
  const { movie } = location.state || {};
  // const passedTitle = location.state?.title;
  // const movieTitle = title || passedTitle;

  useEffect(() => {
    
    const loadMovie = async () => {
      setCurMovie(movie);
    //   try {
    //     if (!show_id) return;
    //     setLoading(true);
    //     const data = await fetchMovieById(show_id); // 🛠 fetch full movie
    //     setMovie(data);
    //   } catch (error: any) {
    //     setError(error.message);
    //   } finally {
    //     setLoading(false);
    //   }
    };
    loadMovie();
  }, []);

  useEffect(() => {
    const loadRecMovies = async () => {
      try {
        if (!movie.title) return;
        setLoadingRec(true);
        const recs = await fetchRecommendedMovies(movie.title);
        setRecMovies(recs.movies);
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
          <div className="row">
            <div className="col-12">
              <p>
                {movie.release_year} | {movie.duration} | {movie.country}
              </p>
            </div>
          </div>
          <div>
            <div>
              <h3>Rate this movie:</h3>
              <p>input rating logic here</p>
            </div>
          </div>
        </>
      )}
      <div>
        <h2>Recommended Movies</h2>
        {loadingRec && <p>Loading...</p>}
        {errorRec && <p>Error loading recommended movies.</p>}
        {recMovies.length > 0 ? (
          recMovies.map((movie) => (
            <div key={movie.show_id}>
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>
            </div>
          ))
        ) : (
          <p>No recommended movies available.</p>
        )}
      </div>
    </div>
  );
}

export default MoviesPage;
