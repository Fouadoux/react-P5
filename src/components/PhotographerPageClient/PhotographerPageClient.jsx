"use client"
import { useMemo, useState } from "react";
import HeaderPhoto from "@/components/HeaderPhoto/HeaderPhoto";
import PhotographerInfo from "@/components/PhotographerInfo/PhotographerInfo";
import PhotographerMediaListClient from "@/components/PhotographerMediaListClient/PhotographerMediaListClient";
import Filter from "@/components/Filter/Filter";
import Lightbox from "@/components/Lightbox/Lightbox";

// Composant client orchestrateur de la page photographe.
// Reçoit les données du serveur et gère l'état interactif (filtre, lightbox).
export default function PhotographerPageClient({ photographer, medias }) {
    const [selectedFiltre, setSelectedFiltre] = useState("popularity")
    const [isOpen, setIsOpen] = useState(false)
    const [selectedMediaIndex, setSelectedMediaIndex] = useState(0)

    const handleLightBox = (index) => {
        setIsOpen(true);
        setSelectedMediaIndex(index);
    }

    // useMemo évite de recalculer le tri à chaque re-render
    // Le tri n'est refait que si medias ou selectedFiltre changent
    const sortedMedias = useMemo(() => [...medias].sort((a, b) => {
        switch (selectedFiltre) {
            case "popularity": return b.likes - a.likes;
            case "date": return new Date(b.date) - new Date(a.date);
            case "title": return a.title.localeCompare(b.title);
            default: return 0;
        }
    }), [medias, selectedFiltre]);

    return (
        <>
            <HeaderPhoto />
            <PhotographerInfo photographer={photographer} />
            <Filter selectedFiltre={selectedFiltre} setSelectedFiltre={setSelectedFiltre} />
            <PhotographerMediaListClient medias={sortedMedias} price={photographer.price} onOpenLightBox={handleLightBox} />
            {/* La Lightbox reçoit sortedMedias pour que les index correspondent à la grille affichée */}
            <Lightbox medias={sortedMedias} selectedIndex={selectedMediaIndex} isOpen={isOpen} onClose={() => setIsOpen(false)} setSelectedMediaIndex={setSelectedMediaIndex}/>
        </>
    )
}
