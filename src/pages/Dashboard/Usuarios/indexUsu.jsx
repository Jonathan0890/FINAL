import React, { useState, useEffect } from "react";
import { fetchAll } from "../../../Services/apiService";
import Sidebar from "../../../Components/Sidebar";

const IndexUsuario = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        try {
            const response = await fetchAll("Usuario");
            console.log("Respuesta API:", response);
            
            // Extraer datos de la estructura correcta
            const datosReales = response.data || [];
            
            setUsuarios(datosReales);
            setError(null);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            setError("Error al cargar los usuarios");
            setUsuarios([]);
        } finally {
            setLoading(false);
        }
    };

    const getNombreRol = (rolId) => {
        const roles = {
            1: "Administrador",
            2: "Usuario Regular",
            3: "Invitado"
        };
        return roles[rolId] || "Rol desconocido";
    };

    const filteredUsuarios = usuarios.filter(usuario => {
        const search = searchQuery.toLowerCase();
        return (
            (usuario.nombre?.toLowerCase() || "").includes(search) ||
            (usuario.email?.toLowerCase() || "").includes(search)
        );
    });

    if (loading) {
        return (
            <div className="p-4 text-center">
                <Sidebar />
                <div>Cargando usuarios...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-red-500">
                <Sidebar />
                <div>
                    {error} - <button 
                        onClick={fetchUsuarios} 
                        className="text-blue-500 hover:underline"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Sidebar />
            <div className="p-4 max-w-7xl mx-auto">
                <h1 className="text-3xl text-center font-bold mb-6 text-gray-800">Gestión de Usuarios</h1>

                <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-between">
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Buscar por nombre o email..."
                        className="p-2 border rounded-lg flex-grow max-w-xl focus:ring-2 focus:ring-blue-400"
                    />
                    
                    <a
                        href="/usuarios/create"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Nuevo Usuario
                    </a>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left">ID</th>
                                <th className="px-6 py-4 text-left">Nombre</th>
                                <th className="px-6 py-4 text-left">Email</th>
                                <th className="px-6 py-4 text-left">Rol</th>
                                <th className="px-6 py-4 text-center">Acciones</th>
                            </tr>
                        </thead>
                        
                        <tbody className="divide-y divide-gray-200">
                            {filteredUsuarios.map((usuario) => (
                                <tr key={usuario.pkUsuario} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{usuario.pkUsuario}</td>
                                    <td className="px-6 py-4 font-medium">{usuario.nombre}</td>
                                    <td className="px-6 py-4">{usuario.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-sm ${
                                            usuario.rolId === 1 
                                                ? "bg-purple-100 text-purple-800" 
                                                : "bg-blue-100 text-blue-800"
                                        }`}>
                                            {getNombreRol(usuario.rolId)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <a
                                            href={`/usuarios/edit/${usuario.pkUsuario}`}
                                            className="text-blue-600 hover:text-blue-800 flex items-center justify-center gap-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                            Editar
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            
                            {filteredUsuarios.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        No se encontraron usuarios
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

export default IndexUsuario;