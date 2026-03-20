import Image from "next/image";

export default function PhotographerStats({like, price}) {

return(

<section className="fixed bottom-0 right-10 flex flex-row gap-8 bg-[#DB8876] px-8 py-4 rounded-t-[5px]">
            <div className="flex flex-row">
        <span className="text-black text-[24px]">{like+20000} </span>
        <Image src="/icons/favorite-24px 2.png" alt="likes" width={24} height={24} />
        </div>
        <span className="text-black text-[24px]">{price}€/jour</span>
    </section>
)

}