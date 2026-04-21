import Image from "next/image";

export default function HeaderIndex() {
    return (
        <header className="w-full max-w-360 h-30 flex items-center justify-between mx-auto">
            <div className="pl-25">
                <Image
                    src="/icons/logo.png"
                    alt="FishEye"
                    width={200}
                    height={50}
                    priority
                />
            </div>
            <h1 className="pr-30 font-sans font-normal text-[36px] leading-11.75 text-[#911C1C]">
                Nos photographes
            </h1>
        </header>
    )
}