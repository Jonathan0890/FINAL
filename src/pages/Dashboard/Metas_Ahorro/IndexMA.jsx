import React, { useState, useEffect } from "react";
import Sidebar from "../../../Components/Sidebar.jsx"
import { fetchAll, remove } from "../../../Services/apiService";
import { Link } from "react-router-dom";

const IndexMetaAhorro = () => {
    const [metasAhorro, setMetasAhorro] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true); // Estado faltante añadido
    const [error, setError] = useState(null); // Estado faltante añadido

    useEffect(() => {
        fetchMetasAhorro();
    }, []);

    const fetchMetasAhorro = async () => {
        try {
            setLoading(true);
            const response = await fetchAll("MetaAhorro");
            
            // Verificar estructura anidada de la respuesta
            const datosReales = response.data?.data || response.data || response || [];
            console.log("Datos procesados:", datosReales);

            setMetasAhorro(Array.isArray(datosReales) ? datosReales : []);
            setError(null);
        } catch (error) {
            console.error("Error obteniendo metas:", error);
            setError("Error al cargar las metas");
            setMetasAhorro([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar esta meta?')) return;
        
        try {
            await remove("MetaAhorro", id);
            await fetchMetasAhorro();
        } catch (error) {
            console.error("Error eliminando meta:", error);
            alert("Error al eliminar: " + error.message);
        }
    };

    const filteredMetasAhorro = metasAhorro.filter((meta) =>
        meta.descripcion?.toLowerCase().includes(searchQuery.toLowerCase()) // Cambiado a minúscula
    );

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(amount || 0); // Manejo de valores undefined
    };

    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString('es-MX', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return "Fecha inválida";
        }
    };

    if (loading) {
        return (
            <div className="p-4 text-center">
                <Sidebar />
                <div className="p-4">Cargando metas...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-red-500">
                <Sidebar />
                <div className="p-4">
                    {error} - <button onClick={fetchMetasAhorro} className="text-blue-500">Reintentar</button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Sidebar />
            <div className="p-4 max-w-6xl mx-auto">
                <h1 className="text-3xl text-center font-bold mb-6 text-gray-800">Gestión de Metas de Ahorro</h1>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-between">
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Buscar por descripción..."
                        className="p-2 border rounded-lg flex-grow max-w-xl focus:ring-2 focus:ring-blue-400"
                    />
                    
                    <Link
                        to="/metas-ahorro/create"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Nueva Meta
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Descripción</th>
                                <th className="px-6 py-4 text-right">Monto Objetivo</th>
                                <th className="px-6 py-4">Fecha Límite</th>
                                <th className="px-6 py-4 text-center">Acciones</th>
                            </tr>
                        </thead>
                        
                        <tbody className="divide-y divide-gray-200">
                            {filteredMetasAhorro.map((meta) => (
                                <tr key={meta.pkMetaAhorro} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{meta.pkMetaAhorro}</td>
                                    <td className="px-6 py-4">{meta.descripcion}</td> {/* Cambiado a minúscula */}
                                    <td className="px-6 py-4 text-right">{formatCurrency(meta.montoObjetivo)}</td> {/* Cambiado a minúscula */}
                                    <td className="px-6 py-4">{formatDate(meta.fechaObjetivo)}</td> {/* Cambiado a minúscula */}
                                    <td className="px-6 py-4 flex justify-center gap-3">
                                        <Link
                                            to={`/metas-ahorro/edit/${meta.pkMetaAhorro}`}
                                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                            Editar
                                        </Link>
                                        
                                        <button
                                            onClick={() => handleDelete(meta.pkMetaAhorro)}
                                            className="text-red-600 hover:text-red-800 flex items-center gap-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            
                            {filteredMetasAhorro.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500"> {/* Corregido colspan a 5 */}
                                        No se encontraron metas de ahorro
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

export default IndexMetaAhorro;