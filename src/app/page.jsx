import Header from "@/components/Header/Header";
import { getAllPhotographers } from "./prisma-db";
import PhotographerCard from "@/components/PhotographerCard/PhotographerCard";

export default async function Home() {
  const photographers = await getAllPhotographers();
  return (
    <>
      <Header />
      {photographers.map((photographer) => (
        <PhotographerCard key={photographer.id} photographer={photographer} />
      ))}
    </>
  );
}