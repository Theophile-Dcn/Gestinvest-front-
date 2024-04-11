import { useState } from 'react';
import { CiMenuFries } from 'react-icons/ci';
import { FaTimes } from 'react-icons/fa';
import logo from '../../assets/logo-gestinvest.svg';

const Nav = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  // Classes pour l'animation du menu mobile
  const mobileMenuAnimationClasses = click
    ? 'lg:hidden block absolute top-0 w-full right-0 bg-slate-900 z-40 transition-transform transform translate-x-0'
    : 'lg:hidden block absolute top-0 w-full right-0 bg-slate-900 z-40 transition-transform transform -translate-x-full';

  // Contenu du menu mobile
  const content = (
    <div
      className={`${mobileMenuAnimationClasses} h-screen flex flex-col justify-center`}
    >
      <ul className="text-center text-xl ">
        <a className="flex justify-center" href="Accueil">
          <li className="w-2/3 my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
            Accueil
          </li>
        </a>
        <a className="flex justify-center" href="Tendances">
          <li className=" w-2/3 my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
            Tendance
          </li>
        </a>
        <a className="flex justify-center" href="Dashboard">
          <li className="w-2/3 my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
            Tableau de bord
          </li>
        </a>
        <a className="flex justify-center" href="Account">
          <li className="w-2/3 my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
            Mon compte
          </li>
        </a>
      </ul>
    </div>
  );

  return (
    <nav>
      <div className="h-10vh flex justify-between z-40 text-white lg:py-5 px-20 py-4">
        <div className="flex items-center flex-1">
          <img className="w-20 z-50" src={logo} alt="logo Gestinvest" />
        </div>
        <div className="lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden">
          <div className="flex-10">
            <ul className="flex gap-8 mr-16 text-[18px]">
              <a href="/">
                <li className=" transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor pointer">
                  Accueil
                </li>
              </a>
              <a href="/Tendances">
                <li className=" transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor pointer">
                  Tendance
                </li>
              </a>
              <a href="/Dashboard">
                <li className=" transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor pointer">
                  Tableau de bord
                </li>
              </a>
              <a href="/Account">
                <li className=" transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor pointer">
                  Mon compte
                </li>
              </a>
            </ul>
          </div>
        </div>
        {content}
        <button
          className="block md:hidden transition z-50"
          onClick={handleClick}
          type="button"
        >
          {click ? <FaTimes size={30} /> : <CiMenuFries size={30} />}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
