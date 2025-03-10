import React, { useState, useEffect } from "react";
import { fetchById, update } from "../../Services/apiService";
import { useNavigate, useParams } from "react-router-dom";

const EditRecordatorio = () => {
    const { id } = useParams();
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fechaRecordatorio, setFechaRecordatorio] = useState("");
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchRecordatorio();
    }, [id]);

    const fetchRecordatorio = async () => {
        try {
            const data = await fetchById("Recordatorio", id);
            setNombre(data.Nombre);
            setDescripcion(data.Descripcion);
            setFechaRecordatorio(data.FechaRecordatorio);
            setEmail(data.Email);
            setMensaje(data.Mensaje);
        } catch (error) {
            console.error("Error fetching recordatorio:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await update("Recordatorio", id, {
                Nombre: nombre,
                Descripcion: descripcion,
                FechaRecordatorio: fechaRecordatorio,
                Email: email,
                Mensaje: mensaje,
            });
            navigate("/recordatorios");
        } catch (error) {
            console.error("Error updating recordatorio:", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Editar Recordatorio</h1>
            <form onSubmit={handleSubmit}>
                {/* Campos similares a CreateRecordatorio */}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
                    Actualizar
                </button>
            </form>
        </div>
    );
};

export default EditRecordatorio;