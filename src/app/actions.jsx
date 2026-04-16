"use server"
import { incrementLikes, decrementLikes } from "./prisma-client.js";

export async function likeMedia(mediaId) {
    if (isNaN(mediaId) || mediaId <= 0) throw new Error("Invalid media ID");
    await incrementLikes(mediaId);
}

export async function unlikeMedia(mediaId) {
    if (isNaN(mediaId) || mediaId <= 0) throw new Error("Invalid media ID");
    await decrementLikes(mediaId);
}