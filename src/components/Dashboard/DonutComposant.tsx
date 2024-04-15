import React, { useState, useEffect } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import GetDashboard from '../API/dashboardAPI';

const DonutChart = ({ cryptoPercentage, stockPercentage }) => {
  const [chartOptions, setChartOptions] = useState({
    data: [
      { asset: 'Crypto', amount: cryptoPercentage },
      { asset: 'Stock', amount: stockPercentage },
    ],
    title: {
      text: 'Portfolio Composition',
    },
    series: [
      {
        type: 'donut',
        calloutLabelKey: 'asset',
        angleKey: 'amount',
        innerRadiusRatio: 0.7,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetDashboard();
        setChartOptions({
          ...chartOptions,
          data: [
            { asset: 'Crypto', amount: data.cryptoPourcent },
            { asset: 'Stock', amount: data.stockPourcent },
          ],
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return <AgChartsReact options={chartOptions} />;
};

export default DonutChart;
