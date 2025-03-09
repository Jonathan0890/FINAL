import React, { useState } from 'react';
import SavingsGoalForm from '../components/SavingsGoalForm';
import Navbar from '../Components/Navbar';

const AhorrosMetasView = () => {
    const [savingsGoals, setSavingsGoals] = useState([]);
    const [goalToEdit, setGoalToEdit] = useState(null);

    // Manejar la adición de una nueva meta
    const handleGoalAdded = (goal) => {
        setSavingsGoals([...savingsGoals, { ...goal, id: Date.now() }]);
    };

    // Manejar la actualización de una meta existente
    const handleGoalUpdated = (updatedGoal) => {
        setSavingsGoals(
            savingsGoals.map((goal) =>
                goal.id === updatedGoal.id ? updatedGoal : goal
            )
        );
        setGoalToEdit(null); // Limpiar la meta en edición
    };

    // Editar una meta
    const editGoal = (goal) => {
        setGoalToEdit(goal);
    };

    // Eliminar una meta
    const deleteGoal = (goalId) => {
        setSavingsGoals(savingsGoals.filter((goal) => goal.id !== goalId));
    };

    console.log("Renderizando AhorrosMetasView"); // Verificar si la vista se está renderizando

    return (<>
    <Navbar/>
        <div className="bg-gray-100 min-h-screen p-8 flex flex-col items-center">
            <div className="max-w-5xl w-full">
                <h1 className="text-blue-800 text-3xl font-bold mb-6 text-center">
                    Metas de Ahorro
                </h1>

                {/* Formulario para agregar/editar metas */}
                {(goalToEdit || true) && (
                    <SavingsGoalForm
                        onGoalAdded={handleGoalAdded}
                        onGoalUpdated={handleGoalUpdated}
                        goalToEdit={goalToEdit}
                    />
                )}

                {/* Lista de metas */}
                <div className="mt-8">
                    <h2 className="text-blue-600 text-2xl font-semibold mb-6">
                        Tus Metas
                    </h2>
                    <ul className="space-y-4">
                        {savingsGoals.map((goal) => (
                            <li
                                key={goal.id}
                                className="bg-white p-6 rounded-lg shadow-lg"
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="flex-1">
                                        <p className="text-gray-800 text-lg font-medium">
                                            {goal.name}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {goal.currentAmount} / {goal.targetAmount}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Fecha límite: {goal.deadline}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => editGoal(goal)}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => deleteGoal(goal.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </>
    );
};

export default AhorrosMetasView;
