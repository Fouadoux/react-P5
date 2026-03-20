import { getPhotographer } from "@/app/prisma-db";
import HeaderPhoto from "@/components/HeaderPhoto/HeaderPhoto";
import PhotographerInfo from "@/components/PhotographerInfo/PhotographerInfo";
import PhotographerMediaList from "@/components/PhotographerMediaList/PhotographerMediaList";


export default async function PhotographerPage({params}){

    const { id } = await params;

    const photographer = await getPhotographer(Number(id));

    return(
        <>
        <HeaderPhoto />
        <PhotographerInfo photographer={photographer} />
        <PhotographerMediaList id={photographer.id} price={photographer.price} />
        </>
    )

}