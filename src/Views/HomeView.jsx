import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import QuickAccessButton from '../Components/QuickAccessButton';
import NotificationItem from '../Components/NotificationItem';

const HomeView = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        "https://source.unsplash.com/1600x600/?nature",
        "https://source.unsplash.com/1600x600/?technology",
        "https://source.unsplash.com/1600x600/?city"
    ];

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <>
            <Navbar />
            <div className="min-h-screen p-6 mx-auto mt-16 w-full max-w-screen-2xl">
                <header className="mb-10 text-center">
                    <h1 className="text-5xl font-extrabold text-gray-800">👋 ¡Bienvenido, Usuario!</h1>
                    <p className="text-lg text-gray-600 mt-2">Gestiona tus finanzas de manera inteligente</p>
                </header>

                <div className="relative mb-12 rounded-xl overflow-hidden">
                    <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {images.map((image, index) => (
                            <div key={index} className="w-full flex-shrink-0">
                                <img src={image} alt={`Slide ${index + 1}`} className="w-full h-[400px] md:h-[500px] object-cover rounded-xl" />
                            </div>
                        ))}
                    </div>

                    <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/80 transition">❮</button>
                    <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/80 transition">❯</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white shadow-lg rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Accesos Rápidos</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <QuickAccessButton text="Facturas" emoji="📄" color="blue" />
                            <QuickAccessButton text="Reportes" emoji="📊" color="blue" />
                            <QuickAccessButton text="Configuración" emoji="⚙" color="blue" />
                            <QuickAccessButton text="Notificaciones" emoji="🔔" color="blue" />
                        </div>
                    </div>

                    <div className="bg-white shadow-lg rounded-xl p-6 md:col-span-2">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Últimas Notificaciones</h2>
                        <ul className="text-gray-800 space-y-2">
                            <NotificationItem emoji="📢" text="Pago de factura recibido." color="blue" />
                            <NotificationItem emoji="📈" text="Tus ingresos han aumentado un 15% este mes." color="blue" />
                            <NotificationItem emoji="⚠" text="Tienes una factura pendiente de pago." color="red" />
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeView;
