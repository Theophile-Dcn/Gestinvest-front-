// Login.tsx
import React, { useState } from 'react';
import { login } from '../../API/authentification';

interface LoginFormProps {
  closeModal: () => void;
}

const Login = ({ closeModal }: LoginFormProps) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await login(loginEmail, inputPassword);
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      // Gérer les erreurs de connexion
      setErrorMessage(error.message); // Mettre à jour l'état avec le message d'erreur de l'API
    }
  };

  return (
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
  );
};

export default Login;
