import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUsuario = () => {
    const { id } = useParams();
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rolId, setRolId] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsuario();
    }, [id]);

    const fetchUsuario = async () => {
        try {
            const response = await axios.get(`https://localhost:7111/api/usuarios/${id}`);
            setNombre(response.data.Nombre);
            setEmail(response.data.Email);
            setRolId(response.data.RolId);
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://localhost:7111/api/usuarios/${id}`, {
                Nombre: nombre,
                Email: email,
                Password: password || undefined, // Solo enviar si se modifica
                RolId: rolId,
            });
            navigate("/usuarios");
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Editar Usuario</h1>
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
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Contraseña (opcional)</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Dejar en blanco para no cambiar"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Rol</label>
                    <input
                        type="number"
                        value={rolId}
                        onChange={(e) => setRolId(parseInt(e.target.value) || 1)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
                    Actualizar
                </button>
            </form>
        </div>
    );
};

export default EditUsuario;
