import React, { useState } from 'react';
import { HiOutlineUpload } from "react-icons/hi";
const FileUpload = () => {
    const [fileName, setFileName] = useState('No file selected');

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName('No file selected');
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                File Upload
            </label>
            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-600 hover:text-white">
                   {/*  <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M16.88 9.94A1.25 1.25 0 0015.62 8.7l-4.38-.3-1.4-4.36a1.25 1.25 0 00-2.48 0L6.18 8.4 1.75 8.7a1.25 1.25 0 00-.68 2.38l3.45 2.7L3.7 18.5a1.25 1.25 0 001.95 1.36l3.35-2.4 3.35 2.4a1.25 1.25 0 001.95-1.36l-1.8-4.73 3.45-2.7z"/>
                    </svg> */}
                    <HiOutlineUpload className='text-xl' />
                    <span className="mt-2 text-base leading-normal">{fileName}</span>
                    <input type="file" className="hidden" onChange={handleFileChange} />
                </label>
            </div>
        </div>
    );
};

export default FileUpload;
