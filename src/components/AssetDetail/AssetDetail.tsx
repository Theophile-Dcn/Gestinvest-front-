import React from 'react';

import './AssetDetail.scss';

function AssetDetail() {
  return (
    <div id="assetDetail">
      <h2>Détail de mes NOM ACTIF</h2>
      <div className="synthesis">
        <p>Date du jour</p>
        <p>NOM ACTIF</p>
        <p>SYMBOLE ACTIF</p>
        <p>Valeur de mes NOM ACTIF : VALEUR %</p>
        <p>Quantité totale : VALEUR</p>
      </div>
      <div className="history">
        <h3>HISTORIQUE DES TRANSACTIONS</h3>
        <div>
          <div>
            <p>Date de la transaction</p>
            <p>Type de mouvement</p>
            <p>Quantité</p>
            <p>Prix unitaire $</p>
            <p>Frais %</p>
            <p>Valeur totale $</p>
          </div>
          <ul>
            <li>
              <p>Date de la transaction</p>
              <p>Type de mouvement</p>
              <p>Quantité</p>
              <p>Prix unitaire $</p>
              <p>frais %</p>
              <p>Valeur totale $</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AssetDetail;
