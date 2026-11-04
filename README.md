# jakasembung-website
Website resmi Jakasembung

## Membuat artikel baru

Salin `templates/template-artikel.md` ke folder `articles/`, lalu sesuaikan judul file, judul artikel, kategori, tanggal, ringkasan, dan permalink. Gunakan slug yang sama pada nama file dan permalink, serta perbarui tanggal `updated` setiap kali artikel diperbarui.

## Menambahkan gambar ke artikel

Simpan file gambar di folder `images/` pada root proyek. Folder ini disalin ke `/images/` di situs. Gunakan path absolut dari root situs di Markdown:

```md
![Deskripsi gambar](/images/nama-gambar.jpg)
```

Tag HTML `<img>` juga didukung. Untuk file dengan spasi pada namanya, tulis spasi sebagai `%20` pada URL, misalnya `/images/img%201.jpeg`.

## Mengaktifkan komentar publik

Setiap artikel menyediakan diskusi publik dengan balasan bertingkat. Pengunjung dapat membaca komentar tanpa login; untuk menulis atau membalas, mereka harus masuk dengan akun Google. Nama profil Google ditampilkan, tetapi alamat email tidak disertakan pada komentar atau ditampilkan kepada pengunjung lain. Formulir WhatsApp tetap tersedia secara terpisah untuk komentar pribadi.

Komentar publik menggunakan Firebase Authentication dan Cloud Firestore. Agar fitur aktif:

1. Buat proyek Firebase dan daftarkan aplikasi web.
2. Di **Authentication → Sign-in method**, aktifkan penyedia **Google**.
3. Tambahkan domain produksi situs dan `localhost` ke **Authentication → Settings → Authorized domains**.
4. Buat database Cloud Firestore.
5. Salin `apiKey`, `authDomain`, `projectId`, dan `appId` dari konfigurasi aplikasi web ke `_data/firebase.json`. Konfigurasi aplikasi web Firebase digunakan oleh browser dan bukan kunci server rahasia.
6. Terapkan aturan dari `firestore.rules` dan indeks dari `firestore.indexes.json`. Dengan Firebase CLI yang sudah diarahkan ke proyek tersebut, jalankan `firebase deploy --only firestore:rules,firestore:indexes`.

Aturan Firestore mengizinkan pembacaan komentar publik, membatasi penulisan kepada akun Google, membatasi panjang komentar, menerima URL artikel yang diawali `/articles/`, dan memastikan balasan merujuk ke komentar pada artikel yang sama. Komentar tidak dapat diedit atau dihapus lewat klien. Tanpa konfigurasi Firebase, komentar publik menampilkan pemberitahuan bahwa fitur belum aktif; formulir WhatsApp tetap dapat digunakan.
