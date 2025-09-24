import { useState, useEffect, useRef } from "react";
import { FaInstagram, FaWhatsapp, FaYoutube, FaFacebook } from "react-icons/fa";

const links = [
    { href: "#inicio", label: "Inicio" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#historia", label: "Historia" },
    { href: "#aliados", label: "Aliados" },
    { href: "/registro", label: "Inscripción" },
    { href: "#contacto", label: "Contacto" },
]

export default function Footer() {
    // Ref for slide-in transition
    const ref = useRef(null);

    // State variables for content slide-in transition
    const [visible, setVisible] = useState(false);

    // Intersection observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setVisible(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );
            
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="footer" ref={ref}>
            <div className={`relative w-full border-t border-gray-200 ${ visible ? "slide-from-bottom" : "opacity-0" }`}>
                <div className="absolute inset-0 z-0 bg-gray-100"></div>
                
                <div className="relative z-10 p-8 md:px-12 md:py-5 mx-auto">
                    <div className="w-full flex flex-col lg:flex-row items-center justify-center py-2 md:py-4 mx-auto">             
                        {/* Logos */}
                        <div className="flex flex-col items-center md:items-start md:w-1/5 gap-8 md:gap-5">
                            <div className="flex items-center md:items-start gap-2">
                                <img src="/logo-original.png" alt="Academia Internacional de Música - Maestro José Calabrese" className="w-20 md:w-20 md:h-fit justify-center" />
                                <img src="/logo-fosc.png" alt="Fundación Orquesta Sinfónica de Carabobo" className="w-35 md:w-35 md:h-fit justify-center pl-2 border-l border-gray-300" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="w-full text-xs text-gray-800 text-center md:text-left"><b>Salón MZ-08, Hotel Hesperia WTC</b> <br /> Naguanagua, Carabobo</p>
                                <p className="w-full text-xs text-gray-800 text-center md:text-left"><b>Edificio 4, Piso 1, Universidad José Antonio Páez</b> <br /> San Diego, Carabobo</p>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="w-full lg:w-2/5 grid grid-cols-2 md:grid-cols-3 gap-4 mx-auto px-6 md:px-32 lg:px-0 py-12 md:py-0">
                            {links.map((link, index) => (
                                <a key={index} href={link.href} className="text-xs text-center font-montserrat text-gray-800 font-medium hover:underline transition-colors duration-200">{link.label}</a>
                            ))}
                        </div>

                        {/* Social media */}
                        <div className="w-full lg:w-1/5 md:pt-12 lg:pt-0">
                            <div className="flex flex-row items-center justify-center md:justify-end gap-4">
                                <a href="https://www.instagram.com/sinfocarabobo" aria-label="Instagram" className="flex w-10 h-10 bg-[#C19310] justify-center items-center rounded-full hover:opacity-70" target="_blank">
                                    <FaInstagram className="w-5 md:w-6 h-5 md:h-6 text-white hover:opacity-75 transition-opacity" />
                                </a>
                                <a href="https://api.whatsapp.com/send?phone=584143410642" aria-label="WhatsApp" className="flex w-10 h-10 bg-[#C19310] justify-center items-center rounded-full hover:opacity-70" target="_blank">
                                    <FaWhatsapp className="w-5 md:w-6 h-5 md:h-6 text-white hover:opacity-75 transition-opacity" />
                                </a>
                                <a href="https://www.facebook.com/sinfonicarabobo" aria-label="Facebook" className="flex w-10 h-10 bg-[#C19310] justify-center items-center rounded-full hover:opacity-70" target="_blank">
                                    <FaFacebook className="w-5 md:w-6 h-5 md:h-6 text-white hover:opacity-75 transition-opacity" />
                                </a>
                                <a href="https://youtube.com/channel/UCwrQQn62Z9-vfG-eU48SALA/OrquestaSinf%C3%B3nicadeCarabobo?si=zaowlU45_uCT1Da-" aria-label="Youtube" className="flex w-10 h-10 bg-[#C19310] justify-center items-center rounded-full hover:opacity-70" target="_blank">
                                    <FaYoutube className="w-5 md:w-6 h-5 md:h-6 text-white hover:opacity-75 transition-opacity" />
                                </a>
                            </div>
                        </div>
                    </div>
                
                    {/* Copyright */}
                    <div className="w-full text-xs text-gray-800 text-center px-0 pb-6 mt-8 md:mt-6">
                        Copyright © 2025 Fundación Orquesta Sinfónica de Carabobo. Todos los derechos reservados.
                    </div>
                </div>
            </div>
        </section>
    )
}