# PinjamDong

## Proyek Akhir Praktikum Sistem Basis Data
Proyek ini dibuat oleh kelompok X24 yang terdiri dari :

1. [*Rafi Fauzan Wirasena*](https://github.com/Rafi2603)
2. [*Mikhael Morris Hapataran Siallagan*](https://github.com/mikhaelsiallagan)
3. [*Nevanda Fairuz Pahlevi*](https://github.com/nevandaa)

---
## Gambaran Umum Program

---
## Penjelasan Tabel 
### 1. ```Buku``` 

Tabel buku menyimpan data semua ```Buku``` yang tersedia di database PinjamDong. Tabel ini memiliki attributes sebagai berikut :  
```
1.	buku_id
2.	penulis
3.	penerbit
4.	tahun_terbit
5.	jumlah_halaman
6.	kategori
```

### 2. ```Pinjam_buku``` 

Tabel pinjam_buku menyimpan data saat user melakukan ```Pinjam_buku``` dari website. Tabel ini memiliki attributes sebagai berikut :          
```
1.	peminjam_id
2.	buku_id
3.	tanggal_pinjam
4.	tanggal_kembali
```

### 3. ```Peminjam```

Tabel peminjam menyimpan data ```user``` saat melakukan registrasi di website. Tabel ini memiliki attributes sebagai berikut :       
```
1.	peminjam_id
2.	nama (First name)
3.	nama (Last name)
4.	email
5.	password
6.	alamat
7.	no telepon
```

### 4. ```Rating```

Tabel Rating menyimpan data ```Rating``` pada buku di website. Tabel ini memiliki attributes sebagai berikut :  
```
1.	buku_id
2.	nama buku
3.	rating
4.	review
```

---




