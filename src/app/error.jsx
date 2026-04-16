"use client"

export default function Error({ error, reset }) {
    const isDbError = error.name === "DataBaseError";
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h2 className="text-[#911C1C] text-[36px] font-bold">Une erreur est survenue</h2>
            <p className="text-[#525252] text-[18px]">
                {isDbError ? "Impossible de se connecter à la base de données." : "Réessayer plus tard !"}
            </p>
            <button
                onClick={reset}
                className="bg-[#911C1C] text-white font-bold px-8 py-4 rounded-[5px] hover:opacity-80"
            >
                Réessayer
            </button>
        </div>
    );
}