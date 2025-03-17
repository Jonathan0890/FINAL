import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const ReminderForm = ({ 
    reminderToEdit, 
    onReminderAdded, 
    onReminderUpdated,
    onCancelEdit 
}) => {
    const [formData, setFormData] = useState({ 
        nombre: "",
        email: "",
        descripcion: "",
        fechaRecordatorio: "",
        mensaje: ""
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (reminderToEdit?.pkRecordatorio) {
            const fecha = new Date(reminderToEdit.fechaRecordatorio);
            const formattedDate = fecha.toISOString().slice(0, 16);
            
            setFormData({
                nombre: reminderToEdit.nombre,
                email: reminderToEdit.email,
                descripcion: reminderToEdit.descripcion,
                fechaRecordatorio: formattedDate,
                mensaje: reminderToEdit.mensaje || ""
            });
        }
    }, [reminderToEdit]);

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.nombre.trim()) newErrors.nombre = "Nombre requerido";
        if (!emailRegex.test(formData.email)) newErrors.email = "Email inválido";
        if (!formData.descripcion.trim()) newErrors.descripcion = "Descripción requerida";
        if (!formData.fechaRecordatorio) newErrors.fechaRecordatorio = "Fecha requerida";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const payload = {
                Nombre: formData.nombre,
                Email: formData.email,
                Descripcion: formData.descripcion,
                FechaRecordatorio: new Date(formData.fechaRecordatorio).toISOString(),
                Mensaje: formData.mensaje
            };

            if (reminderToEdit?.pkRecordatorio) {
                await onReminderUpdated({
                    ...payload,
                    PkRecordatorio: reminderToEdit.pkRecordatorio
                });
            } else {
                await onReminderAdded(payload);
            }
            
            setFormData({
                nombre: "",
                email: "",
                descripcion: "",
                fechaRecordatorio: "",
                mensaje: ""
            });
            
        } catch (error) {
            console.error("Error:", error.response?.data);
            alert(`Error: ${error.response?.data?.message || "Error al guardar"}`);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {reminderToEdit?.pkRecordatorio ? "✏️ Editar Recordatorio" : "➕ Nuevo Recordatorio"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre *
                    </label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 rounded-lg border ${
                            errors.nombre ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 rounded-lg border ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descripción *
                    </label>
                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 rounded-lg border ${
                            errors.descripcion ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-blue-500`}
                        rows="3"
                    />
                    {errors.descripcion && <p className="text-red-500 text-sm mt-1">{errors.descripcion}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha y Hora *
                    </label>
                    <input
                        type="datetime-local"
                        name="fechaRecordatorio"
                        value={formData.fechaRecordatorio}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 rounded-lg border ${
                            errors.fechaRecordatorio ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.fechaRecordatorio && <p className="text-red-500 text-sm mt-1">{errors.fechaRecordatorio}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mensaje
                    </label>
                    <input
                        type="text"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
                {reminderToEdit?.pkRecordatorio && (
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                        Cancelar
                    </button>
                )}
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    {reminderToEdit?.pkRecordatorio ? "Actualizar" : "Crear Recordatorio"}
                </button>
            </div>
        </form>
    );
};

ReminderForm.propTypes = {
    reminderToEdit: PropTypes.object,
    onReminderAdded: PropTypes.func.isRequired,
    onReminderUpdated: PropTypes.func.isRequired,
    onCancelEdit: PropTypes.func.isRequired
};

export default ReminderForm;