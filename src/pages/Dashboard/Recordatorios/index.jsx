import React, { useState, useEffect } from "react";
import { fetchAll, remove } from "../../../Services/apiService";
import { Link } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar";

const IndexRecordatorio = () => {
    const [recordatorios, setRecordatorios] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRecordatorios();
    }, []);

    const fetchRecordatorios = async () => {
        try {
            const response = await fetchAll("Recordatorio");

            // Verificar estructura de la respuesta
            console.log("Respuesta completa API:", response);

            // Extraer array de datos correctamente
            const datosReales = Array.isArray(response)
                ? response
                : response.data?.Data || response.data || [];

            setRecordatorios(datosReales);
            setError(null);
        } catch (error) {
            console.error("Error obteniendo recordatorios:", error);
            setError("Error al cargar recordatorios");
            setRecordatorios([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este recordatorio?')) {
            try {
                await remove("Recordatorio", id);
                await fetchRecordatorios();
            } catch (error) {
                console.error("Error eliminando:", error);
                alert("No se pudo eliminar el recordatorio");
            }
        }
    };

    const filteredRecordatorios = recordatorios.filter((recordatorio) =>
        (recordatorio.nombre || recordatorio.Nombre || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString('es-MX', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return "Fecha inválida";
        }
    };

    if (loading) {
        return (
            <div className="p-4 text-center">
                <Sidebar />
                <div>Cargando recordatorios...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-red-500">
                <Sidebar />
                <div>
                    {error} - <button onClick={fetchRecordatorios} className="text-blue-500">Reintentar</button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Sidebar />
            <div className="p-4 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Gestión de Recordatorios</h1>

                <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-between">
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Buscar por nombre..."
                        className="p-2 border rounded-lg flex-grow max-w-xl focus:ring-2 focus:ring-blue-400"
                    />

                    <Link
                        to="/recordatorios/create"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Nuevo Recordatorio
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Nombre</th>
                                <th className="px-6 py-4">Descripción</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Mensaje</th>
                                <th className="px-6 py-4">Fecha</th>
                                <th className="px-6 py-4">Usuario</th>
                                <th className="px-6 py-4">Acciones</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {filteredRecordatorios.map((recordatorio) => {
                                // Usar nombres de propiedades en minúscula
                                const {
                                    pkRecordatorio,
                                    nombre,
                                    descripcion,
                                    email,
                                    mensaje,
                                    fechaRecordatorio,
                                    usuario // Datos relacionados
                                } = recordatorio;

                                return (
                                    <tr key={pkRecordatorio} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">{pkRecordatorio}</td>
                                        <td className="px-6 py-4">{nombre}</td>
                                        <td className="px-6 py-4">{descripcion}</td>
                                        <td className="px-6 py-4">{email}</td>
                                        <td className="px-6 py-4">{mensaje}</td>
                                        <td className="px-6 py-4">{formatDate(fechaRecordatorio)}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-500">
                                                {usuario?.nombre || "Sin usuario"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 flex gap-3">
                                            <Link
                                                to={`/recordatorios/edit/${pkRecordatorio}`}
                                                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                                Editar
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(pkRecordatorio)}
                                                className="text-red-600 hover:text-red-800 flex items-center gap-1"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}

                            {filteredRecordatorios.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                        No se encontraron recordatorios
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

export default IndexRecordatorio;