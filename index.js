//import packages
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
 
//initialize the app as an express app
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');

//memanggil fungsi koneksi database 
const db = require('./configs/db.configs.js');

//middleware (session)
app.use(
    session({
        secret: 'ini contoh secret',
        saveUninitialized: false,
        resave: false
    })
);
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

var temp;

//routing TABEL BUKU
//menampilkan daftar buku
router.get('/listbuku',(req,res)=>{
    db.query('SELECT * FROM buku', (err,results)=>{
        if(err){
            console.log(err)
            return
        }
        res.send(results.rows)
    })
})

//menambahkan daftar buku
router.post('/tambahbuku',(req,res)=>{
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
router.put('/updatebuku',(req,res)=>{
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
router.delete('/deletebuku',(req,res)=>{
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
router.get('/carijudulbuku',(req,res)=>{
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
router.get('/caripenulisbuku',(req,res)=>{
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
//membuat pinjaman buku

//routing TABEL PEMINJAM
//login
router.post('/login', (req, res) => {
    temp = req.session;
    temp.nama_first_name = req.body.nama_first_name;
    temp.nama_last_name = req.body.nama_last_name;
    temp.password = req.body.pass;
    const query = `SELECT password FROM peminjam WHERE nama_first_name AND nama_last_name LIKE '${temp.nama_first_name}', '${temp.nama_last_name}', `;  //query ambil data user untuk login

    //mengecek informasi yang dimasukkan user apakah terdaftar pada database
    db.query(query, (err, results) => {
       //tambahkan konfigurasi login di sini
       console.log(results.rows[0].password);
	   if(err){
		   alert('Maaf, Login Gagal!');
		   res.edm('fail')
	   }

       bcrypt.compare(temp.password, results.rows[0].password,
        (err, result) => {
            if(err){
                res.end('fail');
            }
            res.end('done');
        });
    });
 
});

//register
router.post('/register', (req, res) => {
    const { nama_first_name, nama_last_name, email, password, alamat, no_telepon } = req.body;
        const query = `INSERT INTO peminjam (nama_first_name, nama_last_name, email, password, alamat, is_admin, no_telepon) VALUES ( '${nama_first_name}','${nama_last_name}', '${email}', '${password}', '${alamat}', '${true}', '${no_telepon}'); `;
        db.query(query, (err, results) => {
            if (err){
                console.error(err);
                alert('Registrasi gagal dilakukan!')
                return;
            }else{
                console.log(results);
                console.log("Data insert berhasil");
            }
        });
    res.end('done');
});

//routing TABEL RATING



app.use('/', router);

// //Insiasi koneksi ke database
app.listen(process.env.PORT || 6320, () => {
    console.log(`App Started on PORT ${process.env.PORT || 6320}`);
});


