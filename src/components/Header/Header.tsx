// import du fichier de style Header.scss spécifique au Header
import './Header.scss';
import { useState } from 'react';
// import de l'image du logo à partir du dossier assets
import logo from '../../assets/logo-gestinvest.svg';

type HeaderProps = {
  isConnected: boolean;
  openModal: () => void;
};

function Header({ isConnected, openModal }: HeaderProps) {
  // State utilisé avec le bouton burger menu pour ouvrir ou fermer les liens de navigation (par défaut showLinks est false, liens non visibles)
  const [showLinks, setShowLinks] = useState(false);
  // Fonction permettant de changer l'état de showLinks (true/false) au click sur le burger button
  const handleShowlinks = () => {
    setShowLinks(!showLinks);
  };

  // Fonction déconnexion au click sur le bouton "Déconnexion" (visible uniquement si l'utilisateur est connecté)
  const handleLogout = () => {
    // Suppression du token dans le localStorage
    localStorage.removeItem('token');
    // Redirection de l'utilisateur vers la page Accueil
    window.location.href = '/';
  };

  return (
    // Affichage des liens "Tableau de bord" et "Mon compte" si l'utilisateur est connecté (isConnected)
    // Affichage de "Connexion" ou "Déconnexion" du bouton en fonction de la connexion de l'utilisateur
    <header className="menu" id="header">
      <img className="logo" src={logo} alt="logo Gestinvest" />
      <nav className={`"navbar" ${showLinks ? 'show-nav' : ''}`}>
        <ul className="navbar-links">
          <li className="navbar-item">
            <a className="navbar-link" href="#header">
              Accueil
            </a>
          </li>
          <li className="navbar-item">
            <a className="navbar-link" href="#header">
              Tendances
            </a>
          </li>
          {isConnected && (
            <li className="navbar-item">
              <a className="navbar-link" href="#header">
                Tableau de bord
              </a>
            </li>
          )}
          {isConnected && (
            <li className="navbar-item">
              <a className="navbar-link" href="#header">
                Mon compte
              </a>
            </li>
          )}
        </ul>
      </nav>
      <div className={`"menu-buttons" ${showLinks ? 'show-nav' : ''}`}>
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
          className="navbar-burger"
          onClick={handleShowlinks}
        >
          <span className="burger-bar" />
        </button>
      </div>
    </header>
  );
}

export default Header;
