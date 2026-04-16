"use client"
import { useState } from "react";
import HeaderPhoto from "@/components/HeaderPhoto/HeaderPhoto";
import PhotographerInfo from "@/components/PhotographerInfo/PhotographerInfo";
import PhotographerMediaListClient from "@/components/PhotographerMediaListClient/PhotographerMediaListClient";
import Filter from "@/components/Filter/Filter";
import Lightbox from "../Lightbox/Lightbox";

export default function PhotographerPageClient({ photographer, medias }) {
    const [selectedFiltre, setSelectedFiltre] = useState("popularity")
    const [isOpen, setIsOpen] = useState(false)
    const [selectedMediaIndex, setSelectedMediaIndex] = useState(0)


    const handleLightBox = (index) => {
        setIsOpen(true);
        setSelectedMediaIndex(index);
    }

    const sortedMedias = [...medias].sort((a, b) => {
        switch (selectedFiltre) {
            case "popularity":return b.likes - a.likes;
            case "date": return new Date(b.date) - new Date(a.date);
            case "title": return a.title.localeCompare(b.title);
            default: return 0;
        }
    });

    return (
        <>
            <HeaderPhoto />
            <PhotographerInfo photographer={photographer} />
            <Filter selectedFiltre={selectedFiltre} setSelectedFiltre={setSelectedFiltre} />
            <PhotographerMediaListClient medias={sortedMedias} price={photographer.price} onOpenLightBox={handleLightBox} />
            <Lightbox medias={sortedMedias} selectedIndex={selectedMediaIndex} isOpen={isOpen} onClose={() => setIsOpen(false)} setSelectedMediaIndex={setSelectedMediaIndex}/>
        </>
    )

}