import './Dashboard.scss';

function Dashboard() {
  return (
    <div className="dashboard" id="dashboard">
      <section className="summary">
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
      <section className="addorsell">
        <button type="button" className="button">
          Ajouter un actif
        </button>
        <button type="button" className="button">
          Vendre un actif
        </button>
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
