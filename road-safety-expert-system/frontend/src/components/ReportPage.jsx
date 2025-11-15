// In frontend/src/components/ReportPage.jsx

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReportCard from './ReportCard';
import Header from './Header'; // We'll need the header for the standalone page

const ReportPage = () => {
  const [searchParams] = useSearchParams();
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // This effect runs once to get the data from the URL
    const dataParam = searchParams.get('data');
    if (dataParam) {
      try {
        // Decode the Base64 string from the URL back to a normal JSON string
        const decodedJson = atob(dataParam);
        // Parse the JSON string into a usable JavaScript object
        const parsedData = JSON.parse(decodedJson);
        setReportData(parsedData);
      } catch (e) {
        console.error("Failed to parse report data from URL", e);
        setError("The report link is invalid or corrupted.");
      }
    } else {
      setError("No report data found in the link.");
    }
  }, [searchParams]); // The effect depends on the searchParams

  return (
    <div className="min-h-screen bg-brand-light font-sans text-brand-dark">
      {/* We reuse the Header component to give the page a consistent look */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-brand-blue to-brand-teal opacity-10 z-0"></div>
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto p-4 md:p-8">
          <div className="max-w-3xl mx-auto">
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
                <p className="font-bold">Error Loading Report</p>
                <p>{error}</p>
              </div>
            )}
            {/* If we have data, we render the ReportCard with it */}
            {reportData && <ReportCard data={reportData} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportPage;