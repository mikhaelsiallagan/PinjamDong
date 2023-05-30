//import packages
const express = require('express');
//const session = require('express-session');
const bodyParser = require('body-parser');

//inisialsi penggunaan 
const app = express();
const router = express.Router();
const { Client } = require('pg');
const bcrypt = require('bcrypt');
const db = require('./configs/db.configs.js');


//routing TABEL BUKU
//menampilkan daftar buku
app.get('/listbuku',(req,res)=>{
    db.query('SELECT * FROM buku', (err,results)=>{
        if(err){
            console.log(err)
            return
        }
        res.send(results.rows)
    })
})

//menambahkan daftar buku
app.post('/tambahbuku',(req,res)=>{
   const {judul, penulis, penerbit, tahun_terbit, jumlah_halaman, kategori} = req.body;
    db.query(`INSERT INTO buku (judul, penulis, penerbit, tahun_terbit, jumlah_halaman, kategori) VALUES ('${judul}', '${penulis}', '${penerbit}', ${tahun_terbit}, ${jumlah_halaman}, '${kategori}')`,
    (err)=>{
        if(err){
            console.log(err)
            return
        }
        res.send("Berhasil Menambahkan Data")
    })
})

//mengupdate daftar buku
app.put('/updatebuku',(req,res)=>{
    const {buku_id, judul, penulis, penerbit, tahun_terbit, jumlah_halaman, kategori} = req.body
    db.query(`UPDATE buku SET judul='${judul}', penulis='${penulis}', penerbit='${penerbit}', tahun_terbit='${tahun_terbit}', jumlah_halaman='${jumlah_halaman}', kategori='${kategori}' WHERE buku_id=${buku_id}`,
    (err)=>{
        if(err){
            console.log(err)
            return
        }
        res.send(`Data Buku dengan ID ${buku_id} berhasil diupdate`)
    })
})

//menghapus daftar buku
app.delete('/deletebuku',(req,res)=>{
        const { buku_id, judul, penulis, penerbit, tahun_terbit, jumlah_halaman, kategori } = req.body;
        db.query(`DELETE FROM buku WHERE buku_id=${buku_id}`,(err)=>{
        if(err){
            console.log(err)
            return
        }
        res.send(`Berhasil Menghapus Buku dengan ID ${buku_id}`)
    })
})

//melakukan pencarian buku berdasarkan judul
app.get('/carijudulbuku',(req,res)=>{
    const { judul } = req.body;
    db.query(`SELECT * FROM buku WHERE judul LIKE '%${judul}%'`,(err,results)=>{
        if(err){
            console.log(err)
            return
        }
        res.send(results.rows)
    })

})

//melakukan pencarian buku berdasarkan penulis
app.get('/caripenulisbuku',(req,res)=>{
    const { penulis } = req.body;
    db.query(`SELECT * FROM buku WHERE penulis LIKE '%${penulis}%'`,(err,results)=>{
        if(err){
            console.log(err)
            return
        }
        res.send(results.rows)
    })
})

//routing TABEL PINJAM_BUKU

//routing TABEL PEMINJAM

//routing TABEL RATING




// //Insiasi koneksi ke database
app.listen(process.env.PORT || 6320, () => {
    console.log(`App Started on PORT ${process.env.PORT || 6320}`);
});


