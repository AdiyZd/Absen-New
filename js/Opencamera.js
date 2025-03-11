function absen() {
    const vidioStream = document.getElementById('stream');

    // hapus display none agar bisa tampil
    vidioStream.style.display = 'block';
    
    // strat kamera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((streamKamera) => {
            vidioStream.srcObject = streamKamera;
            vidioStream.play();
        })
        .catch((error) => {
            console.log('Acess Kamera ditolak: ', error);
            Swal.fire({
                icon: "error",
                title: "Akses Kamera ditolak",
                text: "Mohon izinkan akses kamera untuk melakukan absen",
                draggable: true
            })

        })
}