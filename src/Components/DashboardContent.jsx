import React from "react";
import ChartComponent from "../components/ChartComponent";
import QuickStats from "../components/QuickStats";

const DashboardContent = () => {
  // Datos de ejemplo para las gráficas
  const chartData = [
    {
      title: "Ventas Mensuales",
      type: "line",
      data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
        datasets: [
          {
            label: "Ventas",
            data: [65, 59, 80, 81, 56],
            backgroundColor: "rgba(99, 102, 241, 0.2)",
            borderColor: "rgba(99, 102, 241, 1)",
            borderWidth: 1,
          },
        ],
      },
    },
    {
      title: "Usuarios Activos",
      type: "bar",
      data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
        datasets: [
          {
            label: "Usuarios",
            data: [120, 150, 180, 200, 220],
            backgroundColor: "rgba(239, 68, 68, 0.2)",
            borderColor: "rgba(239, 68, 68, 1)",
            borderWidth: 1,
          },
        ],
      },
    },
    {
      title: "Tasa de Conversión",
      type: "pie",
      data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
        datasets: [
          {
            label: "Tasa de Conversión",
            data: [5, 10, 15, 20, 25],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderWidth: 1,
          },
        ],
      },
    },
    {
      title: "Ingresos Mensuales",
      type: "line",
      data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
        datasets: [
          {
            label: "Ingresos",
            data: [5000, 7000, 8000, 9000, 10000],
            backgroundColor: "rgba(245, 158, 11, 0.2)",
            borderColor: "rgba(245, 158, 11, 1)",
            borderWidth: 1,
          },
        ],
      },
    },
  ];

  // Opciones para las gráficas
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Desactiva el mantenimiento de la relación de aspecto
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Asegura que las gráficas comiencen desde 0
      },
    },
  };

  return (
    <div className="pt-16 p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Estadísticas Rápidas */}
      <QuickStats />

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {chartData.map((chart, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{chart.title}</h2>
            <div className="h-[400px] w-full"> {/* Se asegura una altura fija */}
              <ChartComponent type={chart.type} data={chart.data} options={chartOptions} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardContent;
