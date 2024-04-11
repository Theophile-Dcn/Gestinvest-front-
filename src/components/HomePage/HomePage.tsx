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
        <h1 className="bg-gradient-to-r from-blue-400  to-red-400 inline-block text-transparent bg-clip-text text-center m-auto font-bold text-2xl md:text-4xl lg:text-4xl lg:text-left xl:text-5xl ">
          Suivez le rythme.
          <br />
          Optimisez vos rendements.
        </h1>
        <div className="m-auto w-3/4 lg:m-0">
          <h2 className="my-2 font-semibold md:text-2xl lg:text-xl lg:my-4 xl:text-3xl">
            Votre patrimoine, notre expertise.
          </h2>
          <p className="lg:text-base lg:w-full xl:text-lg xl:w-5/6">
            GestInvest vous offre une plateforme complète pour suivre vos actifs
            et analyser leur performance. GestInvest vous donne les moyens de
            réaliser vos ambitions financières. Explorez de nouvelles
            opportunités dès aujourd&apos;hui avec GestInvest.
          </p>
        </div>

        {!isConnected && (
          <button
            className="hover:bg-gradient-to-r from-blue-500  to-red-400 hover:inline-block hover:text-transparent hover:bg-clip-text shadow-lg shadow-indigo-500/30 text-center m-8 border border-buttonColor text-white rounded-full px-2 py-1 lg:m-0 lg:my-8 lg:text-xl lg:px-6 lg:py-2"
            type="button"
            onClick={openModal}
          >
            Connexion
          </button>
        )}
      </div>
      {/* <div className="mockup-phone absolute right-48">
        <div className="camera" />
        <div className="display">
          <div className="artboard artboard-demo phone-1">
            <img
              className=""
              src="../src/assets/TableaudebordMobile.png"
              alt="Illustration du site web"
            />
          </div>
        </div>
      </div> */}

      {/* <div className="side-right-homepage">

      </div> */}
    </section>
  );
}

export default HomePage;
