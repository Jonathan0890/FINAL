import React, { useState, useEffect } from "react";
import Sidebar from "../../../Components/Sidebar";

const IndexCat = () => {
    const [categorias, setCategorias] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        fetchCategorias();
    }, []);

    const fetchCategorias = async () => {
        try {
            const API_URL = "https://localhost:7247/api/Categoria";
            const response = await fetch(API_URL);
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }
            
            const result = await response.json();
            console.log("API Response Full Data:", result);
            
            // Extraer directamente el array data de la respuesta
            const data = result.data || [];
            
            setCategorias(data);
    
        } catch (error) {
            console.error("❌ Error fetching categorias:", error);
            setCategorias([]);
        }
    };

    const filteredCategorias = Array.isArray(categorias)
        ? categorias.filter((categoria) =>
            categoria.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) // Corregido a minúscula
        )
        : [];

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems(new Set());
        } else {
            setSelectedItems(new Set(filteredCategorias.map((c) => c.idCategoria))); // Corregido a minúscula
        }
        setSelectAll(!selectAll);
    };

    const handleItemSelect = (id) => {
        const newSelected = new Set(selectedItems);
        newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
        setSelectedItems(newSelected);
    };

    return (<> 
    <Sidebar/>
        <div className="p-4">
        <h1 className="text-3xl text-center font-bold mb-6 text-gray-800">Gestión de Categorías</h1>
            <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Buscar categorías"
                    />
                </div>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="p-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                </div>
                            </th>
                            <th className="px-6 py-3">Nombre</th>
                            <th className="px-6 py-3">Descripción</th>
                            <th className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategorias.length > 0 ? (
                            filteredCategorias.map((categoria) => (
                                <tr key={categoria.idCategoria} className="border-b hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="p-4">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.has(categoria.idCategoria)} // Corregido a minúscula
                                                onChange={() => handleItemSelect(categoria.idCategoria)} // Corregido a minúscula
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                        </div>
                                    </td>
                                    <th className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                        {categoria.nombre} {/* Corregido a minúscula */}
                                    </th>
                                    <td className="px-6 py-4">{categoria.descripcion}</td> {/* Corregido a minúscula */}
                                    <td className="px-6 py-4">
                                        <a
                                            href={`/categoriasd/edit/${categoria.idCategoria}`} 
                                            className="font-medium text-blue-600 hover:underline"
                                        >
                                            Editar
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                    No hay categorías disponibles.
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

export default IndexCat;