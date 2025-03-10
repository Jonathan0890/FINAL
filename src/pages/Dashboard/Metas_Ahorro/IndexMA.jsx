import React, { useState, useEffect } from "react";
import { fetchAll, remove } from "../../Services/apiService";
import { Link } from "react-router-dom";

const IndexMetaAhorro = () => {
    const [metasAhorro, setMetasAhorro] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchMetasAhorro();
    }, []);

    const fetchMetasAhorro = async () => {
        try {
            const data = await fetchAll("MetaAhorro");
            setMetasAhorro(data);
        } catch (error) {
            console.error("Error fetching metas de ahorro:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await remove("MetaAhorro", id);
            fetchMetasAhorro(); // Recargar la lista después de eliminar
        } catch (error) {
            console.error("Error deleting meta de ahorro:", error);
        }
    };

    const filteredMetasAhorro = metasAhorro.filter((meta) =>
        meta.Descripcion.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Metas de Ahorro</h1>
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar metas de ahorro"
                    className="p-2 border rounded-lg"
                />
                <Link to="/metas-ahorro/create" className="bg-blue-500 text-white p-2 rounded-lg">
                    Crear Meta de Ahorro
                </Link>
            </div>
            <table className="w-full text-left">
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th>Monto Objetivo</th>
                        <th>Fecha Objetivo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMetasAhorro.map((meta) => (
                        <tr key={meta.pkMetaAhorro}>
                            <td>{meta.Descripcion}</td>
                            <td>{meta.MontoObjetivo}</td>
                            <td>{new Date(meta.FechaObjetivo).toLocaleDateString()}</td>
                            <td>
                                <Link
                                    to={`/metas-ahorro/edit/${meta.pkMetaAhorro}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDelete(meta.pkMetaAhorro)}
                                    className="text-red-500 hover:underline ml-4"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default IndexMetaAhorro;