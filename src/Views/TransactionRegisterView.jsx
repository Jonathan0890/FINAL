import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionForm from '../Components/TransactionForm';
import Navbar from '../Components/Navbar';

const TransactionRegisterView = () => {
  const apiUrl = import.meta.env.VITE_APP_URL;
  const [transactions, setTransactions] = useState([]);
  
  // Cargar transacciones desde la API
  const loadTransactions = async () => {
    try {
      const response = await axios.get(`${apiUrl}/Transaccion`);
      setTransactions(response.data.data || []);
    } catch (error) {
      console.error('Error al obtener transacciones', error);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  // Manejar una nueva transacción agregada
  const handleTransactionAdded = (newTransaction) => {
    setTransactions(prevTransactions => [newTransaction, ...prevTransactions]); // Agregar al inicio de la lista
  };

  return (<>
  <Navbar/>
    <div className="min-h-screen flex items-start justify-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl -mt-4">
        
        {/* Formulario de Transacciones */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">✍️ Registrar Transacción</h2>
          <TransactionForm onTransactionAdded={handleTransactionAdded} />
        </div>

        {/* Historial de Transacciones */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">📜 Historial de Transacciones</h2>

          {transactions.length > 0 ? (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.idTransaccion} className="flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <span className="text-gray-800">{transaction.CategoriaNombre || '❓ Otra'}</span>
                  <span className="font-bold text-gray-800 text-lg">${transaction.Monto}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-800 text-center py-6">🚀 No hay transacciones registradas.</p>
          )}
        </div>
      </div>
    </div>
  </>
  );
};

export default TransactionRegisterView;