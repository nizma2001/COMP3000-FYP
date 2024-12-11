document.getElementById('uploadButton').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0]; // Get the uploaded file

    if (!file) {
        alert("Please select a file to upload.");
        return;
    }

    try {
        // 1. Request a pre-signed URL from the backend
        const response = await fetch('http://localhost:7001/api/files/presigned-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({ fileName: file.name, fileType: file.type })
        });

        if (!response.ok) {
            throw new Error('Failed to get pre-signed URL.');
        }

        const { presignedUrl } = await response.json();
        console.log(presignedUrl);
        alert(presignedUrl);

        // 2. Upload the file to S3 using the pre-signed URL
        const uploadResponse = await fetch(presignedUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': file.type,
            },
            body: file,
        });

        if (uploadResponse.ok) {
            alert('File uploaded successfully!');
        } else {
            console.error('Failed to upload file:', uploadResponse.status, await uploadResponse.text());
            throw new Error('Failed to upload file to S3.');
        }
    } catch (error) {
        console.error(error);
        alert('Error uploading file: ' + error.message);
    }
});