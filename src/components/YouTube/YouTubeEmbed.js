import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const YoutubeEmbed = ({ links, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      {links.map(link => (
        <div className="video-responsive">
        <span>{link.title}</span>
        <iframe
          src={`https://www.youtube.com/embed/${link.url}`}
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
          title="video"
        />
        </div>
      ))}
    </>
  );
};

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
