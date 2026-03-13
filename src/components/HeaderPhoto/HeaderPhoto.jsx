import Image from "next/image";
import Link from "next/link";

export default function HeaderPhoto() {
    return (
        <div className="w-full">
            <header className="max-w-360 h-30 mx-auto ">
                <div className="relative left-19.75 top-10.25">
                    {/* Logo */}
                    <Link href="/">
                        <Image
                            src="/icons/logo.png"
                            alt="logo"
                            width={200}
                            height={50}
                            priority
                        />
                    </Link>
                </div>
            </header >
        </div >
    )
}