import React, { useState, useEffect } from "react";
import { fetchAll, remove } from "../../Services/apiService";
import { Link } from "react-router-dom";

const IndexRecordatorio = () => {
    const [recordatorios, setRecordatorios] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchRecordatorios();
    }, []);

    const fetchRecordatorios = async () => {
        try {
            const data = await fetchAll("Recordatorio");
            setRecordatorios(data);
        } catch (error) {
            console.error("Error fetching recordatorios:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await remove("Recordatorio", id);
            fetchRecordatorios(); // Recargar la lista después de eliminar
        } catch (error) {
            console.error("Error deleting recordatorio:", error);
        }
    };

    const filteredRecordatorios = recordatorios.filter((recordatorio) =>
        recordatorio.Nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Recordatorios</h1>
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar recordatorios"
                    className="p-2 border rounded-lg"
                />
                <Link to="/recordatorios/create" className="bg-blue-500 text-white p-2 rounded-lg">
                    Crear Recordatorio
                </Link>
            </div>
            <table className="w-full text-left">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRecordatorios.map((recordatorio) => (
                        <tr key={recordatorio.pkRecordatorio}>
                            <td>{recordatorio.Nombre}</td>
                            <td>{recordatorio.Descripcion}</td>
                            <td>{new Date(recordatorio.FechaRecordatorio).toLocaleDateString()}</td>
                            <td>
                                <Link
                                    to={`/recordatorios/edit/${recordatorio.pkRecordatorio}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDelete(recordatorio.pkRecordatorio)}
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

export default IndexRecordatorio;