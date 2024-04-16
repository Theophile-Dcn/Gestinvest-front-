import { useEffect, useState } from 'react';
// useParams est un hook React Router permettant d'accéder aux paramètres de l'URL (ici le slug qui représentera le symbole de l'asset)
import { useParams } from 'react-router-dom';
import { BaseURL, header } from '../API/API-info';

interface AssetDetailProps {
  totalEstimateAsset: number;
  totalAssetNumber: number;
  name: string;
  symbol: string;
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
  // on utilise useParams pour extraire le slug de l'URL (slug est ici le symbole de l'asset, paramètre de notre URL)
  const { slug } = useParams();
  // State assetDetailData utilisé pour stocker les valeurs
  const [assetDetailData, setAssetDatailData] =
    useState<AssetDetailProps | null>(null);

  // useEffect exécute la fonction getAssetDetailData à l'ouverture du composant et lorsque que la dépendance "slug" change.

  useEffect(() => {
    async function getAssetDetailData() {
      try {
        const response = await fetch(
          `${BaseURL}dashboard/assetdetails/${slug}`,
          {
            method: 'GET',
            headers: header,
          }
        );
        const data = await response.json();
        setAssetDatailData(data);
      } catch (error) {
        console.error('Erreur de récupération des données', error);
      }
    }

    getAssetDetailData();
  }, [slug]);

  return (
    <div id="assetDetail">
      <h2>Détail de mes {assetDetailData?.name}</h2>
      <div className="synthesis">
        <p>Date du jour</p>
        <p>{assetDetailData?.name}</p>
        <p>{assetDetailData?.symbol}</p>
        <p>
          Valeur de mes {assetDetailData?.name} :
          {assetDetailData?.totalEstimateAsset} $
        </p>
        <p>Quantité totale : {assetDetailData?.totalAssetNumber}</p>
      </div>
      <div className="history">
        <h3>HISTORIQUE DES TRANSACTIONS</h3>
        <div>
          <div className="grid grid-cols-15 w-full padding-2 text-center mb-4">
            <p className=" col-span-2  color-white">date</p>
            <p className=" col-span-2 color-white">type</p>
            <p className=" col-span-3  color-white">Qté</p>
            <p className=" col-span-3 color-white">Prix</p>
            <p className=" col-span-2  color-white">Frais</p>
            <p className=" col-span-3 color-white">Total</p>
          </div>
          <ul>
            {assetDetailData?.assetLineDetail.map((line) => (
              <li
                key={line.lineId}
                className="grid grid-cols-15 w-full  border-white rounded-3xl text-center py-2 my-2 border bg-[#ffffff0d]/10"
              >
                <p className=" col-span-2  color-white">{line.date}</p>
                <p className=" col-span-2 color-white">{line.operationType}</p>
                <p className=" col-span-3  color-white">{line.buyQuantity}</p>
                <p className=" col-span-3 color-white">{line.priceInvest} $</p>
                <p className=" col-span-2  color-white">{line.fees}</p>
                <p className=" col-span-3">{line.totalInvestLineWithFees} $</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AssetDetail;
