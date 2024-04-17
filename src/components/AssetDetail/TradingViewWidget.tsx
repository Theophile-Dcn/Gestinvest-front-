import { useEffect, useRef } from 'react';

function TradingViewWidget({ symbol }) {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js';
    script.type = 'text/javascript';
    script.async = true;

    script.innerHTML = `
      {
        "symbol": "${symbol}",
        
        "locale": "fr",
        "colorTheme": "dark",
        "isTransparent": true
      }`;
    container.current.appendChild(script);
  }, [symbol]);

  return (
    <div
      className="mt-2 w-[95%] lg:w-[85%] m-auto hover:border-custom-purple shadow-lg shadow-indigo-500/30   border border-buttonColor rounded-3xl text-center py-2 my-2  bg-[#ffffff0d]/10 tradingview-widget-container"
      ref={container}
    >
      <div className="tradingview-widget-container__widget" />
      <div className="tradingview-widget-copyright">
        <a
          href="https://fr.tradingview.com/"
          rel="noopener nofollow noreferrer"
          target="_blank"
        />
      </div>
    </div>
  );
}

export default TradingViewWidget;
