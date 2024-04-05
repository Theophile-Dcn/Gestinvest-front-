// app.tsx
import React, { useState } from 'react';

import Header from '../Header/Header';

import HomePage from '../HomePage/HomePage';

import './App.scss';
import ModalLogin from '../ModalLogin/ModalLogin';
import Account from '../Account/Account';
import AssetDetail from '../AssetDetail/AssetDetail';
import Dashboard from '../Dashboard/Dashboard';
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
