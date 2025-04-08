import { Movie } from '../types/Movie';

interface FetchMoviesResponse {
  movies: Movie[];
}

const API_URL = 'http://localhost:5000/api/Movie';

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

export const fetchMovieById = async (movieId: string): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/Movie/${movieId}`);
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
  movieId: string
): Promise<FetchMoviesResponse> => {
  try {
    const response = await fetch(`${API_URL}/MovieRec/${movieId}`);
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
