import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPoster } from '../utils/fetchPoster';
import './HomePage.css';

const featuredMovies = [
  'Avengers: Infinity War',
  'Joker',
  'The Dark Knight',
  'Inception',
];

const topMovies = [
  'Pulp Fiction',
  'The Godfather',
  'The Shawshank Redemption',
  'The Dark Knight',
];

const recommendedMovies = [
  'Inception',
  'Interstellar',
  'The Matrix',
  'Gladiator',
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselPosters, setCarouselPosters] = useState<string[]>([]);
  const [topMoviePosters, setTopMoviePosters] = useState<string[]>([]);
  const [recommendedPosters, setRecommendedPosters] = useState<string[]>([]);

  useEffect(() => {
    const fetchCarouselPosters = async () => {
      const posters = await Promise.all(
        featuredMovies.map((title) => fetchPoster(title))
      );
      setCarouselPosters(posters.filter((p): p is string => p !== null));
    };

    const fetchTopPosters = async () => {
      const posters = await Promise.all(
        topMovies.map((title) => fetchPoster(title))
      );
      setTopMoviePosters(posters.filter((p): p is string => p !== null));
    };

    const fetchRecommendedPosters = async () => {
      const posters = await Promise.all(
        recommendedMovies.map((title) => fetchPoster(title))
      );
      setRecommendedPosters(posters.filter((p): p is string => p !== null));
    };

    fetchCarouselPosters();
    fetchTopPosters();
    fetchRecommendedPosters();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === carouselPosters.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [carouselPosters.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === carouselPosters.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? carouselPosters.length - 1 : prev - 1
    );
  };

  return (
    <div className="home-container">
      <div className="home-content">
        {/* Navigation */}
        <nav className="nav-container">
          <div className="nav-left">
            <img src="/logo.png" alt="CineNiche Logo" className="logo" />
            <div className="nav-links">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/movies" className="nav-link">
                Movies
              </Link>
              <Link to="/tv-shows" className="nav-link">
                TV Shows
              </Link>
              <Link to="/watchlist" className="nav-link">
                Watchlist
              </Link>
            </div>
          </div>
          <div className="nav-right">
            <input
              type="search"
              placeholder="Search..."
              className="search-input"
              aria-label="Search movies and TV shows"
            />
            <svg
              width="37"
              height="37"
              viewBox="0 0 37 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="user-icon"
            >
              <path
                d="M30.8333 32.375V29.2917C30.8333 27.6562 30.1836 26.0876 29.0271 24.9312C27.8706 23.7747 26.3021 23.125 24.6666 23.125H12.3333C10.6978 23.125 9.12927 23.7747 7.9728 24.9312C6.81633 26.0876 6.16663 27.6562 6.16663 29.2917V32.375M24.6666 10.7917C24.6666 14.1974 21.9057 16.9583 18.5 16.9583C15.0942 16.9583 12.3333 14.1974 12.3333 10.7917C12.3333 7.38591 15.0942 4.625 18.5 4.625C21.9057 4.625 24.6666 7.38591 24.6666 10.7917Z"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </nav>

        {/* Carousel */}
        <div className="carousel-container">
          {carouselPosters[currentSlide] && (
            <img
              src={carouselPosters[currentSlide]}
              alt={`Featured: ${featuredMovies[currentSlide]}`}
              className="carousel-image"
            />
          )}
          <button
            className="carousel-nav prev"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <svg
              width="40"
              height="46"
              viewBox="0 0 40 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.3333 34.5L13.3333 23L23.3333 11.5L25.6667 14.1833L18 23L25.6667 31.8167L23.3333 34.5Z"
                fill="white"
              />
            </svg>
          </button>
          <button
            className="carousel-nav next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <svg
              width="45"
              height="47"
              viewBox="0 0 45 47"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.625 23.5L15 14.4917L17.625 11.75L28.875 23.5L17.625 35.25L15 32.5083L23.625 23.5Z"
                fill="white"
              />
            </svg>
          </button>
          <div className="carousel-dots">
            {carouselPosters.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Top Movies */}
        <section>
          <h2 className="section-title">Top Movies</h2>
          <div className="top-movies-grid">
            {topMovies.map((movie, index) => (
              <div key={movie} className="top-movie-item">
                <div className="top-movie-number">{index + 1}</div>
                {topMoviePosters[index] && (
                  <img
                    src={topMoviePosters[index]}
                    alt={movie}
                    className="top-movie-poster"
                    style={{ left: `${60 + index * 26}px` }}
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Recommendations */}
        <section>
          <h2 className="section-title">We Think You'll Love These</h2>
          <div className="recommendations-grid">
            {recommendedMovies.map((movie, index) => (
              <div key={movie} className="recommendation-item">
                {recommendedPosters[index] && (
                  <img
                    src={recommendedPosters[index]}
                    alt={movie}
                    className="recommendation-image"
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
