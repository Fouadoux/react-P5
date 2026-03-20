"use server"
import { updateNumberOfLikes } from "./prisma-db";

export async function likeMedia(mediaId, newLikes) {
    await updateNumberOfLikes(mediaId, newLikes);
}