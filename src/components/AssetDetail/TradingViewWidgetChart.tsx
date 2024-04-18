import React, { useEffect } from 'react';

// Déclaration de type pour window.TradingView
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TradingView: any; // Remplacez `any` par le type correct si possible
  }
}

interface TradingViewChartProps {
  symbol: string;
}

const TradingViewChart: React.FC<TradingViewChartProps> = ({ symbol }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // eslint-disable-next-line no-new, new-cap
      new window.TradingView.widget({
        container_id: 'basic-area-chart-demo',
        width: '100%',
        height: '20px', // Ajustement de la hauteur à 600 pixels
        autosize: true,
        symbol,
        interval: 'D',
        timezone: 'exchange',
        theme: 'dark',
        style: '3', // Style 3 pour le Basic Area Chart
        hide_top_toolbar: true,
        save_image: false,
        locale: 'en',
        background_color: 'transparent', // Rend le fond transparent
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [symbol]);

  return (
    <div
      className="tradingview-widget-container"
      style={{ height: '100%', width: '100%' }}
    >
      <div
        id="basic-area-chart-demo"
        style={{ height: '200px', width: '100%' }}
      />
      {/* Ajustement de la hauteur à 600 pixels */}
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow noreferrer"
          target="_blank"
          aria-label="tradingview widget chart"
        />
      </div>
    </div>
  );
};

export default TradingViewChart;
