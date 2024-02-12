import React, { useState } from 'react';

function AppTest() {
  const [filePaths, setFilePaths] = useState([]);

  // Handle file selection and saving file paths
  const handleFileUpload = (event) => {
    const files = event.target.files;
    const paths = Array.from(files).map((file) => file.webkitRelativePath || file.name);
    setFilePaths([...filePaths, ...paths]);
  }

  return (
    <div>
      <h1>Local File Path Storage Example (AppTest)</h1>
      <input type="file" multiple webkitdirectory directory onChange={handleFileUpload} />
      {filePaths.length > 0 && (
        <div>
          <p>Selected File Paths:</p>
          <ul>
            {filePaths.map((path, index) => (
              <li key={index}>{path}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AppTest;
