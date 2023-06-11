# PinjamDong

## Proyek Akhir Praktikum Sistem Basis Data
Proyek ini dibuat oleh kelompok X24 yang terdiri dari :

1. [*Rafi Fauzan Wirasena*](https://github.com/Rafi2603)
2. [*Mikhael Morris Hapataran Siallagan*](https://github.com/mikhaelsiallagan)
3. [*Nevanda Fairuz Pahlevi*](https://github.com/nevandaa)

---
## Gambaran Umum
PinjamDong adalah website untuk meminjam buku secara online. Pengguna dapat mengakses berbagai macam buku yang tersedia dalam database PinjamDong dan melakukan reservasi peminjaman buku sesuai dengan ketentuan yang berlaku.

---
## Penjelasan Tabel 
### 1. ```Buku``` 

Tabel buku menyimpan data semua ```Buku``` yang tersedia di database PinjamDong. Tabel ini memiliki attributes sebagai berikut :  
```
1.  buku_id
2.  judul
3.  penulis
4.  penerbit
5.  tahun_terbit
6.  jumlah_halaman
7.  kategori_buku
8.  status
```

### 2. ```Pinjam_buku``` 

Tabel pinjam_buku menyimpan data saat user melakukan ```Pinjam_buku``` dari website. Tabel ini memiliki attributes sebagai berikut :          
```
1.  pinjam_buku_id
2.  peminjam_id
3.  buku_id
4.  tanggal_pinjam
5.  tanggal_kembali
```

### 3. ```Peminjam```

Tabel peminjam menyimpan data ```Peminjam``` saat melakukan registrasi di website. Tabel ini memiliki attributes sebagai berikut :       
```
1.  peminjam_id
2.  name
3.  email
4.  password
```

### 4. ```Rating```

Tabel Rating menyimpan data ```Rating``` pada buku di website. Tabel ini memiliki attributes sebagai berikut :  
```
1.  rating_id
2.  buku_id
3.  judul
4.  rating_buku
5.  review
```
### 5. ```Admin```

Tabel Admin menyimpan data ```Admin``` pada buku di website. Tabel ini memiliki attributes sebagai berikut :  
```
1.  admin_id
2.  username
3.  password
```
---
## Relation Table dan UML
<details>
    <summary> Relation Table dan UML
    View:</summary>

```Relational Table or ERD:```

![alt text](https://github.com/SistemBasisData2023/PinjamDong/blob/main/Information/ERD_PinjamDong.png)

```UML:```
![alt text](https://github.com/SistemBasisData2023/PinjamDong/blob/main/Information/UML_PinjamDong.png)

</details>
---

## FlowChart
<details>
    <summary> Flowchart
    View:</summary>

```Flowchart User:```

![alt text](https://github.com/SistemBasisData2023/PinjamDong/blob/main/Information/Flowchart_User_PinjamDong.png)

```Flowchart Admin:```

![alt text](https://github.com/SistemBasisData2023/PinjamDong/blob/main/Information/Flowchart_Admin_PinjamDong.png)


</details>
---



