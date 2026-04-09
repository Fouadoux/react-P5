"use client"
import Image from "next/image";
import {useEffect, useState} from "react";
import { likeMedia } from "@/app/actions.jsx";

export default function PhotographerMedia({ media, onLike, index, onOpenLightBox }) {
    const { id, title, likes, image, video } = media;
    const [countLike, setCountlike] = useState(media.likes);
    const [isLiked, setIsLiked] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

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

            <div className="relative w-87.5 h-75">
                {/* Spinner */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg z-10">
                        <div className="w-10 h-10 border-4 border-[#901C1C] border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                {video ? (
                    <video
                        src={`/images/${video}`}
                        className="w-full h-full object-cover rounded-lg cursor-pointer"
                        onClick={() => onOpenLightBox(index)}
                        onLoadedData={() => setIsLoading(false)}
                    />
                ) : (
                    <div
                        role="button"
                        aria-label={`Ouvrir la photo ${title}`}
                        tabIndex={0}
                        className="relative w-full h-full cursor-pointer"
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
                            onLoad={() => setIsLoading(false)}
                        />
                    </div>
                )}
            </div>

            <div className="flex justify-between">
                <h2 className="text-red-700 text-[24px]">{title}</h2>
                <div className="flex items-center gap-1">
                    <span className="text-red-700 text-[24px]" aria-label={`${countLike} likes`}>
                        {countLike}
                    </span>
                    <button
                        onClick={handleLike}
                        aria-label={mounted ? (isLiked ? `Ne plus aimer ${title}` : `Aimer ${title}`) : `Aimer ${title}`}
                        aria-pressed={mounted ? isLiked : false}
                        suppressHydrationWarning
                    >
                        <Image
                            src={isLiked ? "/icons/favorite-24px 1.png" : "/icons/favorite-empty.png"}
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