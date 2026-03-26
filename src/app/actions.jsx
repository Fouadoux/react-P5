"use server"
import { incrementLikes, decrementLikes } from "./prisma-db";

export async function likeMedia(mediaId, delta) {
    if (delta === 1) {
        await incrementLikes(mediaId);
    } else {
        await decrementLikes(mediaId);
    }
}