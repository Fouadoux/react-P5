import Image from "next/image";

export default function PhotographerStats({like, price}) {

return(

<section className="fixed bottom-0 right-10 flex flex-row justify-between
 gap-8 bg-[#DB8876] px-8 py-4 rounded-t-[5px] w-94 h-17 z-50">
            <div className="flex flex-row items-center ">
                <span aria-label={"number de likes"} className="text-black text-[24px]">{like} </span>
                <Image
                    src="/icons/favorite-24px 2.png"
                    alt="likes"
                    aria-hidden="true"
                    width={18}
                    height={18}
                    className="w-[17.5px] h-[18.35px]"
                />
            </div>
        <span className="text-black text-[24px]">{price}€/jour</span>
    </section>
)

}