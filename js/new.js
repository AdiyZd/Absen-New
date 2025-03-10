document.addEventListener("DOMContentLoaded", function() {
    const tes = document.getElementById("absensiA");
    const tes2 = document.getElementById("izinA");
    const tes3 = document.getElementById("rekapA");
    const tes4 = document.getElementById("pulangA");

    function tanggalWaktu() {
        let now = new Date();
        let hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        let Nh = hari[now.getDay()];
        let tanggal = now.getDate();
        let bulan = now.toLocaleString("id-ID", {month: "long"});
        let tahun = now.getFullYear();


        return {
            hari: hari[now.getDay()],
            tanggal: now.getDate(),
            bulan: now.toLocaleString("id-ID", { month: "long" }),
            tahun: now.getFullYear()
        };
    };

    // menghitun titik lokasi saya berada apakah  di dalam lokasi atau tidak!
    
    let {hari, tanggal, bulan, tahun} = tanggalWaktu();
    
    if (tes) {
        async function LokasiSaya() {
            tes.addEventListener("click", async function(enev) {
                enev.preventDefault();
                Swal.fire({
                    imageUrl: "./img/tl.jpg",
                    title: "Diluar Jangkauan",
                    text: "Diluar Lokasi SandiKomputer",
                    imageHeight: 150,
                    imageWidth: 150
                    // title: `hari: ${hari} \n tanggal: ${tanggal} \n bulan: ${bulan} \n tahun: ${tahun}`
                })
                
                // try {
                //     const LokasiDiIzinkan = LokasiSaya();
                    
                //     if (LokasiDiIzinkan) {
                //         await StartCamera();
                //     } else {
                //         Swal.fire({
                //             imageUrl: "",
                //             title: "Diluar Lokasi Sandikomputer",
                //         })
                //     }
                    
                // } catch (error) {

                // }

            })
        }
        LokasiSaya();
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


//  