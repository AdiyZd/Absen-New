document.addEventListener("DOMContentLoaded", function () {
  const absenBtn = document.getElementById("absenBtn");
  const videoStream = document.getElementById("stream");
  const foto = document.getElementById("ambilFoto");
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
  foto.addEventListener("click", function() {
    priviu.width = videoStream.videoWidth;
    priviu.height = videoStream.videoHeight;

    // frem vidio
    context.drawImage(videoStream, 0, 0, priviu.width, priviu.height);

    // matikan kamera biyar vidio mati dan tampilan normal lagi
    if (mati) {
        let cekCamera = mati.getTracks();
        cekCamera.forEach((track) => cekCamera.stop()); // stok kamera
        videoStream.srcObject = null;
    }
    
    // matikan vidio dan tombol ambil foto
    videoStream.style.display = "none";
    foto.style.display = "none";

    priviu.style.display = "block";
  });
});

