// HomePage.tsx
import React from 'react';
import './HomePage.scss';
import deco from '../../assets/HomePage.png';
import { ModalLoginOpenProps } from '../../type/types';

function HomePage({ openModal }: ModalLoginOpenProps) {
  return (
    <section className="homepage-information-center">
      <div className="side-left-homepage">
        <h1 className="slogan">
          Suivez le rythme.
          <br /> Optimisez vos rendements.
        </h1>
        <div className="description">
          <p>Votre patrimoine, notre expertise.</p>
          <p>
            GestInvest vous offre une plateforme complète pour suivre vos actifs
            et analyser leur performance. GestInvest vous donne les moyens de
            réaliser vos ambitions financières. Explorez de nouvelles
            opportunités dès aujourd&apos;ui avec GestInvest.
          </p>
        </div>
        <div>
          <button type="button" onClick={openModal}>
            connexion
          </button>
        </div>
      </div>
      <div className="side-right-homepage">
        <img src={deco} alt="Illustration du site web" />
      </div>
    </section>
  );
}

export default HomePage;
