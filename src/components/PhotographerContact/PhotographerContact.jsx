"use client"
export default function PhotographerContact({ isOpen, onClose, photographerName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#DB8876] rounded-[5px] w-[669px] p-10 relative">

        {/* Titre */}
        <h2 className="text-[40px] font-normal leading-tight mb-8">
          Contactez-moi<br />{photographerName}
        </h2>

        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white text-[30px] leading-none"
        >
          ×
        </button>

        {/* Formulaire */}
        <div className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-[18px] text-[#3d3d3d]">Prénom</label>
            <input className="rounded-[5px] h-[55px] px-4 outline-none bg-white w-full" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[18px] text-[#3d3d3d]">Nom</label>
            <input className="rounded-[5px] h-[55px] px-4 outline-none bg-white w-full" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[18px] text-[#3d3d3d]">Email</label>
            <input className="rounded-[5px] h-[55px] px-4 outline-none bg-white w-full" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[18px] text-[#3d3d3d]">Votre message</label>
            <textarea className="rounded-[5px] h-[150px] px-4 py-3 outline-none resize-none bg-white w-full" />
          </div>

        </div>

        {/* Bouton envoyer */}
        <button className="mt-6 bg-[#911C1C] text-white font-bold text-[18px] px-10 py-4 rounded-[5px]">
          Envoyer
        </button>

      </div>
    </div>
  );
}