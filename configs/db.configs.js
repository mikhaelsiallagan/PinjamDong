const { Client } = require('pg');


//Insiasi koneksi ke database
const db = new Client({
    user: 'rafiwirasena03',
    host: 'ep-polished-paper-833771.ap-southeast-1.aws.neon.tech',
    database: 'pinjamdong',
    password: 'gm7MG0AuqWYI',
    port: 5432,
    sslmode: 'require',
    ssl: true,
});

//Melakukan koneksi dan menunjukkan indikasi database terhubung
db.connect((err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Database PinjamDong Connected');
});

module.exports = db