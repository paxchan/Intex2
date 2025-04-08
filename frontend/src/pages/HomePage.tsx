import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import fetchPoster from '../utils/fetchPoster';
import CookieConsent from "react-cookie-consent";

const featuredMovies = ['Troy', 'Joker', 'Train to Busan', 'Inception'];

const topMovies = [
  'Jeans',
  'Minsara Kanavu',
  'Grown Ups',
  'Dark Skies',
  'Paranoia',
  'Ankahi Kahaniya',
  'Squid Game',
  'The Father Who Moves Mountains',
  'The Stronghold',
  'Birth of the Dragon',
];

const recommendedMovies = [
  'Jaws',
  'Dick Johnson Is Dead',
  'Sankofa',
  'The Starling',
  'Je Suis Karl',
  'Confessions of an Invisible Girl',
  'Intrusion',
  'Avvai Shanmughi',
  'A Serious Man',
  'American Son',
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
  const carouselRefs = useRef<Record<string, HTMLDivElement | null>>({});

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

  const scroll = (
    carouselTitle: string,
    direction: 'left' | 'right',
    itemsPerSlide: number
  ) => {
    const container = carouselRefs.current[carouselTitle];
    if (!container) return;

    const card = container.querySelector('div');
    if (!card) return;

    const cardWidth = (card as HTMLElement).offsetWidth + 24; // include gap
    const scrollAmount = cardWidth * itemsPerSlide;

    if (direction === 'left') {
      if (container.scrollLeft <= 0) {
        container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    } else {
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 10
      ) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
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
        {carousels.map((carousel) => (
          <section key={carousel.title} className="carousel-section">
            <div className="carousel-title-bar">
              <h2 className="section-title">{carousel.title}</h2>
            </div>
            <div className="carousel-hover-group">
              <button
                className="scroll-button left"
                onClick={() =>
                  scroll(carousel.title, 'left', carousel.itemsPerSlide)
                }
              />
              <div
                className={`horizontal-carousel ${
                  carousel.showNumbers
                    ? 'horizontal-carousel-top'
                    : 'horizontal-carousel-normal'
                }`}
                ref={(el: HTMLDivElement | null) => {
                  carouselRefs.current[carousel.title] = el;
                }}
              >
                {carousel.movies.map((title, index) => (
                  <div
                    key={title}
                    className={
                      carousel.showNumbers
                        ? 'top-movie-item'
                        : 'recommendation-item'
                    }
                  >
                    {carousel.showNumbers && (
                      <div className="top-movie-number">{index + 1}</div>
                    )}
                    {carouselPosters[carousel.title]?.[index] && (
                      <img
                        src={carouselPosters[carousel.title][index]}
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
                onClick={() =>
                  scroll(carousel.title, 'right', carousel.itemsPerSlide)
                }
              />
            </div>
          </section>
        ))}
      </div>
      <div>
      <CookieConsent>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      </div>
    </div>
  );
}
