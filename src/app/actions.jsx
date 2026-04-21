"use server"
// "use server" expose ces fonctions comme des Server Actions Next.js :
// elles s'exécutent côté serveur mais peuvent être appelées depuis un composant client
import { incrementLikes, decrementLikes } from "./DB-client.js";

export async function likeMedia(mediaId) {
    // Validation de l'ID avant toute opération en base
    if (isNaN(mediaId) || mediaId <= 0) throw new Error("Invalid media ID");
    await incrementLikes(mediaId);
}

export async function unlikeMedia(mediaId) {
    if (isNaN(mediaId) || mediaId <= 0) throw new Error("Invalid media ID");
    await decrementLikes(mediaId);
}
