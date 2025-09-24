import { useState, useEffect, useRef } from "react";
import Counter from "../components/ui/counter";

export default function AboutUs() {
    // Ref for slide-in transition
    const ref = useRef(null);

    // State variables for content slide-in transition
    const [sectionVisible, setSectionVisible] = useState(false);

    // Intersection observer
    useEffect(() => {
        const observer = new IntersectionObserver(
        ([entry]) => {
            setSectionVisible(entry.isIntersecting);
        },
        { threshold: 0.1 }
        );
        
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    // ----------------------------------------------------------------

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
        { threshold: 0.1 }
        );
        
        if (gridRef.current) observer.observe(gridRef.current);
        return () => observer.disconnect();
    }, []);

    // ----------------------------------------------------------------

    // Ref for slide-in transition
    const valuesRef = useRef(null);

    // State variables for values slide-in transition
    const [valuesVisible, setValuesVisible] = useState(false);

    // Intersection observer
    useEffect(() => {
        const observer = new IntersectionObserver(
        ([entry]) => {
            setValuesVisible(entry.isIntersecting);
        },
        { threshold: 0.2 }
        );
        
        if (valuesRef.current) observer.observe(valuesRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="nosotros" ref={ref} className="flex flex-col w-full">
            <section className="relative w-full min-h-110 md:min-h-screen py-24 md:py-36">
                <div className="absolute inset-0 z-0 w-full bg-gradient-to-b from-[#4B0C0C] to-[#7A1F1F] border-y-6 border-white"></div>

                <div className={`relative inset-0 z-10 flex flex-col w-[85vw] gap-8 mx-auto ${ sectionVisible ? "slide-from-bottom" : "opacity-0"}`}>
                    <div className="flex flex-col gap-4">
                        <h2 className="text-4xl md:text-5xl font-montserrat text-white font-bold text-center">Nuestra trayectoria</h2>
                        <p className="text-lg md:text-xl font-montserrat text-white font-light text-center"><i>Un legado de cultura, tradición y pasión por la música sinfónica</i></p>
                    </div>

                    <div className="grid md:grid-cols-3 items-center justify-center gap-y-8">
                        <div className="flex flex-col items-center bg-transparent gap-2 md:gap-4">
                            <img src="/about/image1.png" alt="Academia Internacional de Música - Maestro José Calabrese" className="w-35 md:w-60 h-35 md:h-60 object-cover" />
                            <div className="flex flex-col justify-center items-center md:gap-1">
                                <span className="text-4xl md:text-5xl font-montserrat text-white font-bold"><Counter target={300} suffix="+" visible={sectionVisible} /></span>
                                <p className="text-xl md:text-2xl font-montserrat text-white font-normal">Estudiantes</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center bg-transparent gap-2 md:gap-4">
                            <img src="/about/image2.png" alt="Academia Internacional de Música - Maestro José Calabrese" className="w-35 md:w-60 h-35 md:h-60 object-cover" />
                            <div className="flex flex-col justify-center items-center md:gap-1">
                                <span className="text-4xl md:text-5xl font-montserrat text-white font-bold"><Counter target={30} suffix="+" visible={sectionVisible} /></span>
                                <p className="text-xl md:text-2xl font-montserrat text-white font-normal">Cátedras</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center bg-transparent gap-2 md:gap-4">
                            <img src="/about/image3.png" alt="Academia Internacional de Música - Maestro José Calabrese" className="w-35 md:w-60 h-35 md:h-60 object-cover" />
                            <div className="flex flex-col justify-center items-center md:gap-1">
                                <span className="text-4xl md:text-5xl font-montserrat text-white font-bold"><Counter target={49} suffix="+" visible={sectionVisible} /></span>
                                <p className="text-xl md:text-2xl font-montserrat text-white font-normal">Años de historia</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section ref={gridRef} className="relative w-full min-h-300 md:min-h-screen">
                <div className="absolute inset-0 z-0 w-full grid md:grid-cols-2">
                    <div className={`flex w-full bg-gradient-to-b from-[#7A5C20] to-[#BFA75A] px-12 md:px-28 border-b-6 md:border-b-0 md:border-r-6 border-white items-center ${ gridVisible ? "slide-from-left" : "opacity-0" }`}>
                        <h2 className="text-5xl md:text-7xl font-montserrat text-white text-center md:text-left">El <b>hogar</b> de los <b>músicos</b> del <b>mañana</b></h2>
                    </div>

                    <div className={`w-full grid grid-cols-3 gap-1 ${ gridVisible ? "slide-from-right" : "opacity-0" }`}>
                        {["grid1.JPG", "grid2.JPG", "grid3.JPG", "grid7.JPG", "grid4.JPG", "grid6.JPG", "grid5.JPG"].map((img, i) => (
                            <div key={i} className={`relative w-full h-full md:h-[33.3vh] ${img === "grid1.JPG" || img === "grid5.JPG" ? "col-span-2" : ""}`}>
                                <img src={`/about/${img}`} alt="Academia Internacional de Música - Maestro José Calabrese" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black opacity-30 z-10 pointer-events-none"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section ref={valuesRef} className="relative w-full min-h-110 md:min-h-screen py-24 md:py-42">
                <div className="absolute inset-0 z-0 w-full bg-gradient-to-b from-[#4B0C0C] to-[#7A1F1F] border-y-6 border-white"></div>
                    
                <div className={`relative inset-0 z-10 flex flex-col w-[85vw] gap-12 mx-auto ${ valuesVisible ? "slide-from-bottom" : "opacity-0" }`}>
                    <div className="flex flex-col gap-8">
                        <h2 className="text-4xl md:text-5xl font-montserrat text-white font-bold text-center">Nuestra misión</h2>
                        <p className="md:text-xl font-montserrat text-white font-light text-center">
                            Ejecutar una propuesta educativa integral en el campo de la formación musical dentro de la OSC, que contemple los niveles inicial, medio y avanzado, 
                            impartida con altos niveles de calidad y creatividad dentro de un clima de enseñanza-aprendizaje que permita potenciar de manera gradual las actitudes 
                            y aptitudes de niños(as) y adolescentes ante la música y su ejecución instrumental, con vistas a prepararlos para su incorporación a los estudios del 
                            nivel profesional o universitario.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 md:gap-18">
                        <div className="w-full p-6 border-4 border-[#BFA760] rounded-3xl hover:scale-110 duration-400">
                            <p className="font-montserrat text-white font-medium text-center">Formar a niños(as) para ser los futuros miembros de la OSC, desde un enfoque de la educación musical integral que enfatiza la iniciación en la práctica instrumental individual y grupal desde edades muy tempranas.</p>
                        </div>
                        <div className="w-full p-6 border-4 border-[#BFA760] rounded-3xl hover:scale-110 duration-400">
                            <p className="font-montserrat text-white font-medium text-center">Proporcionar a los miembros de la Academia, la oportunidad de descubrir sus capacidades interpretativas en una formación orquestal, permitiéndoles desarrollarse como músicos profesionales potencialmente exitosos.</p>
                        </div>
                        <div className="w-full p-6 border-4 border-[#BFA760] rounded-3xl hover:scale-110 duration-400">
                            <p className="font-montserrat text-white font-medium text-center">Desarrollar un programa educativo musical que contemple contenidos complementarios y en valores que contribuyan a la formación integral de los niños, niñas y adolescentes participantes.</p>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}