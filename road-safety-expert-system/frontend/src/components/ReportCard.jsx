// In frontend/src/components/ReportCard.jsx

import React, { useState } from 'react';
import ShareModal from './ShareModal';

const ReportCard = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // This helper function to render bullet points from the AI's explanation is great.
  const renderExplanation = (text) => {
    // A small safety check in case the explanation is not a string
    if (typeof text !== 'string') return null; 

    return text.split('\n').map((item, index) => {
      const cleanItem = item.replace(/^[-*]\s*/, '').trim();
      if (cleanItem) {
        return <li key={index}>{cleanItem}</li>;
      }
      return null;
    });
  };
  
  return (
    // Use a Fragment to wrap the component and the modal, which is the correct approach.
    <> 
      <div key={data.referenceClause} className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 animate-fade-in">
        
        {/* Share Button Container */}
        <div className="flex justify-between items-start mb-4 border-b border-gray-200 pb-4">
            <h2 className="text-3xl font-bold text-brand-dark tracking-tight">
              Intervention Report
            </h2>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="ml-4 flex-shrink-0 bg-brand-blue/10 text-brand-blue font-semibold py-2 px-4 rounded-lg hover:bg-brand-blue/20 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue"
            >
              Share ↗
            </button>
        </div>

        {/* --- THIS IS THE NEW PART --- */}
        {/* We are now displaying the greeting from the AI's response */}
        <p className="mb-6 text-gray-600 italic">
          "{data.greeting}"
        </p>
        {/* --- END OF NEW PART --- */}

        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-brand-dark mb-2">Problem Identified</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg shadow-inner">{data.problemIdentified}</p>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-brand-dark mb-2">Recommended Intervention</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg shadow-inner">{data.intervention}</p>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-brand-dark mb-2">Detailed Explanation</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2 bg-gray-50 p-4 rounded-lg shadow-inner">
                  {renderExplanation(data.explanation)}
                </ul>
            </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200 text-sm text-gray-500">
            <p className="font-bold">Official Reference:</p>
            <div className="flex items-center space-x-4 mt-2">
              <p>Code: <span className="font-mono bg-gray-200 text-gray-800 px-2 py-1 rounded">{data.referenceCode}</span></p>
              <p>Clause: <span className="font-mono bg-gray-200 text-gray-800 px-2 py-1 rounded">{data.referenceClause}</span></p>
            </div>
        </div>
      </div>

      {/* Conditionally render the modal - this part is perfect. */}
      {isModalOpen && <ShareModal data={data} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default ReportCard;