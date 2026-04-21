import {createClient} from '@libsql/client';
import {DataBaseError} from "@/app/errors.jsx";

// Client LibSQL connecté à la base Turso via les variables d'environnement
const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

export const getAllPhotographers = async () => {
    try {
        const result = await client.execute("SELECT * FROM Photographer");
        // Conversion des rows en objets JS simples
        return result.rows.map(row => ({ ...row }));
    } catch (error) {
        console.error("Erreur DB getAllPhotographers:", error);
        throw new DataBaseError("Impossible de récupérer les photographes");
    }
};

export const getPhotographer = async (id) => {
    try {
        // Requête paramétrée avec ? pour éviter les injections SQL
        const result = await client.execute({
            sql: "SELECT * FROM Photographer WHERE id = ?",
            args: [id],
        });
        return result.rows[0] ? { ...result.rows[0] } : null;
    } catch (error) {
        console.error("Erreur DB getPhotographer:", error);
        throw new DataBaseError("Impossible de récupérer le photographe");
    }
};

export const getAllMediasForPhotographer = async (photographerId) => {
    try {
        const result = await client.execute({
            sql: "SELECT * FROM Media WHERE photographerId = ?",
            args: [photographerId],
        });
        return result.rows.map(row => ({ ...row }));
    } catch (error) {
        console.error("Erreur DB getAllMediasForPhotographer:", error);
        throw new DataBaseError("Impossible de récupérer les médias");
    }
};

export const incrementLikes = async (mediaId) => {
    try {
        await client.execute({
            sql: "UPDATE Media SET likes = likes + 1 WHERE id = ?",
            args: [mediaId],
        });
    } catch (error) {
        console.error("Failed to increment likes:", error);
        throw new DataBaseError("Impossible de mettre à jour les likes");
    }
};

export const decrementLikes = async (mediaId) => {
    try {
        await client.execute({
            sql: "UPDATE Media SET likes = likes - 1 WHERE id = ?",
            args: [mediaId],
        });
    } catch (error) {
        console.error("Failed to decrement likes:", error);
        throw new DataBaseError("Impossible de mettre à jour les likes");
    }
};
