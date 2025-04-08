import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminPage.css";
import fetchPoster from "../utils/fetchPoster";

const actionMovies = ["1BR", "1 Mile to You", "3 Seconds Divorce", "3", "5 Flights Up"];
const horrorMovies = ["Alone", "The Conjuring", "Black Mirror", "Bird Box", "Zombieland"];
const comedyMovies = ["The Good Place", "The Croods", "Step Brothers", "The Waterboy", "The Smurfs"];

const AdminPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [posterMap, setPosterMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadPosters = async () => {
      const allTitles = [...actionMovies, ...horrorMovies, ...comedyMovies];
      const posters: Record<string, string> = {};

      await Promise.all(
        allTitles.map(async (title) => {
          const url = await fetchPoster(title);
          if (url) posters[title] = url;
        })
      );

      setPosterMap(posters);
    };

    loadPosters();
  }, []);

  const filterMovies = (titles: string[]) =>
    titles.filter((title) =>
      title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const renderCategory = (label: string, titles: string[]) => (
    <section className="category-section">
      <h2 className="category-title">{label}</h2>
      <div className="action-grid">
        {filterMovies(titles).map((movie, index) => (
          <div key={index} className="action-card">
            <div className="action-image-container">
              {posterMap[movie] ? (
                <img
                  src={posterMap[movie]}
                  alt={movie}
                  className="action-image"
                />
              ) : (
                <div className="action-placeholder">Loading...</div>
              )}
              <div className="action-overlay">
                <span className="action-title">{movie}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="logo">
          <img src="/logo.png" alt="CineNiche Logo" className="logo-top" />
        </div>

        <nav className="nav-links">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/movies" className="nav-link">Movies</Link>
          <Link to="/tvshows" className="nav-link">TV Shows</Link>
          <Link to="/watchlist" className="nav-link">Watchlist</Link>
        </nav>

        <div className="user-icon">
          {/* user icon SVG */}
        </div>
      </header>

      <main className="admin-content">
        <h1 className="admin-title">Admin Manager</h1>

        <div className="search-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search movies or TV shows..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="search-divider"></div>
          <div className="filter-options">
            <div className="filter-all">All</div>
            <div className="filter-alphabet">
              A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
            </div>
          </div>
        </div>

        {renderCategory("Action", actionMovies)}
        {renderCategory("Horror", horrorMovies)}
        {renderCategory("Comedy", comedyMovies)}
      </main>
    </div>
  );
};

export default AdminPage;
