import React, { useState, useEffect } from "react";
import { fetchAll } from "../../../Services/apiService"; // Importa el servicio

const IndexUsuario = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        try {
            const data = await fetchAll("Usuarios"); // Obtiene los usuarios desde la API
            setUsuarios(data);
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
            setUsuarios([]);
        }
    };

    const filteredUsuarios = usuarios.filter((usuario) => 
        usuario.Nombre.toLowerCase().includes(searchQuery.toLowerCase()) || 
        usuario.Email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            setSelectedItems(filteredUsuarios);
        }
        setSelectAll(!selectAll);
    };

    const handleItemSelect = (usuario) => {
        if (selectedItems.includes(usuario)) {
            setSelectedItems(selectedItems.filter((selected) => selected !== usuario));
        } else {
            setSelectedItems([...selectedItems, usuario]);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>

            {/* Filtros y búsqueda */}
            <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                {/* Barra de búsqueda */}
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Buscar usuarios por nombre o email"
                    />
                </div>
            </div>

            {/* Tabla */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-all"
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                                    />
                                    <label htmlFor="checkbox-all" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">Nombre</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Rol</th>
                            <th scope="col" className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsuarios.map((usuario, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input
                                            id={`checkbox-${index}`}
                                            type="checkbox"
                                            checked={selectedItems.includes(usuario)}
                                            onChange={() => handleItemSelect(usuario)}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                                        />
                                        <label htmlFor={`checkbox-${index}`} className="sr-only">
                                            checkbox
                                        </label>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">{usuario.Nombre}</td>
                                <td className="px-6 py-4">{usuario.Email}</td>
                                <td className="px-6 py-4">{usuario.Rol}</td>
                                <td className="px-6 py-4">
                                    <a href={`/usuarios/edit/${usuario.IdUsuario}`} className="font-medium text-blue-600 hover:underline">
                                        Editar
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default IndexUsuario;
