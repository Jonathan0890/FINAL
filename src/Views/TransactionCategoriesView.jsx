import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';

const TransactionCategoriesView = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://localhost:7111/api/categories');
        setCategories(response.data); // Asigna los datos recibidos de la API
      } catch (error) {
        console.error('Error fetching categories:', error);
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
          <p className="text-gray-600 mb-6 text-center">
            Gestiona y organiza tus gastos según diferentes categorías.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <article
                key={index}
                className="bg-white p-5 rounded-xl border border-gray-200 flex flex-col items-center text-center"
              >
                {/* Mostrar todas las propiedades de la categoría */}
                {Object.keys(category).map((key) => (
                  <div key={key} className="text-gray-800">
                    <strong>{key}:</strong> {category[key]}
                  </div>
                ))}
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default TransactionCategoriesView;