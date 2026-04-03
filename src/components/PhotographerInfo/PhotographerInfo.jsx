"use client"
import { useState } from "react";
import PhotographerContact from "../PhotographerContact/PhotographerContact";
import Image from "next/image";

export default function PhotographerInfo({ photographer }) {

    const { name, city, country, tagline, price, portrait } = photographer;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="flex flex-row w-310 h-78.25 bg-[#FAFAFA] px-12.5 items-center mx-auto">

            <article className="flex-1">
                <h2 className="text-[#D3573C] text-[64px] font-normal mb-1 leading-tight">{name}</h2>
                <p className="text-[#901C1C] text-[24px] mb-1">{city}, {country}</p>
                <p className="text-[#525252] text-[18px] mb-2">{tagline}</p>
            </article>

            <div className="flex-1 flex justify-center">
                <button
                    aria-label={`Contacter ${photographer.name}`}
                    className="h-17.25 w-42.5 bg-[#911C1C] rounded-[5px] flex items-center justify-center text-white font-bold text-[20px] leading-6.5 font-['DM_Sans'] opacity-[0.87]"
                    onClick={() => setIsOpen(true)}
                >
                    Contactez-moi
                </button>
                <PhotographerContact
                    photographerName={name}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />
            </div>

            <div className="flex-1 flex justify-end w-50 h-50  overflow-hidden border-2 border-transparent">
                <Image
                    src={`/images/${portrait}`}
                    alt={`Portrait de ${name}`}
                    width={200}
                    height={200}
                    className="object-cover rounded-full"
                />
            </div>

        </section>
    )
}