"use client"
import Image from "next/image";
import {useEffect, useState} from "react";
import {likeMedia, unlikeMedia} from "@/app/actions.jsx";
import Spinner from "@/components/Spinner/Spinner.jsx";

export default function PhotographerMedia({ media, onLike, index, onOpenLightBox }) {
    const { title, image, video } = media;
    const [countLike, setCountLike] = useState(media.likes);
    const [isLiked, setIsLiked] = useState(false);
    // mounted permet d'éviter un mismatch SSR/client sur l'aria-label et aria-pressed
    // du bouton like (localStorage n'existe pas côté serveur)
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Initialisation depuis localStorage au montage du composant
    // Permet de restaurer l'état liké après un refresh de page
    useEffect(() => {
        const liked = JSON.parse(localStorage.getItem("likedMedias") || "[]");
        setIsLiked(liked.includes(media.id));
        setMounted(true);
    }, [media.id]);

    const handleLike = async () => {
        // Optimistic update : on sauvegarde l'état avant modification
        // pour pouvoir annuler si le serveur échoue
        const previousCount = countLike;
        const previousIsLiked = isLiked;
        const previousLiked = JSON.parse(localStorage.getItem("likedMedias") || "[]");

        try {
            if (isLiked) {
                // Supprime l'ID du tableau de likes persisté
                const updated = previousLiked.filter((id) => id !== media.id);
                localStorage.setItem("likedMedias", JSON.stringify(updated));
                setCountLike(count => count - 1);
                setIsLiked(false);
                onLike(-1);
                await unlikeMedia(media.id);
            } else {
                localStorage.setItem("likedMedias", JSON.stringify([...previousLiked, media.id]));
                setCountLike(count => count + 1);
                setIsLiked(true);
                onLike(1);
                await likeMedia(media.id);
            }
        } catch (error) {
            // Rollback complet : UI + localStorage remis à leur état d'origine
            setCountLike(previousCount);
            setIsLiked(previousIsLiked);
            onLike(previousIsLiked ? 1 : -1);
            localStorage.setItem("likedMedias", JSON.stringify(previousLiked));
            console.error("Erreur like:", error);
        }
    };

    return (
        <article className="flex flex-col gap-2 w-87.5 h-87.75">

            <div className="relative w-87.5 h-75">
                {isLoading && <Spinner />}

                {video ? (
                    <video
                        src={`/images/${video}`}
                        aria-label={`Vidéo : ${title}`}
                        className="w-full h-full object-cover rounded-lg cursor-pointer"
                        onClick={() => onOpenLightBox(index)}
                        onLoadedData={() => setIsLoading(false)}
                    />
                ) : (
                    // role="button" + tabIndex sur une div pour rendre l'image cliquable
                    // au clavier (une div n'est pas focusable nativement)
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
                            onLoad={() => setIsLoading(false)}
                        />
                    </div>
                )}
            </div>

            <div className="flex justify-between gap-2">
                {/* min-w-0 permet au titre de rétrécir dans le flex container (nécessaire pour truncate) */}
                <h2 className="text-red-700 text-[24px] truncate min-w-0">{title}</h2>
                <div className="flex items-center gap-1 shrink-0">
                    <span className="text-red-700 text-[24px]" aria-label={`${countLike} likes`}>
                        {countLike}
                    </span>
                    <button
                        onClick={handleLike}
                        // aria-label et aria-pressed conditionnels à mounted pour éviter
                        // le mismatch SSR/client (localStorage indisponible côté serveur)
                        aria-label={mounted ? (isLiked ? `Ne plus aimer ${title}` : `Aimer ${title}`) : `Aimer ${title}`}
                        aria-pressed={mounted ? isLiked : false}
                        suppressHydrationWarning
                    >
                        <Image
                            src={isLiked ? "/icons/favorite-24px 1.png" : "/icons/favorite-empty.png"}
                            alt=""
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
