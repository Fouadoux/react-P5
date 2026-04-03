import {createClient} from '@libsql/client';

const client = createClient({
    url: "libsql://fisheye-fouadoux.aws-eu-west-1.turso.io",
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzUyMTYwMzMsImlkIjoiMDE5ZDUzMWUtNzEwMS03YTdjLTg2NzYtOTU3MDJkN2Q0ZWQ0IiwicmlkIjoiNDE1NTQ0OTctOTQyMC00YmEyLTg2MDgtODBiZTkzNGExZGY4In0.3KUIVJUTmhEfvTzaYB_0qhRklG3QMuMs0sUG2NjuZgtIrBYLBlhcew44VC_Bq3l3IW5ZFMZvRHwva4i-x3ElDw",
});

export const getAllPhotographers = async () => {
    const result = await client.execute("SELECT * FROM Photographer");
    return result.rows.map(row => ({...row}));
};

export const getPhotographer = async (id) => {
    const result = await client.execute({
        sql: "SELECT * FROM Photographer WHERE id = ?",
        args: [id],
    });
    return result.rows[0] ? {...result.rows[0]} : null;
};

export const getAllMediasForPhotographer = async (photographerId) => {
    const result = await client.execute({
        sql: "SELECT * FROM Media WHERE photographerId = ?",
        args: [photographerId],
    });
    return result.rows.map(row => ({...row}));
};

export const incrementLikes = async (mediaId) => {
    await client.execute({
        sql: "UPDATE Media SET likes = likes + 1 WHERE id = ?",
        args: [mediaId],
    });
};

export const decrementLikes = async (mediaId) => {
    await client.execute({
        sql: "UPDATE Media SET likes = likes - 1 WHERE id = ?",
        args: [mediaId],
    });
};