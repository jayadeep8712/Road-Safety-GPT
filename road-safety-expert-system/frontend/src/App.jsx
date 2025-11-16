import { useState, useRef } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ReportCard from './components/ReportCard';
import LoadingSkeleton from './components/LoadingSkeleton';

function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const inputSectionRef = useRef(null);

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

  const handleReset = () => {
    setResult(null);
    setError('');
    
    // Clear the textarea value as well
    const textarea = document.querySelector('textarea');
    if (textarea) {
        const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
        nativeTextAreaValueSetter.call(textarea, '');
        const event = new Event('input', { bubbles: true });
        textarea.dispatchEvent(event);
    }

    // Scroll back to the input form
    inputSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };


  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 relative overflow-hidden">
      {/* Black overlay decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top right geometric shape */}
        <div className="absolute -top-32 -right-32 w-[700px] h-[700px] bg-black opacity-5 transform rotate-12"></div>
        
        {/* Bottom left circle */}
        <div className="absolute -bottom-40 -left-40 w-[800px] h-[800px] bg-black opacity-5 rounded-full"></div>
        
        {/* Center patterns */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 border-2 border-black opacity-5 rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-black opacity-3 transform rotate-45"></div>
        
        {/* Diagonal lines */}
        <div className="absolute top-0 right-0 w-full h-full opacity-3">
          <div className="absolute top-1/4 right-0 w-1 h-[500px] bg-black transform rotate-45"></div>
          <div className="absolute bottom-1/4 left-0 w-1 h-[500px] bg-black transform rotate-45"></div>
        </div>

        {/* Floating shapes */}
        <div className="absolute top-32 left-32 w-40 h-40 border border-black opacity-10 rounded-xl transform rotate-12 animate-float"></div>
        <div className="absolute bottom-48 right-48 w-32 h-32 bg-black opacity-5 rounded-full animate-float-delayed"></div>
      </div>

      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6">
              <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
              <span className="text-xs tracking-wider uppercase font-medium text-gray-600">
                AI-Powered Analysis
              </span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-black mb-6 tracking-tight">
              Road Safety
              <span className="block">Expert System</span>
            </h1>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-black opacity-30"></div>
              <p className="text-lg text-gray-600 max-w-2xl">
                Describe a safety issue and our AI will analyze it against established guidelines to recommend the perfect solution
              </p>
              <div className="w-16 h-px bg-black opacity-30"></div>
            </div>
          </div>

          {/* Main Input Card */}
          <div ref={inputSectionRef} className="max-w-4xl mx-auto mb-16">
            <div className="relative">
              {/* Background card layer */}
              <div className="absolute inset-0 bg-gray-50 rounded-3xl transform rotate-1"></div>
              
              {/* Main card */}
              <div className="relative bg-white border-2 border-black rounded-3xl shadow-2xl p-8 md:p-12">
                {/* Decorative corner elements */}
                <div className="absolute top-6 right-6 w-4 h-4 bg-black opacity-20 rounded-full"></div>
                <div className="absolute bottom-6 left-6 w-4 h-4 bg-black opacity-20 rounded-full"></div>
                
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-2xl transform -rotate-3">
                      🔍
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-black">Safety Analysis</h2>
                      <p className="text-sm text-gray-500">Powered by advanced AI technology</p>
                    </div>
                  </div>
                </div>

                <InputForm onAnalyze={handleAnalysis} isLoading={isLoading} />

                {/* Stats or Features */}
                <div className="mt-8 pt-8 border-t border-gray-200 grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-black mb-1">98%</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Accuracy</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-black mb-1">&lt;4s</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Response Time</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-black mb-1">24/7</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="max-w-4xl mx-auto">
            {isLoading && (
              <div className="relative">
                <div className="absolute inset-0 bg-gray-50 rounded-3xl transform -rotate-1"></div>
                <div className="relative bg-white border-2 border-black rounded-3xl p-8">
                  <LoadingSkeleton />
                </div>
              </div>
            )}

            {error && (
              <div className="relative group">
                <div className="absolute inset-0 bg-red-50 rounded-3xl transform rotate-1"></div>
                <div className="relative bg-white border-2 border-red-500 rounded-3xl p-8 shadow-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-2xl text-white flex-shrink-0">
                      ⚠️
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-red-900 mb-2">Analysis Failed</h3>
                      <p className="text-red-700">{error}</p>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <button onClick={handleReset} className="bg-brand-dark text-white font-bold py-2 px-6 rounded-lg hover:bg-black transition-colors">Start New Analysis</button>
                  </div>
                  {/* Decorative corners */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 opacity-20 rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-3 h-3 bg-red-500 opacity-20 rounded-full"></div>
                </div>
              </div>
            )}

            {result && (
              <div className="relative animate-fadeIn">
                <div className="absolute inset-0 bg-gray-50 rounded-3xl transform -rotate-1"></div>
                <div className="relative bg-white border-2 border-black rounded-3xl shadow-2xl overflow-hidden">
                  {/* Success badge */}
                  <div className="bg-black text-white px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-2xl">
                      ✅
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Analysis Complete</h3>
                      <p className="text-sm text-gray-300">Here's your comprehensive safety report</p>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <ReportCard data={result} onReset={handleReset} />
                  </div>
                  
                  {/* Decorative corners */}
                  <div className="absolute top-20 right-6 w-3 h-3 bg-black opacity-20 rounded-full"></div>
                  <div className="absolute bottom-6 left-6 w-3 h-3 bg-black opacity-20 rounded-full"></div>
                </div>
              </div>
            )}
          </div>

          {/* Sample Scenarios Section */}
          {!result && !isLoading && !error && (
            <div className="max-w-4xl mx-auto mt-24">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4 text-black">Try Sample Scenarios</h3>
                <p className="text-gray-600">Click any scenario to see RSES in action</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
     {
      icon: '🌃',
      title: 'Invisible Night Sign',
      description: 'Sign doesn\'t reflect headlights',
      scenario: 'The U-Turn Prohibited sign on the highway is almost impossible to see at night. My headlights don\'t reflect off it at all, making it a serious hazard.'
    },
    {
      icon: '🌳',
      title: 'Obstructed View',
      description: 'Sign blocked by vegetation',
      scenario: 'A large tree branch has grown in front of the "Crash Prone Area Ahead" sign on the mountain road, completely obstructing the view for drivers.'
    },
    {
      icon: '💨',
      title: 'Improper Placement',
      description: 'Sign is too close to the hazard',
      scenario: 'On the high-speed road, the sign for the "Gap in Median" is placed right at the opening, giving drivers no time to react and change lanes safely.'
    },
    {
      icon: '🛠️',
      title: 'Damaged Sign',
      description: 'Bent or broken STOP sign',
      scenario: 'A truck backed into the STOP sign at the corner of Main and Oak street. It is now bent at a 90-degree angle and facing the wrong way.'
    },
    {
      icon: '🎨',
      title: 'Faded Hospital Sign',
      description: 'Paint is peeling, hard to read',
      scenario: 'The blue "Hospital" sign has been in the sun for years and the paint is so faded and peeling that it\'s very difficult to read from a distance.'
    },
    {
      icon: '📏',
      title: 'Incorrect Height',
      description: 'Sign seems too low over a road',
      scenario: 'The "Minimum Speed Limit" sign on the overpass seems dangerously low. I am worried that a tall truck might hit it.'
    }
                ].map((sample, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      // Find the textarea and set its value
                      const textarea = document.querySelector('textarea');
                      if (textarea) {
                        // Create a proper event to trigger React's onChange
                        const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(
                          window.HTMLTextAreaElement.prototype,
                          'value'
                        ).set;
                        nativeTextAreaValueSetter.call(textarea, sample.scenario);
                        
                        const event = new Event('input', { bubbles: true });
                        textarea.dispatchEvent(event);
                        
                        // Scroll to input
                        textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        textarea.focus();
                      }
                    }}
                    className="relative group text-left w-full"
                  >
                    <div className="absolute inset-0 bg-gray-50 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform"></div>
                    <div className="relative bg-white border-2 border-black rounded-2xl p-6 hover:shadow-xl transition-all group-hover:scale-105">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center text-3xl flex-shrink-0 transform -rotate-3 group-hover:rotate-0 transition-transform">
                          {sample.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-1 text-black group-hover:text-gray-700 transition-colors">
                            {sample.title}
                          </h4>
                          <p className="text-gray-600 text-sm mb-3">{sample.description}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>Click to try</span>
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* Decorative corner */}
                      <div className="absolute top-4 right-4 w-3 h-3 bg-black opacity-20 rounded-full"></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* How it works section */}
          {!result && !isLoading && !error && (
            <div className="max-w-4xl mx-auto mt-24">
              <h3 className="text-3xl font-bold text-center mb-12 text-black">How It Works</h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: '📝', title: 'Describe Issue', desc: 'Input your road safety concern in natural language' },
                  { icon: '🤖', title: 'AI Analysis', desc: 'Our expert system analyzes against official guidelines' },
                  { icon: '📊', title: 'Get Report', desc: 'Receive comprehensive recommendations and solutions' }
                ].map((step, index) => (
                  <div key={index} className="relative group">
                    <div className="absolute inset-0 bg-gray-50 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform"></div>
                    <div className="relative bg-white border-2 border-black rounded-2xl p-6 text-center hover:shadow-xl transition-shadow">
                      <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 transform -rotate-3 group-hover:rotate-0 transition-transform">
                        {step.icon}
                      </div>
                      <h4 className="font-bold text-lg mb-2 text-black">{step.title}</h4>
                      <p className="text-gray-600 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-24 py-8 border-t border-gray-200">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 Road Safety Expert System. Powered by AI.
            </p>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(12deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;