import { getAllMediasForPhotographer } from "@/app/prisma-db";
import PhotographerMediaListClient from "../PhotographerMediaListClient/PhotographerMediaListClient";

export default async function PhotographerMediaList({ id, price }) {
    const medias = await getAllMediasForPhotographer(id);
    return <PhotographerMediaListClient medias={medias} price={price} />
}