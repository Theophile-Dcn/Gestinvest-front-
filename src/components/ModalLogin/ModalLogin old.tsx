import React, { useState } from 'react';
import { login, register } from '../API/authentification'; // Importer les fonctions d'authentification
import './ModalLogin.scss';

interface ModalProps {
  closeModal: () => void;
}

interface ModalLoginProps extends ModalProps {
  email: string;
  password: string;
  confirmation: string; // Cette prop est définie mais non utilisée
}

function ModalLogin({ email, password, closeModal }: ModalLoginProps) {
  // Variable d'état pour gérer l'onglet actif (inscription ou connexion)
  const [activeTab, setActiveTab] = useState('register');

  // États pour stocker les valeurs des champs de mot de passe et de confirmation du mot de passe
  const [inputPassword, setInputPassword] = useState(password || '');
  const [inputconfirmation, setInputconfirmation] = useState('');

  // États pour stocker les valeurs des champs d'adresse e-mail
  const [registerEmail, setRegisterEmail] = useState(email || '');
  const [loginEmail, setLoginEmail] = useState(email || '');

  // États pour suivre si les mots de passe correspondent ou non
  const [passwordMatch, setPasswordMatch] = useState(true);

  // État pour stocker les messages d'erreur de l'API
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fonction de soumission du formulaire d'inscription
  const handleRegisterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Appel à la fonction d'inscription
      const userData = await register(
        registerEmail,
        inputPassword,
        inputconfirmation
      );
      console.log('Inscription réussie:', userData);
      setActiveTab('login'); // Rediriger vers l'onglet de connexion après une inscription réussie
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      // Gérer les erreurs d'inscription
      setErrorMessage(error.message); // Mettre à jour l'état avec le message d'erreur de l'API
    }
  };

  // Fonction de soumission du formulaire de connexion
  async function handleLoginSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      // Appel à la fonction de connexion
      const userData = await login(loginEmail, inputPassword);
      console.log('Connexion réussie:', userData);
      // Fermer la modal après une connexion réussie
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      // Gérer les erreurs de connexion
      setErrorMessage(error.message); // Mettre à jour l'état avec le message d'erreur de l'API
    }
  }

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
        <button
          type="button"
          className={activeTab === 'login' ? 'active' : ''}
          onClick={() => setActiveTab('login')}
        >
          Connexion
        </button>
      </div>
      {/* Formulaire d'inscription */}
      {activeTab === 'register' && (
        <form onSubmit={handleRegisterSubmit} className="register">
          <div className="center-element">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Veuillez entrer votre adresse e-mail"
              required
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />

            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Veuillez entrer le mot de passe"
              required
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
            />

            <label htmlFor="confirm-password">
              Confirmation du mot de passe
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              onChange={(e) => setInputconfirmation(e.target.value)}
              placeholder="Veuillez confirmer le mot de passe"
              required
              value={inputconfirmation}
            />

            {/* Affichage du message d'erreur de l'API */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button className="valid-button" type="submit">
              S'inscrire
            </button>
          </div>
        </form>
      )}
      {/* Formulaire de connexion */}
      {activeTab === 'login' && (
        <form onSubmit={handleLoginSubmit} className="login">
          <div className="center-element">
            <label htmlFor="login-email">E-mail</label>
            <input
              type="email"
              id="login-email"
              name="login-email"
              placeholder="Veuillez entrer votre adresse e-mail"
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <label htmlFor="login-password">Mot de passe</label>
            <input
              type="password"
              id="login-password"
              name="login-password"
              placeholder="Veuillez entrer le mot de passe"
              required
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
            />
            {/* Affichage du message d'erreur de l'API */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button className="valid-button" type="submit">
              Se connecter
            </button>
          </div>
        </form>
      )}
    </dialog>
  );
}

export default ModalLogin;
