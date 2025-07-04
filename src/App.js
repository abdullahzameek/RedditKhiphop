import { React, useEffect, useState, useCallback } from "react";
import YoutubeEmbed from "./components/YouTube/YouTubeEmbed";
import Pagination from "./components/Pagination";
import Header from './components/Header';
import axios from "axios";
import "./App.css";

function App() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [linksPerPage] = useState(10);

  const fetchLinks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("https://khhreddit.herokuapp.com/get_tracks", {
        timeout: 10000, // 10 second timeout
      });
      setLinks(res.data || []);
    } catch (err) {
      console.error("Error fetching tracks:", err);
      setError(err.response?.data?.message || "Failed to load tracks. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  // Get current posts
  const indexOfLastLink = currentPage * linksPerPage;
  const indexOfFirstLink = indexOfLastLink - linksPerPage;
  const currentLinks = links.slice(indexOfFirstLink, indexOfLastLink);

  // Change page
  const paginate = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Reset to first page when links change
  useEffect(() => {
    setCurrentPage(1);
  }, [links]);

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={fetchLinks} className="retry-button">
              Try Again
            </button>
          </div>
        )}
        <YoutubeEmbed 
          links={currentLinks} 
          loading={loading} 
          error={error}
        />
        {!loading && !error && links.length > 0 && (
          <Pagination
            linksPerPage={linksPerPage}
            totalLinks={links.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        )}
      </main>
    </div>
  );
}

export default App;
