export const ImageContainer = ({ src, alt }: { src: string; alt: string }) => {
    return (
        <div
            className={`bg-white transition duration-500 transform cursor-pointer hover:-translate-y-2 hover:shadow-lg`}
        >
            <div className="w-full h-70 group">
                <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover" />
                <div className="z-5 h-fit bg-black opacity-25 group-hover:opacity-0 duration-300 pointer-events-none"></div>
            </div>
        </div>
    );
};

export const ImageGroup = ({ images }: { images: { src: string; alt: string }[] }) => {
    return (
        <div className="w-[100%] md:w-[100%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto">
            {images.map((image, index) => (
                <ImageContainer key={index} src={image.src} alt={image.alt} />
            ))}
        </div>
    );
};
