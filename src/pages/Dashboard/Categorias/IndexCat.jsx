import React, { useState, useEffect } from "react";
import { fetchAll } from "../../../Services/apiService"; // Importa el servicio

const IndexCat = () => {
    const [categorias, setCategorias] = useState([]); // Inicializa como array vacío
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        fetchCategorias();
    }, []);

    const fetchCategorias = async () => {
        try {
            const response = await fetchAll("Categoria"); // Usa el servicio para obtener las categorías
            if (Array.isArray(response)) {
                setCategorias(response);
            } else {
                console.error("La respuesta de la API no es un array:", response);
                setCategorias([]); // Asigna un array vacío si la respuesta no es un array
            }
        } catch (error) {
            console.error("Error fetching categorias:", error);
            setCategorias([]); // Asigna un array vacío en caso de error
        }
    };

    const filteredCategorias = Array.isArray(categorias)
        ? categorias.filter((categoria) => {
              const matchesSearch = categoria.Nombre.toLowerCase().includes(searchQuery.toLowerCase());
              return matchesSearch;
          })
        : [];

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            setSelectedItems(filteredCategorias);
        }
        setSelectAll(!selectAll);
    };

    const handleItemSelect = (categoria) => {
        if (selectedItems.includes(categoria)) {
            setSelectedItems(selectedItems.filter((selected) => selected !== categoria));
        } else {
            setSelectedItems([...selectedItems, categoria]);
        }
    };

    return (
        <div className="p-4">
            {/* Filtros y búsqueda */}
            <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                {/* Barra de búsqueda */}
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for categorias"
                    />
                </div>
            </div>

            {/* Tabla */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-all-search"
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="checkbox-all-search" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nombre
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Descripción
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategorias.map((categoria, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input
                                            id={`checkbox-table-search-${index}`}
                                            type="checkbox"
                                            checked={selectedItems.includes(categoria)}
                                            onChange={() => handleItemSelect(categoria)}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">
                                            checkbox
                                        </label>
                                    </div>
                                </td>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {categoria.Nombre}
                                </th>
                                <td className="px-6 py-4">{categoria.Descripcion}</td>
                                <td className="px-6 py-4">
                                    <a href={`/categorias/edit/${categoria.IdCategoria}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        Edit
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

export default IndexCat;