import { getAllPhotographers } from "./prisma-client.js";
import PhotographerCard from "@/components/PhotographerCard/PhotographerCard";
import HeaderIndex from "@/components/Header-index/HeaderIndex";

export default async function Home() {
  const photographers = await getAllPhotographers();
  return (
    <>
    <div className=" flex flex-col gap-y-15.75 pb-22.5">
      <HeaderIndex />
      <main className="grid grid-cols-3 gap-x-79.25 gap-y-20.75 justify-items-center mx-25">
      {photographers.map((photographer) => (
        <PhotographerCard key={photographer.id} photographer={photographer} />
      ))}
        </main>
      </div>
    </>
  );
}