import { useEffect, useState } from 'react';
import { fetchRecommendedMovies } from '../api/MovieAPIs';
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

  const genreMap: { [key: string]: string } = {
    action: 'Action',
    adventure: 'Adventure',
    animeSeriesInternationalTVShows: 'Anime TV Series',
    britishTVShowsDocuseriesInternationalTVShows: 'British TV Show & International Docuseries',
    children: 'Children\'s Movie',
    comedies: 'Comedy',
    comediesDramasInternationalMovies: 'International Comedy-Drama',
    comediesInternationalMovies: 'International Comedy Film',
    comediesRomanticMovies: 'Romantic Comedy',
    crimeTVShowsDocuseries: 'Crime TV Series',
    documentaries: 'Documentary',
    documentariesInternationalMovies: 'International Documentary',
    docuseries: 'Docuseries',
    dramas: 'Drama',
    dramasInternationalMovies: 'International Drama',
    dramasRomanticMovies: 'Romantic Drama',
    familyMovies: 'Family',
    fantasy: 'Fantasy',
    horrorMovies: 'Horror',
    internationalMoviesThrillers: 'International Thriller',
    internationalTVShowsRomanticTVShowsTVDramas: 'International Romantic Dramas',
    kidsTV: 'Children\'s TV',
    languageTVShows: 'Language TV Show',
    musicals: 'Musicals',
    natureTV: 'Nature Documentary',
    realityTV: 'Reality TV Show',
    spirituality: 'Spritual',
    tVAction: 'Action TV Show',
    tVComedies: 'Comedy TV Show',
    tVDramas: 'Drama TV Show',
    talkShowsTVComedies: 'Talk Show Comedy',
    thrillers: 'Thriller',
  };

  const getGenres = (movie: any): string[] => {
    return Object.keys(genreMap)
      .filter((key) => movie[key] === 1)
      .map((key) => genreMap[key]);
  };

  useEffect(() => {
    const loadMovie = async () => {
      setCurMovie(movie);
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
      {loading}
      {error && <p>Error loading movie.</p>}
      {movie && (
        <>
          <div className="row">
            <div className="col-3">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                height="300px"
                // className={ carousel.showNumbers
                //         ? 'top-movie-poster'
                //       : 'recommendation-image'}
              />
            </div>
            <div className="col-9">
              <h1>{movie.title}</h1>
              <p>{movie.description}</p>
              <p>Director: {movie.director ?? 'Unknown'}</p>
              <p>Cast: {movie.cast ?? 'Unknown'}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p>
                {movie.release_year} | {movie.duration ?? 'Unknown Duration'} |{' '}
                {movie.country ?? 'Country Unknown'}
              </p>
            </div>
            <div>
              <p>Rating: {movie.rating ?? 'Not Rated'}</p>
            </div>
            <div>
              <h2>Genres</h2>
              <p>{getGenres(movie).join(', ') || 'Unknown'}</p>
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
