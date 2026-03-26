import Link from "next/link";
import Image from "next/image";

export default function PhotographerCard({ photographer }) {
  const { id, name, city, country, tagline, price, portrait } = photographer;

  return (
    <Link
      href={`/photographer/${id}`}
      aria-label={`${name}, ${city}, ${country}, ${tagline}, ${price}€ par jour`}
    >
      <article className="flex flex-col items-center text-center w-55 cursor-pointer group">

        <div className="w-50 h-50 rounded-full overflow-hidden mb-4 border-2 border-transparent group-hover:border-[#911C1C] transition-all duration-300">
          <Image
            src={`/image/${portrait}`}
            alt=""
            aria-hidden="true"
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>

        <h2 aria-hidden="true" className="text-[#D3573C] text-[36px] font-normal mb-1 whitespace-nowrap">{name}</h2>
        <p aria-hidden="true" className="text-[#901C1C] text-[13px] mb-1">{city}, {country}</p>
        <p aria-hidden="true" className="text-[#000000] font-bold text-[10px] mb-2 whitespace-nowrap">{tagline}</p>
        <p aria-hidden="true" className="text-[#757575] text-[9px]">{price}€/jour</p>

      </article>
    </Link>
  );
}