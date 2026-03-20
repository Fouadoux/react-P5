"use client"
import Image from "next/image";
import { useState } from "react";
import { likeMedia } from "@/app/actions.jsx";



export default function PhotographerMedia({ media, onLike }) {
    const { id, title, likes, image, video } = media;
    const [countLike, setCountlike] = useState(media.likes);

    const handleLike= () => {
        setCountlike(countLike=> countLike+1);
        likeMedia(media.id, countLike+1);
        onLike();
    }
    

    return (

        <article className="flex flex-col gap-2">
            {video ? (
                <video src={`/images/${video}`} className="w-full aspect-square object-cover rounded-lg" />
            ) : (
                <div className="relative w-full aspect-square">
                    <Image
                        src={`/images/${image}`}
                        alt={title}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
            )}
            <div className="flex justify-between">
                <span className="text-red-700">{title}</span>
                <div className="flex items-center gap-1">
                    <span className="text-red-700">{countLike}</span>
                    <button onClick={handleLike}>
                        <Image src="/icons/favorite-24px 1.png" alt="likes" width={24} height={24} />
                        
                    </button>

                </div>
            </div>
        </article>
    )

}