import React, { Suspense, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import "./styles.css";

const LanguageSwitcher = ({ onLanguageChange, currentLanguage }) => {
  const languages = [
    { code: "ko", name: "한국어" },
    { code: "en", name: "English" },
    { code: "zh", name: "中文" },
    { code: "fr", name: "Français" }
  ];

  return (
    <div className="language-switcher">
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => onLanguageChange(lang.code)}
          className={`lang-button ${currentLanguage === lang.code ? 'active' : ''}`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
};

const VideoCard = ({ link, index }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="video-card" key={`${link.url}-${index}`}>
      <div className="video-header">
        <h3 className="video-title">{link.title}</h3>
      </div>
      <div className="video-container">
        {isLoading && (
          <div className="video-loading">
            <div className="spinner"></div>
            <p>Loading video...</p>
          </div>
        )}
        {hasError ? (
          <div className="video-error">
            <p>Failed to load video</p>
            <a 
              href={`https://www.youtube.com/watch?v=${link.url}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="external-link"
            >
              Watch on YouTube
            </a>
          </div>
        ) : (
          <div className="video-responsive">
            <iframe
              src={`https://www.youtube.com/embed/${link.url}?rel=0`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={link.title}
              onLoad={handleLoad}
              onError={handleError}
              style={{ opacity: isLoading ? 0 : 1 }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const YoutubeEmbedComponent = ({ links, loading, error }) => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');

  const changeLanguage = (lng) => {
    setCurrentLanguage(lng);
    i18n.changeLanguage(lng);
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>{t("loading_message", "Loading tracks...")}</p>
      </div>
    );
  }

  if (error) {
    return null; // Error is handled in App.js
  }

  if (!links || links.length === 0) {
    return (
      <div className="no-content">
        <h2>{t("no_tracks", "No tracks available")}</h2>
        <p>{t("no_tracks_message", "Check back later for new releases!")}</p>
      </div>
    );
  }

  return (
    <div className="youtube-container">
      <LanguageSwitcher 
        onLanguageChange={changeLanguage} 
        currentLanguage={currentLanguage}
      />
      
      <div className="videos-grid">
        {links.map((link, index) => (
          <VideoCard key={`${link.url}-${index}`} link={link} index={index} />
        ))}
      </div>
    </div>
  );
};

const Loader = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading translations...</p>
  </div>
);

// here app catches the suspense from page in case translations are not yet loaded
export default function YouTubeEmbed({ links, loading, error }) {
  return (
    <Suspense fallback={<Loader />}>
      <YoutubeEmbedComponent links={links} loading={loading} error={error} />
    </Suspense>
  );
}

YouTubeEmbed.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
  loading: PropTypes.bool,
  error: PropTypes.string,
};

VideoCard.propTypes = {
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
