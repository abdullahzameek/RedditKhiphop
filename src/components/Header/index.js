import React from 'react';
import './style.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">
          <span className="title-icon">🎵</span>
          Daily K Hip Hop
        </h1>
        <p className="header-subtitle">
          Latest releases from r/khiphop
        </p>
      </div>
    </header>
  );
};

export default Header;

