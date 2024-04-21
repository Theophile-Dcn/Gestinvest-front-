import StockWidget from './StockWidget';

const Tendances = () => {
  return (
    <section className="w-[90%] m-auto">
      <h1 className="text-lg text-center py-8">Les tendances des marchés</h1>
      <div className="">
        <h2>Top cryptoactifs :</h2>
      </div>
      <div className="">
        <h2>Top stocks :</h2>
        <StockWidget />
      </div>
    </section>
  );
};

export default Tendances;
