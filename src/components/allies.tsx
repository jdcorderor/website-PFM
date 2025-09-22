import { useState, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";

SwiperCore.use([Autoplay]);

export default function Allies() {
    // Allies groups
    const group1 = [
        { src: "/allies/national/logo1.png", label: "UNESCO" },
        { src: "/allies/national/logo2.png", label: "Hotel Hesperia - WTC Valencia" },
        { src: "/allies/national/logo3.png", label: "Universidad José Antonio Páez" },
        { src: "/allies/national/logo8.png", label: "Orquesta Sinfónica de Carabobo" },
        { src: "/allies/national/logo5.png", label: "Conservatorio Vicente Emilio Sojo" },
    ]

    const group2 = [
        { src: "/allies/national/logo4.png", label: "CLX Group" },
        { src: "/allies/national/logo6.png", label: "Alcaldía de San Diego" },
        { src: "/allies/national/logo7.png", label: "Multimax Store" },
        { src: "/allies/national/logo11.jpg", label: "YMCA - Unidad Educativa Don Teodoro Gubaira" },
        { src: "/allies/international/logo1.png", label: "MovSinfo" },
        { src: "/allies/international/logo3.png", label: "Maestrocastro" },
    ]

    const group3 = [
        { src: "/allies/international/logo2.jpg", label: "Corporación Rafael Pombo" },
        { src: "/allies/international/logo4.png", label: "International Music Foundation - Samuel Vargas" },
        { src: "/allies/international/logo5.png", label: "Movimiento Directores Modernos - Maestro José Carmelo Calabrese" },
        { src: "/allies/national/logo12.png", label: "Unidad Educativa Colegio Santa Rosa" },
        { src: "/allies/national/logo9.png", label: "Universidad Yacambú" },
        { src: "/allies/national/logo10.png", label: "AK Producciones" },
    ]

    // -----------------------------------------------

    // Ref for slide-in transition
    const ref = useRef(null);

    // State variables for content slide-in transition
    const [firstVisible, setFirstVisible] = useState(false);
    const [secondVisible, setSecondVisible] = useState(false);
    const [thirdVisible, setThirdVisible] = useState(false);

    // Intersection observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => { setFirstVisible(true); }, 750);
                    setTimeout(() => { setSecondVisible(true); }, 1500);
                    setTimeout(() => { setThirdVisible(true); }, 2250);
                } else {
                    setFirstVisible(false);
                    setSecondVisible(false);
                    setThirdVisible(false);
                }
            },
            { threshold: 0 }
        );
        
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    // -----------------------------------------------

    // Ref for slide-in transition
    const gridRef = useRef(null);

    // State variables for grid slide-in transition
    const [gridVisible, setGridVisible] = useState(false);

    // Intersection observer
    useEffect(() => {
        const observer = new IntersectionObserver(
        ([entry]) => {
            setGridVisible(entry.isIntersecting);
        },
        { threshold: 0 }
        );
        
        if (gridRef.current) observer.observe(gridRef.current);
        return () => observer.disconnect();
    }, []);

    // -----------------------------------------------

    // State variables for form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    // Message submission handler
    const handleSubmit = () => {
        const encodedMessage = encodeURIComponent(
            `¡Hola, Fundación SinfoCarabobo!\n` +
            `Mi nombre es ${name}\n` +
            `${message}\n\n` +
            `Si requieren contactarme, mi dirección de correo electrónico es: ${email}\n` +
            `¡Saludos cordiales!`
          );
        window.open(`https://api.whatsapp.com/send?phone=584143410642&text=${encodedMessage}`, "_blank", "noopener,noreferrer");
    };
      
    return (
        <section className="flex flex-col w-full">
            <section id="aliados" ref={ref} className="relative w-full min-h-110 md:min-h-screen md:py-32">
                <div className="absolute inset-0 z-0 w-full bg-gradient-to-b from-[#4B0C0C] to-[#7A1F1F] border-t-6 border-white"></div>
                    
                <div className="relative inset-0 z-10 flex flex-col w-[85vw] gap-12 mx-auto">
                    <div className="flex flex-col gap-10">
                        <h2 className={`md:text-5xl font-montserrat text-white font-bold text-center ${ firstVisible ? "slide-from-bottom" : "opacity-0" }`}>Nuestros aliados</h2>
                        
                        <div className="flex flex-col md:w-[75%] gap-6 mx-auto">
                            <div className={`w-full mx-auto ${ firstVisible ? "slide-from-bottom" : "opacity-0" }`}>
                                <Swiper loop={true} autoplay={{ delay: 3000 }} breakpoints={{ 480: { slidesPerView: 1, spaceBetween: 15 }, 768: { slidesPerView: 1, spaceBetween: 20 }, 1024: { slidesPerView: 4, spaceBetween: 24 }, 1280: { slidesPerView: 4, spaceBetween: 24 } }} className="w-full">
                                    {group1.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="flex bg-white items-center h-30 py-2 border-4 border-[#BFA760] rounded-xl">
                                                <img src={item.src} alt={item.label} className="w-full h-full object-contain mx-auto" />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>

                            <div className={`w-full mx-auto ${ secondVisible ? "slide-from-bottom" : "opacity-0" }`}>
                                <Swiper loop={true} autoplay={{ delay: 3000 }} breakpoints={{ 480: { slidesPerView: 1, spaceBetween: 15 }, 768: { slidesPerView: 1, spaceBetween: 20 }, 1024: { slidesPerView: 4, spaceBetween: 24 }, 1280: { slidesPerView: 4, spaceBetween: 24 } }} className="w-full">
                                    {group2.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="flex bg-white items-center h-30 p-6 border-4 border-[#BFA760] rounded-xl">
                                                <img src={item.src} alt={item.label} className="w-full h-full object-contain mx-auto" />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>

                            <div className={`w-full mx-auto ${ thirdVisible ? "slide-from-bottom" : "opacity-0" }`}>
                                <Swiper loop={true} autoplay={{ delay: 3000 }} breakpoints={{ 480: { slidesPerView: 1, spaceBetween: 15 }, 768: { slidesPerView: 1, spaceBetween: 20 }, 1024: { slidesPerView: 4, spaceBetween: 24 }, 1280: { slidesPerView: 4, spaceBetween: 24 } }} className="w-full">
                                    {group3.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="flex bg-white items-center h-30 py-3 border-4 border-[#BFA760] rounded-xl">
                                                <img src={item.src} alt={item.label} className="w-full h-full object-contain mx-auto" />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section ref={gridRef} className="relative w-full md:min-h-screen border-y-6 border-white">
                <div className="absolute inset-0 z-0 w-full grid md:grid-cols-2">
                    <div className={`flex flex-col w-full bg-gradient-to-b from-[#7A5C20] to-[#BFA75A] gap-12 px-24 items-start justify-center ${ gridVisible ? "slide-from-left" : "opacity-0" }`}>
                        <h2 className="md:text-7xl font-montserrat text-white text-left"><b>¿Quieres formar parte del programa?</b></h2>
                        <a href="/registro" className="flex w-fit items-start justify-start bg-[#7A5C20] hover:bg-[#7A5C20]/80 gap-1 px-12 py-[1vh] rounded-full md:text-2xl font-montserrat text-white font-medium duration-300 cursor-pointer">Inscríbete ya<ChevronRight className="w-8 h-8"></ChevronRight></a>
                    </div> 
                    
                    <div id="contacto" className={`flex w-full bg-gradient-to-b from-[#4B0C0C] to-[#7A1F1F] border-l-6 border-white items-center justify-center ${ gridVisible ? "slide-from-right" : "opacity-0" }`}>
                        <div className="flex flex-col w-[60%] bg-white/10 backdrop-blur-md rounded-xl shadow-lg gap-8 px-10 py-6">
                            <h2 className="md:text-5xl font-montserrat text-white font-bold text-right pt-4 pb-6 border-b border-white/20">¿Quieres contactarnos?</h2>
                            
                            <form onSubmit={ handleSubmit } className="w-full max-w-xl mx-auto text-sm font-montserrat text-gray-200 tracking-wide space-y-4">
                                <div className="relative">
                                    <input id="nombre" name="nombre" type="text" placeholder=" " className="peer w-full px-4 pt-6 pb-1 rounded-md bg-white/20 text-white placeholder-transparent border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C19310] transition duration-300" value={name} onChange={(e) => setName(e.target.value)} required/>
                                    <label htmlFor="nombre" className="absolute left-4 top-2 text-xs text-white font-semibold transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-300 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#C19310]">
                                        Nombre completo
                                    </label>
                                </div>

                                <div className="relative">
                                    <input id="email" type="email" placeholder=" " className="peer w-full px-4 pt-6 pb-1 rounded-md bg-white/20 text-white placeholder-transparent border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C19310] transition duration-300" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                    <label htmlFor="email" className="absolute left-4 top-2 text-sm text-white font-semibold transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-300 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#C19310]">
                                        Correo electrónico
                                    </label>
                                </div>

                                <div className="relative">
                                    <textarea id="motivo" placeholder=" " rows={6} className="peer w-full px-4 pt-6 pb-1 rounded-md bg-white/20 text-white placeholder-transparent border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C19310] transition duration-300 resize-none" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                                    <label htmlFor="motivo" className="absolute left-4 top-2 text-sm text-white font-semibold transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-300 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#C19310]">
                                        Motivo
                                    </label>
                                </div>

                                <button type="submit" className="flex items-center justify-center bg-[#C19310] hover:bg-[#a57f0d] px-6 py-1 rounded-full text-white font-medium tracking-wide transition-all duration-300 shadow-md hover:shadow-lg mx-auto">
                                    Enviar
                                </button>
                            </form>
                        </div>
                    </div>                    
                </div>
            </section>
        </section>
    )
}