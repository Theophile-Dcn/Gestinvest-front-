// app.tsx
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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
  return (
    <div className="bg-gradient text-white font-roboto">
      <Header openModal={openModal} isConnected={isConnected} />
      <main className="min-h-[84vh] font-roboto">
        <Routes>
          {/* Composant de la page d'accueil avec la fonction openModal passée en tant que prop */}
          <Route
            path="/"
            element={
              <HomePage openModal={openModal} isConnected={isConnected} />
            }
          />
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
