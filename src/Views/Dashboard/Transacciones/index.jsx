import React, { useState, useEffect } from "react";
import { fetchAll, remove } from "../../../Services/apiService";
import Sidebar from "../../../Components/Navigation/Sidebar";

const IndexTrans = () => {
    const [transacciones, setTransacciones] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTransacciones();
    }, []);

    const fetchTransacciones = async () => {
        try {
            const response = await fetchAll("Transaccion");
            
            // Verificar estructura de la respuesta
            console.log("Respuesta completa API:", response);
            
            // Extraer array de datos correctamente
            const data = Array.isArray(response) 
                ? response 
                : response.data?.Data || response.data || [];
            
            setTransacciones(Array.isArray(data) ? data : []);
            setError(null);
        } catch (error) {
            console.error("Error al obtener transacciones:", error);
            setError("Error al cargar transacciones");
            setTransacciones([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Seguro que deseas eliminar esta transacción?")) {
            try {
                await remove("Transaccion", id);
                setTransacciones(prev => prev.filter(t => t.pkTransaccion !== id));
            } catch (error) {
                console.error("Error al eliminar:", error);
                alert("No se pudo eliminar la transacción");
            }
        }
    };

    const filteredTransacciones = (transacciones || []).filter((trans) => {
        const search = searchQuery.toLowerCase();
        return (
            trans.descripcion?.toLowerCase().includes(search) || // Cambiado a minúscula
            trans.monto?.toString().includes(search)
        );
    });

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(amount || 0);
    };

    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString('es-MX');
        } catch {
            return "Fecha inválida";
        }
    };

    if (loading) {
        return <div className="p-4 text-center">Cargando transacciones...</div>;
    }

    if (error) {
        return (
            <div className="p-4 text-red-500">
                {error} - <button onClick={fetchTransacciones} className="text-blue-500">Reintentar</button>
            </div>
        );
    }

    return (<>
    
        <Sidebar/>
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Gestión de Transacciones</h1>

            <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-between">
                <input
                    type="search"
                    placeholder="Buscar por descripción o monto"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border rounded-lg flex-grow max-w-xl focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">Monto</th>
                            <th className="px-6 py-4">Descripción</th>
                            <th className="px-6 py-4">Fecha</th>
                            <th className="px-6 py-4">Categoría</th>
                            <th className="px-6 py-4">Acciones</th>
                        </tr>
                    </thead>
                    
                    <tbody className="divide-y divide-gray-200">
                        {filteredTransacciones.map((trans) => {
                            const {
                                pkTransaccion,
                                monto,
                                descripcion = "",
                                fecha,
                                categoriaId,
                                categoriaNombre // Asumiendo que viene de la API
                            } = trans;

                            return (
                                <tr key={pkTransaccion} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{pkTransaccion}</td>
                                    <td className="px-6 py-4">{formatCurrency(monto)}</td>
                                    <td className="px-6 py-4">{descripcion}</td>
                                    <td className="px-6 py-4">{formatDate(fecha)}</td>
                                    <td className="px-6 py-4">{categoriaNombre || categoriaId}</td>
                                    <td className="px-6 py-4 flex gap-3">
                                        <a 
                                            href={`/transacciones/edit/${pkTransaccion}`} 
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Editar
                                        </a>
                                        <button 
                                            onClick={() => handleDelete(pkTransaccion)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        
                        {filteredTransacciones.length === 0 && (
                            <tr>
                                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                    No se encontraron transacciones
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </>
    );
};

export default IndexTrans;