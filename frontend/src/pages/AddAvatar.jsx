import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/auth-context';

const AddAvatar = () => {
    const { authState, updateAvatar } = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState(null);

    const navigate = useNavigate();

    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append('file', selectedFile); 
    
        const response = await fetch(`http://localhost:3000/user/${authState.user.id}/media/add-avatar`, {
            method: 'POST',
            headers: {
                'Authorization': `${authState.token}`
            },
            body: formData
        });
    
        const data = await response.json();
    
        if (data.success) {
            updateAvatar(data.url);
            toast.success('Avatar subido correctamente');
            navigate("/profile");
        } else {
            toast.error(data.message);
        }
    }

    return (
        <div className='flex flex-col justify-center p-4 gap-y-4'>
            <input type='file' onChange={e => setSelectedFile(e.target.files[0])} />
            <button onClick={handleFileUpload}>Subir foto de perfil</button>
        </div>
    )

}

export default AddAvatar;