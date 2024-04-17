import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseURL, header } from '../API/API-info';
import TradingViewWidget from './TradingViewWidget';

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
  const [assetDetailData, setAssetDetailData] =
    useState<AssetDetailProps | null>(null);

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
        console.log(data);

        setAssetDetailData(data.assetDetailsCalculated);
      } catch (error) {
        console.error('Erreur de récupération des données', error);
      }
    }

    getAssetDetailData();
  }, [slug]);

  return (
    <div id="assetDetail">
      {assetDetailData && (
        <TradingViewWidget
          symbol={
            assetDetailData.categoryName === 'stock'
              ? `${assetDetailData.local}:${assetDetailData.symbol}`
              : `${assetDetailData.symbol}EUR`
          }
        />
      )}
      <div className="history">
        <h3 className="text-center font-bold uppercase pb-5">
          Historique des transactions
        </h3>
        <div>
          <div className="grid grid-cols-9 w-[95%] lg:w-[85%] padding-2  text-center mb-4 m-auto">
            <p className=" col-span-2  color-white">date</p>
            <p className=" col-span-1 color-white">type</p>
            <p className=" col-span-1  color-white">Qté</p>
            <p className=" col-span-2 color-white">Prix</p>
            <p className=" col-span-1  color-white">Frais</p>
            <p className=" col-span-2 color-white">Total</p>
          </div>
          <ul>
            {assetDetailData?.assetLineDetail.map((line) => (
              <li
                key={line.lineId}
                className="grid grid-cols-9 w-[95%] lg:w-[85%] m-auto text-sm border-white rounded-3xl text-center py-2 my-2 border bg-[#ffffff0d]/10"
              >
                <p className="col-span-2">{line.date}</p>
                <p
                  className={`col-span-1 ${line.operationType === 'buy' ? 'text-green-500' : 'text-red-500'}`}
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
