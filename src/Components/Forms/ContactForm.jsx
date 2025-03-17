import React, { useState } from "react";

const ContactForm = ({ onSubmit }) => {
    // Estados para los campos del formulario
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    // Función para manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // Pasar los datos del formulario al componente padre
        setFormData({ name: "", email: "", message: "" }); // Limpiar el formulario
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo: Nombre */}
            <div>
                <label htmlFor="name" className="block text-gray-700 font-medium">
                    Nombre
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-light-blue focus:border-light-blue"
                    placeholder="Tu nombre"
                    required
                />
            </div>

            {/* Campo: Correo Electrónico */}
            <div>
                <label htmlFor="email" className="block text-gray-700 font-medium">
                    Correo Electrónico
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-light-blue focus:border-light-blue"
                    placeholder="correo@ejemplo.com"
                    required
                />
            </div>

            {/* Campo: Mensaje */}
            <div>
                <label htmlFor="message" className="block text-gray-700 font-medium">
                    Mensaje
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-light-blue focus:border-light-blue h-32"
                    placeholder="Escribe tu mensaje aquí..."
                    required
                ></textarea>
            </div>

            {/* Botón de envío */}
            <button
                type="submit"
                className="w-full bg-navy-blue text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-blue-500 transition transform hover:scale-105"
            >
                Enviar Mensaje
            </button>
        </form>
    );
};

export default ContactForm;