import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionForm = ({ onTransactionAdded }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7247/api';
  const [transaction, setTransaction] = useState({
    monto: '',
    categoriaId: '',
    descripcion: ''
  });
  const [categories, setCategories] = useState([]);
  const [customCategory, setCustomCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cargar categorías
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Categoria`);
        setCategories(response.data?.data || []);
      } catch (error) {
        setError('Error cargando categorías');
        console.error('Error:', error);
      }
    };
    loadCategories();
  }, [apiUrl]);

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validaciones
      if (!transaction.monto || isNaN(transaction.monto)) {
        throw new Error('Ingresa un monto válido');
      }

      const monto = parseFloat(transaction.monto);
      if (monto <= 0) throw new Error('El monto debe ser mayor a cero');
      if (!transaction.categoriaId) throw new Error('Selecciona una categoría');

      let categoriaId = parseInt(transaction.categoriaId);

      // Crear nueva categoría si es necesario
      if (categoriaId === -1) { // Usar valor especial para nueva categoría
        if (!customCategory.trim()) throw new Error('Ingresa un nombre para la categoría');
        
        const response = await axios.post(`${apiUrl}/Categoria`, {
          nombre: customCategory.trim(),
          descripcion: 'Categoría personalizada',
          idCategoria: 0
        }, getAuthHeader());

        if (!response.data?.idCategoria && !response.data?.pkCategoria) {
          throw new Error('Error al crear categoría');
        }
        
        categoriaId = response.data.idCategoria || response.data.pkCategoria;
      }

      // Construir payload final
      const transactionData = {
        monto: monto,
        descripcion: transaction.descripcion || '',
        fecha: new Date().toISOString(),
        categoriaId: categoriaId
      };

      // Enviar transacción
      const response = await axios.post(
        `${apiUrl}/Transaccion`,
        transactionData,
        getAuthHeader()
      );

      // Actualizar UI
      onTransactionAdded({
        ...response.data,
        categoria: categories.find(c => c.idCategoria === categoriaId)?.nombre || customCategory
      });

      // Resetear formulario
      setTransaction({ monto: '', categoriaId: '', descripcion: '' });
      setCustomCategory('');

    } catch (error) {
      const backendError = error.response?.data || error;
      setError(backendError.title || backendError.message || 'Error desconocido');
      console.error('Detalles del error:', backendError);
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
            value={transaction.monto}
            onChange={(e) => setTransaction(prev => ({
              ...prev, 
              monto: e.target.value.replace(/[^0-9.]/g, '') // Validar entrada numérica
            }))}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
            step="0.01"
            min="0.01"
            required
          />
        </div>

        {/* Campo: Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select
            value={transaction.categoriaId}
            onChange={(e) => setTransaction(prev => ({
              ...prev, 
              categoriaId: e.target.value
            }))}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat.idCategoria} value={cat.idCategoria}>
                {cat.nombre}
              </option>
            ))}
            <option value="-1">➕ Nueva categoría</option>
          </select>
        </div>

        {/* Campo para nueva categoría */}
        {transaction.categoriaId === '-1' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la nueva categoría
            </label>
            <input
              type="text"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚ ]/g, ''))}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Gastos deportivos"
              maxLength="50"
              required
            />
          </div>
        )}

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción (opcional)
          </label>
          <input
            type="text"
            value={transaction.descripcion}
            onChange={(e) => setTransaction(prev => ({
              ...prev, 
              descripcion: e.target.value.slice(0, 100) // Limitar longitud
            }))}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: Compra en supermercado"
          />
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md font-medium transition-all ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Procesando...</span>
            </div>
          ) : (
            'Registrar Transacción'
          )}
        </button>

        {/* Mensaje de error */}
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm animate-fade-in">
            ⚠️ {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default TransactionForm;