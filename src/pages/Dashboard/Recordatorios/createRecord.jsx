import React, { useState } from "react";
import { create } from "../../Services/apiService";
import { useNavigate } from "react-router-dom";

const CreateRecordatorio = () => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fechaRecordatorio, setFechaRecordatorio] = useState("");
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await create("Recordatorio", {
                Nombre: nombre,
                Descripcion: descripcion,
                FechaRecordatorio: fechaRecordatorio,
                Email: email,
                Mensaje: mensaje,
            });
            navigate("/recordatorios");
        } catch (error) {
            console.error("Error creating recordatorio:", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Crear Recordatorio</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label>Nombre</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label>Descripción</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label>Fecha</label>
                    <input
                        type="datetime-local"
                        value={fechaRecordatorio}
                        onChange={(e) => setFechaRecordatorio(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label>Mensaje</label>
                    <textarea
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
                    Crear
                </button>
            </form>
        </div>
    );
};

export default CreateRecordatorio;