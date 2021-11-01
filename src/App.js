import { React, useEffect, useState } from "react";
import YoutubeEmbed from "./components/YouTube/YouTubeEmbed";
import Pagination from "./components/Pagination";
import Header from './components/Header';
import axios from "axios";
import { useTranslation, withTranslation, Trans } from 'react-i18next';

function App() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [linksPerPage] = useState(10);

  useEffect(() => {
    const fetchLinks = async () => {
      setLoading(true);
      const res = await axios.get("https://khhreddit.herokuapp.com/get_tracks");
      setLinks(res.data);
      setLoading(false);
    };

    fetchLinks();
  }, []);

  // Get current posts
  const indexOfLastLink = currentPage * linksPerPage;
  const indexOfFirstLink = indexOfLastLink - linksPerPage;
  const currentLinks = links.slice(indexOfFirstLink, indexOfLastLink);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header/>
      <YoutubeEmbed links={currentLinks} loading={loading} />
      <Pagination
        linksPerPage={linksPerPage}
        totalLinks={links.length}
        paginate={paginate}
      />
    </>
  );
}

export default App;
