import {getPhotographer, getAllMediasForPhotographer} from "@/app/prisma-client.js";
import PhotographerPageClient from "@/components/PhotographerPageClient/PhotographerPageClient";
import {notFound} from "next/navigation";

export async function generateMetadata({params}){
    const {id} = await params;
    const photographer = await getPhotographer(id);
    if (!photographer) {
        return { title: "FishEye - Photographe introuvable" };
    }
    return {
        title: `FishEye - ${photographer.name}`,
    };
}
export default async function PhotographerPage({params}) {
    const {id} = await params;
    const numericId = Number(id);

    if (isNaN(numericId)) return notFound();

    const photographer = await getPhotographer(numericId);
    const medias = await getAllMediasForPhotographer(numericId);

    if (!photographer) return notFound();

    return (
        <>
            <PhotographerPageClient photographer={photographer} medias={medias}/>
        </>
    );
}