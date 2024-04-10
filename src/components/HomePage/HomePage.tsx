// HomePage.tsx
import './HomePage.scss';

type HomePageProps = {
  isConnected: boolean;
  openModal: () => void;
};

function HomePage({ isConnected, openModal }: HomePageProps) {
  return (
    // Affichage du bouton "Connexion" si l'utilisateur n'est pas connecté (!isConnected)

    <section className="flex h-[84vh] justify-center items-center relative ">
      <div className="text-center absolute md:top-10 lg:w-3/4 lg:top-24 lg:left-8 lg:text-left">
        <h1 className="bg-gradient-to-r from-blue-400  to-red-400 inline-block text-transparent bg-clip-text text-center m-auto font-bold text-2xl md:text-4xl lg:text-4xl lg:text-left ">
          Suivez le rythme.
          <br />
          Optimisez vos rendements.
        </h1>
        <div className="m-auto w-3/4 lg:m-0">
          <h2 className="my-2 font-semibold md:text-xl">
            Votre patrimoine, notre expertise.
          </h2>
          <p className="">
            GestInvest vous offre une plateforme complète pour suivre vos actifs
            et analyser leur performance. GestInvest vous donne les moyens de
            réaliser vos ambitions financières. Explorez de nouvelles
            opportunités dès aujourd&apos;hui avec GestInvest.
          </p>
        </div>

        {!isConnected && (
          <button
            className="m-8 bg-buttonColor rounded-full px-2 py-1 lg:m-0 lg:my-4"
            type="button"
            onClick={openModal}
          >
            Connexion
          </button>
        )}
      </div>

      {/* <div className="side-right-homepage">
        <img
          className="img-absolute"
          src={deco}
          alt="Illustration du site web"
        />
      </div> */}
    </section>
  );
}

export default HomePage;
