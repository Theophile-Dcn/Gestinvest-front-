import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import imgHome from '../../assets/Gestinvest-dashboard-image.png';

type HomePageProps = {
  isConnected: boolean;
  openModal: () => void;
};

const HomePage = ({ isConnected, openModal }: HomePageProps) => {
  const [animateImage, setAnimateImage] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAnimateImage(true);
    }, 1550);

    return () => clearTimeout(timeoutId);
  }, []); // Cette useEffect se déclenche une seule fois, juste après le rendu initial

  return (
    <section className="flex m-auto h-[84vh] relative p-12 lg:w-5/6 2xl:w-5/5 overflow-hidden">
      {' '}
      {/* Ajout de overflow-hidden ici */}
      <motion.div
        className="flex flex-col justify-center items-center sm:items-start md:w-5/6"
        initial={{ opacity: 0, x: -500 }} // Commence avec une opacité de 0 et défilement de -500 pixels vers la gauche
        animate={{ opacity: 1, x: 0 }} // Animer vers une opacité de 1 et une position d'origine
        transition={{ duration: 0.8 }} // Durée de transition de 1.5 secondes
      >
        <h1 className="text-center bg-gradient-to-r from-blue-400 to-red-400 text-transparent bg-clip-text font-bold text-3xl sm:text-start md:text-4xl lg:text-4xl lg:text-left xl:text-5xl">
          Suivez le rythme.
          <br />
          Optimisez vos rendements.
        </h1>
        <div className="lg:m-0 justify-center flex flex-col sm:block">
          <h2 className="text-center uppercase font-semibold py-6 sm:text-start md:text-2xl lg:text-xl lg:my-4 xl:text-3xl">
            Votre patrimoine, notre expertise.
          </h2>
          <p className="text-center text-md lg:text-base lg:w-full sm:text-start xl:text-lg xl:w-5/6">
            GestInvest vous offre une plateforme complète pour suivre vos actifs
            et analyser leur performance. GestInvest vous donne les moyens de
            réaliser vos ambitions financières. Explorez de nouvelles
            opportunités dès aujourd&apos;hui avec GestInvest.
          </p>
          {!isConnected && (
            <motion.button
              className="w-2/4 lg:w-1/3 m-auto hover:bg-custom-purple  hover:border-custom-purple shadow-lg shadow-indigo-500/30 text-center mt-4 border border-buttonColor text-white rounded-full px-2 py-1 lg:m-0 lg:my-8 xl:text-xl lg:px-6 lg:py-2"
              type="button"
              onClick={openModal}
            >
              Connexion
            </motion.button>
          )}
        </div>
      </motion.div>{' '}
      {/* Fin de la première div motion */}
      <motion.div
        className="flex-col justify-center items-center sm:items-start md:w-5/6 hidden md:flex"
        initial={{ opacity: 0, x: 500 }} // Commence avec une opacité de 0 et défilement de -500 pixels vers la gauche
        animate={{ opacity: 1, x: 0 }} // Animer vers une opacité de 1 et une position d'origine
        transition={{ duration: 0.8 }} // Durée de transition de 1.5 secondes
      >
        <img
          className={`w-5/6 opacity-80 m-auto lg:w-4/6 ${animateImage ? 'animate-bounce' : ''}`}
          src={imgHome}
          alt=""
        />
      </motion.div>
    </section>
  );
};

export default HomePage;
