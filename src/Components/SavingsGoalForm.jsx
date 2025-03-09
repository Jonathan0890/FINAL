import React, { useState, useEffect } from 'react';

const SavingsGoalForm = ({ goalToEdit, onGoalAdded, onGoalUpdated }) => {
  const [goal, setGoal] = useState({
    id: 0,
    name: '',
    currentAmount: 0,
    targetAmount: 0,
    deadline: '',
  });

  // Si hay una meta para editar, actualiza el estado
  useEffect(() => {
    if (goalToEdit) setGoal(goalToEdit);
  }, [goalToEdit]);

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (goalToEdit) {
      onGoalUpdated(goal); // Actualizar meta existente
    } else {
      onGoalAdded({ ...goal, id: Date.now() }); // Agregar nueva meta
    }
    // Limpiar el formulario
    setGoal({ id: 0, name: '', currentAmount: 0, targetAmount: 0, deadline: '' });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold text-navy-blue mb-6">
        {goalToEdit ? 'Editar Meta' : 'Agregar Meta'}
      </h2>

      {/* Campo: Nombre */}
      <div>
        <label className="block text-dark-gray text-sm font-medium">Nombre</label>
        <input
          type="text"
          value={goal.name}
          onChange={(e) => setGoal({ ...goal, name: e.target.value })}
          required
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-light-blue focus:border-light-blue"
        />
      </div>

      {/* Campo: Monto Actual */}
      <div>
        <label className="block text-dark-gray text-sm font-medium">
          Monto Actual
        </label>
        <input
          type="number"
          value={goal.currentAmount}
          onChange={(e) =>
            setGoal({ ...goal, currentAmount: Number(e.target.value) })
          }
          required
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-light-blue focus:border-light-blue"
        />
      </div>

      {/* Campo: Monto Objetivo */}
      <div>
        <label className="block text-dark-gray text-sm font-medium">
          Monto Objetivo
        </label>
        <input
          type="number"
          value={goal.targetAmount}
          onChange={(e) =>
            setGoal({ ...goal, targetAmount: Number(e.target.value) })
          }
          required
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-light-blue focus:border-light-blue"
        />
      </div>

      {/* Campo: Fecha Límite */}
      <div>
        <label className="block text-dark-gray text-sm font-medium">
          Fecha Límite
        </label>
        <input
          type="date"
          value={goal.deadline}
          onChange={(e) => setGoal({ ...goal, deadline: e.target.value })}
          required
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-light-blue focus:border-light-blue"
        />
      </div>

      {/* Botones */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-400 w-full md:w-auto"
        >
          {goalToEdit ? 'Actualizar Meta' : 'Agregar Meta'}
        </button>

        {goalToEdit && (
          <button
            type="button"
            onClick={() =>
              setGoal({ id: 0, name: '', currentAmount: 0, targetAmount: 0, deadline: '' })
            }
            className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-400 w-full md:w-auto"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default SavingsGoalForm;
