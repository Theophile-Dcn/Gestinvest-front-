import React, { useState } from 'react';
import { login, register } from '../API/authentification'; // Importez les fonctions d'authentification
import './ModalLogin.scss';

interface ModalProps {
  closeModal: () => void;
}

interface ModalLoginProps extends ModalProps {
  email: string;
  password: string;
  confirmPassword: string; // Cette prop est définie mais non utilisée
}

function ModalLogin({ email, password, closeModal }: ModalLoginProps) {
  // Variable d'état pour gérer l'onglet actif (inscription ou connexion)
  const [activeTab, setActiveTab] = useState('register');

  // États pour stocker les valeurs des champs de mot de passe et de confirmation du mot de passe
  const [inputEmail, setInputEmail] = useState(email);
  const [inputPassword, setInputPassword] = useState(password);
  const [inputConfirmPassword, setInputConfirmPassword] = useState('');

  // États pour suivre si les mots de passe correspondent ou non
  const [passwordMatch, setPasswordMatch] = useState(true);

  // État pour stocker les messages d'erreur du mot de passe
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  // Fonction pour valider un mot de passe
  function validatePassword(password: string) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return 'Votre mot de passe doit contenir au moins 8 caractères, dont au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.';
    }
    return null; // Renvoie null s'il n'y a pas d'erreur
  }

  // Fonction de soumission du formulaire d'inscription
  const handleRegisterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const passwordError = validatePassword(inputPassword);
    if (inputPassword !== inputConfirmPassword || passwordError) {
      setPasswordMatch(inputPassword === inputConfirmPassword);
      setPasswordError(passwordError);
      setConfirmPasswordError(
        inputPassword !== inputConfirmPassword
          ? 'Les mots de passe ne correspondent pas.'
          : null
      );
      return;
    }

    try {
      // Appel à la fonction d'inscription
      const userData = await register(inputEmail, inputPassword);
      console.log('Inscription réussie:', userData);
      setActiveTab('login'); // inscription réussie redirection sur la modal inscription
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      // Gérer les erreurs d'inscription
    }
  };

  // Fonction de soumission du formulaire de connexion
  async function handleLoginSubmit(event: React.FormEvent) {
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
  }

  // Fonction pour vérifier si les mots de passe correspondent à chaque changement dans le champ de confirmation du mot de passe
  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputConfirmPassword(event.target.value);
    setPasswordMatch(inputPassword === event.target.value);
    setConfirmPasswordError(
      inputPassword !== event.target.value
        ? 'Les mots de passe ne correspondent pas.'
        : null
    );
  };

  // Gérer l'affichage du message d'erreur du mot de passe lorsque l'utilisateur est en train de remplir le champ
  const handlePasswordInput = (event: React.FormEvent<HTMLInputElement>) => {
    const passwordError = validatePassword(event.currentTarget.value);
    setPasswordError(passwordError);
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
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
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
              onInput={handlePasswordInput} // Vérification du format du mot de passe à chaque entrée
            />
            {/* Affichage du message d'erreur pour le mot de passe */}
            {passwordError && <p className="error-message">{passwordError}</p>}

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
              value={inputConfirmPassword}
            />

            {/* Affichage du message d'erreur si les mots de passe ne correspondent pas */}
            {confirmPasswordError && (
              <p className="error-message">{confirmPasswordError}</p>
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
              onChange={(e) => setInputEmail(e.target.value)}
            />
            <label htmlFor="login-password">Mot de passe</label>
            <input
              type="password"
              id="login-password"
              name="login-password"
              placeholder="Veuillez entrer le mot de passe"
              required
              value={password}
              onChange={(e) => setInputPassword(e.target.value)}
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
