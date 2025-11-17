// In frontend/src/components/ShareModal.jsx

import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
    </svg>
);

const ShareModal = ({ data, onClose }) => {
  const [shareUrl, setShareUrl] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // We create an async function to handle uploading the data and generating the link.
    const createShareableLink = async () => {
      setIsLoading(true);
      try {
        // We now send the data to our OWN backend proxy endpoint.
        const response = await fetch('https://road-safety-gpt-backend.onrender.com/api/create-share', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Failed to create a shareable link via our backend.');
        }

        // Our backend now sends back a JSON with the ID
        const { shareId } = await response.json(); 

        const newShareUrl = `${window.location.origin}/report?id=${shareId}`;
        setShareUrl(newShareUrl);

        const dataUrl = await QRCode.toDataURL(newShareUrl, { width: 256, margin: 2 });
        setQrCodeDataUrl(dataUrl);

      } catch (err) {
        console.error('Failed to create shareable link:', err);
      } finally {
        setIsLoading(false);
      }
    };

    createShareableLink();
  }, [data]);  

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl text-center w-11/12 max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold text-brand-dark mb-4">Share Report</h2>
        <p className="text-gray-500 mb-6">Anyone with this link or QR code can view this report.</p>
        
        <div className="flex justify-center items-center p-4 bg-gray-100 rounded-lg h-72 w-72 mx-auto">
  
          {isLoading ? (
            <p className="text-gray-500 animate-pulse">Generating secure link...</p>
          ) : qrCodeDataUrl ? (
            <img src={qrCodeDataUrl} alt="Shareable QR Code for the report" />
          ) : (
            <p className="text-red-500 font-semibold">Could not generate QR code.</p>
          )}
        </div>

        <div className="mt-6">
            <p className="font-semibold text-sm text-gray-700 mb-2">Or share this link:</p>
            <div className="flex items-center space-x-2">
                <input type="text" value={shareUrl} readOnly className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-xs text-gray-600 focus:outline-none" />
                <button onClick={handleCopyLink} className="flex-shrink-0 bg-brand-dark text-white p-2 rounded-md hover:bg-black transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue" title="Copy to clipboard" disabled={isLoading}>
                    {copySuccess ? '✓' : <CopyIcon />}
                </button>
            </div>
             {copySuccess && <p className="text-sm text-green-600 mt-2">{copySuccess}</p>}
        </div>

        <button onClick={onClose} className="mt-8 bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition-colors w-full">
          Close
        </button>
      </div>
    </div>
  );
};

export default ShareModal;