import React from "react";
import { Link } from "react-router-dom";
import Logout from "../components/Logout";
import "./AdminPage.css";

const AdminPage: React.FC = () => {
  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="logo">
        <img src="/logo.png" alt="CineNiche Logo" className="logo-top" />
        </div>

        
        <nav className="nav-links">
          <Link to="/home" className="nav-link">
            Home
          </Link>
          <Link to="/movies" className="nav-link">
            Movies
          </Link>
          <Link to="/tvshows" className="nav-link">
            TV Shows
          </Link>
          <Link to="/watchlist" className="nav-link">
            Watchlist
          </Link>
        </nav>
        <div className="user-icon">
          <svg
            width="37"
            height="37"
            viewBox="0 0 37 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.8333 32.375V29.2917C30.8333 27.6562 30.1836 26.0876 29.0271 24.9312C27.8706 23.7747 26.3021 23.125 24.6666 23.125H12.3333C10.6978 23.125 9.12927 23.7747 7.9728 24.9312C6.81633 26.0876 6.16663 27.6562 6.16663 29.2917V32.375M24.6666 10.7917C24.6666 14.1974 21.9057 16.9583 18.5 16.9583C15.0942 16.9583 12.3333 14.1974 12.3333 10.7917C12.3333 7.38591 15.0942 4.625 18.5 4.625C21.9057 4.625 24.6666 7.38591 24.6666 10.7917Z"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </div>
      </header>

      <main className="admin-content">
        <h1 className="admin-title">Admin Manager</h1>

        <div className="search-section">
          <div className="search-bar">
            <input type="text" placeholder="Search movies or TV shows..." />
            <button className="clear-search">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4.5L4 12.5M4 4.5L12 12.5"
                  stroke="#1E1E1E"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </div>

          <div className="search-divider"></div>

          <div className="filter-options">
            <div className="filter-all">All</div>
            <div className="filter-alphabet">
              A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
            </div>
          </div>
        </div>

        <section className="category-section">
          <h2 className="category-title">Horror</h2>
          <div className="movie-grid">
            <div className="movie-card">
              <div className="movie-content">
                <div className="movie-title">Movie</div>
                <div className="movie-image">pic</div>
              </div>
            </div>
            <div className="movie-card">
              <div className="movie-content">
                <div className="movie-title">Movie</div>
                <div className="movie-image">pic</div>
              </div>
            </div>
            <div className="movie-card">
              <div className="movie-content">
                <div className="movie-title">Movie</div>
                <div className="movie-image">pic</div>
              </div>
            </div>
            <div className="movie-card">
              <div className="movie-content">
                <div className="movie-title">Movie</div>
                <div className="movie-image">pic</div>
              </div>
            </div>
          </div>
          <div className="navigate-next">
            <svg
              width="45"
              height="47"
              viewBox="0 0 45 47"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.625 23.5L15 14.4917L17.625 11.75L28.875 23.5L17.625 35.25L15 32.5083L23.625 23.5Z"
                fill="#1D1B20"
              ></path>
            </svg>
          </div>
        </section>

        <section className="category-section">
          <h2 className="category-title">Comedy</h2>
          <div className="movie-grid">
            <div className="movie-card">
              <div className="movie-content">
                <div className="movie-title">Movie</div>
                <div className="movie-image">pic</div>
              </div>
            </div>
            <div className="movie-card">
              <div className="movie-content">
                <div className="movie-title">Movie</div>
                <div className="movie-image">pic</div>
              </div>
            </div>
            <div className="movie-card">
              <div className="movie-content">
                <div className="movie-title">Movie</div>
                <div className="movie-image">pic</div>
              </div>
            </div>
            <div className="movie-card">
              <div className="movie-content">
                <div className="movie-title">Movie</div>
                <div className="movie-image">pic</div>
              </div>
            </div>
          </div>
          <div className="navigate-next">
            <svg
              width="45"
              height="47"
              viewBox="0 0 45 47"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.625 23.5L15 14.4917L17.625 11.75L28.875 23.5L17.625 35.25L15 32.5083L23.625 23.5Z"
                fill="#1D1B20"
              ></path>
            </svg>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
