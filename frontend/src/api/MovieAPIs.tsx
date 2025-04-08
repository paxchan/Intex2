import { Movie } from '../types/Movie';

interface FetchMoviesResponse {
  movies: Movie[];
}

const API_URL = 'https://localhost:5000/api/Movie';

export const fetchAllMovies = async (): Promise<FetchMoviesResponse> => {
  try {
    const response = await fetch(`${API_URL}/AllMovies`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching all movies:', error);
    throw error;
  }
};

export const fetchMovieById = async (title: string): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/MovieDetails/${title}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    throw error;
  }
};

export const fetchUserRecommendedMovies = async (
  userId: number
): Promise<FetchMoviesResponse> => {
  try {
    const response = await fetch(`${API_URL}/UserRec/${userId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user recommended movies:', error);
    throw error;
  }
};

export const fetchRecommendedMovies = async (
  title: string
): Promise<FetchMoviesResponse> => {
  try {
    const response = await fetch(
      `${API_URL}/MovieRec?movieTitle=${encodeURIComponent(title)}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recommended movies:', error);
    throw error;
  }
};
