import Database from 'better-sqlite3';
import fs from 'fs';

const db = new Database('./prisma/dev.db');

const photographers = db.prepare('SELECT * FROM Photographer').all();
const medias = db.prepare('SELECT * FROM Media').all();

let sql = '';

photographers.forEach(p => {
    sql += `INSERT INTO Photographer (id, name, city, country, tagline, price, portrait) VALUES (${p.id}, '${p.name}', '${p.city}', '${p.country}', '${p.tagline}', ${p.price}, '${p.portrait}');\n`;
});

medias.forEach(m => {
    const image = m.image ? `'${m.image}'` : 'NULL';
    const video = m.video ? `'${m.video}'` : 'NULL';
    sql += `INSERT INTO Media (id, photographerId, title, image, video, likes, date, price) VALUES (${m.id}, ${m.photographerId}, '${m.title}', ${image}, ${video}, ${m.likes}, '${m.date}', ${m.price});\n`;
});

fs.writeFileSync('export.sql', sql);
console.log('Export done!');