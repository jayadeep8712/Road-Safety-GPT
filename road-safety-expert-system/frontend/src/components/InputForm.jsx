// In src/components/InputForm.jsx

import React, { useState } from 'react';

const ArrowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 ml-2 transition-transform group-hover:translate-x-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
</svg>;

const InputForm = ({ onAnalyze, isLoading }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the form from reloading the page
    if (!inputText.trim()) {
      alert("Please describe a road safety issue.");
      return;
    }
    onAnalyze(inputText);
  };

  const placeholderText = `Example: "The stop sign at the corner of Main St and Oak Ave is damaged and hard to see after sunset."`;

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="w-full h-36 p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-brand-teal/50 focus:border-brand-teal transition-all duration-300 shadow-inner"
        placeholder={`e.g., "A U-Turn Prohibited sign on the highway is not retroreflective and is invisible at night..."`}
        disabled={isLoading}
      />
      <button
        type="submit"
        className="group w-full mt-4 flex items-center justify-center bg-brand-dark text-white font-bold text-lg py-4 px-6 rounded-xl hover:bg-black focus:outline-none focus:ring-4 focus:ring-brand-blue/50 transition-all duration-300 transform hover:scale-[1.02] disabled:bg-gray-400"
        disabled={isLoading}
      >
        {isLoading ? 'Analyzing...' : 'Generate Report'}
        {!isLoading && <ArrowIcon />}
      </button>
    </form>
  );
};
export default InputForm;