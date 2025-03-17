import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const ChartComponent = ({ type, data, options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Destruir cualquier gráfico previo antes de crear uno nuevo
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      // Asegurar que la opción 'beginAtZero' esté habilitada
      const modifiedOptions = {
        ...options,
        scales: {
          ...options.scales,
          y: {
            beginAtZero: true, // Asegura que el eje Y siempre inicie en 0
            suggestedMin: 0,   // Sugiere un mínimo de 0 para prevenir descensos inesperados
            ticks: {
              stepSize: 10,  // Controla el espaciado entre valores del eje Y
            },
          },
        },
      };

      // Crear el gráfico
      chartRef.current.chart = new Chart(ctx, {
        type: type,
        data: data,
        options: modifiedOptions,
      });
    }
  }, [type, data, options]);

  return (
    <div className="h-[400px] w-full">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ChartComponent;
