// HomePage.tsx
// import './HomePage.scss';

type HomePageProps = {
  isConnected: boolean;
  openModal: () => void;
};

function HomePage({ isConnected, openModal }: HomePageProps) {
  return (
    // Affichage du bouton "Connexion" si l'utilisateur n'est pas connecté (!isConnected)

    <section className="flex m-auto h-[84vh] relative p-12 lg:w-5/6 2xl:w-4/5">
      <div className="flex flex-col justify-center items-center sm:items-start md:w-5/6">
        <h1 className="text-center bg-gradient-to-r from-blue-400  to-red-400 text-transparent bg-clip-text font-bold text-3xl sm:text-start md:text-4xl lg:text-4xl lg:text-left xl:text-5xl ">
          Suivez le rythme.
          <br />
          Optimisez vos rendements.
        </h1>
        <div className="lg:m-0 ">
          <h2 className="text-center uppercase font-semibold py-6 sm:text-start md:text-2xl lg:text-xl lg:my-4 xl:text-3xl">
            Votre patrimoine, notre expertise.
          </h2>
          <p className="text-center text-md lg:text-base lg:w-full sm:text-start xl:text-lg xl:w-5/6">
            GestInvest vous offre une plateforme complète pour suivre vos actifs
            et analyser leur performance. GestInvest vous donne les moyens de
            réaliser vos ambitions financières. Explorez de nouvelles
            opportunités dès aujourd&apos;hui avec GestInvest.
          </p>
        </div>

        {!isConnected && (
          <button
            className="hover:bg-custom-purple hover:border-custom-purple shadow-lg shadow-indigo-500/30 text-center mt-4 border border-buttonColor text-white rounded-full px-2 py-1 lg:m-0 lg:my-8 lg:text-xl lg:px-6 lg:py-2"
            type="button"
            onClick={openModal}
          >
            Connexion
          </button>
        )}
      </div>
      <div className="hidden overflow-hidden md:flex w-3/6">
        <img
          className="w-5/6 opacity-80 m-auto"
          src="../src/assets/Gestinvest-dashboard-image.png"
          alt=""
        />
      </div>
    </section>
  );
}

export default HomePage;
