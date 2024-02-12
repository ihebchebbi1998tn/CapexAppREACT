import React, { useState } from 'react';
import { useUser } from '../../UserContext';

function PhotoUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const { updateUser } = useUser();



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const filePath = URL.createObjectURL(file);
      console.log(filePath);
      setSelectedFile(filePath);
      updateUser.photo = filePath;
      console.log(updateUser) ;

    }
  };

  return (
    <div>
      <h2>Photo Uploader</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {selectedFile && (
        <div>
          <h3>Selected Photo:</h3>
          <img src={selectedFile} alt="Selected" />
        </div>
      )}
    </div>
  );
}

export default PhotoUploader;
