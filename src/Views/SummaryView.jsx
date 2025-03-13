import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FinancialChart from '../components/FinancialChart';
import Navbar from '../Components/Navbar';

const SummaryView = () => {
    const [barData, setBarData] = useState(null);
    const [pieData, setPieData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const ventasResponse = await axios.get('https://localhost:7247/api/reporte/ventas-mensuales/2023');
            console.log("Ventas Response:", ventasResponse.data);
    
            const categoriasResponse = await axios.get('https://localhost:7247/api/Categoria?includeTransactions=true');
            console.log("Categorías Response:", categoriasResponse.data); // 🟢 Verifica qué datos llegan aquí
    
            const ventasData = Array.isArray(ventasResponse.data) ? ventasResponse.data : [];
            const categoriasData = Array.isArray(categoriasResponse.data) ? categoriasResponse.data : [];
    
            setBarData({
                labels: ventasData.map(v => `${v.mes}/${v.año}`),
                datasets: [{
                    label: 'Ventas en USD',
                    data: ventasData.map(v => v.totalVentas),
                    backgroundColor: '#4F46E5'
                }]
            });
    
            setPieData({
                labels: categoriasData.map(c => c.nombre),
                datasets: [{
                    data: categoriasData.map(c => (Array.isArray(c.transacciones) ? c.transacciones.length : 0)),
                    backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
                }]
            });
    
        } catch (err) {
            console.error("Error en carga de datos:", err);
            setError(`Error: ${err.response?.data?.message || err.message}`);
        } finally {
            setLoading(false);
        }
    };
    


    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return (
        <div className="text-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando datos financieros...</p>
        </div>
    );

    if (error) return (
        <div className="text-center p-8">
            <div className="text-red-500 text-2xl mb-4">⚠️</div>
            <p className="text-red-600 font-medium">{error}</p>
            <button
                onClick={fetchData}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Reintentar
            </button>
        </div>
    );

    return (
        <>
            <Navbar />
            <main className="bg-gray-100 min-h-screen p-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
                        📊 Panel Financiero
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
                                Ventas Mensuales 2023
                            </h2>
                            <div className="h-[400px]">
                                <FinancialChart
                                    type="bar"
                                    data={barData}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: { position: 'top' },
                                            tooltip: { enabled: true }
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
                                Distribución por Categorías
                            </h2>
                            <div className="h-[400px]">
                                <FinancialChart
                                    type="pie"
                                    data={pieData}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: { position: 'bottom' },
                                            tooltip: { enabled: true }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default SummaryView;