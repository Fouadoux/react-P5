import Image from "next/image";

export default function Header() {




    return (


        <div className="w-full">

            <header className="max-w-360 h-30 flex items-center justify-between mx-auto ">

                {/* Logo */}
                <div className="pl-12">
                    <Image
                        src="/icons/logo.png"
                        alt="logo"
                        width={200}
                        height={50}
                        priority

                    />
                </div>
                <div className="pr-12 font-sans font-normal text-[36px] leading-11.75 text-[#911C1C]">
                    <p>Nos photographes</p>
                </div>
            </header>


        </div>







    )

}