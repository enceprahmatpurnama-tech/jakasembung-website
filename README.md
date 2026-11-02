# jakasembung-website
Website resmi Jakasembung

## Menambahkan gambar ke artikel

Simpan file gambar di folder `images/` pada root proyek. Folder ini disalin ke `/images/` di situs. Gunakan path absolut dari root situs di Markdown:

```md
![Deskripsi gambar](/images/nama-gambar.jpg)
```

Tag HTML `<img>` juga didukung. Untuk file dengan spasi pada namanya, tulis spasi sebagai `%20` pada URL, misalnya `/images/img%201.jpeg`.
