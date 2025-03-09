import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionForm = ({ onTransactionAdded }) => {
  const apiUrl = import.meta.env.VITE_APP_URL;
  const [transaction, setTransaction] = useState({ amount: 0, category: '', description: '' });
  const [categories, setCategories] = useState([]);
  const [customCategory, setCustomCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Cargar categorías desde la API
  const loadCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/Categoria`);
      setCategories(response.data.data || []);
    } catch (error) {
      console.error('Error al obtener categorías', error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Enviar la transacción
  const submitTransaction = async (e) => {
    e.preventDefault();
    
    if (!transaction.amount || !transaction.category) {
      setMessage('Por favor, completa todos los campos.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      let categoryId = transaction.category;

      if (transaction.category === 'custom' && customCategory) {
        const newCategoryResponse = await axios.post(`${apiUrl}/Categoria`, {
          Nombre: customCategory,
          Descripcion: '',
        });

        if (!newCategoryResponse.data || !newCategoryResponse.data.idCategoria) {
          throw new Error('El backend no devolvió un ID de categoría válido.');
        }

        categoryId = newCategoryResponse.data.idCategoria;
        setCategories(prevCategories => [...prevCategories, newCategoryResponse.data]); // Agregar la nueva categoría localmente
      }

      const transactionData = {
        Monto: parseFloat(transaction.amount.toFixed(2)),
        Descripcion: transaction.description || 'Descripción de la transacción',
        Fecha: new Date().toISOString(),
        CategoriaId: parseInt(categoryId),
      };

      const response = await axios.post(`${apiUrl}/Transaccion`, transactionData);
      onTransactionAdded(response.data);
      setMessage('Transacción agregada correctamente.');
      setTransaction({ amount: 0, category: '', description: '' });
      setCustomCategory('');
    } catch (error) {
      setMessage('Error al agregar la transacción.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={submitTransaction} className="bg-white rounded-2xl p-6 space-y-5">
      <h2 className="text-2xl font-bold text-gray-800">Nueva Transacción</h2>

      <div>
        <label htmlFor="amount" className="block text-gray-600 text-sm font-medium">Monto</label>
        <input
          type="number"
          value={transaction.amount}
          onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })}
          id="amount"
          className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-light-blue focus:border-light-blue"
          placeholder="Ingrese el monto"
          required
          min="0"
          step="0.01"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-gray-600 text-sm font-medium">Categoría</label>
        <select
          value={transaction.category}
          onChange={(e) => setTransaction({ ...transaction, category: e.target.value })}
          id="category"
          className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-light-blue focus:border-light-blue"
          required
        >
          <option value="">Seleccione una categoría</option>
          {categories.map((category) => (
            <option key={category.idCategoria} value={category.idCategoria}>
              {category.Nombre}
            </option>
          ))}
          <option value="custom">📌 Agregar una categoría personalizada</option>
        </select>
      </div>

      {transaction.category === 'custom' && (
        <div>
          <label htmlFor="custom-category" className="block text-gray-600 text-sm font-medium">Nueva Categoría</label>
          <input
            type="text"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            id="custom-category"
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-light-blue focus:border-light-blue"
            placeholder="Ingrese el nombre de la categoría"
          />
        </div>
      )}

      <div>
        <label htmlFor="description" className="block text-gray-600 text-sm font-medium">Descripción</label>
        <input
          type="text"
          value={transaction.description}
          onChange={(e) => setTransaction({ ...transaction, description: e.target.value })}
          id="description"
          className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-light-blue focus:border-light-blue"
          placeholder="Ingrese una descripción"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gray-800 text-white px-6 py-3 rounded-lg font-bold text-lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Agregando...' : 'Agregar Transacción'}
      </button>

      {message && <p className={message.includes('Error') ? 'text-red-600' : 'text-green-600'}>{message}</p>}
    </form>
  );
};

export default TransactionForm;