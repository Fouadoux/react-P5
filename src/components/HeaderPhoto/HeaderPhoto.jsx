import Image from "next/image";
import Link from "next/link";

export default function HeaderPhoto() {
    return (
        <div className="w-310 mx-auto flex items-center h-30  gap-3 ">
            <header >
                    {/* Logo */}
                    <Link href="/">
                        <Image
                            src="/icons/logo.png"
                            alt="FishEye - Retour à l'accueil"
                            width={200}
                            height={50}
                            priority
                        />
                    </Link>
            </header >
        </div >
    )
}