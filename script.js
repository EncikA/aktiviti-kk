document.getElementById("generateReport").addEventListener("click", async function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Get form values
    let namaPelapor = document.getElementById("namaPelapor").value;
    let namaAktiviti = document.getElementById("namaAktiviti").value;
    let tarikhAktiviti = document.getElementById("tarikhAktiviti").value;
    let hariAktiviti = document.getElementById("hariAktiviti").value;
    let masaMula = document.getElementById("masaMula").value;
    let masaTamat = document.getElementById("masaTamat").value;
    let jumlahKehadiran = document.getElementById("jumlahKehadiran").value;
    let imageFiles = document.querySelectorAll(".imageUpload");

    // Format date to dd/mm/yyyy
    let formattedDate = tarikhAktiviti.split("-").reverse().join("/");

    // Add text to PDF
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Borang Laporan Aktiviti Kokurikulum", 15, 15);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Nama Pelapor: ${namaPelapor}`, 15, 30);
    doc.text(`Nama Aktiviti: ${namaAktiviti}`, 15, 40);
    doc.text(`Tarikh Aktiviti: ${formattedDate}`, 15, 50);
    doc.text(`Hari: ${hariAktiviti}`, 15, 60);
    doc.text(`Masa: ${masaMula} - ${masaTamat}`, 15, 70);
    doc.text(`Jumlah Kehadiran Murid: ${jumlahKehadiran}`, 15, 80);

    // Add images to PDF
    let yOffset = 90;
    for (let i = 0; i < imageFiles.length; i++) {
        if (imageFiles[i].files.length > 0) {
            let file = imageFiles[i].files[0];
            let reader = new FileReader();

            reader.onload = function (event) {
                let img = new Image();
                img.src = event.target.result;
                img.onload = function () {
                    doc.addImage(img, "JPEG", 15, yOffset, 40, 40);
                    yOffset += 45; // Move down for next image

                    if (i === imageFiles.length - 1) {
                        doc.save("LaporanAktiviti.pdf");
                    }
                };
            };

            reader.readAsDataURL(file);
        }
    }

    // If no images, save PDF immediately
    if ([...imageFiles].every(input => input.files.length === 0)) {
        doc.save("LaporanAktiviti.pdf");
    }
});
