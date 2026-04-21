"use client"
import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import Spinner from "../Spinner/Spinner.jsx";

export default function Lightbox({ medias, selectedIndex, isOpen, onClose, setSelectedMediaIndex }) {

    const dialogRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    // Donne le focus à la dialog à l'ouverture pour activer la navigation clavier
    useEffect(() => {
        dialogRef.current?.focus();
    }, [isOpen]);

    // Réinitialise le spinner à chaque changement de média
    useEffect(() => {
        setIsLoading(true);
    }, [selectedIndex]);

    // Tous les hooks doivent être appelés avant ce return (Rules of Hooks)
    if (!isOpen) return null;

    const media = medias[selectedIndex];
    // Boolean() gère le cas où video est undefined (contrairement à !== null)
    const isVideo = Boolean(media.video);

    // Navigation circulaire : revient au début après le dernier média
    const handlePrev = () => {
        setSelectedMediaIndex((prev) => (prev - 1 + medias.length) % medias.length);
    };
    const handleNext = () => {
        setSelectedMediaIndex((prev) => (prev + 1) % medias.length);
    };

    // Gestion clavier : navigation + focus trap dans la modale
    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            onClose();
            return;
        }

        if (e.key === "ArrowLeft") {
            handlePrev();
            return;
        }

        if (e.key === "ArrowRight") {
            handleNext();
            return;
        }

        if (e.key !== "Tab") return;

        // Focus trap : empêche le focus de sortir de la modale avec Tab/Shift+Tab
        const focusable = dialogRef.current?.querySelectorAll(
            'button, input, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusableArray = Array.from(focusable);
        const first = focusableArray[0];
        const last = focusableArray[focusableArray.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
        } else {
            if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    };

    return (

        <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Lightbox"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
            onKeyDown={handleKeyDown}
            tabIndex={-1}
        >
            {/* Annonce le titre du média courant aux lecteurs d'écran */}
            <p className="sr-only" aria-live="assertive" aria-atomic="true">
                {media.title}
            </p>

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
                        {isLoading && <Spinner />}

                        {isVideo ? (
                            <video
                                src={`/images/${media.video}`}
                                controls
                                aria-label={media.title}
                                className="w-full h-full object-contain"
                                onLoadedData={() => setIsLoading(false)}
                            />
                        ) : (
                            <Image
                                src={`/images/${media.image}`}
                                alt={media.title}
                                fill
                                sizes="1050px"
                                className="object-contain"
                                onLoad={() => setIsLoading(false)}
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

                {/* Titre — aria-hidden car déjà annoncé via aria-live ci-dessus */}
                <h1
                    className="text-[#901C1C] font-bold text-xl py-4 w-262.5 max-w-full mx-auto"
                    aria-hidden="true"
                >
                    {media.title}
                </h1>

            </div>
        </div>
    );
}
