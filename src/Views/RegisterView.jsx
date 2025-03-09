import React, { useState } from "react";
import axios from "axios";

const RegisterView = () => {
  // Estados para los campos del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Estados para manejar errores y mensajes de éxito
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Función para manejar el envío del formulario
  const handleRegister = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    // Limpiar mensajes de error previos
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Enviar los datos del formulario a la API
      const response = await axios.post("/api/register", {
        email,
        password,
      });

      // Mostrar mensaje de éxito
      setSuccessMessage("Registro exitoso. Redirigiendo...");

      // Aquí puedes redirigir al usuario a otra página, como el login o el dashboard
      console.log("Respuesta de la API:", response.data);
    } catch (error) {
      // Manejar errores de la API
      console.error("Error al registrar:", error);
      setErrorMessage(
        error.response?.data?.message || "Hubo un error al registrar. Inténtalo de nuevo."
      );
    }
  };

  return (
    <div className="bg-light-gray min-h-screen p-8">
      <h1 className="text-navy-blue text-3xl font-bold mb-6 text-center">Registro</h1>
      <p className="text-dark-gray mb-8 text-center">
        Crea una cuenta para empezar a gestionar tus finanzas.
      </p>

      {/* Formulario de registro */}
      <form onSubmit={handleRegister} className="space-y-6 max-w-sm mx-auto">
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

        {/* Campo: Contraseña */}
        <div>
          <label htmlFor="password" className="block text-dark-gray text-sm font-medium">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="mt-2 block w-full rounded-md border-dark-gray shadow-sm focus:ring-light-blue focus:border-light-blue"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Campo: Confirmar Contraseña */}
        <div>
          <label htmlFor="confirm-password" className="block text-dark-gray text-sm font-medium">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            id="confirm-password"
            className="mt-2 block w-full rounded-md border-dark-gray shadow-sm focus:ring-light-blue focus:border-light-blue"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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

        {/* Botón de Registro */}
        <div>
          <button
            type="submit"
            className="w-full bg-navy-blue text-white px-4 py-2 rounded-md hover:bg-light-blue transition-colors"
          >
            Registrarse
          </button>
        </div>
      </form>

      {/* Enlace para iniciar sesión */}
      <p className="text-center text-dark-gray mt-4">
        ¿Ya tienes cuenta?{" "}
        <a href="/iniciar-sesion" className="text-light-blue hover:underline">
          Inicia sesión aquí
        </a>
      </p>
    </div>
  );
};

export default RegisterView;