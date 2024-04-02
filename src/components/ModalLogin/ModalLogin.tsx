import { SetStateAction, useState } from 'react';
import { ModalLoginCloseProps } from '../../type/types';
import './ModalLogin.scss';

function ModalLogin({ closeModal }: ModalLoginCloseProps) {
  // Variable d'état pour gérer l'onglet actif (inscription ou connexion)
  const [activeTab, setActiveTab] = useState('register');

  // États pour stocker les valeurs des champs de mot de passe et de confirmation du mot de passe
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // État pour suivre si les mots de passe correspondent ou non
  const [passwordMatch, setPasswordMatch] = useState(true);

  // Fonction de soumission du formulaire d'inscription
  const handleRegistreSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (password === confirmPassword) {
      console.log('Les mots de passe correspondent');
    } else {
      setPasswordMatch(false);
    }
  };

  // Fonction pour vérifier si les mots de passe correspondent à chaque changement dans le champ de confirmation du mot de passe
  const handleConfirmPasswordChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setConfirmPassword(event.target.value);
    setPasswordMatch(password === event.target.value); // Vérifie si les mots de passe correspondent
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
        <form onSubmit={handleRegistreSubmit} className="register">
          <div className="center-element">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Veuillez entrer votre adresse e-mail"
              required
            />

            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Veuillez entrer le mot de passe"
              required
              onChange={(event) => setPassword(event.target.value)} // Met à jour l'état du mot de passe
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
        <form action="" className="login">
          <div className="center-element">
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
              placeholder="Veuillez entrer le mot de passe"
              required
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
