import React from "react";

const QuickStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800">Ventas Totales</h3>
        <p className="text-2xl font-bold text-navy-blue">$12,345</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800">Usuarios Activos</h3>
        <p className="text-2xl font-bold text-navy-blue">1,234</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800">Tasa de Conversión</h3>
        <p className="text-2xl font-bold text-navy-blue">15%</p>
      </div>
    </div>
  );
};

export default QuickStats;