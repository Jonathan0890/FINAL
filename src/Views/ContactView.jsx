import React from 'react';
import ContactForm from '../components/ContactForm';
import Navbar from '../Components/Navbar';

const ContactView = () => {
    return (<>
    <Navbar/>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl mx-auto pt-8">
                <div className="bg-white shadow-2xl rounded-2xl p-8">
                    <h2 className="text-4xl font-bold text-navy-blue mb-4">Contacto</h2>
                    <p className="text-gray-600 mb-6 text-lg">
                        ¿Tienes alguna pregunta, sugerencia o comentario? ¡Nos encantaría escucharte!
                    </p>
                    <ContactForm />
                </div>

                <div className="space-y-8">
                    <div className="bg-white shadow-2xl rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-navy-blue mb-4">Información de Contacto</h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-600">
                                    <i className="fas fa-map-marker-alt text-light-blue text-xl"></i>
                                </span>
                                <p className="text-gray-600">Av. Principal #123, Col. Centro, Ciudad de México</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-600">
                                    <i className="fas fa-phone-alt text-light-blue text-xl"></i>
                                </span>
                                <p className="text-gray-600">+52 55 1234 5678</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-600">
                                    <i className="fas fa-envelope text-light-blue text-xl"></i>
                                </span>
                                <p className="text-gray-600">contacto@empresa.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="shadow-2xl rounded-2xl overflow-hidden">
                        <iframe
                            className="w-full h-full min-h-[400px] rounded-2xl"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59527.03655502408!2d-86.86796799999999!3d21.174681599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f4c2c90ff53da9b%3A0x83bfdad03ecf1fa5!2sMi%20Plaza%20H%C3%A9roes!5e0!3m2!1ses-419!2smx!4v1740416431325!5m2!1ses-419!2smx"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
};

export default ContactView;