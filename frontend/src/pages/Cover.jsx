import React, { useEffect, useState } from 'react';
import DownloadButton from '@/components/DownloadArchivo.jsx';
import { useNavigate } from 'react-router-dom';

const Cover = () => {
const fileUrl = '/public/DosierInfo.pdf'; 
  const fileName = 'DosierInfo.pdf';

 const navigate = useNavigate();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRedirect(true);
    }, 10000); 

    return () => clearTimeout(timer);
  }, []); 

  useEffect(() => {
    if (shouldRedirect) {
      navigate('/home');
    }
  }, [shouldRedirect, navigate]);

  return (
<div className="flex items-center justify-center h-full w-full ">
    <div className="flex flex-col justify-items-stretch  h-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-row  text-center  mb-4">
            <h1 className="text-5xl font-bold text-left">
                COW
                <br />
                OR
                <br />
                QUEEN
            </h1>
        </div>
        <div className="my-4">
            <img
                src="src/assets/images/coworqueen.webp"
                alt="Crown Icon"
                className="w-24 h-24 mx-auto"
            />
        </div>
        <div>
            <button className="bg-yellow-600 text-white py-2 px-6 rounded-full text-lg">
                 <DownloadButton fileUrl={fileUrl} fileName={fileName} />
            </button>
        </div>
    </div>
</div>

  );
};

export default Cover;
