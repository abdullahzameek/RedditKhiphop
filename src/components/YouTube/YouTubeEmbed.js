import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { useTranslation, withTranslation, Trans } from "react-i18next";
import "./styles.css";

const YoutubeEmbedComponent = ({ links, loading }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  if (loading) {
    return <h2>hi</h2>;
  }
  return (
    <>
      <button type="button" onClick={() => changeLanguage("ko")}>
        ko
      </button>
      <button type="button" onClick={() => changeLanguage("en")}>
        en
      </button>
      <button type="button" onClick={() => changeLanguage("zh")}>
        zh
      </button>
      <button type="button" onClick={() => changeLanguage("fr")}>
        fr
      </button>
      <div>{t("loading_message")}</div>
      {links.map((link) => (
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

const Loader = () => (
  <div className="App">
    <div>loading...</div>
  </div>
);

// here app catches the suspense from page in case translations are not yet loaded
export default function YouTubeEmbed({ links, loading }) {
  return (
    <Suspense fallback={<Loader />}>
      <YoutubeEmbedComponent links={links} loading={loading} />
    </Suspense>
  );
}
