// import du fichier de style Header.scss spécifique au Header
import './Header.scss';
// import de l'image du logo à partir du dossier assets
import logo from '../../assets/logo-gestinvest.svg';

function Header() {
  return (
    <header className="menu" id="header">
      <img className="logo" src={logo} alt="logo Gestinvest" />
      <nav className="menu-nav">
        <a className="menu-link" href="#header">
          Accueil
        </a>
        <a className="menu-link" href="#header">
          Tendances
        </a>
      </nav>
      <button className="menu-btn" type="button">
        Connexion
      </button>
    </header>
  );
}

export default Header;
