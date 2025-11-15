// In src/App.jsx

import { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ReportCard from './components/ReportCard';
import LoadingSkeleton from './components/LoadingSkeleton';

function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalysis = async (inputText) => {
    setIsLoading(true);
    setResult(null);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/generate-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput: inputText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to get a response from the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-light font-sans text-brand-dark">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-brand-blue to-brand-teal opacity-10 z-0"></div>
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto p-4">
          
          {/* Main Input Card */}
          <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-10 -mt-16">
            <h2 className="text-3xl font-bold text-center mb-2">AI-Powered Road Safety Analyst</h2>
            <p className="text-gray-600 mb-8 text-center">
              Describe a safety issue. Our AI will analyze it against established guidelines and recommend a solution.
            </p>
            <InputForm onAnalyze={handleAnalysis} isLoading={isLoading} />
          </div>

          {/* Results Section */}
          <div className="mt-12 max-w-3xl mx-auto">
            {isLoading && <LoadingSkeleton />}
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
                <p className="font-bold">Analysis Failed</p>
                <p>{error}</p>
              </div>
            )}
            {result && <ReportCard data={result} />}
          </div>

        </main>
      </div>
    </div>
  );
}

export default App;