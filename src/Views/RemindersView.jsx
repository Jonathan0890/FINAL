import { useState, useEffect } from "react";
import axios from "axios";
import ReminderForm from "../Components/ReminderForm";
import Navbar from "../Components/Navbar";

const RemindersView = () => {
    const [reminders, setReminders] = useState([]);
    const [reminderToEdit, setReminderToEdit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = "https://localhost:7247/api/Recordatorio";

    const fetchReminders = async () => {
        try {
            const response = await axios.get(API_URL);
            
            // Validar estructura de respuesta
            if (response.data && response.data.success) {
                if (Array.isArray(response.data.data)) {
                    setReminders(response.data.data);
                } else {
                    throw new Error("Formato de datos inválido");
                }
            } else {
                throw new Error(response.data.message || "Error del servidor");
            }
            
            setError(null);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setReminders([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReminders();
    }, []);

    const handleReminderAdded = async (newReminder) => {
        try {
            const response = await axios.post(API_URL, newReminder);
            
            if (response.data.success && response.data.data) {
                setReminders(prev => [...prev, response.data.data]);
            } else {
                throw new Error(response.data.message || "Error al crear");
            }
        } catch (error) {
            setError("Error creando: " + (error.response?.data?.message || error.message));
        }
    };

    const handleReminderUpdated = async (updatedReminder) => {
        try {
            const response = await axios.put(
                `${API_URL}/${updatedReminder.pkRecordatorio}`, 
                updatedReminder
            );
            
            if (response.data.success && response.data.data) {
                setReminders(prev => 
                    prev.map(r => 
                        r.pkRecordatorio === response.data.data.pkRecordatorio 
                            ? response.data.data 
                            : r
                    )
                );
                setReminderToEdit(null);
            }
        } catch (error) {
            setError("Error actualizando: " + (error.response?.data?.message || error.message));
        }
    };

    const deleteReminder = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            
            if (response.data.success) {
                setReminders(prev => prev.filter(r => r.pkRecordatorio !== id));
            } else {
                throw new Error(response.data.message || "Error al eliminar");
            }
        } catch (error) {
            setError("Error eliminando: " + (error.response?.data?.message || error.message));
        }
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    if (loading) {
        return (
            <div className="text-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Cargando recordatorios...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8">
                <div className="text-red-500 text-2xl mb-4">⚠️ Error</div>
                <p className="text-red-600 font-medium">{error}</p>
                <button
                    onClick={fetchReminders}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <main className="bg-gray-50 min-h-screen p-8">
                <div className="max-w-6xl mx-auto">
                    <header className="text-center mb-12">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            🛎️ Gestión de Recordatorios
                        </h1>
                        <p className="text-gray-600">
                            Programa y administra tus recordatorios importantes
                        </p>
                    </header>

                    <ReminderForm
                        reminderToEdit={reminderToEdit}
                        onReminderAdded={handleReminderAdded}
                        onReminderUpdated={handleReminderUpdated}
                        onCancelEdit={() => setReminderToEdit(null)}
                    />

                    <section className="mt-12">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">
                            Listado de Recordatorios ({reminders.length})
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reminders.map(reminder => (
                                <article 
                                    key={reminder.pkRecordatorio}
                                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
                                >
                                    <div className="space-y-3">
                                        <h3 className="font-medium text-gray-800">
                                            {reminder.nombre} ({reminder.email})
                                        </h3>
                                        <p className="text-gray-600">
                                            {reminder.descripcion}
                                        </p>
                                        <div className="text-sm text-gray-500">
                                            <span className="font-medium">Fecha:</span> 
                                            {formatDate(reminder.fechaRecordatorio)}
                                        </div>
                                        {reminder.mensaje && (
                                            <p className="text-sm text-gray-500 italic">
                                                "{reminder.mensaje}"
                                            </p>
                                        )}
                                        <div className="flex justify-end gap-2 mt-4">
                                            <button
                                                onClick={() => setReminderToEdit(reminder)}
                                                className="text-blue-600 hover:text-blue-800 text-sm"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => deleteReminder(reminder.pkRecordatorio)}
                                                className="text-red-600 hover:text-red-800 text-sm"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                            
                            {reminders.length === 0 && (
                                <div className="text-center col-span-full py-12">
                                    <div className="text-gray-400 text-5xl mb-4">📭</div>
                                    <p className="text-gray-500">
                                        No hay recordatorios programados
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
};

export default RemindersView;