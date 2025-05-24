document.addEventListener("DOMContentLoaded", function () {
  let tes = document.getElementById("absensiA");
  let suratIzinKu = document.getElementById("izinA");
  let tes3 = document.getElementById("rekapA");
  let tes4 = document.getElementById("pulangA");
  const welcomeHari = document.getElementById("welcome");
  const UserName = document.getElementById("nama");

  Home(tes, suratIzinKu, tes3, tes4, UserName, welcomeHari);
});

// controler
async function Home(tes, izin, tes3, tes4, UserName, welcomeHari) {
  console.log("Halaman telah dimuat!");

  setInterval(() => {
    tanggalWaktu(welcomeHari);
  }, 1000);

  let userValid = await userNameSiswa(tes, izin, tes3, tes4, UserName);
  if (userValid) {
    if (tes) {
      cekLokasi(tes);
    } else {
      console.warn("Element tidak ditemukan", tes);
    }

    if (izin) {
      suratIzin(izin);
    } else {
      console.warn("Element tidak ditemukan", izin);
    }
  }
}

// waktu
function tanggalWaktu(welcomeHari) {
  let now = new Date();
  let hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  let jam = new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    hour: "numeric",
    hour12: false,
  });
  let menit = now.getMinutes();
  let detik = now.getSeconds();
  let Nh = hari[now.getDay()];
  let tanggal = now.getDate();
  let bulan = now.toLocaleString("id-ID", { month: "long" });
  let tahun = now.getFullYear();
  const home = document.getElementById("span");

  let waktu;

  if (jam >= 3 && jam < 10) {
    waktu = "Selamat Pagi";
  } else if (jam >= 10 && jam < 15) {
    waktu = "Selamat Siang";
  } else if (jam >= 15 && jam < 18) {
    waktu = "Selamat Sore";
  } else {
    waktu = "Selamat Malam"; // Menangkap semua jam lainnya
  }

  if (welcomeHari) {
    welcomeHari.innerText = waktu;
    home.innerHTML = "Home";
  } else {
    console.log("Element tidak ditemukan");
  }

  return {
    hari: hari[now.getDay()],
    tanggal: now.getDate(),
    bulan: now.toLocaleString("id-ID", { month: "long" }),
    tahun: now.getFullYear(),
    // Mobail: mobailjam,
    waktu: waktu,
    jam: jam,
    menit: menit,
    Detik: detik,
  };
}

// Fungsi untuk memvalidasi nama pengguna
async function userNameSiswa(tes, tes2, tes3, tes4, UserName) {
  let namaUsernameYangTerdagtar = [
    "Admin Web",
    "Agus Adi Purnomo",
    "Choirunn Nisa",
    "Nabila Eka Ayu Saputri",
    "Lailita Al Hikmah",
  ];

  const { value: nama } = await Swal.fire({
    imageUrl: "./icon/card.gif",
    imageHeight: 150,
    imageWidth: 150,
    imageAlt: "Absen",
    title: "Masukkan nama lengkap",
    input: "text",
    inputPlaceholder: "Masukkan nama lengkap anda",
    allowOutsideClick: false,
    allowEscapeKey: false,
    showCancelButton: false,
    confirmButtonText: "Lanjut",
    inputValidator: (value) => {
      if (!value) {
        return "Nama tidak boleh kosong!";
      }
    },
  });

  // cek nama terdaftar atau tidak
  if (!namaUsernameYangTerdagtar.includes(nama)) {
    Swal.fire({
      icon: "warning",
      title: "Nama tidak terdaftar",
      text: "Silahkan hubungi, MAS PUR!!",
      confirmButtonText: "Whatsapp",
      allowOutsideClick: false,
    }).then(() => {
      let owner = "6288216796297";
      let permohonan = encodeURIComponent(
        "Halo Mas Pur, saya tidak bisa absen di web absen, tolong bantu saya untuk absen"
      );
      let url = `https://wa.me/${owner}?text=${permohonan}`;
      window.open(url, "_blank");

      setTimeout(() => {
        Swal.fire({
          icon: "warning",
          title: "Harus Login",
          text: "Silahkan Refresh Halaman",
          confirmButtonText: "Refresh",
          allowOutsideClick: false,
        }).then(() => {
          window.location.reload();
        });
      }, 3000);
    });

    return false;
  }

  // Jika nama valid, tampilkan UserName
  if (UserName) {
    UserName.style.display = "block";
    UserName.innerHTML = nama;
  }

  // peraturan alret

  await Swal.fire({
    icon: "info",
    title: "Peraturan SandiKomputer!",
    html: `
    
    <ol style="text-align: left;">
      <li> Jika tidak berangkat harus ada izin yang jelas.</li>
      <li> Melaksanakan jadwal piket yang di tentukan. </li>
      <li> Menjaga kebersihan tempat / toko. </li>
      <li> Menjaga etika dan sopan santun. </li>
      <li> Bersedia dikeluarakan saat sp lebih dari  3 (TIGA).</li>
      <li> Dilarang meninggalkan tempat tanpa izin </li>
      <li> Dilarang merusak fasilitas yang ada di ruangan. </li>
      <li> Apa bila merusak barang / fasilitas harus bersedia bertanggung jawan.</li>
      <li> Dilarang menggunakan aksesoris yang berlebihan.</li>
      <li> Menjaga nama baik toko / tempat.</li>
      <li> Wajib melapor jika ada kendala.</li>
      <li> Tiba di tempat tepat waktu.</li>
      <li> Dilarang menggunakan pakaian yang tidak sopan.</li>
      <li> Tetap aktif dan sigap dalam menjalankan tugas.</li>
      <li> Tidak menyebarkan informasi internal tanpa izin.</li>
    </ol>

    `,
    confirmButtonText: "Ya Saya Mengerti!",
    allowOutsideClick: false,
  });

  // Aktifkan tombol
  tes.style.display = "block";
  tes2.style.display = "block";
  tes3.style.display = "block";
  tes4.style.display = "block";

  return true;
}

async function cekLokasi(tes) {
  //   tes
  if (!tes) {
    console.error("Elemen tombol absensi (tes) tidak ditemukan!");
    return;
  }

  tes.addEventListener("click", async function (enev) {
    enev.preventDefault(); // Menghilangkan fungsi default pada tombol/link

    try {
      let dalamLokasi = await LokasiSaya();

      if (dalamLokasi) {
        Swal.fire({
          title: "Menyiapkan Halaman Absensi",
          text: "Mohon tunggu sebentar",
          imageUrl: "./img/load-pag.gif",
          imageWidth: 150,
          imageHeight: 150,
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
          timer: 5000,
          timerProgressBar: true,
        }).then(() => {
          window.location.href = "absen.html"; // tunggu hingga alret selesai
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Diluar jangkauan access",
          draggable: true,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Terjadi kesalahan pada: ${error.message}`,
      });
    }
  });

  async function LokasiSaya() {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        Swal.fire({
          imageUrl: "./img/location.gif",
          imageWidth: 150,
          imageHeight: 150,
          title: "Memeriksa Lokasi Anda",
          text: "Mohon tunggu sebentar",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        navigator.geolocation.getCurrentPosition(
          async function (posisi) {
            let lokasiValid = await posisiAnda(posisi);
            resolve(lokasiValid);
          },
          function (error) {
            let errorMessage = "Terjadi kesalahan saat mengambil lokasi.";
            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = "Silahkan izinkan lokasi Anda!";
                Swal.fire({
                  title: "Lokasi Tidak Dapat Ditemukan",
                  text: errorMessage,
                  imageUrl: "./img/no-location.png",
                  imageWidth: 150,
                  imageHeight: 150,
                });
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = "Mohon izinkan lokasi pada browser.";
                Swal.fire({
                  title: "Lokasi Tidak Dapat Ditemukan",
                  text: errorMessage,
                  imageUrl: "./img/emigration.png",
                  imageWidth: 150,
                  imageHeight: 150,
                }).then(() => reject(false));
                break;
              case error.TIMEOUT:
                errorMessage = "Mohon coba lagi, koneksi tidak stabil.";
                Swal.fire({
                  title: "Koneksi Internet Tidak Stabil",
                  text: errorMessage,
                  imageUrl: "./img/no-wifi.png",
                  imageWidth: 150,
                  imageHeight: 150,
                });
                break;
              default:
                Swal.fire({
                  icon: "warning",
                  title: "Terjadi Kesalahan",
                  text: "Mohon coba lagi",
                });
            }
            reject(false);
          }
        );
      } else {
        Swal.fire({
          title: "Browser Tidak Mendukung Geolocation",
          text: "Silahkan gunakan browser lain",
          icon: "warning",
        });
        reject(false);
      }
    });
  }

  function posisiAnda(posisi) {
    let lok1 = posisi.coords.latitude;
    let lok2 = posisi.coords.longitude;

    console.log(`Ko'ordinat User: ${lok1}, ${lok2}`);

    let BatasLokasiAccess = [
      { lat: -6.970946, lng: 110.018758 },
      { lat: -6.970872, lng: 110.018765 },
      { lat: -6.97086, lng: 110.018706 },
      { lat: -6.970945, lng: 110.018698 },
    ];

    let maxRadius = 20; // Radius dalam meter
    let DalamLokasi = BatasLokasiAccess.some(
      (loc) => hitungJarak(lok1, lok2, loc.lat, loc.lng) <= maxRadius
    );

    // console.log(`Apakah dalam area yang di izinkan: ${DalamLokasi}`);
    Swal.close();
    return DalamLokasi; // Mengembalikan hasil validasi lokasi
  }

  function hitungJarak(lat1, lon1, lat2, lon2) {
    const RB = 6371000; // Radius Bumi dalam meter
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const jarak = RB * c;

    // debuging
    console.log(
      `Jarak antara (${lat1}, ${lon1}) dan (${lat2}, ${lon2}) adalah ${jarak.toFixed(
        2
      )} meter`
    );
    return jarak; // Mengembalikan jarak dalam meter
  }
}

// Pengembangan
function suratIzin(izin) {
  izin.addEventListener("click", async function () {
    Swal.fire({
      title: "Menyiapkan Halaman Izin",
      text: "Mohon tunggu sebentar",
      imageUrl: "./img/load-pag.gif",
      imageWidth: 150,
      imageHeight: 150,
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
      timer: 5000,
      timerProgressBar: true,
    }).then(() => {
      window.location.href = "izin.html"; // tunggu hingga alret selesai
    });
  });
}
