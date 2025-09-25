import { useRef, useState, useEffect } from "react";

export default function Gallery() {
    const galleryItems = [
        { title: "Momento de creación", description: "Donde nace la armonía", image: "/gallery/coro0.JPG" },
        { title: "Instante compartido", description: "La música nos une", image: "/gallery/coro1.JPG" },
        { title: "Diálogo silencioso", description: "Comunicación sin palabras", image: "/gallery/coro2.JPG" },
        { title: "Expresión genuina", description: "Emoción en estado puro", image: "/gallery/coro3.JPG" },
        { title: "Tiempo detenido", description: "Cuando el arte vive", image: "/gallery/coro4.JPG" },
        { title: "Sincronía perfecta", description: "Todos en un mismo ritmo", image: "/gallery/coro5.JPG" },
        { title: "Concentración plena", description: "Enfoque que inspira", image: "/gallery/coro6.JPG" },
        { title: "Equilibrio natural", description: "Belleza en armonía", image: "/gallery/coro7.JPG" },
        { title: "Conexión verdadera", description: "Más allá del sonido", image: "/gallery/coro8.JPG" },
        { title: "Energía creativa", description: "Fuerza que transforma", image: "/gallery/coro9.JPG" },
        { title: "Dedicación absoluta", description: "Entrega completa", image: "/gallery/coro10.JPG" },
        { title: "Atención al detalle", description: "Perfección en lo pequeño", image: "/gallery/coro12.JPG" },
        { title: "Guía y dirección", description: "Caminos que se iluminan", image: "/gallery/coro13.JPG" },
        { title: "Comunidad artística", description: "Juntos crecemos", image: "/gallery/coro14.JPG" },
        { title: "Intensidad emotiva", description: "Sentimiento que fluye", image: "/gallery/coro16.JPG" },
        { title: "Unidad en diversidad", description: "Distintos, pero unidos", image: "/gallery/coro17.JPG" },
        { title: "Pasión que contagia", description: "Entusiasmo compartido", image: "/gallery/coro19.JPG" },
        { title: "Aprendizaje mutuo", description: "Todos enseñamos, todos aprendemos", image: "/gallery/masterclass_violin1.JPG" },
        { title: "Técnica y alma", description: "Precisión con corazón", image: "/gallery/masterclass_violin2.JPG" },
        { title: "Transferencia de conocimiento", description: "Sabiduría que se comparte", image: "/gallery/masterclass_violin3.JPG" },
        { title: "Crecimiento personal", description: "Superando límites", image: "/gallery/masterclass_violin4.JPG" },
        { title: "Excelencia en proceso", description: "Camino a la maestría", image: "/gallery/masterclass_violin7.JPG" },
        { title: "Práctica consciente", description: "Cada movimiento cuenta", image: "/gallery/masterclass_violin8.JPG" },
        { title: "Arte en desarrollo", description: "Potencial en acción", image: "/gallery/masterclass_violin9.JPG" },
        { title: "Precisión y expresión", description: "Balance perfecto", image: "/gallery/masterclass_violin10.JPG" },
        { title: "Evolución constante", description: "Siempre mejorando", image: "/gallery/masterclass_violin11.JPG" },
        { title: "Atención personalizada", description: "Crecimiento individual", image: "/gallery/masterclass_violin12.JPG" },
        { title: "Momento de insight", description: "Cuando todo clickea", image: "/gallery/masterclass_violin13.JPG" },
        { title: "Formación integral", description: "Desarrollo completo", image: "/gallery/masterclass_violin14.JPG" },
        { title: "Detalle que marca", description: "Pequeños grandes cambios", image: "/gallery/masterclass_violin15.JPG" },
        { title: "Proceso continuo", description: "El viaje nunca termina", image: "/gallery/masterclass_violin16.JPG" },
        { title: "Arte y técnica", description: "Dos caras de una moneda", image: "/gallery/masterclass_violin17.JPG" },
        { title: "Perfeccionamiento", description: "Buscando la excelencia", image: "/gallery/masterclass_violin18.JPG" },
        { title: "Transformación", description: "Cambio que enriquece", image: "/gallery/masterclass_violin19.JPG" },
        { title: "Inspiración activa", description: "Creando motivación", image: "/gallery/masterclass_violin20.JPG" },
        { title: "Trayectoria única", description: "Cada camino es especial", image: "/gallery/masterclass_violin21.JPG" },
        { title: "Fuerza colectiva", description: "Poder del grupo", image: "/gallery/orquesta1.JPG" },
        { title: "Coordinación perfecta", description: "Todos en sintonía", image: "/gallery/orquesta2.JPG" },
        { title: "Armonía grupal", description: "Un solo instrumento", image: "/gallery/orquesta3.JPG" },
        { title: "Preparación minuciosa", description: "Detalles que importan", image: "/gallery/orquesta4.JPG" },
        { title: "Sinergia creativa", description: "Juntos somos más", image: "/gallery/orquesta5.JPG" },
        { title: "Intensidad grupal", description: "Energía multiplicada", image: "/gallery/orquesta6.JPG" },
        { title: "Liderazgo inspirador", description: "Guiando con ejemplo", image: "/gallery/orquesta7.JPG" },
        { title: "Integración total", description: "Partes que se funden", image: "/gallery/orquesta8.JPG" },
        { title: "Compromiso conjunto", description: "Responsabilidad compartida", image: "/gallery/orquesta9.JPG" },
        { title: "Vibración compartida", description: "Frecuencias que unen", image: "/gallery/orquesta10.JPG" },
        { title: "Enfoque colectivo", description: "Mente grupal activa", image: "/gallery/orquesta11.JPG" },
        { title: "Unidad sonora", description: "Voces que se funden", image: "/gallery/orquesta12.JPG" },
        { title: "Calidad grupal", description: "Excelencia compartida", image: "/gallery/orquesta13.JPG" },
        { title: "Conjunto integrado", description: "Todo en su lugar", image: "/gallery/orquesta14.JPG" },
        { title: "Magia colectiva", description: "Alquimia grupal", image: "/gallery/orquesta15.JPG" },
        { title: "Desarrollo grupal", description: "Creciendo juntos", image: "/gallery/orquesta16.JPG" },
        { title: "Comunidad sonora", description: "Familia musical", image: "/gallery/orquesta17.JPG" },
        { title: "Expresión grupal", description: "Emoción compartida", image: "/gallery/orquesta18.JPG" },
        { title: "Preparación intensa", description: "Momento crucial", image: "/gallery/orquesta19.JPG" },
        { title: "Compromiso total", description: "Entrega sin reservas", image: "/gallery/orquesta20.JPG" },
        { title: "Balance perfecto", description: "Equilibrio alcanzado", image: "/gallery/orquesta21.JPG" },
        { title: "Colaboración activa", description: "Trabajo en equipo", image: "/gallery/orquesta22.JPG" },
        { title: "Momento culminante", description: "Clímax artístico", image: "/gallery/recital_agosto1.JPG" },
        { title: "Presentación especial", description: "Talento en escena", image: "/gallery/recital_agosto2.JPG" },
        { title: "Expresión escénica", description: "Arte en vivo", image: "/gallery/recital_agosto3.JPG" },
        { title: "Talento revelado", description: "Potencial realizado", image: "/gallery/recital_agosto4.JPG" },
        { title: "Showcase estudiantil", description: "Futuros prometedores", image: "/gallery/recital_agosto5.JPG" },
        { title: "Demostración artística", description: "Habilidades en acción", image: "/gallery/recital_agosto6.JPG" },
        { title: "Interpretación viva", description: "Música en presente", image: "/gallery/recital_agosto7.JPG" },
        { title: "Emoción escénica", description: "Vulnerabilidad y fuerza", image: "/gallery/recital_agosto8.JPG" },
        { title: "Actuación memorable", description: "Instantes que perduran", image: "/gallery/recital_agosto9.JPG" },
        { title: "Brillo artístico", description: "Talento que deslumbra", image: "/gallery/recital_agosto10.JPG" },
        { title: "Compartir público", description: "Regalo musical", image: "/gallery/recital_agosto11.JPG" },
        { title: "Triunfo personal", description: "Meta alcanzada", image: "/gallery/recital_agosto12.JPG" },
        { title: "Culminación", description: "Viaje completado", image: "/gallery/recitales_finales1.JPG" },
        { title: "Logro artístico", description: "Sueño realizado", image: "/gallery/recitales_finales2.JPG" },
        { title: "Graduación musical", description: "Nuevo comienzo", image: "/gallery/recitales_finales3.JPG" },
        { title: "Reconocimiento merecido", description: "Esfuerzo premiado", image: "/gallery/recitales_finales4.JPG" },
        { title: "Final de etapa", description: "Capítulo que cierra", image: "/gallery/recitales_finales5.JPG" },
        { title: "Celebración artística", description: "Fiesta del talento", image: "/gallery/recitales_finales6.JPG" },
        { title: "Premio al esfuerzo", description: "Dedicación recompensada", image: "/gallery/recitales_finales7.JPG" },
        { title: "Orgullo compartido", description: "Logro colectivo", image: "/gallery/recitales_finales8.JPG" },
        { title: "Ceremonia musical", description: "Rito de paso", image: "/gallery/recitales_finales9.JPG" },
        { title: "Victoria final", description: "Éxito conseguido", image: "/gallery/recitales_finales10.JPG" },
        { title: "Logro grupal", description: "Triunfo compartido", image: "/gallery/recitales_finales11.JPG" },
        { title: "Festejo merecido", description: "Alegría conquistada", image: "/gallery/recitales_finales12.JPG" },
        { title: "Reconocimiento público", description: "Talento validado", image: "/gallery/recitales_finales13.JPG" },
        { title: "Emoción culminante", description: "Sentimiento puro", image: "/gallery/recitales_finales14.JPG" },
        { title: "Cierre de ciclo", description: "Final y comienzo", image: "/gallery/recitales_finales15.JPG" },
        { title: "Legado musical", description: "Conocimiento transmitido", image: "/gallery/recitales_finales16.JPG" },
        { title: "Futuro asegurado", description: "Semillas plantadas", image: "/gallery/recitales_finales17.JPG" },
        { title: "Continuidad artística", description: "Cadena dorada", image: "/gallery/recitales_finales18.JPG" },
        { title: "Tradición viva", description: "Herencia activa", image: "/gallery/recitales_finales19.JPG" },
        { title: "Progreso visible", description: "Avance demostrado", image: "/gallery/recitales_octubre1.JPG" },
        { title: "Evolución palpable", description: "Cambio evidente", image: "/gallery/recitales_octubre2.JPG" },
        { title: "Mejora continua", description: "Proceso en marcha", image: "/gallery/recitales_octubre3.JPG" },
        { title: "Desarrollo evidente", description: "Crecimiento visible", image: "/gallery/recitales_octubre4.JPG" },
        { title: "Promesas cumplidas", description: "Potencial materializado", image: "/gallery/recitales_octubre5.JPG" },
        { title: "Artistas emergentes", description: "Futuros valores", image: "/gallery/recitales_octubre6.JPG" },
        { title: "Preparación intermedia", description: "Camino recorrido", image: "/gallery/recitales_octubre7.JPG" },
        { title: "Evaluación positiva", description: "Progreso confirmado", image: "/gallery/recitales_octubre8.JPG" },
        { title: "Proyección exitosa", description: "Rumbo correcto", image: "/gallery/recitales_octubre9.JPG" },
        { title: "Trayectoria clara", description: "Dirección definida", image: "/gallery/recitales_octubre10.JPG" },
        { title: "Avance notable", description: "Mejora significativa", image: "/gallery/recitales_octubre11.JPG" },
        { title: "Proceso constante", description: "Evolución permanente", image: "/gallery/recitales_octubre12.JPG" },
        { title: "Futuro brillante", description: "Horizonte prometedor", image: "/gallery/recitales_octubre13.JPG" }
    ];

    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [visibleCards, setVisibleCards] = useState<boolean[]>(
        Array(galleryItems.length).fill(false)
    );

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const idx = Number(entry.target.getAttribute("data-index"));
                    if (entry.isIntersecting) {
                        setVisibleCards((prev) => {
                            const newArr = [...prev];
                            newArr[idx] = true;
                            return newArr;
                        });
                    } else {
                        setVisibleCards((prev) => {
                            const newArr = [...prev];
                            newArr[idx] = false;
                            return newArr;
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section id="gallery" className="p-6">
            <h2 className="text-3xl font-montserrat mb-6 text-center">Galería</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {galleryItems.map((item, index) => (
                    <div
                        key={index}
                        data-index={index}
                        ref={(el: HTMLDivElement | null) => {
                            cardRefs.current[index] = el;
                        }}
                        className={`bg-white rounded-lg shadow-md overflow-hidden transition duration-500 transform cursor-pointer hover:-translate-y-2 hover:shadow-lg ${
                            visibleCards[index] ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                        }`}
                    >
                        <div className="w-full aspect-[3/2] relative">
                            <img
                                src={item.image}
                                alt={item.title}
                                loading="lazy"
                                width="3456"
                                height="2304"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-montserrat mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm font-montserrat">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}