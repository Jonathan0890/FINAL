import React, { useState, useEffect } from "react";
import { fetchItemById, updateItem } from "../../../Services/apiService";
import { useParams } from "react-router-dom";

const EditTrans = () => {
    const { id } = useParams();
    const [monto, setMonto] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fecha, setFecha] = useState("");
    const [categoriaId, setCategoriaId] = useState("");

    useEffect(() => {
        fetchTransaccion();
    }, []);

    const fetchTransaccion = async () => {
        try {
            const data = await fetchItemById("Transaccion", id);
            setMonto(data.Monto);
            setDescripcion(data.Descripcion);
            setFecha(data.Fecha.split("T")[0]); // Formato YYYY-MM-DD
            setCategoriaId(data.CategoriaId);
        } catch (error) {
            console.error("Error al cargar la transacción:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const transaccionActualizada = { pkTransaccion: id, Monto: monto, Descripcion: descripcion, Fecha: fecha, CategoriaId: categoriaId };

        try {
            await updateItem("Transaccion", id, transaccionActualizada);
            alert("Transacción actualizada con éxito!");
        } catch (error) {
            console.error("Error al actualizar la transacción:", error);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Editar Transacción</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} className="w-full p-2 border rounded" required />
                <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="w-full p-2 border rounded" required />
                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="w-full p-2 border rounded" required />
                <input type="number" value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} className="w-full p-2 border rounded" required />
                <button type="submit" className="bg-green-500 text-white p-2 rounded">Actualizar</button>
            </form>
        </div>
    );
};

export default EditTrans;
