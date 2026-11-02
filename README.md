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
