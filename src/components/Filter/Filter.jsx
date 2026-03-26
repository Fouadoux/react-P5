"use client"
import { useState, useRef, useEffect } from "react";

const options = [
    { value: "popularity", label: "Popularité" },
    { value: "date", label: "Date" },
    { value: "title", label: "Titre" },
];

export default function Filter({ selectedFiltre, setSelectedFiltre }) {
    const [isOpen, setIsOpen] = useState(false)

    function handleSlelect(value) {
        setSelectedFiltre(value);
        setIsOpen(false);
    };

    const currentLabel = options.find((o) => o.value === selectedFiltre)?.label
    return (
        <div className="relative flex items-center gap-3 w-fit mt-5">
            <span className="text-black font-bold">Trier par</span>
            <div className="relative w-42.5">
                <button
                    onClick={() => setIsOpen(prev => !prev)}
                    aria-description="menue de trie"
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    className={`w-42.5 flex justify-between items-center gap-6 px-4 py-3 bg-[#901C1C] text-white font-bold ${isOpen ? "rounded-t-lg" : "rounded-lg"
                        }`}
                >
                    {currentLabel}
                    <span>{isOpen ? "∧" : "∨"}</span>
                </button>



                {isOpen && (
                    <ul role="listbox"  className="absolute w-full bg-[#901C1C] text-white z-10 rounded-b-lg">
                        {options.filter((o) => o.value != selectedFiltre).map(option =>

                            <li
                                tabIndex={0} 
                                onKeyDown ={(e)=> { 
                                if (e.key == "Enter") handleSlelect(option.value);
                                if (e.key == "Escape") setIsOpen(false); }}
                                role="option"
                                key={option.value}
                                onClick={() => handleSlelect(option.value)}
                                className="px-4 py-3 border-t border-white/20 hover:brightness-110 cursor-pointer"
                            > {option.label}</li>
                        )}
                    </ul>
                )}
            </div>


        </div>
    )
}