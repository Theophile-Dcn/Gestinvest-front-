// app.tsx
import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import ModalLogin from '../ModalLogin/ModalLogin';

import AssetDetail from '../AssetDetail/AssetDetail';
import Dashboard from '../Dashboard/Dashboard';
import Page404 from '../Page404/Page404';
import Account from '../Account/Account';
import Footer from '../Footer/Footer';


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
    console.log('Token from localStorage:', accessToken);

    // Vérifier si le jeton existe
    if (accessToken) {
      // Si le jeton existe, mettre isConnected à true
      setIsConnected(true);
      console.log('User is connected');
    } else {
      // Si le jeton n'existe pas, mettre isConnected à false
      setIsConnected(false);
      console.log('User is not connected');
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
    <div className="app">
      <Header openModal={openModal} isConnected={isConnected} />

      <main>
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
            path="/AssetDetail"
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
        </Routes>

      </main>
      {/* Conditionnellement afficher la modal */}
      {isModalOpen && <ModalLogin closeModal={closeModal} />}
    </div>
  );
}

export default App;
