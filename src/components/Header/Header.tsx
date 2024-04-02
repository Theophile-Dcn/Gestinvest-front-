// import du fichier de style Header.scss spécifique au Header
import './Header.scss';
// import de l'image du logo à partir du dossier assets
import logo from '../../assets/logo-gestinvest.svg';

type HeaderProps = {
  isConnected: boolean;
};

function Header({ isConnected }: HeaderProps) {
  return (
    // Affichage des liens "Tableau de bord" et "Mon compte" si l'utilisateur est connécté (isConnected)
    // Affichage de "Connexion" ou Déconnexe du bouton en fonction de la connexion de l'utilisateur
    <header className="menu" id="header">
      <img className="logo" src={logo} alt="logo Gestinvest" />
      <nav className="menu-nav">
        {isConnected && (
          <a className="menu-link" href="#header">
            Tableau de bord
          </a>
        )}
        <a className="menu-link" href="#header">
          Accueil
        </a>
        <a className="menu-link" href="#header">
          Tendances
        </a>
        {isConnected && (
          <a className="menu-link" href="#header">
            Mon compte
          </a>
        )}
      </nav>
      <button className="menu-btn" type="button">
        {isConnected ? 'Déconnexion' : 'Connexion'}
      </button>
    </header>
  );
}

export default Header;
