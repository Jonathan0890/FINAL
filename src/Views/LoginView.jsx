import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.VITE_API_BASE_URL}/usuarios/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    correo: email,
                    contrasena: password,
                }),
            });

            if (!response.ok) {
                throw new Error('Credenciales incorrectas');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('rol', data.rol);

            // Redirigir al usuario a la página principal
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
            alert('Credenciales incorrectas');
        }
    };

    const loginWithGoogle = () => {
        console.log('Iniciando sesión con Google');
    };

    const loginWithFacebook = () => {
        console.log('Iniciando sesión con Facebook');
    };

    const loginWithApple = () => {
        console.log('Iniciando sesión con Apple');
    };

    return (
        <div className="bg-[#1C1C1C] text-white min-h-screen flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-3xl font-bold mb-6 text-center">Iniciar Sesión</h1>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium mb-2">Correo</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Ingresa tu correo"
                            className="w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-lg font-medium mb-2">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingresa tu contraseña"
                            className="w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                            required
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </form>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-600"></div>
                    <span className="mx-4 text-gray-400">O</span>
                    <div className="flex-grow border-t border-gray-600"></div>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={loginWithGoogle}
                        className="w-full bg-white text-gray-800 px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-100 transition-colors flex items-center justify-center"
                    >
                        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
                        Continuar con Google
                    </button>
                    <button
                        onClick={loginWithFacebook}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                        <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5 mr-2" />
                        Continuar con Facebook
                    </button>
                    <button
                        onClick={loginWithApple}
                        className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center"
                    >
                        <img src="https://www.apple.com/favicon.ico" alt="Apple" className="w-5 h-5 mr-2" />
                        Continuar con Apple
                    </button>
                </div>

                <p className="text-center text-gray-400 mt-4">
                    ¿No tienes cuenta?{' '}
                    <a href="/registro" className="text-red-600 hover:underline">
                        Regístrate aquí
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginView;