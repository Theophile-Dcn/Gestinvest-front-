import { useState } from 'react';
// import './ModalLogin.scss';
import Login from './modalsubcomponent/Login';
import Register from './modalsubcomponent/Register';

interface ModalProps {
  closeModal: () => void;
}

function ModalLogin({ closeModal }: ModalProps) {
  // Variable d'état pour gérer l'onglet actif (inscription ou connexion)
  const [activeTab, setActiveTab] = useState('register');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
      {/* Arrière-plan flou */}
      <div className="absolute inset-0 bg-gray-800 bg-opacity-40" />
      <dialog
        open
        className="fixed top-2/4 left-2/4 bg-[#2a213c] border border-white rounded-xl shadow-lg p-4 w-5/6 md:w-2/4 xl:w-2/5 2xl:w-2/6 transform -translate-x-2/4 -translate-y-2/4"
      >
        {/* Gérer la fermeture de la modal */}
        <button
          type="button"
          className="text-white p-2 absolute right-5 top-2"
          onClick={closeModal}
        >
          X
        </button>

        {/* Boutons d'onglets pour passer entre l'inscription et la connexion */}
        <div className="text-white flex justify-around items-center w-full pt-10 pb-4">
          <button
            type="button"
            className={`uppercase font-bold ${
              activeTab === 'register'
                ? 'underline underline-offset-8'
                : 'text-stone-400'
            }`}
            onClick={() => setActiveTab('register')}
          >
            Inscription
          </button>

          <button
            type="button"
            className={`uppercase font-bold ${activeTab === 'login' ? 'underline underline-offset-8' : 'text-stone-400'}`}
            onClick={() => setActiveTab('login')}
          >
            Connexion
          </button>
        </div>

        {/* Formulaire d'inscription */}
        {activeTab === 'register' && (
          <Register
            closeModal={closeModal} // Passer la fonction de fermeture de la modal
            email=""
            password=""
          />
        )}
        {/* Formulaire de connexion */}
        {activeTab === 'login' && <Login closeModal={closeModal} />}
      </dialog>
    </div>
  );
}

export default ModalLogin;
