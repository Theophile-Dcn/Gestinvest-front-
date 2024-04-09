import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GetDashboard from '../API/dashboardAPI';
import './Dashboard.scss';

interface DashboardProps {
  totalInvestment: number;
  totalEstimatePortfolio: number;
  gainOrLossPourcent: number;
  gainOrLossMoney: number;
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
}

function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardProps | null>(
    null
  );
  const { uuid } = useParams();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (uuid) {
          const data = await GetDashboard(uuid);
          setDashboardData(data);
        }
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      }
    };

    fetchDashboardData();
  }, [uuid]);

  // Function to group assets by category
  const groupAssetsByCategory = () => {
    if (!dashboardData || !dashboardData.assetUserInformation) return {};

    const groupedAssets: { [category: string]: AssetUserInformation[] } = {};
    dashboardData.assetUserInformation.forEach((asset) => {
      if (!groupedAssets[asset.assetCategory]) {
        groupedAssets[asset.assetCategory] = [];
      }
      groupedAssets[asset.assetCategory].push(asset);
    });

    return groupedAssets;
  };

  return (
    <div className="dashboard" id="dashboard">
      <section className="summary">
        <h2> Mon portefeuille</h2>
        <div className="summary__parts">
          <div className="summary__part">
            <p>Valeur estimée : {dashboardData?.totalEstimatePortfolio} €</p>
            <p>Total investi : {dashboardData?.totalInvestment} €</p>
            <p>Variation : {dashboardData?.gainOrLossPourcent}%</p>
            <p>Gain/Perte : {dashboardData?.gainOrLossMoney} €</p>
          </div>
        </div>
        <div className="summary__part">GRAPH</div>
      </section>
      <section className="addorsell">
        <button type="button" className="button">
          Ajouter un actif
        </button>
        <button type="button" className="button">
          Vendre un actif
        </button>
      </section>
      {dashboardData &&
      dashboardData.assetUserInformation &&
      Object.keys(groupAssetsByCategory()).length > 0 ? (
        <div className="dashboard" id="dashboard">
          {Object.entries(groupAssetsByCategory()).map(([category, assets]) => (
            <section className="assetlist" key={category}>
              <h2>{category}</h2>
              <div className="assetlist__title">
                <p>Symbole</p>
                <p>Nom</p>
                <p>Valeur de l'actif</p>
                <p>Possédé</p>
                <p>Valeur totale</p>
              </div>
              <ul>
                {assets.map((asset, index) => (
                  <li className="assetlist__item" key={index}>
                    <p>{asset.symbol}</p>
                    <p>{asset.assetName}</p>
                    <p
                      className={
                        asset.assetPrice > 0 ? 'greenPrice' : 'redPrice'
                      }
                    >
                      {asset.assetPrice} €
                    </p>
                    <p>{asset.quantity}</p>
                    <p
                      className={
                        asset.totalEstimatedValueByAsset > 0
                          ? 'greenPrice'
                          : 'redPrice'
                      }
                    >
                      {asset.totalEstimatedValueByAsset} €
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <p className="no-data">Aucune donnée disponible pour le moment.</p>
      )}{' '}
    </div>
  );
}

export default Dashboard;
