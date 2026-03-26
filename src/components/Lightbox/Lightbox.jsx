"use client"
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Lightbox({ medias, selectedIndex, isOpen, onClose, setSelectedMediaIndex }) {
    if (!isOpen) return null;

    const media = medias[selectedIndex];
    const isVideo = media.video !== null;
    const dialogRef = useRef(null);

    // Focus sur la dialog à l'ouverture
    useEffect(() => {
        dialogRef.current?.focus();
    }, [isOpen]);

    const handlePrev = () => {
        setSelectedMediaIndex((prev) => (prev - 1 + medias.length) % medias.length);
    };
    const handleNext = () => {
        setSelectedMediaIndex((prev) => (prev + 1) % medias.length);
    };
    const handleKeyDown = (e) => {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "Escape") onClose();
    };

    return (
        <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Lightbox — ${media.title}, ${selectedIndex + 1} sur ${medias.length}`}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
            onKeyDown={handleKeyDown}
            tabIndex={-1}
        >
            {/* Contenu — modal 1240x900 */}
            <div className="flex flex-col w-310 max-w-[90vw] h-225 max-h-[90vh]">

                {/* Flèches + Media + Croix */}
                <div className="relative flex items-center justify-center flex-1 gap-4">

                    {/* Croix */}
                    <button
                        onClick={onClose}
                        aria-label="Fermer la lightbox"
                        className="absolute top-0 right-0 hover:opacity-70"
                    >
                        <Image src="/icons/close.png" alt="" aria-hidden="true" width={72} height={72} />
                    </button>

                    {/* Flèche gauche */}
                    <button
                        onClick={handlePrev}
                        aria-label={`Média précédent — ${medias[(selectedIndex - 1 + medias.length) % medias.length].title}`}
                        className="hover:opacity-70 shrink-0"
                    >
                        <Image src="/icons/arrow-gauche.png" alt="" aria-hidden="true" width={96} height={96} />
                    </button>

                    {/* Media */}
                    <div
                        className="relative w-262.5 max-w-full h-full"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {isVideo ? (
                            <video
                                src={`/images/${media.video}`}
                                controls
                                aria-label={media.title}
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <Image
                                src={`/images/${media.image}`}
                                alt={media.title}
                                fill
                                sizes="1050px"
                                className="object-contain"
                            />
                        )}
                    </div>

                    {/* Flèche droite */}
                    <button
                        onClick={handleNext}
                        aria-label={`Média suivant — ${medias[(selectedIndex + 1) % medias.length].title}`}
                        className="hover:opacity-70 shrink-0"
                    >
                        <Image src="/icons/arrow-droite.png" alt="" aria-hidden="true" width={96} height={96} />
                    </button>

                </div>

                {/* Titre */}
                <p
                    className="text-[#901C1C] font-bold text-xl py-4 w-262.5 max-w-full mx-auto"
                    aria-hidden="true"
                >
                    {media.title}
                </p>

            </div>
        </div>
    );
}