"use client"
import { useState } from "react";

const options = [
    { value: "popularity", label: "Popularité" },
    { value: "date", label: "Date" },
    { value: "title", label: "Titre" },
];

export default function Filter({ selectedFiltre, setSelectedFiltre }) {
    const [isOpen, setIsOpen] = useState(false);

    function handleSelect(value) {
        setSelectedFiltre(value);
        setIsOpen(false);
    }

    const currentLabel = options.find((o) => o.value === selectedFiltre)?.label;

    return (
        <div className=" w-310 mx-auto flex items-center gap-3 mt-5">
            <span id="filter-label" className="text-black font-bold">Trier par</span>
            <div className="relative w-42.5">
                <button
                    onClick={() => setIsOpen(prev => !prev)}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-labelledby="filter-label"
                    aria-label={`Trier par ${currentLabel}`}
                    className={`w-42.5 flex justify-between items-center gap-6 px-4 py-3 bg-[#901C1C] text-white font-bold ${
                        isOpen ? "rounded-t-lg" : "rounded-lg"
                    }`}
                >
                    {currentLabel}
                    <span aria-hidden="true">{isOpen ? "∧" : "∨"}</span>
                </button>

                {isOpen && (
                    <ul
                        role="listbox"
                        aria-label="Critère de tri"
                        aria-activedescendant={selectedFiltre}
                        className="absolute w-full bg-[#901C1C] text-white z-10 rounded-b-lg"
                    >
                        {options.filter((o) => o.value !== selectedFiltre).map(option => (
                            <li
                                key={option.value}
                                id={option.value}
                                role="option"
                                aria-selected={false}
                                tabIndex={0}
                                onClick={() => handleSelect(option.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") handleSelect(option.value);
                                    if (e.key === "Escape") setIsOpen(false);
                                }}
                                className="px-4 py-3 border-t border-white/20 hover:brightness-110 cursor-pointer"
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}