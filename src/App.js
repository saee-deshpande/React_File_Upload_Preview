import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    // const [newFile, setnewFile] = useState(null);
    // let uploadedFile = "";
    // let newFile = "";

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    const handleUpload = async () => {
        if (!file) return alert('Please select a file first!');
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('http://localhost:5000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setUploadedFile(res.data.filePath);
            // uploadedFile = res.data.filePath;
           
            console.log("uploaded File",uploadedFile);
            alert('File uploaded successfully!');
            
           
            // let newfile = res.data.filePath.replace("/uploads", "");
            // setnewFile(newfile);
            // // newFile = newfile;
            // console.log("new",newFile);
            
            
            

        } catch (err) {
            console.error(err);
            alert('File upload failed!');
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>File Upload with Preview</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} style={{ marginLeft: '10px' }}>Upload</button>

            {preview && (
              console.log("preview",preview),
                <div style={{ marginTop: '20px' }}>
                    <h2>Preview:</h2>
                    <img src={preview} alt="Preview" style={{ width: '300px', height: '200px', objectFit: 'contain' }} />
                </div>
            )}

            {uploadedFile && (
              console.log("uploadedfile",uploadedFile),
                <div style={{ marginTop: '20px' }}>
                    <h2>Uploaded File:</h2>
                    <a href={`http://localhost:5000${uploadedFile.replace("/uploads", "")}`} target="_blank" rel="noreferrer">
                        View Uploaded File
                    </a>
                </div>
            )}
        </div>
    );
};

export default App;
