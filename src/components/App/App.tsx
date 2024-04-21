// app.tsx
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Account from '../Account/Account';
import AssetDetail from '../AssetDetail/AssetDetail';
import Dashboard from '../Dashboard/Dashboard';
import Footer from '../Footer/Footer';
import Condition from '../Footer/footerSubComponent/Condition';
import Politique from '../Footer/footerSubComponent/Politique';
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import ModalLogin from '../ModalLogin/ModalLogin';
import Page404 from '../Page404/Page404';
import Tendances from '../Tendances/Tendances';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fonction pour ouvrir la modal
  const openModal = () => {
    setIsModalOpen(true);
  };
  // Fonction pour fermer la modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Fonction pour récupérer le jeton du stockage local et mettre à jour l'état de connexion
  const checkToken = () => {
    // Récupérer le jeton du stockage local
    const accessToken = localStorage.getItem('token');

    // Vérifier si le jeton existe
    if (accessToken) {
      // Si le jeton existe, mettre isConnected à true
      setIsConnected(true);
    } else {
      // Si le jeton n'existe pas, mettre isConnected à false
      setIsConnected(false);
    }
  };

  // Appel de checkToken au chargement initial de l'application
  useEffect(() => {
    checkToken();
  }, []);

  // function pour proteger
  type PrivateRouteProps = {
    children: ReactNode; // Utilisez ReactNode pour accepter n'importe quel type d'enfant
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const PrivateRoute = ({ children }: PrivateRouteProps) => {
    // Récupérer le token
    const accessToken = localStorage.getItem('token');
    // Si le token est absent, rediriger vers la page d'accueil
    if (!accessToken) {
      return <Navigate to="/" />;
    }
    // Sinon, authoriser l'access
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>; // Utilisez <>{children}</> pour afficher les enfants
  };

  const location = useLocation();

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/':
        return 'Accueil';
      case '/Account':
        return 'Compte';
      case '/AssetDetail':
        return "Détail d'actif";
      case '/Dashboard':
        return 'Tableau de bord';
      case '/politique-de-confidentialité':
        return 'Politique de confidentialité';
      case '/condition-utilisation':
        return "Condition d'utilisation";
      default:
        // Si le chemin commence par '/AssetDetail/', considérez-le comme une page de détail d'actif
        if (pathname.startsWith('/AssetDetail/')) {
          return "Détail d'actif";
        }

        return 'Page 404';
    }
  };
  useEffect(() => {
    document.title = `GestInvest - ${getPageTitle(location.pathname)}`;
  }, [location]);

  // Ajoutez une fonction pour obtenir la description de chaque page
  const getPageDescription = (pathname: string): string => {
    switch (pathname) {
      case '/':
        return 'GestInvest vous offre une plateforme complète pour suivre vos actifs et analyser leur performance. ';
      case '/Account':
        return 'Sur la page de compte, vous pouvez gérer vos informations personnelles, vos paramètres et vos préférences';
      case '/AssetDetail':
        return "La page de détail d'actif vous fournit des informations détaillées sur un actif spécifique, y compris son historique, ses performances et ses caractéristiques.";
      case '/Dashboard':
        return "Le tableau de bord est votre centre de contrôle, vous offrant une vue d'ensemble de vos actifs, de leurs performances et des tendances du marché.";
      case '/politique-de-confidentialité':
        return 'Consultez notre politique de confidentialité pour comprendre comment nous recueillons, utilisons et protégeons vos données personnelles.';
      case '/condition-utilisation':
        return "Les conditions d'utilisation définissent les règles et les obligations pour utiliser notre plateforme. Veuillez les lire attentivement.";
      default:
        // Si le chemin commence par '/AssetDetail/', considérez-le comme une page de détail d'actif
        if (pathname.startsWith('/AssetDetail/')) {
          return "Désolé, la page que vous recherchez est introuvable. Veuillez vérifier l'URL ou retourner à la page d'accueil.";
        }

        return 'La page erreur 404';
    }
  };

  // Mettez à jour la balise meta description à chaque changement d'URL
  useEffect(() => {
    // Récupère la description de la page en fonction du chemin d'accès actuel
    const description = getPageDescription(location.pathname);
    // Récupère l'élément meta avec le nom "description"
    const metaDescription = document.querySelector('meta[name="description"]');
    // Vérifie si l'élément meta existe
    if (metaDescription) {
      // Met à jour le contenu de l'attribut "content" de l'élément meta
      metaDescription.setAttribute('content', description);
    } else {
      // Si l'élément meta n'existe pas, crée-le et ajoute-le à la balise head
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = description;
      document.head.appendChild(newMeta);
    }
  }, [location.pathname]);

  return (
    <div className="bg-gradient text-white font-roboto">
      <Header openModal={openModal} isConnected={isConnected} />
      <main className="min-h-[84vh] font-roboto ">
        <Routes>
          {/* Composant de la page d'accueil avec la fonction openModal passée en tant que prop */}
          <Route
            path="/"
            element={
              <HomePage openModal={openModal} isConnected={isConnected} />
            }
          />
          <Route path="/Tendances" element={<Tendances />} />
          {/* route a proteger */}
          <Route
            path="/Account"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />
          <Route
            path="/AssetDetail/:slug"
            element={
              <PrivateRoute>
                <AssetDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/Dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          {/* fin des route a proteger */}
          <Route path="*" element={<Page404 />} />
          <Route path="/politique-de-confidentialité" element={<Politique />} />
          <Route path="/condition-utilisation" element={<Condition />} />
        </Routes>
      </main>
      {/* Conditionnellement afficher la modal */}
      {isModalOpen && <ModalLogin closeModal={closeModal} />}
      <Footer />
      <ToastContainer
        className="fixed top-[11vh]"
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
