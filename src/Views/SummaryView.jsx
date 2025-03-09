import React from 'react';
import FinancialChart from '../components/FinancialChart'; // Asegúrate de que este componente esté creado
import { barChartData, pieChartData } from '../data/chartData'; // Importa los datos desde un archivo externo
import Navbar from '../Components/Navbar';

const SummaryView = () => {
  // Opciones para el gráfico de barras
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Desactiva el mantenimiento de la relación de aspecto
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  // Opciones para el gráfico de torta
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Desactiva el mantenimiento de la relación de aspecto
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (<>
    <Navbar />
    <main className="bg-gray-100 min-h-screen p-8 flex flex-col items-center">
      <div className="max-w-5xl w-full">
        <h1 className="text-navy-blue text-3xl font-bold mb-6 text-center">Resumen Financiero</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gráfico de Barras (Ingresos vs Gastos) */}
          <section className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-center text-light-blue mb-4">Ingresos vs Gastos</h2>
            <div className="h-[400px]"> {/* Contenedor con altura fija */}
              <FinancialChart
                type="bar"
                data={barChartData}
                options={barChartOptions}
                aria-label="Gráfico de barras mostrando ingresos y gastos mensuales"
              />
            </div>
          </section>

          {/* Gráfico de Torta (Distribución de Gastos) */}
          <section className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-center text-light-blue mb-4">Distribución de Gastos</h2>
            <div className="h-[400px]"> {/* Contenedor con altura fija */}
              <FinancialChart
                type="pie"
                data={pieChartData}
                options={pieChartOptions}
                aria-label="Gráfico de torta mostrando la distribución de gastos por categoría"
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  </>
  );
};

export default SummaryView;