document.addEventListener("DOMContentLoaded", async function () {
    // fungsi
    const namaBorder = document.getElementById("nama");
    const absenBtn = document.getElementById("absenBtn");
    const WaktuLoBro = document.getElementById("timerNavigasi");
    const videoStream = document.getElementById("stream");
    const foto = document.getElementById("ambilFoto");
    const send = document.getElementById("kirim");
    const ulangFoto = document.getElementById("restart");
    const priviu = document.getElementById("priviu");
    const context = priviu.getContext("2d");
    let mati = null;
    let namaPengguna = null;

    function tanggalWaktu() {
        let now = new Date();
        let hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        let jam = now.getHours();
        let menit = now.getMinutes();
        let detik = now.getSeconds();
        let Nh = hari[now.getDay()];
        let tanggal = now.getDate();
        let bulan = now.toLocaleString("id-ID", { month: "long" });
        let tahun = now.getFullYear();

        let waktu;

        if (jam >= 3 && jam < 10) {
            waktu = "Selamat Pagi";
        }
        if (jam >= 10 && jam < 15) {
            waktu = "Selamat Siang";
        }
        if (jam >= 15 && jam < 18) {
            waktu = "Selamat Sore";
        } else {
            waktu = "Selamat Malam";
        }
       
        console.log(`Waktu Sekarang: ${waktu}`);

        if (WaktuLoBro) {
            WaktuLoBro.innerText = waktu;
        } else {
            console.log("Element tidak ditemukan");
        }


        return {
            hari: hari[now.getDay()],
            tanggal: now.getDate(),
            bulan: now.toLocaleString("id-ID", { month: "long" }),
            tahun: now.getFullYear(),
            waktu: waktu,
            jam: jam,
            menit: menit,
            Detik: detik
        };
    }

    // menghitun titik lokasi saya berada apakah  di dalam lokasi atau tidak!

    let { hari, tanggal, bulan, tahun, Detik, menit, jam } = tanggalWaktu();


    // user / nama yang di izinkan untuk absen
    let namaUsernameYangTerdagtar = [
        "Agus Adi Purnomo",
        "Choiurunn Nisa",
        "Nabila Eka Ayu Saputri",
    ];
    // minta acces ke admin

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

    // console.log("hari: ", hari);

    namaBorder.style.display = "block";
    namaBorder.innerText = nama;
    absenBtn.addEventListener("click", function () {

        videoStream.style.display = "block";
        foto.style.display = "block";

        absenBtn.style.display = "none";
        navigator.mediaDevices
            .getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: "user",
                },
            })
            .then((streamKamera) => {
                mati = streamKamera;
                videoStream.srcObject = streamKamera;
                videoStream.play();

                // Disable tombol setelah kamera aktif
                absenBtn.disabled = true;
                absenBtn.innerText = "Kamera Aktif";
            })
            .catch((error) => {
                console.error("Akses Kamera Ditolak: ", error);
                videoStream.style.display = "none";
                Swal.fire({
                    icon: "error",
                    title: "Akses Kamera Ditolak",
                    text: "Mohon izinkan akses kamera untuk melakukan absen",
                    draggable: true,
                });
            });
    });

    //   ambil foto
    foto.addEventListener("click", function () {
        if (!videoStream.srcObject) {
            console.log("Kamera belum aktif");
            return;
        }

        // ukuran foto
        priviu.width = videoStream.videoWidth;
        priviu.height = videoStream.videoHeight;

        // frem vidio
        context.save();
        context.scale(-1, 1);
        context.drawImage(
            videoStream,
            -priviu.width,
            0,
            priviu.width,
            priviu.height
        );
        context.restore();

        // matikan kamera biyar vidio mati dan tampilan normal lagi
        if (mati) {
            let cekCamera = mati.getTracks();
            cekCamera.forEach((track) => track.stop()); // stok kamera
            videoStream.srcObject = null;
        }

        // matikan vidio dan tombol ambil foto
        videoStream.style.display = "none";
        foto.style.display = "none";
        // send telegram
        send.style.display = "inline-block";
        ulangFoto.style.display = "inline-block";

        priviu.style.display = "block";
    });

    // ulang foto
    ulangFoto.addEventListener("click", async function() {
        // matikan priviu lalu nyalakan lagi vidio
        priviu.style.display = "none";
        videoStream.style.display = "block";
        
        foto.style.display = "block";
        send.style.display = "none";
        ulangFoto.style.display = "none";
        // nyalakan kamera
        navigator.mediaDevices
            .getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: "user",
                },
            })
            .then((streamKamera) => {
                mati = streamKamera;
                videoStream.srcObject = streamKamera;
                videoStream.play();

                // Disable tombol setelah kamera aktif
                absenBtn.disabled = true;
                absenBtn.innerText = "Kamera Aktif";
            })
            .catch((error) => {
                console.error("Akses Kamera Ditolak: ", error);
                videoStream.style.display = "none";
                Swal.fire({
                    icon: "error",
                    title: "Akses Kamera Ditolak",
                    text: "Mohon izinkan akses kamera untuk melakukan absen",
                    draggable: true,
                });
            });

    })

    // kirim absen
    send.addEventListener("click", async function () {

        const imageData = priviu.toDataURL("image/jpeg");

        const id = "7355777672";
        const apiTelegramBot = "7079092015:AAFOhQM0L0PGWmKcfW2DULtjo0KHzBEHbz8";

        // blob konverst
        let blob = await fetch(imageData).then((res) => res.blob());
        let formData = new FormData();
        formData.append("chat_id", id);
        formData.append("caption", `Absen: ✅ \n Nama: ${nama} \n Hari: ${hari} \n Tanggal: ${tanggal} \n Jam: ${jam} \n Menit: ${menit}:${Detik} \n Bulan: ${bulan} \n Tahun: ${tahun}`);
        formData.append("photo", blob, "absen.jpg");

        // kirim
        try {
            let response = await fetch(
                `https://api.telegram.org/bot${apiTelegramBot}/sendPhoto`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            let hasil = await response.json();

            if (hasil.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: "Absen berhasil dikirim",
                    draggable: true,
                });
            } else {
                throw new Error(hasil.description);
            }
        } catch (error) {
            // debuging nyalakan jika gak bisa kirim
            // console.error("Error: ", error);
            Swal.fire({
                icon: "error",
                title: "Gagal mengirim",
                text: `Error terjadi di Error: ${error.message}`,
                draggable: true,
            });
        }
    });
});
