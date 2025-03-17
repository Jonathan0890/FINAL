import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navigation/Navbar';

const TransactionCategoriesView = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('Intentando conectar a:', 'https://localhost:7247/api/Categoria');

        const response = await axios.get('https://localhost:7247/api/Categoria', {
          headers: { 'Content-Type': 'application/json' },
        });

        console.log('Respuesta recibida:', response.data);

        // Verificar si la respuesta tiene la estructura esperada
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else if (response.data && Array.isArray(response.data.data)) {
          setCategories(response.data.data); // Acceder a la clave "data"
        } else {
          console.warn('La respuesta no contiene un array:', response.data);
        }
      } catch (error) {
        console.error('Error completo:', error);
        if (error.response) {
          console.error('Detalles del error HTTP:', {
            status: error.response.status,
            headers: error.response.headers,
            data: error.response.data
          });
        } else {
          console.error('No se pudo conectar con el servidor. Verifica que la API esté corriendo.');
        }
      } finally {
        setLoading(false); // Finaliza la carga, sea éxito o error
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen p-8 flex flex-col items-center">
        <div className="max-w-4xl w-full">
          <h1 className="text-gray-800 text-3xl font-bold mb-2 text-center">
            Categorías de Transacciones
          </h1>

          {loading ? (
            <p className="text-center text-blue-500">Cargando categorías...</p>
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {categories.map((category) => (
                <div
                  key={category.id} // Usar un identificador único si está disponible
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                >
                  <h3 className="font-semibold text-lg">{category.nombre}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {category.descripcion || 'Descripción no disponible'}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-red-500 mt-4">
              No se encontraron categorías. Verifica la consola para detalles.
            </p>
          )}
        </div>
      </main>
    </>
  );
};

export default TransactionCategoriesView;
