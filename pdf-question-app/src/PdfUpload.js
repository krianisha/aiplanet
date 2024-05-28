// PdfUpload.js
import React, { useState } from 'react';

/**
 * PdfUpload component for uploading PDF files.
 */


const PdfUpload = ({ onFileUpload, setFilename, setIsUploadModalOpen }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setFilename(file ? file.name : '');
    };

    const handleFileUpload = async () => {
        if (selectedFile) {
            try {
                // Create a FormData object to send the file
                const formData = new FormData();
                formData.append('file', selectedFile);

                // Make a POST request to the backend FastAPI server
                const response = await fetch('http://localhost:8000/upload-pdf/', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {

                    const result = await response.json();
                    setFilename(result.metadata.filename);
                    console.log('Uploaded File:', selectedFile);
                    console.log('Filename:', result.metadata.filename);
                    setIsUploadModalOpen(false); 

                } else {
                    // Handlingthe error response
                    alert('Failed to upload the PDF:', response.statusText);
                    console.error('Failed to upload the PDF:', response.statusText);
                }
            } catch (error) {
                alert('Error while uploading the PDF:', error);
                console.error('Error while uploading the PDF:', error);
            }
        } else {
            // Display an error message for no file selected
            alert('Please select a PDF file to upload.');
        }
    };

    return (
        <div>
            <input type="file" className="fileInput" id="fileInput" accept=".pdf" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload File</button>
        </div>
    );
};

export default PdfUpload;
