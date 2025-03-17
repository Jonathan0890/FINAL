import { useState } from "react"
import { CalendarIcon, CheckCircle2, Clock, MoreHorizontal, Edit, Trash2 } from "lucide-react"

const reminders = [/* ... (mantener el mismo array de recordatorios) ... */]

export function RemindersList() {
    const [activeTab, setActiveTab] = useState("upcoming")
    const [openMenuId, setOpenMenuId] = useState(null)

    const filteredReminders = reminders.filter((reminder) => reminder.status === activeTab)

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "high": return "bg-red-100 text-red-800"
            case "medium": return "bg-yellow-100 text-yellow-800"
            case "low": return "bg-green-100 text-green-800"
            default: return "bg-blue-100 text-blue-800"
        }
    }

    const getDaysUntil = (dateString) => {
        const diffDays = Math.ceil((new Date(dateString) - new Date()) / (1000 * 60 * 60 * 24))
        return diffDays > 0 ? diffDays : 0
    }

    const handleMarkAsPaid = (id) => {
        console.log(`Marking reminder ${id} as paid`)
    }

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <button
                    onClick={() => setActiveTab("upcoming")}
                    className={`px-4 py-2 rounded-md ${activeTab === "upcoming"
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"}`}
                >
                    Upcoming
                </button>
                <button
                    onClick={() => setActiveTab("completed")}
                    className={`px-4 py-2 rounded-md ${activeTab === "completed"
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"}`}
                >
                    Completed
                </button>
            </div>

            <div className="space-y-4">
                {filteredReminders.map((reminder) => {
                    const daysUntil = getDaysUntil(reminder.dueDate)
                    const isCompleted = reminder.status === "completed"

                    return (
                        <div key={reminder.id} className="border rounded-lg p-4 bg-white shadow-sm">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                    {isCompleted && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                                    <h3 className="font-semibold text-lg">{reminder.title}</h3>
                                </div>

                                <div className="relative">
                                    <button
                                        onClick={() => setOpenMenuId(openMenuId === reminder.id ? null : reminder.id)}
                                        className="p-1 hover:bg-gray-100 rounded"
                                    >
                                        <MoreHorizontal className="h-5 w-5" />
                                    </button>

                                    {openMenuId === reminder.id && (
                                        <div className="absolute right-0 mt-1 w-32 bg-white border rounded-md shadow-lg">
                                            <button className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center">
                                                <Edit className="mr-2 h-4 w-4" /> Edit
                                            </button>
                                            <button className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center text-red-500">
                                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-3">
                                <span className={`px-2 py-1 rounded-full text-sm ${getPriorityColor(reminder.priority)}`}>
                                    {reminder.priority}
                                </span>
                                {reminder.recurring && (
                                    <span className="px-2 py-1 rounded-full text-sm bg-gray-100 flex items-center">
                                        <Clock className="mr-1 h-3 w-3" /> {reminder.frequency}
                                    </span>
                                )}
                            </div>

                            <div className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2 text-gray-500">
                                    <CalendarIcon className="h-4 w-4" />
                                    {isCompleted ? (
                                        <span>Paid on {new Date(reminder.dueDate).toLocaleDateString()}</span>
                                    ) : (
                                        <span>
                                            Due in {daysUntil} {daysUntil === 1 ? "day" : "days"} •
                                            ({new Date(reminder.dueDate).toLocaleDateString()})
                                        </span>
                                    )}
                                </div>
                                <span className="font-medium">${reminder.amount.toFixed(2)}</span>
                            </div>

                            {!isCompleted && (
                                <button
                                    onClick={() => handleMarkAsPaid(reminder.id)}
                                    className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center"
                                >
                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                    Mark as Paid
                                </button>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}