import { useEffect } from 'react';

const StockWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: 'dark',
      dateRange: '12M',
      exchange: 'US',
      showChart: false,
      locale: 'en',
      largeChartUrl: '',
      isTransparent: true,
      showSymbolLogo: true,
      showFloatingTooltip: false,
      width: '100%',
      height: '400',
      plotLineColorGrowing: 'rgba(255, 0, 255, 1)',
      plotLineColorFalling: 'rgba(41, 98, 255, 1)',
      gridLineColor: 'rgba(42, 46, 57, 0)',
      scaleFontColor: 'rgba(134, 137, 147, 1)',
      belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)',
      belowLineFillColorFalling: 'rgba(41, 98, 255, 0.12)',
      belowLineFillColorGrowingBottom: 'rgba(41, 98, 255, 0)',
      belowLineFillColorFallingBottom: 'rgba(41, 98, 255, 0)',
      symbolActiveColor: 'rgba(41, 98, 255, 0.12)',
    });
    document
      .getElementsByClassName('tradingview-widget-container__widget')[0]
      .appendChild(script);

    return () => {
      // Cleanup if necessary
    };
  }, []);

  return (
    <div className="border border-buttonColor bg-white/10 rounded-lg tradingview-widget-container">
      <div className="tradingview-widget-container__widget" />
      <div className="tradingview-widget-copyright">
        <a
          aria-label="TradingView widget"
          href="https://www.tradingview.com/"
          rel="noopener nofollow noreferrer"
          target="_blank"
        />
      </div>
    </div>
  );
};

export default StockWidget;
