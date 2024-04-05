// app.tsx
import React, { useEffect, useState } from 'react';

import Header from '../Header/Header';

import HomePage from '../HomePage/HomePage';

import './App.scss';
import ModalLogin from '../ModalLogin/ModalLogin';

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

  return (
    <div className="app">
      <Header openModal={openModal} isConnected={isConnected} />
      <main>
        {/* Composant de la page d'accueil avec la fonction openModal passée en tant que prop */}
        <HomePage openModal={openModal} isConnected={isConnected} />
      </main>
      {/* Conditionnellement afficher la modal */}
      {isModalOpen && <ModalLogin closeModal={closeModal} />}
    </div>
  );
}

export default App;
