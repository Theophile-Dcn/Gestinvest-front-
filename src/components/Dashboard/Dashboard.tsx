import { useEffect, useState } from 'react';
import GetDashboard from '../API/dashboardAPI';
import AssetModal from '../AssetModal/AssetModal';
import './Dashboard.scss';

interface DashboardProps {
  totalEstimatePortfolio: number;
  gainOrLossPourcent: number;
  gainOrLossMoney: number;
  cryptoPourcent: number;
  stockPourcent: number;
  gainOrLossTotalPortfolio: string | null;
  assetUserInformation: AssetUserInformation[];
}

interface AssetUserInformation {
  symbol: string;
  quantity: number;
  totalInvestByAsset: number;
  totalEstimatedValueByAsset: number;
  assetCategory: string;
  assetPrice: number;
  gainOrLossTotalByAsset: string;
}

function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardProps | null>(
    null
  );
  // State showModal utilisé pour ouvrir ou fermer la modale achat/vente
  // L'état du state change au click sur un des boutons "ajouter" ou "vendre un actif" du Dashboard
  // Le state est remis à false au click sur le bouton de fermeture de la modale par la fonction closeAssetModal
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await GetDashboard();
        setDashboardData(data.userInformation);
        console.log('Dashboard Data:', data);
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      }
    };

    fetchDashboardData();
  }, []);

  // Fonction closeAssetModal utilisée pour remettre les states showModal à leur état initial
  // au click sur le bouton fermeture de la modale (voir composant AssetModal)
  const closeAssetModal = () => {
    setShowModal(false);
    window.location.reload(); // recharge la page à la fermeture
  };

  // Fonction pour récupérer les catégories d'actifs disponibles
  const getAssetCategories = () => {
    if (!dashboardData) return [];
    return [
      ...new Set(
        dashboardData.assetUserInformation.map((asset) => asset.assetCategory)
      ),
    ];
  };

  // Fonction pour filtrer les actifs par catégorie
  const filterAssetsByCategory = (category: string) => {
    if (!dashboardData) return [];
    return dashboardData.assetUserInformation.filter(
      (asset) => asset.assetCategory === category
    );
  };
  // fonction pour la couleur du portfolio
  const GetColorFolio = (gainOrLossTotalPortfolio: string) => {
    if (gainOrLossTotalPortfolio === 'positive') {
      return '#05cb05';
    }
    return 'red';
  };
  // fonction pour la couleur du actif
  const GetcolorAsset = (gainOrLossTotalByAsset: string) => {
    if (gainOrLossTotalByAsset === 'positive') {
      return '#05cb05';
    }
    return 'red';
  };

  return (
    <div
      className="flex flex-col min-h-[84vh] justify-center m-auto p-4 sm:w-5/6 lg:w-3/5"
      id="dashboard"
    >
      <section className="items-center border border-cyan-50 rounded-3xl p-8 my-6  bg-[#ffffff0d]/5">
        <h2 className="text-lg uppercase font-bold mb-6 sm:text-center sm:text-xl md:text-2xl md:mb-10 xl:text-3xl">
          Mon Portefeuille
        </h2>

        <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
          <div>
            {/* Affichage des détails du résumé */}

            <div className="flex flex-col sm:gap-2 md:gap-4">
              <p className="flex gap-8 md:text-xl xl:text-2xl">
                Valeur estimée :{' '}
                <span className="font-bold block">
                  {dashboardData?.totalEstimatePortfolio} $
                </span>
              </p>

              <p
                className="flex gap-8 md:text-xl xl:text-2xl"
                style={{
                  color: GetColorFolio(
                    dashboardData?.gainOrLossTotalPortfolio ?? ''
                  ),
                }}
              >
                Gain/Perte :{' '}
                <span className="font-bold block">
                  {dashboardData?.gainOrLossMoney} $
                </span>
              </p>
              {/* <p className="flex gap-8 md:text-xl xl:text-2xl">
                Gain/Perte :{' '}
                <span className="font-bold block">
                  {dashboardData?.gainOrLossPourcent ?? 0} %
                </span>
              </p> */}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p>Investissement en crypto :{dashboardData?.cryptoPourcent}%</p>
            <p>Investissement en actions :{dashboardData?.stockPourcent}%</p>
          </div>
        </div>
      </section>

      <section className="assetModal">
        <div className="flex justify-center">
          <button
            type="button"
            className="w-3/4 md:w-2/4 valid-button p-2 mt-2 md:mt-6   hover:bg-custom-purple text-white rounded-xl shadow-lg shadow-indigo-500/30 border border-buttonColor"
            onClick={() => {
              setShowModal(true); // showModal = true ouvre la modale AssetModal
            }}
          >
            Ajouter une transaction
          </button>

          {showModal && (
            <div>
              <AssetModal closeAssetModal={closeAssetModal} />
            </div>
          )}
        </div>
      </section>

      {/* rangement par categorie */}
      {getAssetCategories().map((category) => (
        <section className="p-2 mt-10" key={category}>
          <h2 className="text-sm uppercase font-bold mb-6 sm:text-base md:text-lg lg:text-xl">
            {category}
          </h2>
          <div className="flex justify-around text-xs text-center p-2 sm:text-sm md:text-base">
            <p className='className="w-1/4"'>Symbole</p>
            <p className='className="w-1/4"'>Valeur de l&apos;actif</p>
            <p className='className="w-1/4"'>Possédé</p>
            <p className='className="w-1/4"'>Valeur total</p>
          </div>
          <ul>
            {/* affichage actif par categorie */}
            {filterAssetsByCategory(category).map((asset) => (
              <li
                className="flex justify-around text-center  border-cyan-50 rounded-3xl p-2 my-2 border bg-[#ffffff0d]/10  text-xs md:text-sm lg:text-base"
                key={asset.symbol}
              >
                <p className="w-1/4">{asset.symbol}</p>
                <p
                  className="w-1/4"
                  style={{
                    color: GetcolorAsset(asset.gainOrLossTotalByAsset),
                  }}
                >
                  {asset.assetPrice} $
                </p>

                <p className="w-1/4">{asset.quantity}</p>
                <p
                  className="w-1/4"
                  style={{
                    color: GetcolorAsset(asset.gainOrLossTotalByAsset),
                  }}
                >
                  {asset.totalEstimatedValueByAsset} $
                </p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default Dashboard;
