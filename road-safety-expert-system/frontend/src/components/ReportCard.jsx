// ReportCard.jsx
import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { useNavigate } from 'react-router-dom';
import ShareModal from './ShareModal';

const ReportCard = ({ data, onReset, isSharedView = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const reportPdfRef = useRef(null);

  const renderExplanation = (text) => {
    if (typeof text !== 'string') return null; 

    return text.split('\n').map((item, index) => {
      const cleanItem = item.replace(/^[-*]\s*/, '').trim();
      if (cleanItem) {
        return <li key={index}>{cleanItem}</li>;
      }
      return null;
    });
  };

  const handleAction = () => {
    if (isSharedView) {
      navigate('/app');
    } else if (onReset) {
      onReset();
    }
  };

  const handleDownloadPdf = () => {
    const input = reportPdfRef.current;
    if (!input) return;

    // We temporarily hide buttons that shouldn't be in the PDF
    const shareButton = input.querySelector('.share-button');
    const pdfButton = input.querySelector('.pdf-button');
    if (shareButton) shareButton.style.display = 'none';
    if (pdfButton) pdfButton.style.display = 'none';

    html2canvas(input, {
      scale: 2, // Higher scale for better resolution
      useCORS: true,
      backgroundColor: null, // Use the actual background color
    }).then((canvas) => {
      // Show the buttons again after the screenshot is taken
      if (shareButton) shareButton.style.display = 'flex';
      if (pdfButton) pdfButton.style.display = 'flex';

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;

      let finalImgWidth = pdfWidth - 20; // 10mm margin on each side
      let finalImgHeight = finalImgWidth / ratio;
      
      if (finalImgHeight > pdfHeight - 20) {
        finalImgHeight = pdfHeight - 20; // 10mm margin top/bottom
        finalImgWidth = finalImgHeight * ratio;
      }
      
      const x = (pdfWidth - finalImgWidth) / 2;
      const y = 10;

      // Add Watermark
      pdf.setFontSize(50);
      pdf.setTextColor(235, 235, 235); // A light grey
      pdf.text('Road Safety Expert System', pdfWidth / 2, pdfHeight / 2, { align: 'center', angle: -45 });

      // Add the report image on top
      pdf.addImage(imgData, 'PNG', x, y, finalImgWidth, finalImgHeight);
      pdf.save(`Road-Safety-Report-${data.s_no || 'details'}.pdf`);
    });
  };

  
  return (
    <> 
      <div ref={reportPdfRef} key={data.referenceClause} className="relative">
        {/* Background layer */}
        <div className="absolute inset-0 bg-gray-50 rounded-3xl transform -rotate-1"></div>
        
        {/* Main card */}
        <div className="relative bg-white border-2 border-black rounded-3xl shadow-2xl p-8 md:p-10">
          {/* Decorative corners */}
          <div className="absolute top-6 right-6 w-3 h-3 bg-black opacity-20 rounded-full"></div>
          <div className="absolute bottom-6 left-6 w-3 h-3 bg-black opacity-20 rounded-full"></div>
          
          {/* Header with Share Button */}
          <div className="flex justify-between items-start mb-6 pb-6 border-b-2 border-gray-200">
            <div>
              <h2 className="text-4xl font-bold text-black tracking-tight mb-2">
                Intervention Report
              </h2>
              <p className="text-gray-500 text-sm">AI-Generated Safety Analysis</p>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="share-button ml-4 flex-shrink-0 bg-black text-white font-semibold py-3 px-6 rounded-xl hover:bg-gray-800 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center gap-2">
                <span>Share</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              </button>

              {/* --- PDF BUTTON --- */}
              <button 
                onClick={handleDownloadPdf}
                className="pdf-button flex-shrink-0 bg-gray-100 text-black font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center gap-2"
                title="Download as PDF"
              >
                <span>PDF</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
          </div>


          {/* Greeting */}
          <div className="mb-8 p-4 bg-gray-50 border-l-4 border-black rounded-lg">
            <p className="text-gray-700 italic text-lg">
              "{data.greeting}"
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-xl font-bold text-black">Problem Identified</h3>
              </div>
              <p className="text-gray-700 bg-gray-50 p-5 rounded-xl border border-gray-200 leading-relaxed">
                {data.problemIdentified}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-xl font-bold text-black">Recommended Intervention</h3>
              </div>
              <p className="text-gray-700 bg-gray-50 p-5 rounded-xl border border-gray-200 leading-relaxed">
                {data.intervention}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-xl font-bold text-black">Detailed Explanation</h3>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-2 bg-gray-50 p-5 rounded-xl border border-gray-200">
                {renderExplanation(data.explanation)}
              </ul>
            </div>
          </div>

          {/* Official Reference */}
          <div className="mt-8 pt-6 border-t-2 border-gray-200">
            <p className="font-bold text-black mb-3 flex items-center gap-2">
              Official Reference
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-300">
                <span className="text-gray-600 text-sm">Code:</span>
                <span className="font-mono font-bold text-black ml-2">{data.referenceCode}</span>
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-300">
                <span className="text-gray-600 text-sm">Clause:</span>
                <span className="font-mono font-bold text-black ml-2">{data.referenceClause}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button - Only show if onReset exists or is shared view */}
      {(onReset || isSharedView) && (
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <button
            onClick={handleAction}
            className="group relative w-full md:w-auto inline-flex items-center justify-center gap-3 bg-black text-white font-semibold text-base py-4 px-10 rounded-2xl hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <span className="relative">
              {isSharedView ? 'Try Your Own Analysis' : 'Start New Analysis'}
            </span>
            
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="relative w-5 h-5 transition-transform duration-300 group-hover:rotate-180"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" 
              />
            </svg>
          </button>
          
          <p className="text-gray-500 text-sm mt-4">
            {isSharedView 
              ? 'Navigate to home to analyze other road safety issues' 
              : 'Click to analyze another road safety issue'}
          </p>
        </div>
      )}

      {isModalOpen && <ShareModal data={data} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default ReportCard;