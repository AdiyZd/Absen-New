document.addEventListener("DOMContentLoaded", function () {
  const tes = document.getElementById("absensiA");
  const tes2 = document.getElementById("izinA");
  const tes3 = document.getElementById("rekapA");
  const tes4 = document.getElementById("pulangA");

  function tanggalWaktu() {
    let now = new Date();
    let hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    let Nh = hari[now.getDay()];
    let tanggal = now.getDate();
    let bulan = now.toLocaleString("id-ID", { month: "long" });
    let tahun = now.getFullYear();

    return {
      hari: hari[now.getDay()],
      tanggal: now.getDate(),
      bulan: now.toLocaleString("id-ID", { month: "long" }),
      tahun: now.getFullYear(),
    };
  }

  // menghitun titik lokasi saya berada apakah  di dalam lokasi atau tidak!

  let { hari, tanggal, bulan, tahun } = tanggalWaktu();

  if (tes) {
    tes.addEventListener("click", async function (enev) {
      enev.preventDefault(); // Menghilangkan fungsi default pada tombol/link

      try {
        const dalamLokasi = await LokasiSaya();

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
            willClose: () => {
              window.location.href = "absen.html";
            },
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
              let lokasiValid = posisiAnda(posisi);
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
                  });
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
      return RB * c; // Mengembalikan jarak dalam meter
    }
  }

  if (tes2) {
    tes2.addEventListener("click", function (event) {
      event.preventDefault();
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

      // Swal.fire({
      //     title: "Menyiapkan Halaman Absensi",
      //     text: "Mohon tunggu sebentar",
      //     imageUrl: "./img/load-pag.gif",
      //     imageWidth: 150,
      //     imageHeight: 150,
      //     allowOutsideClick: false,
      //     didOpen: () => Swal.showLoading(),
      //     timer: 5000,
      //     timerProgressBar: true
      // });
    });
  }

  if (tes3) {
    tes3.addEventListener("click", function (event) {
      event.preventDefault();
      Swal.fire({
        title: "Done Click!",
        icon: "success",
        draggable: true,
      });
    });
  }

  if (tes4) {
    tes4.addEventListener("click", function (event) {
      event.preventDefault();
      Swal.fire({
        title: "Done Click!",
        icon: "success",
        draggable: true,
      });
    });
  } else {
    Swal.fire({
      title: "Error!",
      icon: "error",
      draggable: true,
      text: "Tidak ada elemen dengan id 'absensiA'!",
    });
  }
});
