"use client"
import { useState } from "react";
import PhotographerContact from "../PhotographerContact/PhotographerContact";
import Image from "next/image";

export default function PhotographerInfo({ photographer }) {

    const { name, city, country, tagline, price, portrait } = photographer;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="flex flex-row w-310 h-78.25 bg-[#FAFAFA] justify-between px-[50px] items-center mx-auto">
            <div className="w-50 h-50">
                <article className="">
                    <h2 className="text-[#D3573C] text-[64px] font-normal mb-1 whitespace-nowrap ">{name}</h2>
                    <p className="text-[#901C1C] text-[24px] mb-1">{city}, {country}</p>
                    <p className="text-[#000000] font-bold text-[18px] mb-2 whitespace-nowrap">{tagline}</p>
                </article>
            </div>
            <div>
                <button className="h-17.25 w-42.5  bg-[#911C1C] rounded-[5px] flex items-center justify-center text-white font-bold text-[20px] leading-6.5 font-['DM_Sans'] opacity-[0.87]" onClick={() => setIsOpen(true)}>
                    Contactez-moi
                </button>

                <PhotographerContact
                    photographerName={name}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />

            </div>

            <div className="w-50 h-50 rounded-full overflow-hidden mb-4 border-2 border-transparent group-hover:border-[#911C1C] transition-all duration-300">
                <Image
                    src={`/image/${portrait}`}
                    alt={`Portrait de ${name}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover scale-150"
                />
            </div>
        </section>
    )
}