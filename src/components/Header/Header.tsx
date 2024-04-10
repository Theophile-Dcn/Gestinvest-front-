// import du fichier de style Header.scss spécifique au Header
import { useState } from 'react';
import './Header.scss';
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
    <header
      className="menu flex items-center justify-between px-4 py-2"
      id="header"
    >
      <img className="logo" src={logo} alt="logo Gestinvest" />
      <nav className={`"navbar" ${showLinks ? 'show-nav' : ''}`}>
        <ul className="navbar-links">
          <li className="navbar-item">
            <a className="navbar-link" href="/">
              Accueil
            </a>
          </li>
          <li className="navbar-item">
            <a className="navbar-link" href="Tendances">
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
      <div className="flex mx-4">
        <div className={`"menu-buttons" ${showLinks ? 'show-nav' : ''}`}>
          {!isConnected && (
            <button
              type="button"
              className="button menu-log mr-2"
              onClick={openModal}
            >
              Connexion
            </button>
          )}
          {isConnected && (
            <button
              type="button"
              className="menu-log mr-2"
              onClick={handleLogout}
            >
              Déconnexion
            </button>
          )}
          <div />
        </div>
        <div className="h-full flex justify-center">
          <button
            type="button"
            onClick={handleShowlinks}
            className="relative group"
          >
            <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[30px] h-[30px] transform transition-all bg-transparent     duration-200 shadow-md">
              <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
                <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-x-10" />
                <div className="bg-white h-[2px] w-7 rounded transform transition-all duration-300 group-focus:translate-x-10 delay-75" />
                <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-x-10 delay-150" />

                <div className="absolute items-center justify-between transform transition-all duration-500 top-2.5 -translate-x-10 group-focus:translate-x-0 flex w-0 group-focus:w-12">
                  <div className="absolute bg-white h-[2px] w-5 transform transition-all duration-500 rotate-0 delay-300 group-focus:rotate-45" />
                  <div className="absolute bg-white h-[2px] w-5 transform transition-all duration-500 -rotate-0 delay-300 group-focus:-rotate-45" />
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
