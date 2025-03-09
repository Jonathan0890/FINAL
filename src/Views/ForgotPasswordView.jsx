import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPasswordView = () => {
    // Estado para el campo de correo electrónico
    const [email, setEmail] = useState("");

    // Estados para manejar errores y mensajes de éxito
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");


    // Hook para redireccionar al usuario
    const navigate = useNavigate();

    // Función para manejar la recuperación de contraseña
    const handleRecovery = async (e) => {
        e.preventDefault();

        // Limpiar mensajes de error previos
        setErrorMessage("");
        setSuccessMessage("");

        try {
            // Enviar el correo electrónico a la API para recuperar la contraseña
            const response = await axios.post("/api/forgot-password", {
                email,
            });

            // Mostrar mensaje de éxito
            setSuccessMessage(
                "Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña."
            );

            // Redirigir al usuario a la página de inicio de sesión después de 3 segundos
            setTimeout(() => {
                navigate("/iniciar-sesion");
            }, 3000);
        } catch (error) {
            // Manejar errores de la API
            console.error("Error al recuperar la contraseña:", error);
            setErrorMessage(
                error.response?.data?.message ||
                "Hubo un error al procesar tu solicitud. Inténtalo de nuevo."
            );
        }
    };

    return (
        <div className="bg-light-gray min-h-screen p-8 flex flex-col justify-center items-center">
            <h1 className="text-navy-blue text-3xl font-bold mb-6 text-center">
                Recuperar Contraseña
            </h1>
            <p className="text-dark-gray mb-8 text-center">
                Ingresa tu correo electrónico para recuperar tu contraseña.
            </p>

            {/* Formulario de recuperación de contraseña */}
            <form onSubmit={handleRecovery} className="space-y-6 max-w-sm w-full">
                {/* Campo: Correo Electrónico */}
                <div>
                    <label htmlFor="email" className="block text-dark-gray text-sm font-medium">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="mt-2 block w-full rounded-md border-dark-gray shadow-sm focus:ring-light-blue focus:border-light-blue"
                        placeholder="tucorreo@dominio.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Mensajes de error y éxito */}
                {errorMessage && (
                    <p className="text-red-600 text-sm text-center">{errorMessage}</p>
                )}
                {successMessage && (
                    <p className="text-green-600 text-sm text-center">{successMessage}</p>
                )}

                {/* Botón de Recuperar Contraseña */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-navy-blue text-white px-4 py-2 rounded-md hover:bg-light-blue transition-colors"
                    >
                        Recuperar Contraseña
                    </button>
                </div>
            </form>

            {/* Enlace para iniciar sesión */}
            <p className="text-center text-dark-gray mt-4">
                ¿Recuerdas tu contraseña?{" "}
                <a href="/iniciar-sesion" className="text-light-blue hover:underline">
                    Inicia sesión aquí
                </a>
            </p>
        </div>
    );
};

export default ForgotPasswordView;