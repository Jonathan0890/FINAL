import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditCategoria = () => {
    const { id } = useParams();
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategoria();
    }, [id]);

    const fetchCategoria = async () => {
        try {
            const response = await axios.get(`https://localhost:7247/api/Categoria/${id}`);
            setNombre(response.data.nombre);
            setDescripcion(response.data.descripcion);
        } catch (error) {
            console.error("Error fetching categoria:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validación de campos vacíos
        if (!nombre.trim() || !descripcion.trim()) {
            alert("Todos los campos son obligatorios.");
            return;
        }
    
        try {
            await axios.put(
                `https://localhost:7247/api/Categoria/${id}`, 
                JSON.stringify({
                    id: Number(id),  // Asegurar que el ID sea numérico
                    nombre: nombre.trim(),
                    descripcion: descripcion.trim()
                }),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
    
            alert("Categoría actualizada correctamente");
            navigate("/categoriasd"); // Redirige al index
        } catch (error) {
            console.error("Error updating categoria:", error);
            alert(`Error al actualizar la categoría: ${error.response?.data?.message || "Error desconocido"}`);
        }
    };
    
    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Editar Categoría</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        rows="3"
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={() => navigate("/categoriasd")}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                        Volver
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditCategoria;
