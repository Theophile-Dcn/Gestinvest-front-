import React, { SetStateAction, useState } from 'react';
import { login, register } from '../API/authentification'; // Importez les fonctions d'authentification
import { ModalLoginCloseProps } from '../../type/types';
import './ModalLogin.scss';

function ModalLogin({ closeModal }: ModalLoginCloseProps) {
  // Variable d'état pour gérer l'onglet actif (inscription ou connexion)
  const [activeTab, setActiveTab] = useState('register');

  // États pour stocker les valeurs des champs de mot de passe et de confirmation du mot de passe
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // État pour suivre si les mots de passe correspondent ou non
  const [passwordMatch, setPasswordMatch] = useState(true);

  // Fonction de soumission du formulaire d'inscription
  const handleRegisterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password === confirmPassword) {
      try {
        // Appel à la fonction d'inscription
        const userData = await register(email, password);
        console.log('Inscription réussie:', userData);
        // Ici, vous pouvez effectuer des actions supplémentaires, comme la redirection vers une page de profil.
      } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        // Gérer les erreurs d'inscription
      }
    } else {
      setPasswordMatch(false);
    }
  };

  // Fonction de soumission du formulaire de connexion
  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Appel à la fonction de connexion
      const userData = await login(email, password);
      console.log('Connexion réussie:', userData);
      // Fermer la modal après une connexion réussie
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      // Gérer les erreurs de connexion
    }
  };

  // Fonction pour vérifier si les mots de passe correspondent à chaque changement dans le champ de confirmation du mot de passe
  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
    setPasswordMatch(password === event.target.value);
  };

  return (
    <dialog open className="modal">
      <div className="right-element">
        {/* Gestion de la fermeture de la modal */}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Veuillez entrer le mot de passe"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Met à jour l'état du mot de passe
            />

            <label htmlFor="confirm-password">
              Confirmation du mot de passe
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              onChange={handleConfirmPasswordChange} // Appelle la fonction handleConfirmPasswordChange à chaque changement
              placeholder="Veuillez confirmer le mot de passe"
              required
              value={confirmPassword}
            />

            {/* Affichage du message d'erreur si les mots de passe ne correspondent pas */}
            {!passwordMatch && (
              <p className="error-message">
                Les mots de passe ne correspondent pas.
              </p>
            )}

            <button className="valid-button" type="submit">
              S&apos;inscrire
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="login-password">Mot de passe</label>
            <input
              type="password"
              id="login-password"
              name="login-password"
              placeholder="Veuillez entrer le mot de passe"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
