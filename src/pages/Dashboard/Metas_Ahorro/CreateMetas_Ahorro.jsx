import React, { useState } from "react";
import { create } from "../../Services/apiService";
import { useNavigate } from "react-router-dom";

const CreateMetaAhorro = () => {
    const [descripcion, setDescripcion] = useState("");
    const [montoObjetivo, setMontoObjetivo] = useState("");
    const [fechaObjetivo, setFechaObjetivo] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await create("MetaAhorro", {
                Descripcion: descripcion,
                MontoObjetivo: parseFloat(montoObjetivo),
                FechaObjetivo: fechaObjetivo,
            });
            navigate("/metas-ahorro");
        } catch (error) {
            console.error("Error creating meta de ahorro:", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Crear Meta de Ahorro</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label>Descripción</label>
                    <input
                        type="text"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label>Monto Objetivo</label>
                    <input
                        type="number"
                        value={montoObjetivo}
                        onChange={(e) => setMontoObjetivo(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label>Fecha Objetivo</label>
                    <input
                        type="date"
                        value={fechaObjetivo}
                        onChange={(e) => setFechaObjetivo(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
                    Crear
                </button>
            </form>
        </div>
    );
};

export default CreateMetaAhorro;