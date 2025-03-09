import { useState, useEffect } from "react";

const ReminderForm = ({ reminderToEdit, onReminderAdded, onReminderUpdated }) => {
    const [reminder, setReminder] = useState({ id: 0, description: "", date: "" });
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (reminderToEdit) {
            setReminder(reminderToEdit);
            setEditing(true);
        }
    }, [reminderToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReminder((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editing) {
            onReminderUpdated(reminder);
        } else {
            onReminderAdded({ ...reminder, id: Date.now() });
        }
        setReminder({ id: 0, description: "", date: "" });
        setEditing(false);
    };

    const cancelEdit = () => {
        setReminder({ id: 0, description: "", date: "" });
        setEditing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-navy-blue mb-4">
                {editing ? "Editar Recordatorio" : "Agregar Recordatorio"}
            </h2>

            <div>
                <label htmlFor="description" className="block text-dark-gray text-sm font-medium">
                    Descripción
                </label>
                <input
                    type="text"
                    name="description"
                    value={reminder.description}
                    onChange={handleChange}
                    id="description"
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-light-blue focus:border-light-blue"
                    placeholder="Ej. Reunión con el equipo"
                    required
                />
            </div>

            <div>
                <label htmlFor="date" className="block text-dark-gray text-sm font-medium">
                    Fecha
                </label>
                <input
                    type="date"
                    name="date"
                    value={reminder.date}
                    onChange={handleChange}
                    id="date"
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-light-blue focus:border-light-blue"
                    required
                />
            </div>

            <div className="flex justify-between items-center mt-4">
                <button type="submit" className="block bg-blue-500 text-white px-4 py-2 rounded-md">
                    {editing ? "Actualizar Recordatorio" : "Agregar Recordatorio"}
                </button>
                {editing && (
                    <button onClick={cancelEdit} 
                    className="block bg-blue-500 text-white px-4 py-2 rounded-md">
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};

export default ReminderForm;
