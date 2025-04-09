// components/MovieModal.tsx
import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import fetchPoster from '../utils/fetchPoster';
import { fetchRecommendedMovies } from '../api/MovieAPIs';

type MovieModalProps = {
  movie: Movie;
  onClose: () => void;
  onMovieSelect: (movie: Movie) => void;
};

export default function MovieModal({
  movie,
  onClose,
  onMovieSelect,
}: MovieModalProps) {
  const [recMovies, setRecMovies] = useState<Movie[]>([]);
  const [userRating, setUserRating] = useState<number | 0>(0);

  useEffect(() => {
    const loadRecMovies = async () => {
      if (!movie.title) return;
      const recs = await fetchRecommendedMovies(movie.title);
      setRecMovies(recs.movies || []);
    };
    loadRecMovies();
  }, [movie]);

  const genreMap: { [key: string]: string } = {
    action: 'Action',
    adventure: 'Adventure',
    animeSeriesInternationalTVShows: 'Anime TV Series',
    britishTVShowsDocuseriesInternationalTVShows:
      'British TV Show & International Docuseries',
    children: "Children's Movie",
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
    internationalTVShowsRomanticTVShowsTVDramas:
      'International Romantic Dramas',
    kidsTV: "Children's TV",
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

  const getGenres = (movie: any): string[] =>
    Object.keys(genreMap)
      .filter((key) => movie[key] === 1)
      .map((key) => genreMap[key]);

  const handleRatingChange = (rating: number) => setUserRating(rating);

  const recMoviesWithPosters = recMovies.map((m) => ({
    ...m,
    posterUrl: fetchPoster(
      m.title
        .normalize('NFD')
        .replace(/[:'()’!.&-]/g, '')
        .trim()
    ),
  }));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // prevent backdrop click
      >
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <div className="modal-body">
          <img src={movie.posterUrl} alt={movie.title} height="300px" />
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
          <p>Director: {movie.director}</p>
          <p>Cast: {movie.cast}</p>
          <p>
            {movie.release_year} | {movie.duration} | {movie.country}
          </p>
          <p>Rating: {movie.rating}</p>
          <h3>Genres</h3>
          <p>{getGenres(movie).join(', ') || 'Unknown'}</p>
          <div>
            <h4>Rate this movie:</h4>
            {[1, 2, 3, 4, 5].map((rating) => (
              <span
                key={rating}
                style={{
                  fontSize: '2rem',
                  cursor: 'pointer',
                  color: userRating >= rating ? 'gold' : 'gray',
                }}
                onClick={() => handleRatingChange(rating)}
              >
                ★
              </span>
            ))}
          </div>
          <h3>Recommended</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {recMoviesWithPosters.map((rec) => (
              <div
                key={rec.show_id}
                style={{ cursor: 'pointer' }}
                onClick={() => onMovieSelect(rec)}
              >
                <img src={rec.posterUrl} alt={rec.title} height="150px" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
