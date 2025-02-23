document.getElementById("generateReport").addEventListener("click", function () {
    const namaPelapor = document.getElementById("namaPelapor").value;
    const namaAktiviti = document.getElementById("namaAktiviti").value;
    const tarikhAktiviti = new Date(document.getElementById("tarikhAktiviti").value);
    const hariAktiviti = document.getElementById("hariAktiviti").value;
    const masaMula = document.getElementById("masaMula").value;
    const masaTamat = document.getElementById("masaTamat").value;
    const jumlahKehadiran = document.getElementById("jumlahKehadiran").value;
    
    const formattedDate = `${tarikhAktiviti.getDate().toString().padStart(2, '0')}/${(tarikhAktiviti.getMonth() + 1).toString().padStart(2, '0')}/${tarikhAktiviti.getFullYear()}`;

    let content = `
        <h1 style="text-align: center;">Borang Laporan Aktiviti Kokurikulum</h1>
        <p><strong>Nama Pelapor:</strong> ${namaPelapor}</p>
        <p><strong>Nama Aktiviti:</strong> ${namaAktiviti}</p>
        <p><strong>Tarikh Aktiviti:</strong> ${formattedDate}</p>
        <p><strong>Hari:</strong> ${hariAktiviti}</p>
        <p><strong>Masa Aktiviti:</strong> ${masaMula} hingga ${masaTamat}</p>
        <p><strong>Jumlah Kehadiran Murid:</strong> ${jumlahKehadiran}</p>
        <p style="text-align: center;">Made by Mohamad Adri bin Maili - SK Stalon 2025</p>
    `;

    // Image Preview in the document
    const images = document.querySelectorAll(".imageUpload");
    let imageContent = "";
    images.forEach((imgInput, index) => {
        if (imgInput.files.length > 0) {
            const imgURL = URL.createObjectURL(imgInput.files[0]);
            imageContent += `<p><strong>Gambar ${index + 1}:</strong><br><img src="${imgURL}" width="300"></p>`;
        }
    });

    content += imageContent;

    // Convert to Word document
    const blob = new Blob(['\ufeff' + content], {
        type: "application/msword"
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Borang_Laporan_Activity.doc";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
