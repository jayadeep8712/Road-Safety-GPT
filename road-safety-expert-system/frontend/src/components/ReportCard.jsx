import React, { useState } from 'react';
import ShareModal from './ShareModal';

const ReportCard = ({ data, onReset }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

        <p className="mb-6 text-gray-600 italic">
          "{data.greeting}"
        </p>

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

    <div className="mt-12 pt-8 border-t border-gray-200 text-center">
      <button
        onClick={onReset}
        className="group relative w-full md:w-auto inline-flex items-center justify-center gap-3 bg-black text-white font-semibold text-base py-4 px-10 rounded-2xl hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <span className="relative">Start New Analysis</span>
        
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
        Click to analyze another road safety issue
      </p>
    </div>

      {isModalOpen && <ShareModal data={data} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default ReportCard;