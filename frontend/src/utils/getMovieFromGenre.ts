import { Movie } from '../types/Movie';
import fetchPoster from './fetchPoster';
export default async function getMoviesOneGenre(genre: string): Promise<Movie[]> {
  try {
    const res = await fetch(
      `https://localhost:5000/api/Movie/GetMoviesByGenre?genre=${encodeURIComponent(genre)}&page=1&pageSize=100`
    );
    if (!res.ok) {
      console.warn(`Failed to fetch movies for genre: ${genre}`);
      return [];
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
    return moviesWithPosters;
  } catch (error) {
    console.error(`Error fetching movies for genre ${genre}:`, error);
    return [];
  }
}