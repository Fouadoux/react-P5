import { PrismaClient } from '../generated/prisma/client';
import path from 'path';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${path.join(process.cwd(), 'prisma/dev.db')}`
    }
  }
});

export const getAllPhotographers = () => prisma.photographer.findMany();
export const getPhotographer = (id) =>
  prisma.photographer.findUnique({
    where: { id },
  });
export const getAllMediasForPhotographer = (photographerId) =>
  prisma.media.findMany({
    where: { photographerId },
  });
export const updateNumberOfLikes = (mediaId, newNumberOfLikes) =>
  prisma.media.update({
    where: { id: mediaId },
    data: { likes: newNumberOfLikes },
  });