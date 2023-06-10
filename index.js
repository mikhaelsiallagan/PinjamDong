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

app.use(express.static('public'));

var temp;

//routing TABEL BUKU
//menampilkan daftar buku
router.get('/listbuku',(req,res)=>{
    db.query('SELECT * FROM buku', (err,results)=>{
        if(err){
            console.log(err)
            return
        }
        //res.send(results.rows)
        //res.json({ success: true, message: 'Data Found' });
        res.json({message: 'Data Found', showItems: results.rows});
    })
})

router.get('/satubuku',(req,res)=>{
    db.query(`SELECT * FROM buku where buku_id='${buku_id}'`, (err,results)=>{
        if(err){
            console.log(err)
            return
        }
        //res.send(results.rows)
        //res.json({ success: true, message: 'Data Found' });
        res.json({message: 'Data Found', showItems: results.rows});
    })
})

//menambahkan daftar buku
router.post('/tambahbuku',(req,res)=>{
    temp = req.session;
    temp.judul = req.body.judul;
    temp.penulis = req.body.penulis;
    temp.penerbit = req.body.penerbit;
    temp.tahun_terbit = req.body.tahun_terbit;
    temp.jumlah_halaman = req.body.jumlah_halaman;
    temp.kategori_buku = req.body.kategori_buku;
    temp.status = req.body.status;
    if(temp.judul.length == 0 || temp.penulis.length == 0 || temp.penerbit.length == 0 || temp.tahun_terbit.length == 0 || temp.jumlah_halaman.length == 0 || temp.kategori_buku.length == 0 || temp.status.length == 0){
        console.log("Tambah Buku Gagal, Data Buku Tidak Lengkap")
        return
    }
   const {judul, penulis, penerbit, tahun_terbit, jumlah_halaman, kategori_buku, status} = req.body;
    db.query(`INSERT INTO buku (judul, penulis, penerbit, tahun_terbit, jumlah_halaman, kategori_buku, status) VALUES ('${judul}', '${penulis}', '${penerbit}', ${tahun_terbit}, ${jumlah_halaman}, '${kategori_buku}', '${status}')`,
    (err)=>{
        if(err){
            console.log(err)
            return
        }
        res.send("Berhasil Menambahkan Data Buku")
    })
})

//mengupdate daftar buku
router.put('/updatebuku',(req,res)=>{
    temp = req.session;
    temp.buku_id = req.body.buku_id;
    temp.judul = req.body.judul;
    temp.penulis = req.body.penulis;
    temp.penerbit = req.body.penerbit;
    temp.tahun_terbit = req.body.tahun_terbit;
    temp.jumlah_halaman = req.body.jumlah_halaman;
    temp.kategori_buku = req.body.kategori_buku;
    temp.status = req.body.status;
    if(temp.judul.length == 0 || temp.penulis.length == 0 || temp.penerbit.length == 0 || temp.tahun_terbit.length == 0 || temp.jumlah_halaman.length == 0 || temp.kategori_buku.length == 0 || temp.status.length == 0){
        console.log("Update Buku Gagal, Data Buku Tidak Lengkap")
        return
    }
    const {buku_id, judul, penulis, penerbit, tahun_terbit, jumlah_halaman, kategori_buku, status} = req.body
    db.query(`UPDATE buku SET judul='${judul}', penulis='${penulis}', penerbit='${penerbit}', tahun_terbit='${tahun_terbit}', jumlah_halaman='${jumlah_halaman}', kategori_buku='${kategori_buku}', status='${status}' WHERE buku_id=${buku_id}`,
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

    const { buku_id } = req.body;
    db.query(`DELETE FROM buku WHERE buku_id=${buku_id}`,(err)=>{
    if(err){
        console.log(err)
        return
    }
    res.send(`Berhasil Menghapus Buku dengan ID ${buku_id}`)
    })
})

//melakukan pencarian buku berdasarkan judul
router.get('/cari',(req,res)=>{
    const { judul, penulis } = req.body;
    db.query(`SELECT * FROM buku WHERE judul ILIKE '%${judul}%' OR penulis ILIKE '%${penulis}%'`,(err,results)=>{
        if(err){
            console.log(err)
            err.send("Pencarian Gagal")
            return
        }
        res.send(results.rows)
    })

})

//routing TABEL PINJAM_BUKU
//membuat pinjaman buku
router.post('/tambahpinjaman',(req,res)=>{
    temp = req.session;
    temp.peminjam_id = req.body.peminjam_id;
    temp.judul = req.body.judul;
    if(temp.peminjam_id.length == 0 || temp.judul.length == 0){
        console.log("Tambah Pinjaman Gagal, Data Pinjaman Tidak Lengkap")
        return
    }
    const { peminjam_id, judul, tanggal_pinjam, tanggal_kembali  } = req.body;
    db.query(`select * from buku where judul = '${judul}' and status='${'Tersedia'}'`, (err,results)=>{
        if(err){
            console.log(err)
             return
         }
         if(results.rowCount == 0){
             res.send("Buku tidak tersedia")
             return
         } else {

            db.query(`INSERT INTO pinjam_buku(peminjam_id, judul, tanggal_pinjam, tanggal_kembali) VALUES ('${peminjam_id}', '${judul}', '${tanggal_pinjam}', date '${tanggal_pinjam}' + 14)`,
            (err)=>{
            if(err){
                console.log(err)
                return
            }
            console.log("Berhasil menambahkan pinjaman buku")
         db.query(`UPDATE buku SET status='Tidak Tersedia' WHERE judul='${judul}'`,
         (err)=>{
         if(err){
             console.log(err)
             console.log("Berhasil Mengupdate status buku")
             return
         }
         console.log(`Berhasil menambahkan pinjaman buku '${judul}'`)
         res.send("Buku Tersedia")
         return
         })
     })
    }
    })
 })
 
 //mengupdate status buku pinjam
router.put('/updatestatuspinjam',(req,res)=>{
    const { judul } = req.body
    db.query(`UPDATE buku SET status='${'Tidak Tersedia'}' WHERE judul='${judul}'`,
    (err)=>{
    if(err){
        console.log(err)
        return
        }
        res.send(`Status Buku dengan judul ${judul} berhasil diupdate`)
    })
})

 //mengupdate status buku selsai
router.post('/updatestatuselesai',(req,res)=>{
    temp = req.session;
    temp.judul = req.body.judul;
    if(temp.judul.length == 0){
        console.log("Update Status Gagal, Data Buku Tidak Lengkap")
        return
    }
    const { judul, rating_buku, review } = req.body
    db.query(`UPDATE buku SET status='${'Tersedia'}' WHERE judul='${judul}'`,
    (err)=>{
    if(err){
        console.log(err)
        return
        }
        console.log("Berhasil Mengupdate status buku")
        //const { rating_buku, review } = req.body;
        db.query(`INSERT INTO rating (judul, rating_buku, review) VALUES ('${judul}', '${rating_buku}', '${review}')`,
        (err)=>{
            if(err){
                console.log(err)
                return
            }
            res.send("Berhasil Menambahkan Rating")
        })
    })
})

 //routing TABEL ADMIN
//melakukan registrasi admin
router.post('/registeradmin', (req, res) => {
    const {name, email, password} = req.body
    temp = req.session;
    temp.username = req.body.username;
    temp.password = req.body.password;
    const saltRounds = 10
    //melakukan konfigurasi bycrpty disini
    bcrypt.hash(temp.password, 8, (err, hashedPassword) => {
        if (err) {
            alert("Hash Gagal")
            return;
        }
        //melakukan registrasi user baru ke dalam database
        const query = `INSERT INTO admin (username, password) VALUES
        ('${temp.username}', '${hashedPassword}');`
        db.query(query, (err, results) => {
            if (err) {
                console.error(err);
                alert("Registrasi Gagal");
                return;
              } else {
                console.log(results);
                console.log("Registrasi Berhasil");
              }
        });
    });
    
    res.end('done');
});

//melakukan logim peminjam
router.post('/loginadmin', (req, res) => {
    temp = req.session;
    const query = ""; //query ambil data user untuk login

    //mengecek informasi yang dimasukkan user apakah terdaftar pada database
    db.query(query, (err, results) => {
       //tambahkan konfigurasi login di sini
        const username = req.body.username;
        const password = req.body.password;

        // Retrieve the hashed password from the database for the given username
        const query = `SELECT password FROM admin WHERE username = '${username}'`;
        db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query', err.stack);
            return res.send('fail'); // Return 'fail' if an error occurs during the query execution
        }

        if (results.rows.length === 0) {
            return res.send('fail-username'); // Return 'fail-username' if the username is not found
        }

        const hashedPassword = results.rows[0].password;

        // Compare the provided password with the hashed password
        bcrypt.compare(password, hashedPassword, (err, passwordMatch) => {
            if (err) {
            console.error('Error comparing passwords', err);
            return res.send('fail'); // Return 'fail' if an error occurs during password comparison
            }

            if (passwordMatch) {
            // Set the user's username and visits in the session
            req.session.username = username;
            //req.session.visits = 1;

            return res.send('Admin Berhasil melakukan login'); // Return 'done' if login is successful
            } else {
            return res.send('fail-password'); // Return 'fail-password' if the password is incorrect
            }
        });
    });
});
});

//routing TABEL PEMINJAM
//melakukan logim peminjam
router.post('/login', (req, res) => {
    temp = req.session;
    const query = ""; //query ambil data user untuk login

    //mengecek informasi yang dimasukkan user apakah terdaftar pada database
    db.query(query, (err, results) => {
       //tambahkan konfigurasi login di sini
        const email = req.body.email;
        const password = req.body.password;
        //const peminjam_id = req.body.peminjam_id;

        // Retrieve the hashed password from the database for the given username
        const query = `SELECT password, peminjam_id FROM peminjam WHERE email = '${email}'`;
        db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query', err.stack);
            return res.send('fail'); // Return 'fail' if an error occurs during the query execution
        }

        if (results.rows.length === 0) {
            return res.send('fail-username'); // Return 'fail-username' if the username is not found
        }

        const hashedPassword = results.rows[0].password;
        const peminjam_id = results.rows[0].peminjam_id;

        // Compare the provided password with the hashed password
        bcrypt.compare(password, hashedPassword, (err, passwordMatch) => {
            if (err) {
            console.error('Error comparing passwords', err);
            return res.send('fail'); // Return 'fail' if an error occurs during password comparison
            }

            if (passwordMatch) {
            // Set the user's username and visits in the session
            req.session.email = email;
            req.session.password = password;
            req.session.peminjam_id = peminjam_id;
            req.session.visits = 1;

            return res.json({ success: true, message: 'Login successful' });
            
            } else {
            return res.send('fail-password'); // Return 'fail-password' if the password is incorrect
            }
        });
    });
});
});

//melakukan registrasi peminjam
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    temp = req.session;
    temp.name = req.body.name;
    temp.email = req.body.email;
    temp.password = req.body.password;
    const saltRounds = 10;
    // Perform bcrypt configuration here
    bcrypt.hash(temp.password, 8, (err, hashedPassword) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Hashing failed' });
            return;
        }
        // Perform registration of the new user into the database
        const query = `INSERT INTO peminjam (name, email, password) VALUES
        ('${temp.name}', '${temp.email}', '${hashedPassword}');`;
        db.query(query, (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ success: false, message: 'Registration failed' });
                return;
            } else {
                console.log(results);
                console.log('Registration successful');
                res.json({ success: true, message: 'Registration successful' });
            }
        });
    });
});


//mengupdate akun peminjam
router.put('/updatepeminjam',(req,res)=>{
    const { peminjam_id, name, email, password } = req.body
    //temp.password = req.body.password;
        const saltRounds = 10
        //melakukan konfigurasi bycrpty disini
        bcrypt.hash(password, 8, (err, hashedPassword) => {
            if (err) {
                alert("Hash Gagal")
            return;
            }
            db.query(`UPDATE peminjam SET name='${name}', email='${email}', password='${hashedPassword}'WHERE peminjam_id=${peminjam_id}`,
            (err)=>{
                if(err){
                    console.log(err)
                    return
                }
        
                res.send(`Data peminjam dengan ID ${peminjam_id} berhasil diupdate`)
            })
        });
})

//menghapus akun peminjam
router.delete('/deletepeminjam',(req,res)=>{
    const { peminjam_id } = req.body;
    db.query(`DELETE FROM peminjam WHERE peminjam_id=${peminjam_id}`,(err)=>{
        if(err){
            console.log(err)
            return
        }
        res.send(`Berhasil Menghapus data Peminjam dengan ID ${peminjam_id}`)
    })
})

//routing TABEL RATING
router.post('/tambahratingbuku',(req,res)=>{
    temp = req.session;
    temp.buku_id = req.body.buku_id;
    temp.judul = req.body.judul;
    if(temp.buku_id.length == 0 || temp.judul.length == 0){
        console.log("Tambah Rating Gagal, Data Buku Tidak Lengkap")
        return
    }
    const { buku_id, judul, rating_buku, review } = req.body;
     db.query(`INSERT INTO rating (buku_id, judul, rating_buku, review) VALUES ('${buku_id}', '${judul}', '${rating_buku}', '${review}')`,
     (err)=>{
         if(err){
             console.log(err)
             return
         }
         res.send("Berhasil Menambahkan Rating")
     })
 })

 router.get('/listrating',(req,res)=>{
    db.query('SELECT judul, rating_buku, review FROM Rating;', (err,results)=>{
        if(err){
            console.log(err)
            return
        }
        res.send(results.rows)
    })
})

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.end('error')
            return 
        }
        res.end('logout')
    });
});

app.get('/session', (req, res) => {
    const sessionData = req.session;
    res.json(sessionData);
});

app.use('/', router);

// //Insiasi koneksi ke database
app.listen(process.env.PORT || 6320, () => {
    console.log(`App Started on PORT ${process.env.PORT || 6320}`);
});


