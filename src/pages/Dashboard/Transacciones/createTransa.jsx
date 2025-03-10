import React, { useState } from "react";
import { createItem } from "../../../Services/apiService"; // Servicio para crear

const CreateTrans = () => {
    const [monto, setMonto] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fecha, setFecha] = useState("");
    const [categoriaId, setCategoriaId] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevaTransaccion = { Monto: monto, Descripcion: descripcion, Fecha: fecha, CategoriaId: categoriaId };

        try {
            await createItem("Transaccion", nuevaTransaccion);
            alert("Transacción creada con éxito!");
            setMonto(""); setDescripcion(""); setFecha(""); setCategoriaId("");
        } catch (error) {
            console.error("Error al crear la transacción:", error);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Nueva Transacción</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="number" placeholder="Monto" value={monto} onChange={(e) => setMonto(e.target.value)} className="w-full p-2 border rounded" required />
                <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="w-full p-2 border rounded" required />
                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="w-full p-2 border rounded" required />
                <input type="number" placeholder="ID de Categoría" value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} className="w-full p-2 border rounded" required />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Guardar</button>
            </form>
        </div>
    );
};

export default CreateTrans;
