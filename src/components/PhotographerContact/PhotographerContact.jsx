"use client"
import { useEffect, useRef, useState } from "react";

export default function PhotographerContact({ isOpen, onClose, photographerName }) {
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const [form, setForm] = useState({ firstname: "", lastname: "", email: "", message: "" });
  // Objet d'erreurs indexé par champ : { firstname: "msg", email: "msg", ... }
  const [errors, setErrors] = useState({});

  // Met le focus sur le bouton fermer à l'ouverture de la modale
  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  // Focus trap : empêche le focus de sortir de la modale avec Tab/Shift+Tab
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }

    if (e.key !== "Tab") return;

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

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    // Efface l'erreur du champ dès que l'utilisateur commence à corriger
    setErrors((prev) => ({ ...prev, [e.target.id]: "" }));
  };

  // Retourne un objet d'erreurs — vide si tout est valide
  const validate = () => {
    const newErrors = {};
    if (form.firstname.trim() === "") newErrors.firstname = "Le prénom est requis";
    if (form.lastname.trim() === "") newErrors.lastname = "Le nom est requis";
    if (form.email.trim() === "" || !form.email.includes("@") || !form.email.includes(".")) newErrors.email = "Un email valide est requis";
    if (form.message.trim() === "") newErrors.message = "Le message est requis";
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    // Bloque l'envoi si au moins un champ est invalide
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onKeyDown={handleKeyDown}
      ref={dialogRef}
    >
      <div className="bg-[#DB8876] rounded-[5px] w-167.25 p-10 relative">
        <h2 id="contact-title" className="text-[40px] font-normal leading-tight mb-8">
          Contactez-moi<br />{photographerName}
        </h2>
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Fermer la modal de contact"
          className="absolute top-6 right-6 text-white text-[30px] leading-none"
        >
          <span aria-hidden="true">×</span>
        </button>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="firstname" className="text-[18px] text-[#3d3d3d]">Prénom</label>
            <input id="firstname" type="text" autoComplete="given-name" onChange={handleChange}
              className="rounded-[5px] h-13.75 px-4 outline-none bg-white w-full" />
            {errors.firstname && <p className="text-white text-[14px]">{errors.firstname}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="lastname" className="text-[18px] text-[#3d3d3d]">Nom</label>
            <input id="lastname" type="text" autoComplete="family-name" onChange={handleChange}
              className="rounded-[5px] h-13.75 px-4 outline-none bg-white w-full" />
            {errors.lastname && <p className="text-white text-[14px]">{errors.lastname}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-[18px] text-[#3d3d3d]">Email</label>
            <input id="email" type="email" autoComplete="email" onChange={handleChange}
              className="rounded-[5px] h-13.75 px-4 outline-none bg-white w-full" />
            {errors.email && <p className="text-white text-[14px]">{errors.email}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-[18px] text-[#3d3d3d]">Votre message</label>
            <textarea id="message" onChange={handleChange}
              className="rounded-[5px] h-37.5 px-4 py-3 outline-none resize-none bg-white w-full" />
            {errors.message && <p className="text-white text-[14px]">{errors.message}</p>}
          </div>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-6 bg-[#911C1C] text-white font-bold text-[18px] px-10 py-4 rounded-[5px]"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
