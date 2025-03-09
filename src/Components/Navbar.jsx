import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const [isFinanceMenuOpen, setIsFinanceMenuOpen] = useState(false);
    const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);
    const authMenuRef = useRef(null);
    const location = useLocation();

    // Función para alternar el menú de finanzas
    const toggleFinanceMenu = () => {
        setIsFinanceMenuOpen(!isFinanceMenuOpen);
        setIsAuthMenuOpen(false); // Cierra el otro menú si está abierto
    };

    // Función para alternar el menú de autenticación
    const toggleAuthMenu = () => {
        setIsAuthMenuOpen(!isAuthMenuOpen);
        setIsFinanceMenuOpen(false); // Cierra el otro menú si está abierto
    };

    // Función para cerrar el menú al hacer clic fuera
    const handleClickOutside = (event) => {
        if (authMenuRef.current && !authMenuRef.current.contains(event.target)) {
            setIsAuthMenuOpen(false);
        }
    };

    // Cerrar los menús al cambiar de ruta
    useEffect(() => {
        setIsAuthMenuOpen(false);
        setIsFinanceMenuOpen(false);
    }, [location.pathname]);

    // Agregar el event listener al montar el componente
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <header>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    {/* Logo o nombre de la aplicación */}
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="text-navy-blue text-xl font-semibold">Control Financiero</span>
                    </Link>

                    {/* Botones de búsqueda y menú móvil */}
                    <div className="flex md:order-2">
                        {/* Botón de búsqueda (opcional) */}
                        <button
                            type="button"
                            data-collapse-toggle="navbar-search"
                            aria-controls="navbar-search"
                            aria-expanded="false"
                            className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
                        >
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                            <span className="sr-only">Buscar</span>
                        </button>

                        {/* Botón para abrir/cerrar el menú en móviles */}
                        <button
                            data-collapse-toggle="navbar-search"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-search"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Abrir menú</span>
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            </svg>
                        </button>

                        {/* Icono de usuario para autenticación */}
                        <div className="relative" ref={authMenuRef}>
                            <button
                                onClick={toggleAuthMenu}
                                className="flex items-center justify-center p-2 text-gray-500 hover:text-blue-500 focus:outline-none transition-colors"
                            >
                                {/* Icono de usuario */}
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 4a4 4 0 0 0-4 4v1a4 4 0 0 0 4 4h1a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4h-1Zm0 9a5 5 0 0 0-5 5v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1a5 5 0 0 0-5-5h-1Z"
                                    />
                                </svg>
                            </button>

                            {/* Menú desplegable de autenticación */}
                            {isAuthMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-700 transition-all duration-300 ease-in-out z-50">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                        <li>
                                            <Link
                                                to="/login"
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Iniciar Sesión
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/register"
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Registrarse
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Menú principal */}
                    <div
                        className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                        id="navbar-search"
                    >
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {/* Inicio */}
                            <li>
                                <Link
                                    to="/"
                                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Inicio
                                </Link>
                            </li>

                            {/* Finanzas (menú desplegable) */}
                            <li>
                                <button
                                    onClick={toggleFinanceMenu}
                                    className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Finanzas
                                    <svg
                                        className="w-4 h-4 ml-1"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 4 4 4-4"
                                        />
                                    </svg>
                                </button>

                                {/* Menú desplegable de Finanzas */}
                                {isFinanceMenuOpen && (
                                    <div className="absolute z-10 mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-700">
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                            <li>
                                                <Link
                                                    to="/register-transaction"
                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Registrar Transacción
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/transaction-categories"
                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Categorías
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/summary"
                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Resumen
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/ahorros"
                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Metas de Ahorro
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/reminders"
                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Recordatorios
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </li>

                            {/* Contacto */}
                            <li>
                                <Link
                                    to="/contact"
                                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Contacto
                                </Link>
                            </li>

                            {/* Pruebas */}
                            <li>
                                <Link
                                    to="/pruebas"
                                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Pruebas
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;