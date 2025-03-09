import React, { useEffect, useRef } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Registrar todos los componentes de Chart.js
Chart.register(...registerables);

const FinancialChart = ({ type, data, options, ariaLabel }) => {
  const chartRef = useRef(null); // Referencia para el gráfico

  useEffect(() => {
    // Obtener la instancia del gráfico
    const chart = chartRef.current;

    // Destruir el gráfico cuando el componente se desmonte
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

  if (type === 'bar') {
    return <Bar ref={chartRef} data={data} options={options} aria-label={ariaLabel} />;
  } else if (type === 'pie') {
    return <Pie ref={chartRef} data={data} options={options} aria-label={ariaLabel} />;
  }

  return null;
};

export default FinancialChart;