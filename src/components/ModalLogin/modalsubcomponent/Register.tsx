import React, { useEffect, useState, useCallback } from 'react';
import { register } from '../../API/authentification'; // Importer la fonction d'authentification
// import '../ModalLogin.scss';

interface RegisterProps {
  email: string;
  password: string;

  closeModal: () => void;
}

function Register({ email, password, closeModal }: RegisterProps) {
  const [registerPassword, setRegisterPassword] = useState(password || '');
  const [inputconfirmation, setInputconfirmation] = useState('');
  const [registerEmail, setRegisterEmail] = useState(email || '');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  // Fonction de validation du mot de passe par rapport à la regex
  function validatePasswordRegex(password: string) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  // Valider le mot de passe lors de la saisie
  const handlePasswordChange = useCallback((password: string) => {
    const isValid = validatePasswordRegex(password);
    setPasswordError(
      isValid
        ? null
        : 'Votre mot de passe doit contenir au moins 8 caractères, dont au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.'
    );
  }, []);

  // Valider la correspondance des mots de passe lors de la saisie
  const handleConfirmPasswordChange = useCallback(
    (confirmPassword: string) => {
      const isMatch = registerPassword === confirmPassword;
      setConfirmPasswordError(
        isMatch ? null : 'Les mots de passe ne correspondent pas.'
      );
    },
    [registerPassword]
  );

  // Fonction pour activer le bouton de soumission si les conditions sont remplies
  const enableSubmitButton = useCallback(() => {
    setIsSubmitDisabled(
      passwordError !== null || confirmPasswordError !== null
    );
  }, [passwordError, confirmPasswordError]);

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
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
    }
  };

  return (
    <form onSubmit={handleRegisterSubmit} className="register">
      <div className="flex flex-col justify-center items-center p-4">
        <label
          className="pt-2 pb-2 text-white w-full text-start"
          htmlFor="email"
        >
          E-mail
        </label>
        <input
          className="rounded-md p-1 w-full"
          type="email"
          id="email"
          name="email"
          placeholder="js4Life@gmail.com"
          required
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <label
          className="pt-4 pb-2 text-white w-full text-start"
          htmlFor="password"
        >
          Mot de passe
        </label>
        <input
          className="rounded-md p-1 w-full"
          type="password"
          id="password"
          name="password"
          placeholder="*********"
          required
          value={registerPassword}
          autoComplete="new-password"
          onChange={(e) => {
            setRegisterPassword(e.target.value);
            handlePasswordChange(e.target.value); // Valider le mot de passe par rapport à la regex
          }}
        />
        {passwordError && (
          <p className="error-message text-red-600 pt-4 text-xs xl:text-sm">
            {passwordError}
          </p>
        )}
        <label
          className="pt-4 pb-2 text-white w-full text-start "
          htmlFor="confirm-password"
        >
          Confirmation du mot de passe
        </label>
        <input
          className="rounded-md p-1 w-full"
          type="password"
          id="confirm-password"
          name="confirm-password"
          onChange={(e) => {
            setInputconfirmation(e.target.value);
            handleConfirmPasswordChange(e.target.value); // Valider la correspondance des mots de passe
          }}
          placeholder="*********"
          required
          autoComplete="new-password"
          value={inputconfirmation}
        />
        {confirmPasswordError && (
          <p className="error-message  text-red-600 pt-4 text-xs xl:text-sm">
            {confirmPasswordError}
          </p>
        )}
        <button
          className="w-2/4 valid-button p-2 mt-6 hover:bg-custom-purple text-white rounded-xl shadow-lg shadow-indigo-500/30 border border-buttonColor"
          type="submit"
          disabled={isSubmitDisabled}
        >
          S&apos;inscrire
        </button>
      </div>
    </form>
  );
}

export default Register;
