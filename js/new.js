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
    async function LokasiSaya() {
      tes.addEventListener("click", async function (enev) {
        enev.preventDefault(); // hilangkan a sebagai link default 
        try {
          const LokasiDiIzinkan = LokasiSaya();

        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `Terjadi kesalahan pada: ${error.message}`
          });
        }

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
                }
              });
              
              navigator.geolocation.getCurrentPosition(
                async function (posisi) {
                  let lokasiValid = await posisiAnda(posisi);
                  resolve(lokasiValid);
                },

                function (error) {
                  let errorMessage;

                  switch (error.code) {
                    // belum melakuan perizinan lokasi di hp
                    case error.PERMISSION_DENIED:
                      Swal.fire({
                        title: "Lokasi Anda Tidak Dapat Ditemukan",
                        text: "Silahkan izinkan lokasi Anda!",
                        imageUrl: "./img/no-location.png",
                        imageWidth: 150,
                        imageHeight: 150
                      });
                      break;

                    // Lokasi Tidak Ditemukan Web Tidak Dapat Mengakses Lokasi
                    case error.POSITION_UNAVAILABLE:
                      Swal.fire({
                        title: "Lokasi Tidak Dapat Ditemukan",
                        text: "Mohon izinkan lokasi pada chrome",
                        imageUrl: "./img/emigration.png",
                        imageWidth: 150,
                        imageHeight: 150
                      });
                      break;

                    // kondisi koneksi terganggu atau lemot
                    case error.TIMEOUT:
                      Swal.fire({
                        title: "Koneksi Internet Anda Tidak Stabil",
                        text: "Mohon coba lagi",
                        imageUrl: "./img/no-wifi.png",
                        imageWidth: 150,
                        imageHeight: 150
                      });
                      break;

                    // default user
                    default:
                      Swal.fire({
                        icon: "warning",
                        title: "Terjadi Kesalahan",
                        text: "Mohon coba lagi"
                      });
                  }
                  Swal.fire({
                    title: "Terjadi Kesalahan Lokasi!",
                    text: errorMessage,
                    icon: "error"
                  });

                  reject(false);
                }
            );
        } else {
            swal.fire({
                title: "Broser belum mendukung geolocation",
                text: "Silahkan gunakan browser lain",
                icon: "warning"
            })     
            
            reject(false);
        }
          });
        }
      });
    }

    async function posisiAnda(posisi) {
        let lok1 = posisi.coords.latitude,
            lok2 = posisi.coords.longitude;

        let BatasLokasiAccess = [
            { lat: -6.970946, lng: 110.018758 }, // Lokasi 1 Yang Di Izinkan
            { lat: -6.970872, lng: 110.018765 }, // Lokasi 2 Yang Di Izinkan
            { lat: -6.97086, lng: 110.018706 }, // Lokasi 3 Yang Di Izinkan
            { lat: -6.970945, lng: 110.018698 } // Lokasi 4 Yang Di Izinkan
        ]

        let maxRadius = 20; // memeriksa radius dalam jarak 20meter
        let DalamLokasi = BatasLokasiAccess.some(
            (loc) => hitungJarak(lok1, lok2, loc.lat, loc.lng) <= maxRadius
        );

        Swal.close();

        if (DalamLokasi) {
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
                }
            });

            // setTimeout(() => {
            //     window.location.href = "absen.html";
            // }, 5000);

        }
    }
    LokasiSaya();
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

//
