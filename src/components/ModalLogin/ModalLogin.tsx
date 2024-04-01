// ModalLogin.jsx
import './ModalLogin.scss';

function ModalLogin() {
  return (
    <main>
      <dialog>
        <span className="close">X</span>
        {/* Formulaire d'inscription */}
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

          <label htmlFor="confirm-password">Confirmation du mot de passe</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            required
          />
        </form>

        {/* Formulaire de connexion */}
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
      </dialog>
    </main>
  );
}

export default ModalLogin;
