// components/MovieModal.tsx
import React, { useEffect, useState } from 'react';
import { fetchRecommendedMovies } from '../api/MovieAPIs';
import { Movie } from '../types/Movie';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const genreMap: { [key: string]: string } = {
  action: 'Action',
  adventure: 'Adventure',
  comedies: 'Comedy',
  documentaries: 'Documentary',
  dramas: 'Drama',
  horrorMovies: 'Horror',
  fantasy: 'Fantasy',
  thrillers: 'Thriller',
  // ... add the rest
};

function getGenres(movie: any): string[] {
  return Object.keys(genreMap)
    .filter((key) => movie[key] === 1)
    .map((key) => genreMap[key]);
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  const [recMovies, setRecMovies] = useState<Movie[]>([]);
  const [loadingRec, setLoadingRec] = useState(true);

  useEffect(() => {
    const loadRecMovies = async () => {
      try {
        if (!movie.title) return;
        setLoadingRec(true);
        const recs = await fetchRecommendedMovies(movie.title);
        setRecMovies(recs.movies);
      } catch (error) {
        console.error('Error fetching recommended movies:', error);
      } finally {
        setLoadingRec(false);
      }
    };
    loadRecMovies();
  }, [movie]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-[#111] text-white rounded-lg p-6 w-full max-w-4xl relative overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-2 right-4 text-white text-2xl">&times;</button>
        <div className="flex gap-6">
          <img src={movie.posterUrl} alt={movie.title} className="w-48 h-auto rounded" />
          <div>
            <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
            <p className="text-sm text-gray-300 mb-2">{movie.description}</p>
            <p className="text-sm">Director: {movie.director ?? 'Unknown'}</p>
            <p className="text-sm">Cast: {movie.cast ?? 'Unknown'}</p>
            <p className="text-sm mt-2">{movie.release_year} | {movie.duration ?? 'Unknown Duration'} | {movie.country ?? 'Country Unknown'}</p>

            {/* ask this later */}
            {/* <p className="text-sm">Rating: {movie.rating ?? 'Not Rated'}</p> */}
            
            <p className="text-sm mt-2">Genres: {getGenres(movie).join(', ') || 'Unknown'}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Similar Movies:</h2>
          {loadingRec ? (
            <p>Loading...</p>
          ) : recMovies.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto">
              {recMovies.map((rec) => (
                <img key={rec.show_id} src={rec.posterUrl} alt={rec.title} className="h-32 rounded" />
              ))}
            </div>
          ) : (
            <p>No recommendations available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
