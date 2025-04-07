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
  'Fight Club',
  'Forrest Gump',
  'The Matrix',
  'Goodfellas',
  'Se7en',
  'The Silence of the Lambs',
];

const recommendedMovies = [
  'Inception',
  'Interstellar',
  'The Matrix',
  'Gladiator',
  'The Prestige',
  'Memento',
  'The Revenant',
  'Django Unchained',
  'Whiplash',
  'Parasite',
];

const trendingMovies = [
  'Everything Everywhere All At Once',
  'Oppenheimer',
  'Barbie',
  'Spider-Man: No Way Home',
  'The Batman',
  'No Time to Die',
  'Dune',
  'Black Panther: Wakanda Forever',
  'The Super Mario Bros. Movie',
  'Top Gun: Maverick',
];

const carousels = [
  {
    title: 'Top Movies',
    movies: topMovies,
    showNumbers: true,
    itemsPerSlide: 5,
  },
  {
    title: "We Think You'll Love These",
    movies: recommendedMovies,
    itemsPerSlide: 8,
  },
  { title: 'New & Trending', movies: trendingMovies, itemsPerSlide: 8 },
];

export default function HomePage() {
  const [carouselPosters, setCarouselPosters] = useState<
    Record<string, string[]>
  >({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollIndex, setScrollIndex] = useState<Record<string, number>>({});

  useEffect(() => {
    async function fetchAllPosters() {
      const posters: Record<string, string[]> = {};
      for (const carousel of carousels) {
        const images = await Promise.all(
          carousel.movies.map((title) => fetchPoster(title))
        );
        posters[carousel.title] = images.filter((img): img is string => !!img);
      }
      setCarouselPosters(posters);
    }
    fetchAllPosters();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === featuredMovies.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollLeft = (carouselTitle: string) => {
    setScrollIndex((prev) => ({
      ...prev,
      [carouselTitle]: Math.max((prev[carouselTitle] || 0) - 1, 0),
    }));
  };

  const scrollRight = (carouselTitle: string, itemsPerSlide: number) => {
    const length = carouselPosters[carouselTitle]?.length || 0;
    const maxIndex = Math.ceil(length / itemsPerSlide) - 1;
    setScrollIndex((prev) => ({
      ...prev,
      [carouselTitle]: Math.min((prev[carouselTitle] || 0) + 1, maxIndex),
    }));
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

        {/* Hero Carousel */}
        <div className="carousel-container">
          <img
            src={`./posters/${featuredMovies[currentSlide]}.jpg`}
            alt={`Featured: ${featuredMovies[currentSlide]}`}
            className="carousel-image"
          />
          <button
            className="carousel-nav prev"
            onClick={() =>
              setCurrentSlide(
                currentSlide === 0
                  ? featuredMovies.length - 1
                  : currentSlide - 1
              )
            }
          >
            &lt;
          </button>
          <button
            className="carousel-nav next"
            onClick={() =>
              setCurrentSlide((currentSlide + 1) % featuredMovies.length)
            }
          >
            &gt;
          </button>
          <div className="carousel-dots">
            {featuredMovies.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Dynamic Carousels */}
        {carousels.map((carousel) => {
          const offset = scrollIndex[carousel.title] || 0;
          const itemsPerSlide = carousel.itemsPerSlide || 8;
          const start = offset * itemsPerSlide;
          const end = start + itemsPerSlide;
          const visibleMovies = carousel.movies.slice(start, end);

          return (
            <section key={carousel.title} className="carousel-section">
              <div className="carousel-title-bar">
                <h2 className="section-title">{carousel.title}</h2>
              </div>
              <div className="carousel-hover-group">
                <button
                  className="scroll-button left"
                  onClick={() => scrollLeft(carousel.title)}
                >
                  &lt;
                </button>
                <div className="horizontal-carousel">
                  {visibleMovies.map((title, index) => (
                    <div
                      key={title}
                      className={
                        carousel.showNumbers
                          ? 'top-movie-item'
                          : 'recommendation-item'
                      }
                    >
                      {carousel.showNumbers && (
                        <div className="top-movie-number">
                          {start + index + 1}
                        </div>
                      )}
                      {carouselPosters[carousel.title]?.[start + index] && (
                        <img
                          src={carouselPosters[carousel.title][start + index]}
                          alt={title}
                          className={
                            carousel.showNumbers
                              ? 'top-movie-poster'
                              : 'recommendation-image'
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
                <button
                  className="scroll-button right"
                  onClick={() => scrollRight(carousel.title, itemsPerSlide)}
                >
                  &gt;
                </button>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
