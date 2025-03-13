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
        if (reminderToEdit) {
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
                ...formData,
                fechaRecordatorio: new Date(formData.fechaRecordatorio).toISOString()
            };

            if (reminderToEdit) {
                await onReminderUpdated({
                    ...payload,
                    pkRecordatorio: reminderToEdit.pkRecordatorio
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
            console.error("Error al guardar:", error);
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
                {reminderToEdit ? "✏️ Editar Recordatorio" : "➕ Nuevo Recordatorio"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Campos del formulario... */}
            </div>

            <div className="flex justify-end gap-4 mt-6">
                {reminderToEdit && (
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
                    {reminderToEdit ? "Actualizar" : "Crear Recordatorio"}
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