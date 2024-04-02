import { useState } from 'react';
import { ModalLoginCloseProps } from '../../type/types';
import './ModalLogin.scss';

function ModalLogin({ closeModal }: ModalLoginCloseProps) {
  const [activeTab, setActiveTab] = useState('register');

  return (
    <dialog open className="modal">
      <div className="right-element">
        <button type="button" className="close" onClick={closeModal}>
          X
        </button>
      </div>
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
      <div className="center-element">
        {activeTab === 'register' && (
          <form action="" className="register">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Veuillez entrer votre adresse e-mail"
              required
            />

            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password" required />

            <label htmlFor="confirm-password">
              Confirmation du mot de passe
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
            />
            <button type="submit">S&apos;inscrire</button>
          </form>
        )}

        {activeTab === 'login' && (
          <form action="" className="login">
            <label htmlFor="login-email">E-mail</label>
            <input
              type="email"
              id="login-email"
              name="login-email"
              placeholder="Veuillez entrer votre adresse e-mail"
              required
            />

            <label htmlFor="login-password">Mot de passe</label>
            <input
              type="password"
              id="login-password"
              name="login-password"
              required
            />

            <button type="submit">Se connecter</button>
          </form>
        )}
      </div>
    </dialog>
  );
}

export default ModalLogin;
