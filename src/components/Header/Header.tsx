import { useState } from 'react';

import { FaTimes, FaUser } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';

// import './Header.scss';

import logo from '../../assets/logo-gestinvest.svg';

type HeaderProps = {
  isConnected: boolean;

  openModal: () => void;
};

function Nav({ isConnected, openModal }: HeaderProps) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  // Classes pour l'animation du menu mobile
  const mobileMenuAnimationClasses = click
    ? 'lg:hidden absolute top-0 w-full right-0 bg-black z-40 transition-transform transform translate-x-0 '
    : 'lg:hidden hidden top-0 w-full bg-black transition-transform transform translate-x-full';

  // Contenu du menu mobile
  const content = (
    <div
      className={`${mobileMenuAnimationClasses} h-screen flex flex-col justify-center`}
    >
      <ul className="text-center text-xl ">
        <a className="flex justify-center" href="/">
          <li className="w-1/3 my-4 py-4 text-base border-slate-800 hover:bg-slate-800 hover:rounded">
            Accueil
          </li>
        </a>
        <a className="flex justify-center" href="/Tendances">
          <li className=" w-1/3 my-4 py-4 text-base border-slate-800 hover:bg-slate-800 hover:rounded">
            Tendances
          </li>
        </a>
        {isConnected && (
          <a className="flex justify-center" href="/Dashboard">
            <li className="w-1/3 my-4 py-4 text-base border-slate-800 hover:bg-slate-800 hover:rounded">
              Tableau de bord
            </li>
          </a>
        )}
        {isConnected && (
          <a className="flex justify-center" href="/Account">
            <li className="w-1/3 my-4 py-4 text-base border-slate-800 hover:bg-slate-800 hover:rounded">
              Mon compte
            </li>
          </a>
        )}
      </ul>
    </div>
  );

  return (
    <nav className="bg-black/70 h-[10vh] fixed w-full z-50">
      <div className="flex h-[10vh] justify-between z-40 text-white  px-10 sm:px-20">
        <div className="flex items-center lg:hidden">
          <img className="w-20 z-50" src={logo} alt="logo Gestinvest" />
        </div>
        <div className="lg:flex lg:flex-1 items-center justify-between font-normal hidden">
          <div className="flex items-center">
            <img className="w-20 z-50" src={logo} alt="logo Gestinvest" />
          </div>
          <div className="flex-10">
            <ul className="flex gap-8 text-[18px]">
              <a href="/">
                <li className=" transition hover:underline  hover:underline-offset-8 border-slate-900 hover:border-white cursor pointer">
                  Accueil
                </li>
              </a>
              <a href="/Tendances">
                <li className=" transition hover:underline  hover:underline-offset-8 border-slate-900 hover:border-white cursor pointer">
                  Tendances
                </li>
              </a>
              {isConnected && (
                <a href="/Dashboard">
                  <li className=" transition hover:underline  hover:underline-offset-8 border-slate-900 hover:border-white cursor pointer">
                    Tableau de bord
                  </li>
                </a>
              )}
              {isConnected && (
                <a href="/Account">
                  <li className=" transition  hover:underline hover:underline-offset-8 border-slate-900 hover:border-white cursor pointer">
                    Mon compte
                  </li>
                </a>
              )}
            </ul>
          </div>{' '}
          {!isConnected && (
            <button
              className="hover:bg-custom-purple hover:border-custom-purple shadow-lg shadow-indigo-500/30 text-center mt-4 border text-white rounded-full px-2 py-1 lg:m-0 lg:my-8 lg:text-base lg:px-6 lg:py-2"
              type="button"
              onClick={openModal}
            >
              Connexion
            </button>
          )}
          {isConnected && (
            <button
              className="hover:bg-custom-purple  hover:border-custom-purple shadow-lg shadow-indigo-500/30 text-center mt-4 border text-white rounded-full px-2 py-1 lg:m-0 lg:my-8 lg:text-base lg:px-6 lg:py-2"
              type="button"
              onClick={handleLogout}
            >
              Déconnexion
            </button>
          )}
        </div>
        <div className="flex gap-8">
          <button
            className="z-50 lg:hidden"
            onClick={openModal}
            type="button"
            aria-label="Open Modal"
          >
            <FaUser size={20} />
          </button>
          {content}
          <button
            className="block lg:hidden transition z-50"
            onClick={handleClick}
            type="button"
          >
            {click ? <FaTimes size={30} /> : <GiHamburgerMenu size={30} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
