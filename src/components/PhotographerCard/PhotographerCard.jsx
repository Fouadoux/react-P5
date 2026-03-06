export default function PhotographerCard({ photographer }) {
  const { id, name, city, country, tagline, price, portrait } = photographer;

  return (
    <article className="flex flex-col items-center text-center w-[220px] cursor-pointer group">
      <div className="w-[200px] h-[200px] rounded-full overflow-hidden mb-4 border-2 border-transparent group-hover:border-[#911C1C] transition-all duration-300">
        <img
          src={`/photographers/${portrait}`}
          alt={`Portrait de ${name}`}
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-[#911C1C] text-2xl font-semibold mb-1">{name}</h2>
      <p className="text-gray-600 text-sm mb-1">{city}, {country}</p>
      <p className="text-gray-500 text-sm mb-2">{tagline}</p>
      <p className="text-gray-400 text-sm">{price}€/jour</p>
    </article>
  );
}