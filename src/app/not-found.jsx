import Link from "next/link";

export const metadata = {
    title: "FishEye - Page introuvable",
};

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-[#911C1C] text-[180px] font-bold">404</h1>
            <h2 className="text-[#911C1C] text-[36px] font-bold">Page introuvable</h2>
            <p className="text-[#525252] text-[18px]">La page que vous cherchez n'existe pas.</p>
            <Link
                href="/"
                className="bg-[#911C1C] text-white font-bold px-8 py-4 rounded-[5px] hover:opacity-80"
            >
                Retour à l'accueil
            </Link>
        </div>
    );
}