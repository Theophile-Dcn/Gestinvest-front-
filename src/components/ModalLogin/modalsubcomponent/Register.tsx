import React, { useEffect, useState } from 'react';
import { register } from '../../API/authentification'; // Importer la fonction d'authentification
import '../ModalLogin.scss';

interface RegisterProps {
  email: string;
  password: string;
  error: string | null;
  closeModal: () => void;
}

function Register({ email, password, error, closeModal }: RegisterProps) {
  const [registerPassword, setRegisterPassword] = useState(password || '');
  const [inputconfirmation, setInputconfirmation] = useState('');
  const [registerEmail, setRegisterEmail] = useState(email || '');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  // Fonction de validation du mot de passe par rapport à la regex
  function validatePasswordRegex(password: string) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  // Valider le mot de passe lors de la saisie
  const handlePasswordChange = (password: string) => {
    const isValid = validatePasswordRegex(password);
    setPasswordError(
      isValid
        ? null
        : 'Votre mot de passe doit contenir au moins 8 caractères, dont au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.'
    );
  };

  // Valider la correspondance des mots de passe lors de la saisie
  const handleConfirmPasswordChange = (confirmPassword: string) => {
    const isMatch = registerPassword === confirmPassword;
    setConfirmPasswordError(
      isMatch ? null : 'Les mots de passe ne correspondent pas.'
    );
  };

  // Fonction pour activer le bouton de soumission si les conditions sont remplies
  const enableSubmitButton = () => {
    if (passwordError === null || confirmPasswordError === null) {
      setIsSubmitDisabled(false); // Si l'une des erreurs est null, activer le bouton
    } else {
      setIsSubmitDisabled(true); // Sinon, désactiver le bouton
    }
  };

  // Appeler la fonction enableSubmitButton chaque fois que les erreurs changent
  useEffect(() => {
    enableSubmitButton();
  }, [passwordError, confirmPasswordError, enableSubmitButton]);

  // Fonction de soumission du formulaire d'inscription
  const handleRegisterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await register(registerEmail, registerPassword, inputconfirmation);
      closeModal(); // Fermer la modal après inscription réussie

      // Réinitialiser le formulaire après une inscription réussie
      setRegisterEmail('');
      setRegisterPassword('');
      setInputconfirmation('');
      setErrorMessage(null);
      setIsSubmitDisabled(true);
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      setErrorMessage(error.message);
    }
  };

  return (
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
          value={registerPassword}
          autoComplete="new-password"
          onChange={(e) => {
            setRegisterPassword(e.target.value);
            handlePasswordChange(e.target.value); // Valider le mot de passe par rapport à la regex
          }}
        />
        {passwordError && <p className="error-message">{passwordError}</p>}
        <label htmlFor="confirm-password">Confirmation du mot de passe</label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          onChange={(e) => {
            setInputconfirmation(e.target.value);
            handleConfirmPasswordChange(e.target.value); // Valider la correspondance des mots de passe
          }}
          placeholder="Veuillez confirmer le mot de passe"
          required
          autoComplete="new-password"
          value={inputconfirmation}
        />
        {confirmPasswordError && (
          <p className="error-message">{confirmPasswordError}</p>
        )}
        <button
          className="valid-button"
          type="submit"
          disabled={isSubmitDisabled}
          onClick={enableSubmitButton}
        >
          S'inscrire
        </button>
      </div>
    </form>
  );
}

export default Register;
