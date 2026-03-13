import Header from "@/components/Header-index/HeaderIndex";
import { getAllPhotographers } from "./prisma-db";
import PhotographerCard from "@/components/PhotographerCard/PhotographerCard";
import HeaderIndex from "@/components/Header-index/HeaderIndex";

export default async function Home() {
  const photographers = await getAllPhotographers();
  return (
    <>
    <div className=" flex flex-col gap-y-15.75 pb-22.5">
      <HeaderIndex />
      <div className="grid grid-cols-3 gap-x-79.25 gap-y-20.75 justify-items-center mx-29">
      {photographers.map((photographer) => (
        <PhotographerCard key={photographer.id} photographer={photographer} />
      ))}
      </div>
      </div>
    </>
  );
}