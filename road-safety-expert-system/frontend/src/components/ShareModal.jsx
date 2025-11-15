// In frontend/src/components/ShareModal.jsx

import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';

// A simple copy icon component for our new button
const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
    </svg>
);


const ShareModal = ({ data, onClose }) => {
  // We no longer need the useRef
  const [shareUrl, setShareUrl] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState(''); // <-- NEW state for the image source
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    // We create an async function inside the effect to handle the QR code generation
    const generateQrCode = async () => {
      const encodedData = btoa(JSON.stringify(data));
      const url = `${window.location.origin}/report?data=${encodedData}`;
      setShareUrl(url);

      try {
        // --- THIS IS THE KEY CHANGE ---
        // We now generate a Data URL (a base64 encoded image string)
        const dataUrl = await QRCode.toDataURL(url, { width: 256, margin: 2 });
        setQrCodeDataUrl(dataUrl);
      } catch (err) {
        console.error('Failed to generate QR code', err);
      }
    };

    generateQrCode();
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
        
        {/* --- THIS IS THE NEW RENDERING LOGIC --- */}
        <div className="flex justify-center items-center p-4 bg-gray-100 rounded-lg h-72 w-72 mx-auto">
          {qrCodeDataUrl ? (
            <img src={qrCodeDataUrl} alt="Shareable QR Code for the report" />
          ) : (
            <p className="text-gray-500">Generating QR Code...</p>
          )}
        </div>

        <div className="mt-6">
            <p className="font-semibold text-sm text-gray-700 mb-2">Or share this link:</p>
            <div className="flex items-center space-x-2">
                <input type="text" value={shareUrl} readOnly className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-xs text-gray-600 focus:outline-none" />
                <button onClick={handleCopyLink} className="flex-shrink-0 bg-brand-dark text-white p-2 rounded-md hover:bg-black transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue" title="Copy to clipboard">
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