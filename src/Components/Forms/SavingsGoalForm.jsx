import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SavingsGoalForm = ({ goalToEdit, onGoalAdded, onGoalUpdated, onCancelEdit }) => {
    const [formData, setFormData] = useState({
        descripcion: '',
        montoObjetivo: '',
        fechaObjetivo: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (goalToEdit) {
            setFormData({
                descripcion: goalToEdit.descripcion,
                montoObjetivo: goalToEdit.montoObjetivo,
                fechaObjetivo: goalToEdit.fechaObjetivo.split('T')[0]
            });
        } else {
            resetForm();
        }
    }, [goalToEdit]);

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.descripcion.trim()) {
            newErrors.descripcion = 'La descripción es requerida';
        }
        
        if (formData.montoObjetivo <= 0) {
            newErrors.montoObjetivo = 'El monto debe ser mayor a cero';
        }
        
        if (!formData.fechaObjetivo) {
            newErrors.fechaObjetivo = 'Selecciona una fecha válida';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        try {
            const payload = {
                ...formData,
                montoObjetivo: parseFloat(formData.montoObjetivo)
            };

            if (goalToEdit) {
                await onGoalUpdated({
                    ...goalToEdit,
                    ...payload
                });
            } else {
                await onGoalAdded(payload);
            }
            
            resetForm();
        } catch (err) {
            console.error('Error al guardar:', err);
        }
    };

    const resetForm = () => {
        setFormData({
            descripcion: '',
            montoObjetivo: '',
            fechaObjetivo: ''
        });
        setErrors({});
        if (onCancelEdit) onCancelEdit();
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                {goalToEdit ? '✏️ Editar Meta' : '➕ Nueva Meta'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descripción *
                    </label>
                    <input
                        type="text"
                        value={formData.descripcion}
                        onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                        className={`w-full px-4 py-2 rounded-lg border ${
                            errors.descripcion ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.descripcion && (
                        <p className="text-red-500 text-sm mt-1">{errors.descripcion}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Monto Objetivo ($) *
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            min="0.01"
                            value={formData.montoObjetivo}
                            onChange={(e) => setFormData({...formData, montoObjetivo: e.target.value})}
                            className={`w-full px-4 py-2 rounded-lg border ${
                                errors.montoObjetivo ? 'border-red-500' : 'border-gray-300'
                            } focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.montoObjetivo && (
                            <p className="text-red-500 text-sm mt-1">{errors.montoObjetivo}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha Límite *
                        </label>
                        <input
                            type="date"
                            value={formData.fechaObjetivo}
                            onChange={(e) => setFormData({...formData, fechaObjetivo: e.target.value})}
                            className={`w-full px-4 py-2 rounded-lg border ${
                                errors.fechaObjetivo ? 'border-red-500' : 'border-gray-300'
                            } focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.fechaObjetivo && (
                            <p className="text-red-500 text-sm mt-1">{errors.fechaObjetivo}</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-6">
                    {goalToEdit && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Cancelar
                        </button>
                    )}
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        {goalToEdit ? 'Actualizar Meta' : 'Crear Meta'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SavingsGoalForm;