document.addEventListener("DOMContentLoaded", function() {
    const tes = document.getElementById("absensiA");
    const tes2 = document.getElementById("izinA");
    const tes3 = document.getElementById("rekapA");
    const tes4 = document.getElementById("pulangA");

    if (tes) {
        tes.addEventListener("click", function(event) {
            event.preventDefault(); // Mencegah halaman reload saat klik link
            Swal.fire({
                title: "Done Click!",
                icon: "success",
                draggable: true
            });
        });
    }
    
    if (tes2) {
        tes2.addEventListener("click", function(event) {
            event.preventDefault();
            Swal.fire({
                title: "Done Click!",
                icon: "success",
                draggable: true
            })
        })
    }

    if (tes3) {
        tes3.addEventListener("click", function(event) {
            event.preventDefault();
            Swal.fire({
                title: "Done Click!",
                icon: "success",
                draggable: true
            })
        })
    }

    if (tes4) {
        tes4.addEventListener("click", function(event) {
            event.preventDefault();
            Swal.fire({
                title: "Done Click!",
                icon: "success",
                draggable: true
            })
        })
    }

    else {
        Swal.fire({
            title: "Error!",
            icon: "error",
            draggable: true,
            text: "Tidak ada elemen dengan id 'absensiA'!"
        });
    }
});