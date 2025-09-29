import { useRef, useState, useEffect } from "react";

// Gallery images array
const items = [
    { "image": "/gallery/coro0.JPG" },
    { "image": "/gallery/coro1.JPG" },
    { "image": "/gallery/coro2.JPG" },
    { "image": "/gallery/coro3.JPG" },
    { "image": "/gallery/coro4.JPG" },
    { "image": "/gallery/coro5.JPG" },
    { "image": "/gallery/coro6.JPG" },
    { "image": "/gallery/coro7.JPG" },
    { "image": "/gallery/coro8.JPG" },
    { "image": "/gallery/coro9.JPG" },
    { "image": "/gallery/coro10.JPG" },
    { "image": "/gallery/coro12.JPG" },
    { "image": "/gallery/coro13.JPG" },
    { "image": "/gallery/coro14.JPG" },
    { "image": "/gallery/coro16.JPG" },
    { "image": "/gallery/coro17.JPG" },
    { "image": "/gallery/coro19.JPG" },
    { "image": "/gallery/masterclass_violin1.JPG" },
    { "image": "/gallery/masterclass_violin2.JPG" },
    { "image": "/gallery/masterclass_violin3.JPG" },
    { "image": "/gallery/masterclass_violin4.JPG" },
    { "image": "/gallery/masterclass_violin7.JPG" },
    { "image": "/gallery/masterclass_violin8.JPG" },
    { "image": "/gallery/masterclass_violin9.JPG" },
    { "image": "/gallery/masterclass_violin10.JPG" },
    { "image": "/gallery/masterclass_violin11.JPG" },
    { "image": "/gallery/masterclass_violin12.JPG" },
    { "image": "/gallery/masterclass_violin13.JPG" },
    { "image": "/gallery/masterclass_violin14.JPG" },
    { "image": "/gallery/masterclass_violin15.JPG" },
    { "image": "/gallery/masterclass_violin16.JPG" },
    { "image": "/gallery/masterclass_violin17.JPG" },
    { "image": "/gallery/masterclass_violin18.JPG" },
    { "image": "/gallery/masterclass_violin19.JPG" },
    { "image": "/gallery/masterclass_violin20.JPG" },
    { "image": "/gallery/masterclass_violin21.JPG" },
    { "image": "/gallery/orquesta1.JPG" },
    { "image": "/gallery/orquesta2.JPG" },
    { "image": "/gallery/orquesta3.JPG" },
    { "image": "/gallery/orquesta4.JPG" },
    { "image": "/gallery/orquesta5.JPG" },
    { "image": "/gallery/orquesta6.JPG" },
    { "image": "/gallery/orquesta7.JPG" },
    { "image": "/gallery/orquesta8.JPG" },
    { "image": "/gallery/orquesta9.JPG" },
    { "image": "/gallery/orquesta10.JPG" },
    { "image": "/gallery/orquesta11.JPG" },
    { "image": "/gallery/orquesta12.JPG" },
    { "image": "/gallery/orquesta13.JPG" },
    { "image": "/gallery/orquesta14.JPG" },
    { "image": "/gallery/orquesta15.JPG" },
    { "image": "/gallery/orquesta16.JPG" },
    { "image": "/gallery/orquesta17.JPG" },
    { "image": "/gallery/orquesta18.JPG" },
    { "image": "/gallery/orquesta19.JPG" },
    { "image": "/gallery/orquesta20.JPG" },
    { "image": "/gallery/orquesta21.JPG" },
    { "image": "/gallery/orquesta22.JPG" },
    { "image": "/gallery/recital_agosto1.JPG" },
    { "image": "/gallery/recital_agosto2.JPG" },
    { "image": "/gallery/recital_agosto3.JPG" },
    { "image": "/gallery/recital_agosto4.JPG" },
    { "image": "/gallery/recital_agosto5.JPG" },
    { "image": "/gallery/recital_agosto6.JPG" },
    { "image": "/gallery/recital_agosto7.JPG" },
    { "image": "/gallery/recital_agosto8.JPG" },
    { "image": "/gallery/recital_agosto9.JPG" },
    { "image": "/gallery/recital_agosto10.JPG" },
    { "image": "/gallery/recital_agosto11.JPG" },
    { "image": "/gallery/recital_agosto12.JPG" },
    { "image": "/gallery/recitales_finales1.JPG" },
    { "image": "/gallery/recitales_finales2.JPG" },
    { "image": "/gallery/recitales_finales3.JPG" },
    { "image": "/gallery/recitales_finales4.JPG" },
    { "image": "/gallery/recitales_finales5.JPG" },
    { "image": "/gallery/recitales_finales6.JPG" },
    { "image": "/gallery/recitales_finales7.JPG" },
    { "image": "/gallery/recitales_finales8.JPG" },
    { "image": "/gallery/recitales_finales9.JPG" },
    { "image": "/gallery/recitales_finales10.JPG" },
    { "image": "/gallery/recitales_finales11.JPG" },
    { "image": "/gallery/recitales_finales12.JPG" },
    { "image": "/gallery/recitales_finales13.JPG" },
    { "image": "/gallery/recitales_finales14.JPG" },
    { "image": "/gallery/recitales_finales15.JPG" },
    { "image": "/gallery/recitales_finales16.JPG" },
    { "image": "/gallery/recitales_finales17.JPG" },
    { "image": "/gallery/recitales_finales18.JPG" },
    { "image": "/gallery/recitales_finales19.JPG" },
    { "image": "/gallery/recitales_octubre1.JPG" },
    { "image": "/gallery/recitales_octubre2.JPG" },
    { "image": "/gallery/recitales_octubre3.JPG" },
    { "image": "/gallery/recitales_octubre4.JPG" },
    { "image": "/gallery/recitales_octubre5.JPG" },
    { "image": "/gallery/recitales_octubre6.JPG" },
    { "image": "/gallery/recitales_octubre7.JPG" }, 
    { "image": "/gallery/recitales_octubre8.JPG" },
    { "image": "/gallery/recitales_octubre9.JPG" },
    { "image": "/gallery/recitales_octubre10.JPG" },
    { "image": "/gallery/recitales_octubre11.JPG" },
    { "image": "/gallery/recitales_octubre12.JPG" },
    { "image": "/gallery/recitales_octubre13.JPG" }
];

export default function Gallery() {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [visibleCards, setVisibleCards] = useState<boolean[]>(
        Array(items.length).fill(false)
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
        <section id="gallery" className="min-h-screen py-12 md:py-24">
            <div className="flex flex-col gap-6 md:gap-8">
                <div className="flex flex-col gap-1">
                    <hr className="w-[85%] md:w-[75%] border-2 border-[#F4B400] rounded-full mx-auto"/>
                    <hr className="w-[85%] md:w-[75%] border-2 border-[#7A1F1F] rounded-full mx-auto"/>
                    <hr className="w-[85%] md:w-[75%] border-2 border-[#F4B400] rounded-full mx-auto"/>
                </div>

                <div className="w-[85%] md:w-[75%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            data-index={index}
                            ref={(el: HTMLDivElement | null) => {
                                cardRefs.current[index] = el;
                            }}
                            className={`bg-white transition duration-500 transform cursor-pointer hover:-translate-y-2 hover:shadow-lg ${
                                visibleCards[index] ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            }`}
                        >
                            <div className="w-full h-70 group">
                                <img
                                    src={item.image}
                                    alt={index.toString()}
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 z-5 h-full bg-black opacity-25 group-hover:opacity-0 duration-300 pointer-events-none"></div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="flex flex-col gap-1">
                    <hr className="w-[85%] md:w-[75%] border-2 border-[#F4B400] rounded-full mx-auto"/>
                    <hr className="w-[85%] md:w-[75%] border-2 border-[#7A1F1F] rounded-full mx-auto"/>
                    <hr className="w-[85%] md:w-[75%] border-2 border-[#F4B400] rounded-full mx-auto"/>
                </div>
            </div>
        </section>
    );
}