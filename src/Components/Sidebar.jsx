import React from "react";
import { Link } from "react-router-dom";
import useSidebarStore from "../stores/useSidebarStore";

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebarStore();

  return (
    <>
      {/* Botón de hamburguesa (solo visible cuando el sidebar está cerrado) */}
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-40 p-2 text-gray-500 hover:text-blue-500 focus:outline-none bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 w-64 h-screen bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Encabezado del Sidebar con botón de cierre */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Menú</h2>
          <button
            onClick={toggleSidebar}
            className="p-2 text-gray-500 hover:text-blue-500 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Contenido del Sidebar */}
        <div className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <span>Inicio</span>
              </Link>
            </li>
            <li>
              <Link
                to="/reportes"
                className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <span>Reportes</span>
              </Link>
            </li>
            <li>
              <Link
                to="/configuracion"
                className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <span>Configuración</span>
              </Link>
            </li>
            {/* Apartados adicionales */}
            <li>
              <Link
                to="/usuarios"
                className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <span>Usuarios</span>
              </Link>
            </li>
            <li>
              <Link
                to="/transacciones"
                className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <span>Transacciones</span>
              </Link>
            </li>
            <li>
              <Link
                to="/categorias"
                className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <span>Categorías</span>
              </Link>
            </li>
            <li>
              <Link
                to="/resumen"
                className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <span>Resumen</span>
              </Link>
            </li>
            <li>
              <Link
                to="/meta-ahorro"
                className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <span>Meta de Ahorro</span>
              </Link>
            </li>
            <li>
              <Link
                to="/recordatorios"
                className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <span>Recordatorios</span>
              </Link>
            </li>
            <li>
              <Link
                to="/contacto"
                className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <span>Contacto</span>
              </Link>
            </li>
            <li>
              <Link
                to="/ventas-mensuales"
                className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <span>Ventas Mensuales</span>
              </Link>
            </li>
            <li>
              <Link
                to="/tasa-conversion"
                className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <span>Tasa de Conversión</span>
              </Link>
            </li>
            <li>
              <Link
                to="/ventas-totales"
                className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <span>Ventas Totales</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;