import { useState } from 'react';
import logo from '../../assets/logo-gestinvest.svg';
import './Header.scss';
import Hamburger from './HeaderSubComponent/Hamberger';

type HeaderProps = {
  isConnected: boolean;
  openModal: () => void;
};

function Header({ isConnected, openModal }: HeaderProps) {
  const [showLinks, setShowLinks] = useState(false);

  const handleShowlinks = () => {
    setShowLinks(!showLinks);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <header
      className="bg-[#141314] absolute flex wrap items-center w-full justify-between px-6 py-4 z-50"
      id="header"
    >
      <img className="w-20" src={logo} alt="logo Gestinvest" />
      <nav className={`${showLinks ? 'show-nav' : ''}`}>
        <ul className="navbar-links flex flex-col justify-center items-center fixed bottom-0 -right-full w-full h-lvh invisible bg-black transition-all duration-500 ease-out gap-8">
          <li className="">
            <a
              className="navbar-link hover:underline hover:underline-offset-8 text-xl p-4"
              href="/"
            >
              Accueil
            </a>
          </li>
          <li className="navbar-item">
            <a
              className="navbar-link avbar-link hover:underline hover:underline-offset-8 text-xl p-4"
              href="Tendances"
            >
              Tendances
            </a>
          </li>
          {isConnected && (
            <li className="navbar-item">
              <a
                className="navbar-link avbar-link hover:underline hover:underline-offset-8 text-xl p-4"
                href="/Dashboard"
              >
                Tableau de bord
              </a>
            </li>
          )}
          {isConnected && (
            <li className="navbar-item">
              <a
                className="navbar-link hover:underline hover:underline-offset-8 text-xl p-4"
                href="/Account"
              >
                Mon compte
              </a>
            </li>
          )}
        </ul>
      </nav>
      <div className="flex items-center">
        <div className={`menu-buttons ${showLinks ? 'show-nav' : ''}`}>
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
        <div className="h-full flex justify-center lg:hidden">
          <button
            aria-label="hamburger menu"
            type="button"
            onClick={handleShowlinks}
            className="relative group"
          >
            <Hamburger />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
