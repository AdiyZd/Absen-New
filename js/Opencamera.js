document.addEventListener("DOMContentLoaded", function () {
    const absenBtn = document.getElementById("absenBtn");
    const videoStream = document.getElementById("stream");

    absenBtn.addEventListener("click", function () {
        videoStream.style.display = "block";

        navigator.mediaDevices.getUserMedia({ video: true })
            .then((streamKamera) => {
                videoStream.srcObject = streamKamera;
                videoStream.play();

                // Disable tombol setelah kamera aktif
                absenBtn.disabled = true;
                absenBtn.innerText = "Kamera Aktif";
            })
            .catch((error) => {
                console.error("Akses Kamera Ditolak: ", error);
                Swal.fire({
                    icon: "error",
                    title: "Akses Kamera Ditolak",
                    text: "Mohon izinkan akses kamera untuk melakukan absen",
                    draggable: true
                });
            });
    });
});
