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
  assetName: string;
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
      <section className="items-center border border-cyan-50 rounded-3xl p-8 m-4  bg-[#ffffff0d]/5">
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

              <p className="flex gap-8 md:text-xl xl:text-2xl">
                Gain/Perte :{' '}
                <span
                  className="font-bold block"
                  style={{
                    color: GetColorFolio(
                      dashboardData?.gainOrLossTotalPortfolio ?? ''
                    ),
                  }}
                >
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

          {/* <div className="flex flex-col items-center justify-center">
            <p>Investissement en crypto :{dashboardData?.cryptoPourcent}%</p>
            <p>Investissement en actions :{dashboardData?.stockPourcent}%</p>
            <Bar data={data1} />
          </div> */}
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
          <div className="hidden 2xl:grid grid-cols-4 text-xs text-center py-2 px-8 sm:text-sm md:text-base">
            <p className="col-span-1 text-start">Symbole</p>
            <p className="col-span-1">Valeur de l&apos;actif</p>
            <p className="col-span-1">Possédé</p>
            <p className="col-span-1 text-end">Valeur total</p>
          </div>
          <ul>
            {/* affichage actif par categorie */}
            {filterAssetsByCategory(category).map((asset) => (
              <li
                className="grid grid-cols-4 justify-between items-center text-center border-cyan-50 rounded-3xl py-2 px-8 my-2 border bg-[#ffffff0d]/10 text-xs md:text-sm lg:text-base"
                key={asset.symbol}
              >
                <a
                  href={`/${asset.symbol}`}
                  className="col-span-1 hidden 2xl:inline text-start"
                >
                  <span className="font-bold">{asset.symbol}</span> -{' '}
                  {asset.assetName}
                </a>
                <p
                  className="col-span-1 hidden 2xl:inline"
                  style={{
                    color: GetcolorAsset(asset.gainOrLossTotalByAsset),
                  }}
                >
                  {asset.assetPrice} $
                </p>

                <p className="col-span-1 hidden 2xl:inline">{asset.quantity}</p>
                <p
                  className="col-span-1 hidden 2xl:inline text-end"
                  style={{
                    color: GetcolorAsset(asset.gainOrLossTotalByAsset),
                  }}
                >
                  {asset.totalEstimatedValueByAsset} $
                </p>
                <div className="2xl:hidden flex flex-col text-start col-span-2">
                  <div className="flex gap-2">
                    <p className="font-bold">{asset.symbol}</p>
                    <p>{asset.assetName}</p>
                  </div>
                  <p
                    className=""
                    style={{
                      color: GetcolorAsset(asset.gainOrLossTotalByAsset),
                    }}
                  >
                    {asset.assetPrice} $
                  </p>
                </div>
                <div className="flex flex-col text-end 2xl:hidden col-span-2">
                  <p className="">{asset.quantity}</p>
                  <p
                    className=""
                    style={{
                      color: GetcolorAsset(asset.gainOrLossTotalByAsset),
                    }}
                  >
                    {asset.totalEstimatedValueByAsset} $
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default Dashboard;
