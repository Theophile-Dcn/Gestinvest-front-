// app.tsx
import React, { useState } from 'react';
import HomePage from '../HomePage/HomePage';

import './App.scss';
import ModalLogin from '../ModalLogin/ModalLogin';

function App() {
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
      <main>
        {/* Composant de la page d'accueil avec la fonction openModal passée en tant que prop */}
        <HomePage openModal={openModal} />
      </main>
      {/* Conditionnellement afficher la modal */}
      {isModalOpen && <ModalLogin closeModal={closeModal} />}
    </div>
  );
}

export default App;
