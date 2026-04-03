"use client"

import { useState } from "react";
import PhotographerMedia from "../PhotographerMedia/PhotographerMedia";
import PhotographerStats from "../PhotographerStats/PhotographerStats";

export default function PhotographerMediaListClient({ medias, price, onOpenLightBox  }) {
    const [totalLikes, setTotalLikes] = useState(
        medias.reduce((acc, media) => acc + media.likes, 0)
    );

    const marge = medias.length % 3;

    return (
        <>
                <section className={`grid grid-cols-3 gap-x-24 gap-y-2 pt-8 w-310 mx-auto ${marge === 0 ? "mb-15" : ""}`}>
                    {medias.map((media, index ) => (
                    <PhotographerMedia
                        key={media.id}
                        media={media}
                        index={index}
                        onLike={(delta) => setTotalLikes(t => t + delta)}
                        onOpenLightBox={onOpenLightBox}/>
                ))}
            </section>
            <PhotographerStats like={totalLikes} price={price} />
        </>
    )
}