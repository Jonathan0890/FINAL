import { useState, useEffect } from "react";
import ReminderForm from "../Components/ReminderForm";
import Navbar from "../Components/Navbar";

const RemindersView = () => {
    const [reminders, setReminders] = useState([]);
    const [reminderToEdit, setReminderToEdit] = useState(null);

    useEffect(() => {
        const fetchReminders = async () => {
            try {
                const response = await fetch("https://localhost:7111/recordatorios");
                const data = await response.json();
                setReminders(data);
            } catch (error) {
                console.error("Error fetching reminders:", error);
            }
        };
        fetchReminders();
    }, []);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const handleReminderAdded = async (reminder) => {
        try {
            const response = await fetch("https://localhost:7111/recordatorios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reminder),
            });
            const newReminder = await response.json();
            setReminders([...reminders, newReminder]);
        } catch (error) {
            console.error("Error adding reminder:", error);
        }
    };

    const handleReminderUpdated = async (updatedReminder) => {
        try {
            await fetch(`https://localhost:7111/recordatorios/${updatedReminder.PkRecordatorio}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedReminder),
            });

            setReminders((prevReminders) =>
                prevReminders.map((r) => (r.PkRecordatorio === updatedReminder.PkRecordatorio ? updatedReminder : r))
            );
            setReminderToEdit(null);
        } catch (error) {
            console.error("Error updating reminder:", error);
        }
    };

    const editReminder = (reminder) => {
        setReminderToEdit(reminder);
    };

    const deleteReminder = async (id) => {
        try {
            await fetch(`https://localhost:7111/recordatorios/${id}`, { method: "DELETE" });
            setReminders(reminders.filter((r) => r.PkRecordatorio !== id));
        } catch (error) {
            console.error("Error deleting reminder:", error);
        }
    };

    return (<>
    <Navbar/>
        <main className="bg-light-gray min-h-screen p-6">
            <h1 className="text-navy-blue text-3xl font-bold mb-8">Recordatorios</h1>

            <ReminderForm
                reminderToEdit={reminderToEdit}
                onReminderAdded={handleReminderAdded}
                onReminderUpdated={handleReminderUpdated}
            />

            <section className="mt-8">
                <h2 className="text-light-blue text-2xl font-semibold mb-6">Tus Recordatorios</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reminders.map((reminder) => (
                        <article
                            key={reminder.PkRecordatorio}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                        >
                            <p className="text-dark-gray text-lg mb-2">
                                <strong>Descripción:</strong> {reminder.Descripcion}
                            </p>
                            <p className="text-dark-gray text-lg mb-2">
                                <strong>Fecha:</strong> {formatDate(reminder.FechaRecordatorio)}
                            </p>
                            <p className="text-dark-gray text-lg mb-2">
                                <strong>Nombre:</strong> {reminder.Nombre}
                            </p>
                            <p className="text-dark-gray text-lg mb-2">
                                <strong>Email:</strong> {reminder.Email}
                            </p>
                            <p className="text-dark-gray text-lg mb-2">
                                <strong>Mensaje:</strong> {reminder.Mensaje}
                            </p>
                            <div className="flex justify-end space-x-4 mt-4">
                                <button
                                    onClick={() => editReminder(reminder)}
                                    className="text-light-blue hover:underline font-medium"
                                    aria-label="Editar recordatorio"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => deleteReminder(reminder.PkRecordatorio)}
                                    className="text-red-500 hover:underline font-medium"
                                    aria-label="Eliminar recordatorio"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    </>
    );
};

export default RemindersView;
