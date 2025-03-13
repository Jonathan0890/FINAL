import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import QuickAccessButton from '../Components/QuickAccessButton';
import NotificationItem from '../Components/NotificationItem';

const SLIDE_INTERVAL = 5000; // Más legible como constante
const images = [
  { src: "src/Assets/din.jpg", alt: "Dashboard financiero" },
  { src: "src/Assets/gra.jpg", alt: "Gráficos de análisis" },
  { src: "src/Assets/ind.jpg", alt: "Indicadores clave" },
];

const HomeView = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // Navegación más eficiente usando useCallback
    const nextSlide = () => setCurrentIndex(prev => (prev + 1) % images.length);
    const prevSlide = () => setCurrentIndex(prev => (prev - 1 + images.length) % images.length);

    useEffect(() => {
        const interval = setInterval(nextSlide, SLIDE_INTERVAL);
        return () => clearInterval(interval);
    }, []); // Eliminada dependencia innecesaria

    return (
        <>
            <Navbar />
            <div className="min-h-screen p-6 mx-auto pt-20 w-full max-w-screen-2xl">
                <header className="mb-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 animate-fade-in">
                        👋 ¡Bienvenido, Usuario!
                    </h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Gestiona tus finanzas de manera inteligente
                    </p>
                </header>

                {/* Carousel mejorado */}
                <div className="relative mb-12 rounded-xl overflow-hidden group">
                    <div className="flex transition-transform duration-500 ease-out">
                        {images.map((image, index) => (
                            <div 
                                key={image.src}
                                className="w-full flex-shrink-0"
                                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                            >
                                <img 
                                    src={image.src} 
                                    alt={image.alt}
                                    loading="lazy"
                                    className="w-full h-[400px] md:h-[500px] object-cover object-center rounded-xl" 
                                />
                            </div>
                        ))}
                    </div>

                    {/* Controles de navegación con mejor accesibilidad */}
                    <button 
                        onClick={prevSlide}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-600/80 text-white p-3 rounded-full hover:bg-blue-800 transition-all opacity-0 group-hover:opacity-100"
                        aria-label="Diapositiva anterior"
                    >
                        ❮
                    </button>
                    <button 
                        onClick={nextSlide}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-600/80 text-white p-3 rounded-full hover:bg-blue-800 transition-all opacity-0 group-hover:opacity-100"
                        aria-label="Diapositiva siguiente"
                    >
                        ❯
                    </button>

                    {/* Indicadores de posición */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-600' : 'bg-white/60'}`}
                                onClick={() => setCurrentIndex(index)}
                                aria-label={`Ir a diapositiva ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Sección de contenido mejorada */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <section className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Accesos Rápidos
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            <QuickAccessButton 
                                text="Facturas" 
                                emoji="📄" 
                                color="blue" 
                                className="hover:-translate-y-1 transition-transform"
                            />
                            <QuickAccessButton 
                                text="Reportes" 
                                emoji="📊" 
                                color="blue"
                                className="hover:-translate-y-1 transition-transform"
                            />
                            <QuickAccessButton 
                                text="Configuración" 
                                emoji="⚙" 
                                color="blue"
                                className="hover:-translate-y-1 transition-transform"
                            />
                            <QuickAccessButton 
                                text="Notificaciones" 
                                emoji="🔔" 
                                color="blue"
                                className="hover:-translate-y-1 transition-transform"
                            />
                        </div>
                    </section>

                    <section className="bg-white shadow-lg rounded-xl p-6 md:col-span-2 hover:shadow-xl transition-shadow">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Últimas Notificaciones
                        </h2>
                        <ul className="space-y-3">
                            <NotificationItem 
                                emoji="📢" 
                                text="Pago de factura recibido." 
                                color="green"
                            />
                            <NotificationItem 
                                emoji="📈" 
                                text="Tus ingresos han aumentado un 15% este mes." 
                                color="blue"
                            />
                            <NotificationItem 
                                emoji="⚠" 
                                text="Tienes una factura pendiente de pago." 
                                color="red"
                            />
                        </ul>
                    </section>
                </div>
            </div>
        </>
    );
};

export default HomeView;