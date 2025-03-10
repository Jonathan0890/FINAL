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
            const response = await axios.get(`/api/categorias/${id}`);
            setNombre(response.data.Nombre);
            setDescripcion(response.data.Descripcion);
        } catch (error) {
            console.error("Error fetching categoria:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/categorias/${id}`, { Nombre: nombre, Descripcion: descripcion });
            navigate("/categorias");
        } catch (error) {
            console.error("Error updating categoria:", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Categoria</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Nombre</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Descripción</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
                    Update
                </button>
            </form>
        </div>
    );
};

export default EditCategoria;