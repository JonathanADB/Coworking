import React from 'react';

const DownloadButton = ({ fileUrl, fileName }) => {

  const handleDownload = () => {
    
    const link = document.createElement('a');
    link.href = fileUrl; 
    link.download = fileName; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); 
  };

  return (
    <button onClick={handleDownload}>
     Sobre Nosotros
    </button>
  );
};

export default DownloadButton;
