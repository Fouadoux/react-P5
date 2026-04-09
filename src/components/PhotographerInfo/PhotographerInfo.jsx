"use client"
import { useState } from "react";
import PhotographerContact from "../PhotographerContact/PhotographerContact";
import Image from "next/image";

export default function PhotographerInfo({ photographer }) {

    const { name, city, country, tagline, price, portrait } = photographer;
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <section className="flex flex-row w-310 h-78.25 bg-[#FAFAFA] px-12.5 items-center mx-auto">

            <article className="flex-1 mt-1">
                <h2 className="text-[#D3573C] text-[62px] font-normal mb-1 leading-tight">{name}</h2>
                <p className="text-[#901C1C] text-[24px] mb-5">{city}, {country}</p>
                <p className="text-[#525252] text-[18px] mb-2">{tagline}</p>
            </article>

            <div className="flex-1 flex justify-center mt-9">
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

            <div className="relative flex justify-end items-center flex-1">
                <div className="relative w-50 h-50 rounded-full overflow-hidden border-2 border-transparent shrink-0">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-full z-10">
                            <div className="w-10 h-10 border-4 border-[#901C1C] border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}
                    <Image
                        src={`/images/${portrait}`}
                        alt={`Portrait de ${name}`}
                        fill
                        className="object-cover rounded-full"
                        onLoad={() => setIsLoading(false)}
                    />
                </div>
            </div>

        </section>
    )
}