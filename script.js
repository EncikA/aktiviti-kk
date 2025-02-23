document.getElementById("generateReport").addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const namaPelapor = document.getElementById("namaPelapor").value;
    const namaAktiviti = document.getElementById("namaAktiviti").value;
    const tarikhAktiviti = new Date(document.getElementById("tarikhAktiviti").value);
    const hariAktiviti = document.getElementById("hariAktiviti").value;
    const masaMula = document.getElementById("masaMula").value;
    const masaTamat = document.getElementById("masaTamat").value;
    const jumlahKehadiran = document.getElementById("jumlahKehadiran").value;
    
    const formattedDate = `${tarikhAktiviti.getDate().toString().padStart(2, '0')}/${(tarikhAktiviti.getMonth() + 1).toString().padStart(2, '0')}/${tarikhAktiviti.getFullYear()}`;

    doc.setFontSize(16);
    doc.text("Borang Laporan Aktiviti Kokurikulum", 60, 20);
    
    doc.setFontSize(12);
    let y = 40;
    doc.text(`Nama Pelapor: ${namaPelapor}`, 20, y);
    doc.text(`Nama Aktiviti: ${namaAktiviti}`, 20, y + 10);
    doc.text(`Tarikh Aktiviti: ${formattedDate}`, 20, y + 20);
    doc.text(`Hari: ${hariAktiviti}`, 20, y + 30);
    doc.text(`Masa Aktiviti: ${masaMula} hingga ${masaTamat}`, 20, y + 40);
    doc.text(`Jumlah Kehadiran Murid: ${jumlahKehadiran}`, 20, y + 50);
    
    let imageY = y + 60;
    document.querySelectorAll(".imageUpload").forEach((imgInput, index) => {
        if (imgInput.files.length > 0) {
            const file = imgInput.files[0];
            const reader = new FileReader();
            
            reader.onload = function (event) {
                const imgData = event.target.result;
                doc.addImage(imgData, 'JPEG', 20, imageY, 80, 60);
                imageY += 70;

                if (index === document.querySelectorAll(".imageUpload").length - 1) {
                    doc.text("Made by Mohamad Adri bin Maili - SK Stalon 2025", 40, imageY + 20);
                    doc.save("Borang_Laporan_Activity.pdf");
                }
            };
            reader.readAsDataURL(file);
        }
    });

    if (document.querySelectorAll(".imageUpload").length === 0) {
        doc.text("Made by Mohamad Adri bin Maili - SK Stalon 2025", 40, imageY + 20);
        doc.save("Borang_Laporan_Activity.pdf");
    }
});

// Image Preview
document.querySelectorAll(".imageUpload").forEach(input => {
    input.addEventListener("change", function () {
        const previewContainer = document.getElementById("imagePreview");
        previewContainer.innerHTML = "";
        
        document.querySelectorAll(".imageUpload").forEach(fileInput => {
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const imgElement = document.createElement("img");
                imgElement.src = URL.createObjectURL(file);
                imgElement.style.maxWidth = "100px";
                imgElement.style.marginRight = "10px";
                previewContainer.appendChild(imgElement);
            }
        });
    });
});
