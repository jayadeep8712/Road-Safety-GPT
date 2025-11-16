import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { createAvatar } from '@dicebear/core';
import * as botttsNeutral from '@dicebear/bottts-neutral';

const Intro = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [avatarSvg, setAvatarSvg] = useState(''); 
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const generateAvatar = async () => {
      const avatar = createAvatar(botttsNeutral, {
        seed: (Math.random() + 1).toString(36).substring(7),
        radius: 50,
        backgroundType: ['gradientLinear'],
        backgroundColor: ['#000000', '#1a1a1a'],  
      });

      const dataUri = await avatar.toDataUri();
      setAvatarSvg(dataUri);
    };

    generateAvatar();
  }, []);

  // Typing animation effect
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    
    const currentText = introMessages[step].text;
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < currentText.length) {
        setDisplayedText(currentText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 55); // Adjust speed here (lower = faster)

    return () => clearInterval(typingInterval);
  }, [step]);

  const introMessages = [
    {
      text: "Initiating greeting protocol... Just kidding! I'm RSES, the Road Safety Expert System. I've got a database full of road safety rules, and I'm not afraid to use it. Let's make our streets less... bumpy",
      button: "Okay, impress me.",
      icon: "🤖"
    },
    {
      text: "Got a problem? A wonky sign? A faded road marking? Describe it to me, and I'll consult my massive database of official guidelines to find the perfect fix. I'm basically a traffic cop's nerdy best friend.",
      button: "Sounds useful!",
      icon: "🚦"
    },
    {
      text: "Ready to make our roads safer (and less wobbly)? Let's get started, or you can jump straight to the examples if you're in a hurry!",
      button: "Let's do this!",
      icon: "🛣️"
    },
  ];

  const handleNext = () => {
    if (!isTyping && step < introMessages.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setStep(step + 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleSkip = () => {
    navigate('/app');  
  };

  const currentMessage = introMessages[step];

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Black overlay shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top right angular overlay */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-black opacity-5 transform rotate-12"></div>
        
        {/* Bottom left circular overlay */}
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-black opacity-5 rounded-full"></div>
        
        {/* Center geometric patterns */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 border-2 border-black opacity-5 rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-black opacity-3 transform rotate-45"></div>
        
        {/* Diagonal stripes overlay */}
        <div className="absolute top-0 right-0 w-full h-full opacity-3">
          <div className="absolute top-1/4 -right-32 w-1 h-96 bg-black transform rotate-45"></div>
          <div className="absolute top-1/3 -right-24 w-1 h-80 bg-black transform rotate-45"></div>
          <div className="absolute bottom-1/4 -left-32 w-1 h-96 bg-black transform rotate-45"></div>
        </div>

        {/* Floating abstract shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-black opacity-10 rounded-lg transform rotate-12 animate-float"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-black opacity-5 rounded-full animate-float-delayed"></div>
      </div>

      <div className="w-full max-w-xl text-center relative z-10">
        {/* Avatar section with enhanced styling */}
        <div className="mb-10 relative">
          {avatarSvg && (
            <div className="inline-block relative">
              {/* Shadow effect */}
              <div className="absolute inset-0 bg-black rounded-full blur-xl opacity-10"></div>
              
              {/* Avatar with border */}
              <div className="relative bg-white p-2 rounded-full border-2 border-black">
                <img 
                  src={avatarSvg} 
                  alt="RSES Avatar" 
                  className="w-28 h-28 transform hover:scale-105 transition-transform duration-300" 
                />
              </div>
              
              {/* Decorative ring */}
              <div className="absolute -inset-3 border border-black opacity-20 rounded-full"></div>
            </div>
          )}
        </div>

        {/* Title with decorative elements */}
        <div className="mb-14 relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-black opacity-5 rounded-full"></div>
          
          <h1 className="text-7xl font-bold text-black mb-3 tracking-tight relative">
            RSES
          </h1>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-px bg-black opacity-30"></div>
            <p className="text-gray-600 text-xs tracking-[0.3em] uppercase font-medium">
              Road Safety Expert System
            </p>
            <div className="w-12 h-px bg-black opacity-30"></div>
          </div>
        </div>

        {/* Message card with enhanced design */}
        <div className="relative mb-14 min-h-[280px] flex items-center justify-center">
          {introMessages.map((msg, index) => (
            <div 
              key={index}
              className={`transition-all duration-500 ease-out ${
                index === step 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-4 absolute inset-0'
              }`}
            >
              {index === step && (
                <div className="relative">
                  {/* Background card */}
                  <div className="absolute inset-0 bg-gray-50 rounded-3xl transform rotate-1"></div>
                  <div className="relative bg-white border-2 border-black rounded-3xl p-10 shadow-lg">
                    {/* Icon with enhanced styling */}
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-black text-white text-3xl shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                        {msg.icon}
                      </div>
                    </div>
                    
                    <p className="text-lg text-gray-800 leading-relaxed font-normal max-w-md mx-auto">
                      {displayedText}
                      {isTyping && <span className="inline-block w-0.5 h-5 bg-black ml-1 animate-blink"></span>}
                    </p>
                    
                    {/* Decorative corner elements */}
                    <div className="absolute top-4 right-4 w-3 h-3 bg-black opacity-20 rounded-full"></div>
                    <div className="absolute bottom-4 left-4 w-3 h-3 bg-black opacity-20 rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Step indicator with enhanced design */}
        <div className="flex justify-center gap-3 mb-12">
          {introMessages.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setStep(i);
                  setIsTransitioning(false);
                }, 300);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step 
                  ? 'w-12 bg-black' 
                  : 'w-2 bg-gray-300 hover:bg-gray-500'
              }`}
            ></button>
          ))}
        </div>

        {/* Navigation buttons with enhanced styling */}
        <div className="space-y-4">
          {step < introMessages.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={isTransitioning || isTyping}
              className="w-full relative bg-black text-white font-medium py-5 px-8 rounded-2xl text-base transition-all duration-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide shadow-xl hover:shadow-2xl hover:scale-105 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-2">
                {currentMessage.button}
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          ) : (
             <Link
              to="/app"
              className="block w-full text-center relative bg-black text-white font-medium py-5 px-8 rounded-2xl text-base transition-all duration-300 hover:bg-gray-800 tracking-wide shadow-xl hover:shadow-2xl hover:scale-105 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-2">
                {currentMessage.button}
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          )}

          <button onClick={handleSkip} className="text-sm text-gray-500 hover:text-black transition-colors duration-300 font-medium tracking-wide py-2 flex items-center justify-center gap-2 mx-auto group">
            <span>Skip Intro & Start Analyzing</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Progress indicator with styling */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
            <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></div>
            <p className="text-gray-600 text-xs tracking-wider uppercase font-medium">
              Step {step + 1} of {introMessages.length}
            </p>
          </div>
        </div>
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
        
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </div>
  );
};

export default Intro;