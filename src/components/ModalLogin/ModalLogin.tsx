import React, { useState } from 'react';
import './ModalLogin.scss';
import Register from './modalsubcomponent/Register';

interface ModalProps {
  closeModal: () => void;
}

function ModalLogin({ closeModal }: ModalProps) {
  // Variable d'état pour gérer l'onglet actif (inscription ou connexion)
  const [activeTab, setActiveTab] = useState('register');

  return (
    <dialog open className="modal">
      <div className="right-element">
        {/* Gérer la fermeture de la modal */}
        <button type="button" className="close" onClick={closeModal}>
          X
        </button>
      </div>
      {/* Boutons d'onglets pour passer entre l'inscription et la connexion */}
      <div className="tabs-title">
        <button
          type="button"
          className={activeTab === 'register' ? 'active' : ''}
          onClick={() => setActiveTab('register')}
        >
          Inscription
        </button>
        {/* <button
          type="button"
          className={activeTab === 'login' ? 'active' : ''}
          onClick={() => setActiveTab('login')}
        >
          Connexion
        </button> */}
      </div>

      {/* Formulaire d'inscription */}
      {activeTab === 'register' && (
        <Register
          closeModal={closeModal} // Passer la fonction de fermeture de la modal
          email=""
          password=""
          error={null}
        />
      )}
    </dialog>
  );
}

export default ModalLogin;
