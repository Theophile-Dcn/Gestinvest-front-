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
      window.location.href = '/dashboard';
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erreur lors de la connexion:', error);
        // Gérer les erreurs de connexion
        setErrorMessage(error.message); // Mettre à jour l'état avec le message d'erreur de l'API
      }
    }
  };

  return (
    <form onSubmit={handleLoginSubmit} className="login">
      <div className="flex flex-col justify-center items-center p-4">
        <label
          className="pt-4 pb-2 text-white w-full text-start"
          htmlFor="login-email"
        >
          E-mail
        </label>
        <input
          className="rounded-md p-1 w-full"
          type="email"
          id="login-email"
          name="login-email"
          placeholder="js4Life@gmail.com"
          required
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <label
          className="pt-4 pb-2 text-white w-full text-start"
          htmlFor="login-password"
        >
          Mot de passe
        </label>
        <input
          className="rounded-md p-1 w-full"
          type="password"
          id="login-password"
          name="login-password"
          placeholder="*********"
          required
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />
        {/* Affichage du message d'erreur de l'API */}
        {errorMessage && (
          <p className="error-message  text-red-600 font text-xs xl:text-sm">
            {errorMessage}
          </p>
        )}
        <button
          className="w-2/4 valid-button p-2 mt-6 hover:border-[#64a4f7]   hover:bg-[#64a4f7] hover:text-black text-white rounded-xl shadow-lg shadow-indigo-500/30 border border-buttonColor"
          type="submit"
        >
          Se connecter
        </button>
      </div>
    </form>
  );
};

export default Login;
