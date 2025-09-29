import { useState, useEffect, useRef } from "react";

export default function History() {
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

    // ----------------------------------------------------------

    // Ref for slide-in transition
    const historyRef = useRef(null);

    // State variables for history slide-in transition
    const [historyVisible, setHistoryVisible] = useState(false);

    // Intersection observer
    useEffect(() => {
        const observer = new IntersectionObserver(
        ([entry]) => {
            setHistoryVisible(entry.isIntersecting);
        },
        { threshold: 0 }
        );
        
        if (historyRef.current) observer.observe(historyRef.current);
        return () => observer.disconnect();
    }, []);

    // ----------------------------------------------------------

    // Ref for slide-in transition
    const altGridRef = useRef(null);

    // State variables for secondary grid slide-in transition
    const [altGridVisible, setAltGridVisible] = useState(false);

    // Intersection observer
    useEffect(() => {
        const observer = new IntersectionObserver(
        ([entry]) => {
            setAltGridVisible(entry.isIntersecting);
        },
        { threshold: 0 }
        );
        
        if (altGridRef.current) observer.observe(altGridRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="flex flex-col w-full">
            <section ref={gridRef} className="relative w-full min-h-300 md:min-h-screen">
                <div className="absolute inset-0 z-0 w-full grid md:grid-cols-2">
                    <div className={`w-full grid grid-cols-3 gap-1 ${ gridVisible ? "slide-from-left" : "opacity-0" }`}>
                        {["grid1.JPG", "grid2.JPG", "grid3.JPG", "grid4.JPG", "grid5.JPG", "grid6.JPG", "grid7.JPG"].map((img, i) => (
                            <div key={i} className={`relative w-full h-full md:h-[33.3vh] ${img === "grid1.JPG" || img === "grid7.JPG" ? "col-span-2 " : ""}`}>
                                <img src={`/history/${img}`} alt="Academia Internacional de Música - Maestro José Calabrese" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black opacity-30 z-10 pointer-events-none"></div>
                            </div>
                        ))}
                    </div>

                    <div className={`flex w-full bg-gradient-to-b from-[#7A5C20] to-[#BFA75A] px-8 md:px-24 border-t-6 md:border-t-0 md:border-l-6 border-white items-center ${ gridVisible ? "slide-from-right" : "opacity-0" }`}>
                        <h2 className="text-5xl md:text-7xl font-montserrat text-white text-center md:text-right">El <b>semillero</b> de la <b>Orquesta Sinfónica de Carabobo</b></h2>
                    </div>
                </div>
            </section>

            <section id="historia" ref={historyRef} className="relative w-full min-h-110 md:min-h-screen py-24 md:py-40">
                <div className="absolute inset-0 z-0 w-full bg-gradient-to-b from-[#4B0C0C] to-[#7A1F1F] border-t-6 border-white"></div>
                    
                <div className={`relative inset-0 z-10 flex flex-col w-[85vw] gap-12 mx-auto ${ historyVisible ? "slide-from-bottom" : "opacity-0" }`}>
                    <div className="flex flex-col gap-10">
                        <h2 className="text-3xl md:text-5xl font-montserrat text-white font-bold text-center md:leading-[7vh]">Nuestra historia, <span className="text-[#BFA760]">nuestro legado</span></h2>
                        <div className="grid md:grid-cols-2 gap-4 md:gap-16 px-4 md:px-8 mx-auto">
                            <div className="flex flex-col gap-4">
                                <p className="md:text-xl font-montserrat text-white text-center md:text-justify">
                                    La <b>Academia Internacional de Música "Maestro José Calabrese"</b> nace un 7 de octubre de 2019. Fundada por el maestro <b>José Carmelo Calabrese</b>, esta academia tiene como objetivo la 
                                    formación musical y artística integral de los nuevos músicos del Estado Carabobo y Venezuela, creando así, las generaciones de relevo de la <b>Orquesta Sinfónica de Carabobo</b>.
                                </p>
                                <p className="md:text-xl font-montserrat text-white text-center md:text-justify">
                                    Esta institución lleva el nombre del Director Laureado de la <b>Orquesta Sinfónica de Carabobo</b>, maestro <b>José Calabrese</b> (padre). Actualmente cuenta con alianzas 
                                    estratégicas y académicas con organizaciones en países como Venezuela, Estados Unidos, Colombia y Brasil, además de tener el aval internacional de la UNESCO.
                                </p>
                            </div>
                            <div className="flex flex-col gap-5">
                                <p className="md:text-xl font-montserrat text-white text-center md:text-justify">
                                    La academia se sustenta en la experiencia de casi 50 años en la enseñanza y práctica de la música sinfónica de la <b>Fundación Orquesta Sinfónica de Carabobo</b>, en cuyo seno han complementado y desarrollado 
                                    su formación artística un importante número de músicos y agrupaciones con demostrado talento, algunos de los cuales en su papel de docentes artistas actualmente tienen la responsabilidad de formar a las nuevas 
                                    generaciones de músicos de la <b>OSC</b>, en el marco de nuestros programas.
                                </p>
                                <p className="text-2xl md:text-4xl font-montserrat text-white font-bold text-center md:text-right py-4 md:py-0 px-0 md:px-6 mt-4 md:mt-0 border-t-3 md:border-t-0 border-r-0 md:border-r-5 border-[#BFA760]">
                                    <i>Formando músicos profesionales</i>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section ref={altGridRef} className="relative w-full min-h-400 md:min-h-screen">
                <div className="absolute inset-0 z-0 grid md:grid-cols-2 w-full border-t-6 border-white">
                    <div className={`flex w-full bg-gradient-to-b from-[#7A5C20] to-[#BFA75A] px-10 md:px-24 items-center ${ altGridVisible ? "slide-from-left" : "opacity-0" }`}>
                        <div className="flex flex-col gap-8 py-16 md:py-0">
                            <h2 className="text-3xl md:text-5xl font-montserrat text-white font-bold text-center md:text-left">El maestro, <br /> José Calabrese</h2>
                            
                            <div className="flex flex-col gap-4 mx-auto">
                                <p className="font-montserrat text-white text-center md:text-left">
                                    El maestro <b>José Calabrese (Giuseppe Calabrese Di Stefano)</b>, nació en Italia (Módica-Sicilia), el 8 de febrero de 1948 y falleció en Caracas 
                                    el 21 de diciembre de 2018. Fue un Músico Multinstrumentista, Director de Orquesta, Compositor, Arreglista, Gerente Cultural y Educador, 
                                    nacionalizado como venezolano.
                                </p>
                                <p className="font-montserrat text-white text-center md:text-left">
                                    Llegó a Venezuela a la edad de 7 años, en el año 1955. A los 8 años inició sus estudios musicales en Valencia con el maestro italiano Ángelo 
                                    Inglese, posteriormente estudió en el <b>Conservatorio de Música del Estado Aragua</b> y en <b>Berklee College of Music</b> en la ciudad de Boston de Estados 
                                    Unidos, donde recibió clases de composición, arreglos, saxofón con profesores como Joseph Viola y John La Porta.
                                </p>
                                <p className="font-montserrat text-white text-center md:text-left">
                                    En Venezuela se resaltan sus estudios de Dirección Orquestal con el Maestro Gonzalo Castellanos. Fundó el <b>Conservatorio de Música de Carabobo </b> 
                                    y la <b> Fundación Orquesta Sinfónica de Carabobo</b>, además de ser <b>Director Artístico y Musical de la Orquesta Sinfónica de Carabobo por un 
                                    período de 33 años ininterrumpidos</b>. Desde el 2019 recibió conciertos homenajes en diferentes países como Venezuela, Argentina, Colombia y Brasil.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className={`relative w-full h-100 md:h-full border-t-6 md:border-t-0 md:border-l-6 border-white ${ altGridVisible ? "slide-from-right" : "opacity-0" }`}>
                        <div className="grid grid-cols-2 gap-1">
                            <div className="flex flex-col gap-1">
                                <div className="relative">
                                    <img src="/history/image2.jpg" alt="Maestro José Calabrese" className="w-full md:h-[60.5vh] object-cover" />
                                    <div className="absolute inset-0 bg-black/40"></div>
                                </div>
                                <div className="relative">
                                    <img src="/history/image4.jpg" alt="Maestro José Calabrese" className="w-full h-50 md:h-[39.5vh] object-cover" />
                                    <div className="absolute inset-0 bg-black/40"></div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="relative">
                                    <img src="/history/image1.jpg" alt="Maestro José Calabrese" className="w-full md:h-[30vh] object-cover" />
                                    <div className="absolute inset-0 bg-black/40"></div>
                                </div>
                                <div className="relative">
                                    <img src="/history/image3.jpg" alt="Maestro José Calabrese" className="w-full md:h-[30vh] object-cover" />
                                    <div className="absolute inset-0 bg-black/40"></div>
                                </div>
                                <div className="relative">
                                    <img src="/history/image5.jpg" alt="Maestro José Calabrese" className="w-full h-40 md:h-[40vh] object-cover" />
                                    <div className="absolute inset-0 bg-black/40"></div>
                                </div>
                            </div>         
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}