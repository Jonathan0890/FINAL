import React, { useState } from 'react';

const LoginView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Iniciando sesión con:', email, password);
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
        <div className="bg-light-gray min-h-screen p-8">
            <div className="max-w-sm w-full mx-auto pt-12">
                <h1 className="text-navy-blue text-3xl font-bold mb-6 text-center">Iniciar Sesión</h1>
                <p className="text-dark-gray mb-8 text-center">Ingresa tus credenciales para acceder a tu cuenta.</p>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-dark-gray text-sm font-medium">Correo Electrónico</label>
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

                    <div>
                        <label htmlFor="password" className="block text-dark-gray text-sm font-medium">Contraseña</label>
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

                    <div>
                        <button type="submit" className="w-full bg-navy-blue text-white px-4 py-2 rounded-md hover:bg-light-blue transition-colors">
                            Iniciar Sesión
                        </button>
                    </div>
                </form>

                <p className="text-center text-dark-gray mt-4">
                    ¿Olvidaste tu contraseña?
                    <a href="/recuperar-contraseña" className="text-light-blue hover:underline">Recupérala aquí</a>
                </p>

                <p className="text-center text-dark-gray mt-2">
                    ¿No tienes cuenta?
                    <a href="/registro" className="text-light-blue hover:underline">Regístrate aquí</a>
                </p>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-dark-gray"></div>
                    <span className="mx-4 text-dark-gray">O</span>
                    <div className="flex-grow border-t border-dark-gray"></div>
                </div>

                <div className="space-y-4">
                    <button onClick={loginWithGoogle} className="w-full bg-white text-dark-gray px-4 py-2 rounded-md border border-dark-gray hover:bg-gray-50 transition-colors flex items-center justify-center">
                        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
                        Continuar con Google
                    </button>
                    <button onClick={loginWithFacebook} className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
                        <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5 mr-2" />
                        Continuar con Facebook
                    </button>
                    <button onClick={loginWithApple} className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors flex items-center justify-center">
                        <img src="https://www.apple.com/favicon.ico" alt="Apple" className="w-5 h-5 mr-2" />
                        Continuar con Apple
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginView;