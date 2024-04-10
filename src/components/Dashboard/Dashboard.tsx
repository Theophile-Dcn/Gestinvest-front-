import { useEffect, useState } from 'react';
import GetDashboard from '../API/dashboardAPI';
import './Dashboard.scss';

interface DashboardProps {
  totalInvestment: number;
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
  assetName: string;
  assetPrice: number;
  gainOrLossTotalByAsset: string;
}

function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardProps | null>(
    null
  );

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
      return 'green';
    }
    return 'red';
  };
  // fonction pour la couleur du actif
  const GetcolorAsset = (gainOrLossTotalByAsset: string) => {
    if (gainOrLossTotalByAsset === 'positive') {
      return 'green';
    }
    return 'red';
  };

  return (
    <div className="dashboard" id="dashboard">
      <section className="summary">
        <h2>Portefeuille : Bourso</h2>
        <div className="summary__parts">
          <div className="summary__part">
            {/* Affichage des détails du résumé */}

            <div>
              <p>Total investi : {dashboardData?.totalInvestment} €</p>
              <p>Valeur estimée : {dashboardData?.totalEstimatePortfolio} €</p>

              <p
                style={{
                  color: GetColorFolio(
                    dashboardData?.gainOrLossTotalPortfolio ?? ''
                  ),
                }}
              >
                Gain/Perte : {dashboardData?.gainOrLossMoney} €
              </p>
              <p>
                Pourcentage de gain/perte : {dashboardData?.gainOrLossPourcent}%
              </p>
            </div>
          </div>
          <div className="summary__part">
            <p>
              Pourcentage d&apos;investissement en crypto :
              {dashboardData?.cryptoPourcent}%
            </p>
            <p>
              Pourcentage dinvestissement en actions :
              {dashboardData?.stockPourcent}%
            </p>
          </div>
        </div>
      </section>

      <section className="addorsell">
        <button type="button" className="button">
          Ajouter un actif
        </button>
        <button type="button" className="button">
          Vendre un actif
        </button>
      </section>

      {/* rangement par categorie */}
      {getAssetCategories().map((category) => (
        <section className="assetlist" key={category}>
          <h2>{category}</h2>
          <div className="assetlist__title">
            <p>Symbole</p>
            <p>Nom</p>
            <p>Valeur de l&apos;actif</p>
            <p>Possédé</p>
            <p>Valeur total</p>
          </div>
          <ul>
            {/* affichage actif par categorie */}
            {filterAssetsByCategory(category).map((asset) => (
              <li className="assetlist__item" key={asset.symbol}>
                <p>{asset.symbol}</p>
                <p>{asset.assetName}</p>
                <p
                  style={{ color: GetcolorAsset(asset.gainOrLossTotalByAsset) }}
                >
                  {asset.assetPrice} €
                </p>

                <p>{asset.quantity}</p>
                <p
                  style={{ color: GetcolorAsset(asset.gainOrLossTotalByAsset) }}
                >
                  {asset.totalEstimatedValueByAsset} €
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
