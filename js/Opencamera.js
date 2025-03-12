document.addEventListener("DOMContentLoaded", function () {
    const absenBtn = document.getElementById("absenBtn");
    const videoStream = document.getElementById("stream");
    const foto = document.getElementById("ambilFoto");
    const send = document.getElementById("kirim");
    const ulangFoto = document.getElementById("restart");
    const priviu = document.getElementById("priviu");
    const context = priviu.getContext("2d");
    let mati = null;

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
        context.drawImage(videoStream, -priviu.width, 0, priviu.width, priviu.height);
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
        send.style.display = "inline-block";
        ulangFoto.style.display = "inline-block";
        
        priviu.style.display = "block";
    });
});
