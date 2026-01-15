import { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css'; // Headerコンポーネント自身がCSSをインポート

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header-container">
      {/* 左側のロゴエリア */}
      <div className="logo">
        <Link to="/">
          <img src={`${import.meta.env.BASE_URL}images/logos/logo_white.svg`} alt="Logo" />
        </Link>
      </div>

      {/* ハンバーガーメニューボタン */}
      <button
        className={`hamburger ${isMenuOpen ? 'is-active' : ''}`}
        onClick={toggleMenu}
        aria-label="メニュー"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* 右側のナビゲーションエリア */}
      <nav className={`nav ${isMenuOpen ? 'is-open' : ''}`}>
        <ul className="nav-links">
          <li onClick={toggleMenu}>
            <Link to="/about">About</Link>
          </li>
          <li onClick={toggleMenu}>
            <Link to="/project">Project</Link>
          </li>
          <li onClick={toggleMenu}>
            <Link to="/activity">Activity</Link>
          </li>
          <li onClick={toggleMenu}>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;