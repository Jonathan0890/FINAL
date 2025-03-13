import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionForm = ({ onTransactionAdded }) => {
  // 1. Definir API URL correctamente
  const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7247/api';
  
  // 2. Estados del componente
  const [transaction, setTransaction] = useState({
    amount: '',
    category: '',
    description: ''
  });
  const [categories, setCategories] = useState([]);
  const [customCategory, setCustomCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 3. Cargar categorías
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Categoria`);
        setCategories(response.data?.data || []);
      } catch (err) {
        setError('Error cargando categorías');
        console.error('❌ Error fetching categories:', err);
      }
    };
    loadCategories();
  }, [apiUrl]);

  // 4. Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validación básica
      if (!transaction.amount || !transaction.category) {
        throw new Error('Completa todos los campos requeridos');
      }

      let categoryId = transaction.category;

      // Crear nueva categoría si es necesario
      if (categoryId === 'custom' && customCategory.trim()) {
        const newCategory = await axios.post(`${apiUrl}/Categoria`, {
          nombre: customCategory.trim(),
          descripcion: 'Categoría personalizada'
        });
        categoryId = newCategory.data.idCategoria;
      }

      // Estructura de datos para el backend
      const transactionData = {
        monto: parseFloat(transaction.amount),
        descripcion: transaction.description,
        fecha: new Date().toISOString(),
        categoriaId: parseInt(categoryId, 10),
        usuarioId: 1 // Cambiar por ID real del usuario logueado
      };

      // Enviar transacción
      const response = await axios.post(`${apiUrl}/Transaccion`, transactionData);
      
      // Actualizar UI
      onTransactionAdded(response.data);
      setTransaction({ amount: '', category: '', description: '' });
      setCustomCategory('');
      setError('');

    } catch (err) {
      console.error('❌ Transaction error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Error procesando la transacción');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Nueva Transacción</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo: Monto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monto (USD)
          </label>
          <input
            type="number"
            value={transaction.amount}
            onChange={(e) => setTransaction({...transaction, amount: e.target.value})}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        {/* Campo: Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select
            value={transaction.category}
            onChange={(e) => setTransaction({...transaction, category: e.target.value})}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat.idCategoria} value={cat.idCategoria}>
                {cat.nombre}
              </option>
            ))}
            <option value="custom">➕ Nueva categoría</option>
          </select>
        </div>

        {/* Campo: Nueva categoría */}
        {transaction.category === 'custom' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la nueva categoría
            </label>
            <input
              type="text"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Gastos deportivos"
              required
            />
          </div>
        )}

        {/* Campo: Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción (opcional)
          </label>
          <input
            type="text"
            value={transaction.description}
            onChange={(e) => setTransaction({...transaction, description: e.target.value})}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: Compra en supermercado"
          />
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md font-medium ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {loading ? 'Procesando...' : 'Registrar Transacción'}
        </button>

        {/* Mensajes de error */}
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
            ⚠️ {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default TransactionForm;