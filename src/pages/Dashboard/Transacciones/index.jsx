import React, { useState, useEffect } from "react";
import { fetchAll, deleteItem } from "../../../Services/apiService";

const IndexTrans = () => {
    const [transacciones, setTransacciones] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchTransacciones();
    }, []);

    const fetchTransacciones = async () => {
        try {
            const data = await fetchAll("Transaccion");
            setTransacciones(data);
        } catch (error) {
            console.error("Error al obtener las transacciones:", error);
            setTransacciones([]);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Seguro que deseas eliminar esta transacción?")) {
            try {
                await deleteItem("Transaccion", id);
                setTransacciones(transacciones.filter(t => t.pkTransaccion !== id));
            } catch (error) {
                console.error("Error al eliminar transacción:", error);
            }
        }
    };

    const filteredTransacciones = transacciones.filter((trans) =>
        trans.Descripcion.toLowerCase().includes(searchQuery.toLowerCase()) || 
        trans.Monto.toString().includes(searchQuery)
    );

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Lista de Transacciones</h1>

            {/* Barra de búsqueda */}
            <input
                type="text"
                placeholder="Buscar por descripción o monto"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block p-2 text-sm border border-gray-300 rounded-lg w-80"
            />

            {/* Tabla de transacciones */}
            <div className="overflow-x-auto shadow-md sm:rounded-lg mt-4">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Monto</th>
                            <th className="px-6 py-3">Descripción</th>
                            <th className="px-6 py-3">Fecha</th>
                            <th className="px-6 py-3">Categoría</th>
                            <th className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransacciones.map((trans, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4">${trans.Monto}</td>
                                <td className="px-6 py-4">{trans.Descripcion}</td>
                                <td className="px-6 py-4">{trans.Fecha.split("T")[0]}</td>
                                <td className="px-6 py-4">{trans.CategoriaId}</td>
                                <td className="px-6 py-4">
                                    <a href={`/transacciones/edit/${trans.pkTransaccion}`} className="text-blue-600 hover:underline">Editar</a> |
                                    <button onClick={() => handleDelete(trans.pkTransaccion)} className="text-red-600 hover:underline ml-2">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default IndexTrans;
