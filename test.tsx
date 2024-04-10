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
        <h2>MES CRYPTO-MONNAIES</h2> Variable dynamique
        <div className="assetlist__title">
          <p>Symbole</p>
          <p>Nom</p>
          <p>Valeur de l&apos;actif</p>
          <p>Possédé</p>
          <p>Valeur total</p>
        </div>
        <ul>
          <li className="assetlist__item">
            <p>BTC</p> Variable dynamique
            <p>Bitcoin</p> Variable dynamique
            <p className="greenPrice">69.48524 €</p> Variable dynamique
            <p>0.0045852</p>Variable dynamique
            <p className="greenPrice">1450 €</p>Variable dynamique
          </li>
          <li className="assetlist__item">
            <p>ETH</p>
            <p>Etherum</p>
            <p className="redPrice">4100.54 €</p>Variable dynamique
            <p>1</p>
            <p className="redPrice">4100.54 €</p>Variable dynamique
          </li>
          <li className="assetlist__item">
            <p>PEPE</p>Variable dynamique
            <p>Pepe</p>Variable dynamique
            <p className="greenPrice">0.005485 €</p>Variable dynamique
            <p>400</p>
            <p className="greenPrice">2100 €</p>Variable dynamique
          </li>
        </ul>
      </section>
      <section className="assetlist">
        <h2>MES ACTIONS</h2>Variable dynamique
        <div className="assetlist__title">
          <p>Symbole</p>
          <p>Nom</p>
          <p>Valeur de l&apos;actif</p>
          <p>Possédé</p>
          <p>Valeur total</p>
        </div>
        <ul>
          <li className="assetlist__item">
            <p>DANN</p>Variable dynamique
            <p>Danone</p>Variable dynamique
            <p className="greenPrice">341 €</p>Variable dynamique
            <p>0,5</p>
            <p className="greenPrice">170.5 €</p>Variable dynamique
          </li>
          <li className="assetlist__item">
            <p>APPL</p>Variable dynamique
            <p>Apple</p>Variable dynamique
            <p className="redPrice">650 €</p>Variable dynamique
            <p>2</p>Variable dynamique
            <p className="redPrice">1300 €</p>Variable dynamique
          </li>
          <li className="assetlist__item">
            <p>THEO</p>Variable dynamique
            <p>Theophile</p>Variable dynamique
            <p className="greenPrice">1000 €</p>Variable dynamique
            <p>0.5</p>
            <p className="greenPrice">500 €</p>Variable dynamique
          </li>
        </ul>
      </section>
    </div>
  );
}
