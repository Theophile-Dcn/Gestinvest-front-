// HomePage.tsx
// Liste des importations
import './HomePage.scss';
import deco from '../../assets/HomePage.png';

function HomePage() {
  return (
    <main>
      <section className="homePage-information-center">
        <div className="side-left-homepage">
          <h1 className="slogan">
            Suivez le rythme.
            <br /> Optimisez vos rendements.
          </h1>
          <div className="description">
            <p>Votre patrimoine, notre expertise.</p>
            <p>
              GestInvest vous offre une plateforme complète pour suivre vos
              actifs et analyser leur performance. GestInvest vous donne les
              moyens de réaliser vos ambitions financières. Explorez de
              nouvelles opportunités dès aujourd&aposhui avec GestInvest.
            </p>
          </div>
          <div>
            <button type="button">connexion</button>
          </div>
        </div>
        <div className="side-right-homepage">
          <img src={deco} alt="Illustration du site web" />
        </div>
      </section>
    </main>
  );
}

export default HomePage;
