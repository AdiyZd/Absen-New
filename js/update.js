document.addEventListener("DOMContentLoaded", async function () {
    //DATA
    const namaBorder = document.getElementById("nama");
    const absenBtn = document.getElementById("absenBtn");
    const WaktuLoBro = document.getElementById("timerNavigasi");
    let videoStream = document.getElementById("stream");
    const foto = document.getElementById("ambilFoto");
    const send = document.getElementById("kirim");
    const ulangFoto = document.getElementById("restart");
    const priviu = document.getElementById("priviu");
    const context = priviu.getContext("2d");
    let mati = null;

    // pengecekan lokasi
    async function cekLokasi() {
        if (!absenBtn) {
            console.warn("Elemen tombol absensi (tes) tidak ditemukan!");
            return;
        }

        absenBtn.removeEventListener("click", handleAbsenClick);
        absenBtn.addEventListener("click", handleAbsenClick);

        async function handleAbsenClick(event) {
            event.preventDefault();

            try {
                // 1. Cek lokasi terlebih dahulu
                let dalamLokasi = await LokasiSaya();
                if (!dalamLokasi) {
                    await Swal.fire({
                        icon: "warning",
                        title: "Lokasi Tidak Sesuai",
                        text: "Kamu berada di luar area yang diizinkan.",
                    });
                    return;
                }

                // 2. Tampilkan loading kamera
                Swal.fire({
                    title: "Menyiapkan Kamera",
                    text: "Mohon tunggu sebentar...",
                    imageUrl: "./img/load-pag.gif",
                    imageWidth: 150,
                    imageHeight: 150,
                    allowOutsideClick: false,
                    didOpen: () => Swal.showLoading(),
                    showConfirmButton: false,
                    allowEscapeKey: false,
                });

                absenBtn.style.display = 'none';
                const cameraStendbay = await startCamera()

                if (cameraStendbay) {
                    setupCameraUi();
                    Swal.close();
                } else {
                    throw new Error("Gagal Memulai kamera!")
                }

            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Gagal Mengakses Kamera",
                    text: error.message.includes("permission")
                        ? "Mohon berikan izin akses kamera di browser Anda"
                        : error.message,
                    confirmButtonText: "Mengerti",
                });
            }
        }

        // update code ini 
        async function startCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 1280 },
                        height: { ideal: 720 },
                        facingMode: "user"
                    }
                });

                mati = stream
                videoStream.srcObject = stream;

                await new Promise((resolve) => {
                    videoStream.onloadedmetadata = resolve;
                });

                videoStream.play();
                videoStream.style.display = 'block'
                // Matikan tombol absensi jika kamera telah nyala
                absenBtn.disabled = true;

                return true;
            } catch (error) {
                console.warn("Camera Error: ", error)
                Swal.fire({
                    icon: "error",
                    title: "Gagal Mengakses Kamera",
                    text: error.message
                })
                return false;
            };
        };

        function setupCameraUi() {
            // ambil foto button
            foto.style.display = 'block';
            foto.disabled = false;

            // disable button lain 
            send.style.display = 'none';
            ulangFoto.style.display = 'none';
            priviu.style.display = 'none';

            absenBtn.disabled = true;
            setupController();
        }

        // controler
        function setupController() {
            foto.addEventListener('click', captureFoto)
            ulangFoto.addEventListener('click', restartFoto)
            send.addEventListener('click', sendAdmin)
        }

        async function captureFoto() {
            if (!videoStream.srcObject) {
                console.log("kamera belum aktif")
                Swal.fire({
                    icon: "error",
                    text: "Kamera Belum Aktif Silahkan Aktifkan kamera untuk absensi!",
                    footer: "<a href='chrome://settings/content' target='_blank'>Buka Pengaturan Izin</a>"
                });
                return;
            }

            priviu.width = videoStream.videoWidth;
            priviu.height = videoStream.videoHeight;

            context.save()
            context.scale(-1, 1)
            context.drawImage(videoStream, -priviu.width, 0, priviu.width, priviu.height)
            context.restore();

            // ui update
            videoStream.style.display = 'none';
            foto.style.display = 'none';
            priviu.style.display = 'block';
            send.style.display = 'inline-block';
            ulangFoto.style.display = 'inline-block';
        }

        // restart foto
        async function restartFoto() {
            if (!mati) {
                mati.getTracks().forEach(track => track.stop());
            }

            await startCamera();
            setupCameraUi();

        }

        // kirim absensi 
        async function sendAdmin() {
            console.log("belum di coding bang line: 170")
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

            console.log(`Koordinat User: ${lok1}, ${lok2}`);

            let BatasLokasiAccess = [
                { lat: -6.970946, lng: 110.018758 },
                { lat: -6.970872, lng: 110.018765 },
                { lat: -6.97086, lng: 110.018706 },
                { lat: -6.970945, lng: 110.018698 },
            ];

            let maxRadius = 20; // meter
            let DalamLokasi = BatasLokasiAccess.some(
                (loc) => hitungJarak(lok1, lok2, loc.lat, loc.lng) <= maxRadius
            );

            Swal.close();
            return DalamLokasi;
        }

        function hitungJarak(lat1, lon1, lat2, lon2) {
            const RB = 6371000; // Radius Bumi (meter)
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

            console.log(
                `Jarak antara (${lat1}, ${lon1}) dan (${lat2}, ${lon2}) adalah ${jarak.toFixed(
                    2
                )} meter`
            );
            return jarak;
        }
    }

    // Fungsi Tanggal dan Waktu
    function tanggalWaktu() {
        let now = new Date();
        let hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        let jam = now.getHours();
        let menit = now.getMinutes();
        let detik = now.getSeconds();
        //let Nh = hari[now.getDay()];
        //let tanggal = now.getDate();
        //let bulan = now.toLocaleString("id-ID", { month: "long" });
        //let tahun = now.getFullYear();
        const menu = document.getElementById("span");

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

        // debuging waktu
        console.log(`Waktu Sekarang: ${waktu}`);

        if (WaktuLoBro) {
            WaktuLoBro.innerText = waktu;
            menu.innerHTML = "Absensi";
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
    // Panggil fungsi tanggalWaktu setiap detik
    let { hari, tanggal, bulan, tahun, Detik, menit, jam } = tanggalWaktu();

    // User yang terdaftar
    let namaUsernameYangTerdagtar = [
        "Admin Web",
        "Agus Adi Purnomo",
        "Admin",
        "Fitra Raveli Suhardi",
        "Meyda Ariyani",
    ];

    // Error yang di tentukan
    const { value: nama } = await Swal.fire({
        imageUrl: "./icon/card.gif",
        imageHeight: 150,
        imageWidth: 150,
        imageAlt: "Absen",
        title: "Masukan nama lengkap",
        input: "text",
        inputPlaceholder: "Masukan nama lengkap anda",
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

    // Pengecekan Username
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
        });
        return;
    }

    namaBorder.style.display = "block";
    namaBorder.innerText = nama;
    namaBorder.style.color = "rgb(4, 4, 248)";
    cekLokasi();
});
