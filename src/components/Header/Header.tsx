import { useState } from 'react';
import './Header.scss';
import logo from '../../assets/logo-gestinvest.svg';

type HeaderProps = {
  isConnected: boolean;

  openModal: () => void;
};

function Header({ isConnected, openModal }: HeaderProps) {
  const [showLinks, setShowLinks] = useState(false);

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <header className="menu" id="header">
      <img className="logo" src={logo} alt="logo Gestinvest" />
      <nav className={`navbar ${showLinks ? 'show-nav' : ''}`}>
        <ul className="navbar-links">
          <li className="navbar-item">
            <a className="navbar-link" href="/">
              Accueil
            </a>
          </li>
          <li className="navbar-item">
            <a className="navbar-link" href="/Tendances">
              Tendances
            </a>
          </li>
          {isConnected && (
            <li className="navbar-item">
              <a className="navbar-link" href="/Dashboard">
                Tableau de bord
              </a>
            </li>
          )}
          {isConnected && (
            <li className="navbar-item">
              <a className="navbar-link" href="/Account">
                Mon compte
              </a>
            </li>
          )}
        </ul>
      </nav>
      <div className={`menu-buttons ${showLinks ? 'show-nav' : ''}`}>
        {!isConnected && (
          <button type="button" className="button menu-log" onClick={openModal}>
            Connexion
          </button>
        )}
        {isConnected && (
          <button type="button" className="menu-log" onClick={handleLogout}>
            Déconnexion
          </button>
        )}
        <button
          type="button"
          className="navbar-burger button"
          onClick={handleShowLinks}
        >
          <span className="burger-bar">{}</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
