import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseURL, header } from '../API/API-info';
import TradingViewWidget from './TradingViewWidget';
import TradingViewWidgetChart from './TradingViewWidgetChart';

interface AssetDetailProps {
  totalEstimateAsset: number;
  totalAssetNumber: number;
  name: string;
  symbol: string;
  local: string;
  categoryName: string;
  assetId: number;
  assetLineDetail: AssetLineDetail[];
}

interface AssetLineDetail {
  lineId: number;
  date: string;
  operationType: string;
  buyQuantity: number;
  priceInvest: number;
  fees: string;
  totalInvestLineWithFees: number;
}

function AssetDetail() {
  const { slug } = useParams();
  // Déclaration d'un état local "assetDetailData" et de sa fonction de mise à jour "setAssetDetailData"
  const [assetDetailData, setAssetDetailData] =
    useState<AssetDetailProps | null>(null);

  // Utilisation de useEffect pour exécuter une fonction asynchrone au chargement initial du composant ou lorsque ses dépendances changent
  useEffect(() => {
    // Définition d'une fonction asynchrone pour récupérer les données des détails de l'actif
    async function getAssetDetailData() {
      try {
        // Appel asynchrone à l'API pour récupérer les détails de l'actif
        const response = await fetch(
          `${BaseURL}dashboard/assetdetails/${slug}`,
          {
            method: 'GET',
            headers: header,
          }
        );

        // Vérification si la réponse du serveur est ok (status 200-299)
        if (!response.ok) {
          throw new Error(
            "Erreur lors de la récupération des détails de l'actif"
          );
        }

        // Extraction des données JSON de la réponse
        const data = await response.json();

        // Mise à jour de l'état local "assetDetailData" avec les données récupérées
        setAssetDetailData(data.assetDetailsCalculated);
      } catch (error) {
        // Gestion des erreurs : affichage de l'erreur dans la console
        console.error('Error:', error);
      }
    }

    getAssetDetailData();
  }, [slug]);

  return (
    <div id="assetDetail" className="pb-6">
      {assetDetailData && (
        <>
          <TradingViewWidgetChart
            symbol={
              assetDetailData.categoryName === 'stock'
                ? `${assetDetailData.local}:${assetDetailData.symbol}`
                : `${assetDetailData.symbol}USD`
            }
          />
          <h1 className="text-center py-6 md:py-10 xl:py-16 text-2xl block md:text-3xl md:w-2/3 lg:w-3/6 mx-auto lg:text-4xl font-semibold">
            Détails : {assetDetailData?.name}
          </h1>
          <TradingViewWidget
            symbol={
              assetDetailData.categoryName === 'stock'
                ? `${assetDetailData.local}:${assetDetailData.symbol}`
                : `${assetDetailData.symbol}USD`
            }
          />
        </>
      )}
      <div className="flex flex-col text-center justify-center gap-5 py-8 md:text-xl">
        <p className="">
          Valeur de mes
          <span className="font-bold pl-2">
            {assetDetailData?.name} : {assetDetailData?.totalEstimateAsset}
          </span>
          $
        </p>
        <p>
          Quantité totale :{' '}
          <span className="font-bold">{assetDetailData?.totalAssetNumber}</span>
        </p>
      </div>
      <div className="history">
        <h3 className="text-center font-bold uppercase p-8">
          Historique des transactions
        </h3>
        <div>
          <div className="grid grid-cols-9 w-[95%] md:w-[80%] lg:w-[70%] padding-2  text-center mb-4 m-auto">
            <p className=" col-span-2  color-white">Date</p>
            <p className=" col-span-1 color-white">A/V</p>
            <p className=" col-span-1  color-white">Qté</p>
            <p className=" col-span-2 color-white">Prix</p>
            <p className=" col-span-1  color-white">Frais</p>
            <p className=" col-span-2 color-white">Total</p>
          </div>
          <ul>
            {assetDetailData?.assetLineDetail.map((line) => (
              <li
                key={line.lineId}
                className="grid grid-cols-9 w-[95%] md:w-[80%] lg:w-[70%] m-auto text-sm hover:border-custom-purple shadow-sm shadow-indigo-600/10 text-center mt-4 border border-buttonColor rounded-3xl  py-2 my-2  bg-[#ffffff0d]/10"
              >
                <p className="col-span-2">{line.date}</p>
                <p
                  className={`col-span-1 ${line.operationType === 'Achat' ? 'text-green-500' : 'text-red-500'}`}
                >
                  {line.operationType}
                </p>
                <p className="col-span-1 color-white">{line.buyQuantity}</p>
                <p className="col-span-2 color-white">{line.priceInvest} $</p>
                <p className="col-span-1 color-white">{line.fees}</p>
                <p className="col-span-2">{line.totalInvestLineWithFees} $</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AssetDetail;
