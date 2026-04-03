import { getPhotographer, getAllMediasForPhotographer } from "@/app/prisma-client.js";
import PhotographerPageClient from "@/components/PhotographerPageClient/PhotographerPageClient";



export default async function PhotographerPage({ params }) {
    const { id } = await params;
    const numericId = Number(id);

    if (isNaN(numericId)) return null;

    const photographer = await getPhotographer(numericId);
    const medias = await getAllMediasForPhotographer(numericId);

    return (
        <>
            <PhotographerPageClient photographer={photographer} medias={medias} />
        </>
    );
}