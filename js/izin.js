document.addEventListener("DOMContentLoaded", async function () {
    const penandaHari = document.getElementById("timerNavigasi");
    var namaUser = document.getElementById("nama");
    var barMenu = document.getElementById("izin");
    var menuUser2 = document.getElementById("menu1");

    // waktu
    function tanggalWaktu() {
        let now = new Date();
        let hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        let jam = new Date().toLocaleString("id-ID", {
            timeZone: "Asia/Jakarta",
            hour: "numeric",
            hour12: false
        });
        let menit = now.getMinutes();
        let detik = now.getSeconds();
        let Nh = hari[now.getDay()];
        let tanggal = now.getDate();
        let bulan = now.toLocaleString("id-ID", { month: "long" });
        let tahun = now.getFullYear();

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

        if (penandaHari) {
            penandaHari.innerText = waktu;
            barMenu.innerText = "Izin"
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
            Detik: detik
        };
    }

    // menghitun titik lokasi saya berada apakah  di dalam lokasi atau tidak!

    let { hari, tanggal, bulan, tahun, Detik, menit, jam } = tanggalWaktu();

    async function userNameSiswa() {
        let namaUsernameYangTerdagtar = [
            "Agus Adi Purnomo",
            "Admin",
            "Fitra Raveli Suhardi",
            "Meyda Ariyani"

        ];

        const { value: nama } = await Swal.fire({
            imageUrl: "./icon/card.gif",
            imageHeight: 150,
            imageWidth: 150,
            imageAlt: "Absen",
            title: "Masukkan nama lengkap",
            input: "text",
            inputPlaceholder: "Masukkan nama lengkap anda",
            allowOutsideClick: false,
            allowEscapeKey: false,
            showCancelButton: false,
            confirmButtonText: "Lanjut",
            inputValidator: (value) => {
                if (!value) {
                    return "Nama tidak boleh kosong!";
                }
            },
        })

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

                setTimeout(() => {
                    Swal.fire({
                        icon: "warning",
                        title: "Harus Login",
                        text: "Silahkan Refresh Halaman",
                        confirmButtonText: "Refresh",
                        allowOutsideClick: false,
                    }).then(() => {
                        window.location.reload();
                    });
                }, 3000);
            });

            return false;
        }

        namaUser.style.display = "block";
        namaUser.style.color = "rgb(4, 4, 248)";
        namaUser.innerText = nama;
        menu2.disabled = true; // bikin default nilainya jadi true atau disable
    }
    userNameSiswa()
    
    menuUser2.addEventListener("change", function () {
        let menu2 = document.getElementById("menu2")
        let selectedValue = this.value;

    
        if (selectedValue == "1" || selectedValue == "2") { // nilai 1 adalah sakit
            menu2.disabled = false; // aktifkan opsi izin keterangan hari jika pilihan 1 dan 2
        } else {
            menu2.disabled = true; // matikan opsi izin keterangan hari jika pilihan 3
            menu2.selectedIndex = 0;
        }
    });

    let UserName = nama;
    console.log(UserName)
    
    document.getElementById("kirim").addEventListener("click", function () {
        if (!validateSelection("menu1", "Izin Keterangan Opsi")) return; 
        if (!document.getElementById("menu2").disabled && !validateSelection("menu2", "Izin keterangan Hari")) return; 
        if (!validateSelection("menu3", "Keberangkatan")) return;
        if (!validateTextArea("floatingTextarea", "Permohonan")) return;
    
        let menu1Text = getSelectedText("menu1");
        let menu2Text = document.getElementById("menu2").disabled ? "Tidak berlaku" : getSelectedText("menu2"); 
        let menu3Text = getSelectedText("menu3");
        let userPermohonan = document.getElementById("floatingTextarea").value;
        
        const Token = "";
        const Id = "";

        function kirimSuratKeterangan() {
            const Url = `https://api.telegram.org/bot${Token}/sendMessage`;

            let nama = `Nama: ${UserName}\n`
            let Pesan = `Izin ${menu1Text}\n`
            if (document.getElementById("menu2").disabled) {
                Pesan += `Nama: ${nama}\n Durasi: ${menu2Text}\n`
            };
            Pesan += `Keberangkatan: ${menu3Text}\n`;
            Pesan += `Text: ${userPermohonan}`;

            const data = {
                chat_id : Id, // id admin
                text : Pesan // pesan yang sudah di validasi
            };

            fetch(Url, {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify(data)
            })
            .then(response => response.json)
            .then(data => {
                if (data.ok) {
                    Swal.fire({
                        icon: "success",
                        title: "Pesan Terkirim",
                        text: "Success"
                    })
                } else {
                    Swal.fire({
                        icon: "error",
                        text: "Terjadi kesalahan!",
                        text: "Silahkan Coba Lagi!"
                    })
                }
            })
            .catch (error => console.warn("Error Terjadi di: ", error))
        }

        kirimSuratKeterangan() // functions panggil fungsi kirim ke telegram 

        // Swal.fire({
        //     icon: "success",
        //     title: "Anda memilih opsi",
        //     text: `${menu1Text} : ${menu2Text} : ${menu3Text}` 
        // });
    });
    
    function validateSelection(menuId, defaultText) {
        let menu = document.getElementById(menuId);
        if (menu.value === "" || menu.options[menu.selectedIndex].text === defaultText) {
            Swal.fire({
                icon: "warning",
                title: "Pilih opsi yang tersedia!",
                text: `Silakan pilih ${defaultText}`
            });
            return false;
        }
        return true;
    }
    
    function getSelectedText(menuId) {
        let menu = document.getElementById(menuId);
        return menu.options[menu.selectedIndex].text;
    }
    

})

