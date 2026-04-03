"use client"
import Image from "next/image";
import {useEffect, useState} from "react";
import { likeMedia } from "@/app/actions.jsx";

export default function PhotographerMedia({ media, onLike, index, onOpenLightBox }) {
    const { id, title, likes, image, video } = media;
    const [countLike, setCountlike] = useState(media.likes);
    const [isLiked, setIsLiked] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const liked = JSON.parse(localStorage.getItem("likedMedias") || "[]");
        setIsLiked(liked.includes(media.id));
        setMounted(true);
    }, []);

    const handleLike = () => {
        const liked = JSON.parse(localStorage.getItem("likedMedias") || "[]");
        if (isLiked) {
            const updated = liked.filter((id) => id !== media.id);
            localStorage.setItem("likedMedias", JSON.stringify(updated));
            setCountlike(count => count - 1);
            likeMedia(media.id, -1);
            onLike(-1);
        } else {
            localStorage.setItem("likedMedias", JSON.stringify([...liked, media.id]));
            setCountlike(count => count + 1);
            likeMedia(media.id, 1);
            onLike(1);
        }
        setIsLiked(prev => !prev);
    };

    return (
        <article className="flex flex-col gap-2 w-87.5 h-87.75">

            {/* Media cliquable au clavier */}
            {video ? (
                <video
                    src={`/images/${video}`}
                    aria-label={`Ouvrir la vidéo ${title}`}
                    tabIndex={0}
                    className="w-87.5 h-75 aspect-square object-cover rounded-lg cursor-pointer"
                    onClick={() => onOpenLightBox(index)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") onOpenLightBox(index);
                    }}
                />
            ) : (
                <div
                    role="button"
                    aria-label={`Ouvrir la photo ${title}`}
                    tabIndex={0}
                    className="relative w-87.5 h-75 aspect-square cursor-pointer"
                    onClick={() => onOpenLightBox(index)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") onOpenLightBox(index);
                    }}
                >
                    <Image
                        src={`/images/${image}`}
                        alt={title}
                        fill
                        sizes="350px"
                        className="object-cover rounded-lg"
                        loading="eager"
                    />
                </div>
            )}

            <div className="flex justify-between">
                <span className="text-red-700">{title}</span>
                <div className="flex items-center gap-1">
                    <span className="text-red-700" aria-label={`${countLike} likes`}>
                        {countLike}
                    </span>
                    <button
                        onClick={handleLike}
                        aria-label={mounted ? (isLiked ? `Ne plus aimer ${title}` : `Aimer ${title}`) : `Aimer ${title}`}
                        aria-pressed={mounted ? isLiked : false}
                        suppressHydrationWarning
                    >
                        <Image
                            src="/icons/favorite-24px 1.png"
                            alt="likes"
                            aria-hidden="true"
                            width={24}
                            height={24}
                        />
                    </button>
                </div>
            </div>

        </article>
    );
}