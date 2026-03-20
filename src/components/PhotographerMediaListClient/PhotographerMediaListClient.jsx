"use client"

import { useState } from "react";
import PhotographerMedia from "../PhotographerMedia/PhotographerMedia";
import PhotographerStats from "../PhotographerStats/PhotographerStats";

export default function PhotographerMediaListClient({ medias, price }) {
    const [totalLikes, setTotalLikes] = useState(
        medias.reduce((acc, media) => acc + media.likes, 0)
    );
    const marge = medias.lenth % 3;

    return (
        <>
            <section className={`grid grid-cols-3 gap-6 p-8 ${marge === 0 ? "" : "mb-15"}`}>
                {medias.map((media) => (
                    <PhotographerMedia key={media.id} media={media} onLike={() => setTotalLikes(t => t + 1)} />
                ))}
            </section>
            <PhotographerStats like={totalLikes} price={price} />
        </>
    )
}