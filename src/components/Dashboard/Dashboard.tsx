import React, { useState } from 'react';
import './Dashboard.scss';
import AssetModal from '../AssetModal/AssetModal';

function Dashboard() {
  // State showModal utilisé pour ouvrir ou fermer la modale achat/vente
  // L'état du state change au click sur un des boutons "ajouter" ou "vendre un actif" du Dashboard
  // Le state est remis à false au click sur le bouton de fermeture de la modale par la fonction closeAssetModal
  const [showModal, setShowModal] = useState(false);
  // State switchModalForm utilisé pour afficher le formulaire "achat" ou "vente" de la modale
  // en fonction du bouton clické sur le Dashboard ou à l'intérieur de la modale
  // Le state est remis à false au click sur le bouton de fermeture de la modale par la fonction closeAssetModal
  const [switchModalForm, setSwitchModalForm] = useState(false);

  // Fonction closeAssetModal utilisée pour remettre les states showModal et switchModalForm à leur état initial
  // au click sur le bouton fermeture de la modale (voir composant AssetModal)
  const closeAssetModal = () => {
    setShowModal(false);
    setSwitchModalForm(false);
  };

  return (
    <div className="dashboard" id="dashboard">
      <section className="summary ">
        <h2>Portefeuille : Bourso</h2>
        <div className="summary__parts">
          <div className="summary__part">
            <p>Valeur estimée : 2450€</p>
            <p>Total investi : 1975€</p>
            <p>Variation : +25% flèche+-</p>
          </div>
          <div className="summary__part">GRAPH</div>
        </div>
      </section>
      <section className="assetModal">
        <div>
          <button
            type="button"
            className="button"
            onClick={() => {
              setShowModal(true); // showModal = true ouvre la modale AssetModal
              setSwitchModalForm(true); // switchModalForm = true affiche la vue "achat" de la modale
            }}
          >
            Ajouter un actif
          </button>
          <button
            type="button"
            className="button"
            onClick={() => {
              setShowModal(true); // showModal = true ouvre la modale AssetModal
              setSwitchModalForm(false); // switchModalForm = false affiche la vue "vente" de la modale
            }}
          >
            Vendre un actif
          </button>
          {showModal && (
            <div>
              <AssetModal
                closeAssetModal={closeAssetModal}
                switchModalForm={switchModalForm}
              />
            </div>
          )}
        </div>
      </section>
      <section className="assetlist">
        <h2>MES CRYPTO-MONNAIES</h2>
        <div className="assetlist__title">
          <p>Symbole</p>
          <p>Nom</p>
          <p>Valeur de l&apos;actif</p>
          <p>Possédé</p>
          <p>Valeur total</p>
        </div>
        <ul>
          <li className="assetlist__item">
            <p>BTC</p>
            <p>Bitcoin</p>
            <p className="greenPrice">69.48524 €</p>
            <p>0.0045852</p>
            <p className="greenPrice">1450 €</p>
          </li>
          <li className="assetlist__item">
            <p>ETH</p>
            <p>Etherum</p>
            <p className="redPrice">4100.54 €</p>
            <p>1</p>
            <p className="redPrice">4100.54 €</p>
          </li>
          <li className="assetlist__item">
            <p>PEPE</p>
            <p>Pepe</p>
            <p className="greenPrice">0.005485 €</p>
            <p>400</p>
            <p className="greenPrice">2100 €</p>
          </li>
        </ul>
      </section>
      <section className="assetlist">
        <h2>MES ACTIONS</h2>
        <div className="assetlist__title">
          <p>Symbole</p>
          <p>Nom</p>
          <p>Valeur de l&apos;actif</p>
          <p>Possédé</p>
          <p>Valeur total</p>
        </div>
        <ul>
          <li className="assetlist__item">
            <p>DANN</p>
            <p>Danone</p>
            <p className="greenPrice">341 €</p>
            <p>0,5</p>
            <p className="greenPrice">170.5 €</p>
          </li>
          <li className="assetlist__item">
            <p>APPL</p>
            <p>Apple</p>
            <p className="redPrice">650 €</p>
            <p>2</p>
            <p className="redPrice">1300 €</p>
          </li>
          <li className="assetlist__item">
            <p>THEO</p>
            <p>Theophile</p>
            <p className="greenPrice">1000 €</p>
            <p>0.5</p>
            <p className="greenPrice">500 €</p>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Dashboard;
