import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SavingsGoalForm from '../../components/Forms/SavingsGoalForm';
import Navbar from '../../Components/Navigation/Navbar';

const AhorrosMetasView = () => {
    const [savingsGoals, setSavingsGoals] = useState([]);
    const [goalToEdit, setGoalToEdit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener metas desde la API
    const fetchGoals = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://localhost:7247/api/MetaAhorro');
            
            // Verificar estructura específica de tu API
            if (response.data && response.data.success && Array.isArray(response.data.data)) {
                setSavingsGoals(response.data.data);
            } else {
                throw new Error(response.data.message || 'Formato de respuesta inesperado');
            }
            
            setError(null);
        } catch (err) {
            setError(`Error cargando metas: ${err.message}`);
            setSavingsGoals([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    // Crear nueva meta
    const handleGoalAdded = async (newGoal) => {
        try {
            const response = await axios.post('https://localhost:7247/api/MetaAhorro', newGoal);
            
            if (response.data.success && response.data.data) {
                setSavingsGoals(prev => [...prev, response.data.data]);
            } else {
                throw new Error(response.data.message || 'Error al crear la meta');
            }
        } catch (err) {
            setError(`Error creando meta: ${err.response?.data?.message || err.message}`);
        }
    };

    // Actualizar meta existente
    const handleGoalUpdated = async (updatedGoal) => {
        try {
            const response = await axios.put(
                `https://localhost:7247/api/MetaAhorro/${updatedGoal.pkMetaAhorro}`,
                updatedGoal
            );
            
            if (response.data.success && response.data.data) {
                setSavingsGoals(prev => 
                    prev.map(goal => 
                        goal.pkMetaAhorro === response.data.data.pkMetaAhorro ? response.data.data : goal
                    )
                );
                setGoalToEdit(null);
            }
        } catch (err) {
            setError(`Error actualizando meta: ${err.response?.data?.message || err.message}`);
        }
    };

    // Eliminar meta
    const deleteGoal = async (goalId) => {
        try {
            const response = await axios.delete(`https://localhost:7247/api/MetaAhorro/${goalId}`);
            
            if (response.data.success) {
                setSavingsGoals(prev => prev.filter(goal => goal.pkMetaAhorro !== goalId));
            } else {
                throw new Error(response.data.message || 'Error al eliminar');
            }
        } catch (err) {
            setError(`Error eliminando meta: ${err.response?.data?.message || err.message}`);
        }
    };

    if (loading) {
        return (
            <div className="text-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Cargando metas...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8">
                <div className="text-red-500 text-2xl mb-4">⚠️ Error</div>
                <p className="text-red-600 font-medium">{error}</p>
                <button
                    onClick={fetchGoals}
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
            <div className="bg-gray-50 min-h-screen p-8">
                <div className="max-w-4xl mx-auto">
                    <header className="text-center mb-12">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            🎯 Metas de Ahorro
                        </h1>
                        <p className="text-gray-600">
                            Administra tus objetivos financieros
                        </p>
                    </header>

                    <SavingsGoalForm
                        onGoalAdded={handleGoalAdded}
                        onGoalUpdated={handleGoalUpdated}
                        goalToEdit={goalToEdit}
                        onCancelEdit={() => setGoalToEdit(null)}
                    />

                    <section className="mt-12">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">
                            Tus Metas ({savingsGoals.length})
                        </h2>
                        
                        <div className="space-y-4">
                            {savingsGoals.map((goal) => (
                                <article 
                                    key={goal.pkMetaAhorro}
                                    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-800">
                                                {goal.descripcion}
                                            </h3>
                                            <div className="mt-2 flex gap-4">
                                                <div className="flex items-center">
                                                    <span className="text-sm text-gray-500">Objetivo:</span>
                                                    <span className="ml-2 font-medium text-green-600">
                                                        ${goal.montoObjetivo.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="text-sm text-gray-500">Fecha límite:</span>
                                                    <span className="ml-2 font-medium text-blue-600">
                                                        {new Date(goal.fechaObjetivo).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setGoalToEdit(goal)}
                                                className="px-3 py-1.5 text-sm bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => deleteGoal(goal.pkMetaAhorro)}
                                                className="px-3 py-1.5 text-sm bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                            
                            {savingsGoals.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 text-5xl mb-4">📭</div>
                                    <p className="text-gray-500">
                                        No hay metas registradas aún
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default AhorrosMetasView;