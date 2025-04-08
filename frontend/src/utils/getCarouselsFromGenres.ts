import { Carousel } from '../types/Carousel';
import { Movie } from '../types/Movie';
import fetchPoster from './fetchPoster';

export default async function getCarouselsFromGenres(): Promise<Carousel[]> {
  const carousels: Carousel[] = [];

  const genresRes = await fetch(
    'https://localhost:5000/api/Movie/GetMovieTypes'
  );
  if (!genresRes.ok) {
    console.error('Failed to fetch movie genres');
    return [];
  }

  const genres: string[] = await genresRes.json();

  for (const genre of genres) {
    try {
      const res = await fetch(
        `https://localhost:5000/api/Movie/GetMoviesByGenre?genre=${encodeURIComponent(genre)}&page=1&pageSize=100`
      );

      if (!res.ok) {
        console.warn(`Failed to fetch movies for genre: ${genre}`);
        continue;
      }

      const movies: Movie[] = await res.json();

      const moviesWithPosters = movies.map((movie) => {
        const safeTitle = movie.title
          .normalize('NFD')
          .replace(/[:'()’!.&-]/g, '') // remove punctuation
          .trim();

        return {
          ...movie,
          posterUrl: fetchPoster(safeTitle),
        };
      });

      carousels.push({
        title: formatGenreName(genre),
        movies: moviesWithPosters,
        itemsPerSlide: 8,
      });
    } catch (error) {
      console.error(`Error fetching movies for genre ${genre}:`, error);
    }
  }

  return carousels;
}

function formatGenreName(genre: string): string {
  // Convert camelCase or PascalCase to spaced and capitalized words
  return genre
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (char) => char.toUpperCase());
}
