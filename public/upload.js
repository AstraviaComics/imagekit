document.getElementById('uploadBtn').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
    const preview = document.getElementById('preview');
    const resultDiv = document.getElementById('result');
    
    if (fileInput.files.length === 0) {
        alert('Pilih file terlebih dahulu');
        return;
    }
    
    const file = fileInput.files[0];
    
    // Tampilkan preview
    preview.src = URL.createObjectURL(file);
    preview.style.display = 'block';
    
    try {
        // Buat FormData untuk mengirim file
        const formData = new FormData();
        formData.append('file', file);
        
        // Kirim ke fungsi serverless Vercel
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (response.ok) {
            resultDiv.innerHTML = `
                <h3>Upload Berhasil!</h3>
                <p>URL Gambar: <a href="${data.url}" target="_blank">${data.url}</a></p>
                <img src="${data.url}" style="max-width: 100%; margin-top: 10px;">
            `;
        } else {
            resultDiv.innerHTML = `<p style="color: red;">Error: ${data.error || 'Gagal upload'}</p>`;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
});
