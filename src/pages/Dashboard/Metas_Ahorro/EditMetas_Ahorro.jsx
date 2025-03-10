import React, { useState, useEffect } from "react";
import { fetchById, update } from "../../Services/apiService";
import { useNavigate, useParams } from "react-router-dom";

const EditMetaAhorro = () => {
    const { id } = useParams();
    const [descripcion, setDescripcion] = useState("");
    const [montoObjetivo, setMontoObjetivo] = useState("");
    const [fechaObjetivo, setFechaObjetivo] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchMetaAhorro();
    }, [id]);

    const fetchMetaAhorro = async () => {
        try {
            const data = await fetchById("MetaAhorro", id);
            setDescripcion(data.Descripcion);
            setMontoObjetivo(data.MontoObjetivo);
            setFechaObjetivo(data.FechaObjetivo);
        } catch (error) {
            console.error("Error fetching meta de ahorro:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await update("MetaAhorro", id, {
                Descripcion: descripcion,
                MontoObjetivo: parseFloat(montoObjetivo),
                FechaObjetivo: fechaObjetivo,
            });
            navigate("/metas-ahorro");
        } catch (error) {
            console.error("Error updating meta de ahorro:", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Editar Meta de Ahorro</h1>
            <form onSubmit={handleSubmit}>
                {/* Campos similares a CreateMetaAhorro */}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
                    Actualizar
                </button>
            </form>
        </div>
    );
};

export default EditMetaAhorro;