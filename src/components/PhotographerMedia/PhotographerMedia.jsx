"use client"
import Image from "next/image";
import {useEffect, useState} from "react";
import {likeMedia, unlikeMedia} from "@/app/actions.jsx";
import Spinner from "@/components/Spinner/Spinner.jsx";

export default function PhotographerMedia({ media, onLike, index, onOpenLightBox }) {
    const { title, image, video } = media;
    const [countLike, setCountLike] = useState(media.likes);
    const [isLiked, setIsLiked] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLike = async () => {
        try {
            const liked = JSON.parse(localStorage.getItem("likedMedias") || "[]");
            if (isLiked) {
                const updated = liked.filter((id) => id !== media.id);
                localStorage.setItem("likedMedias", JSON.stringify(updated));
                setCountLike(count => count - 1);
                await unlikeMedia(media.id);
                onLike(-1);
            } else {
                localStorage.setItem("likedMedias", JSON.stringify([...liked, media.id]));
                setCountLike(count => count + 1);
                await likeMedia(media.id);
                onLike(1);
            }
            setIsLiked(prev => !prev);
        } catch (error) {
            console.error("Erreur like:", error);
        }
    };

    return (
        <article className="flex flex-col gap-2 w-87.5 h-87.75">

            <div className="relative w-87.5 h-75">
                {/* Spinner */}
                {isLoading && <Spinner />}

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