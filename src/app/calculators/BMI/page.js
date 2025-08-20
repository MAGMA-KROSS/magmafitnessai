"use client"
import { Footer } from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import React, { useState } from 'react';

// Main App component which contains the BMI Calculator
export default function App() {
  // State variables to store user input and results
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [error, setError] = useState('');

  /**
   * Calculates the BMI and determines the corresponding category.
   * It validates the input and sets an error message if the input is invalid.
   */
  const calculateBmi = () => {
    // --- Input Validation ---
    // Check if height or weight are not entered or are zero
    if (!height || !weight || +height <= 0 || +weight <= 0) {
      setError('Please enter valid positive values for height and weight.');
      setBmi(null);
      setBmiCategory('');
      return;
    }

    // --- BMI Calculation ---
    // Convert height from cm to meters for the formula
    const heightInMeters = height / 100;
    // Calculate BMI: weight (kg) / (height (m))^2
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    // --- BMI Category Determination ---
    let category = '';
    if (bmiValue < 18.5) {
      category = 'Underweight';
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      category = 'Normal weight';
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      category = 'Overweight';
    } else {
      category = 'Obese';
    }

    // --- Update State ---
    setBmi(bmiValue);
    setBmiCategory(category);
    setError(''); // Clear any previous errors
  };

  /**
   * Resets all state variables to their initial values.
   */
  const resetFields = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
    setBmiCategory('');
    setError('');
  };

  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center min-h-screen bg-black font-sans text-white">
      <div className="p-8 space-y-6 max-w-md w-full">
        {/* --- Title --- */}
        <h1 className="text-4xl font-bold text-center text-purple-400">BMI Calculator</h1>
        
        {/* --- Input Section --- */}
        <div className="space-y-4">
          {/* Height Input */}
          <div>
            <label htmlFor="height" className="block text-lg font-medium text-purple-400 mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g., 175"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition duration-300 placeholder-gray-500"
            />
          </div>
          {/* Weight Input */}
          <div>
            <label htmlFor="weight" className="block text-lg font-medium text-purple-400 mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g., 70"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition duration-300 placeholder-gray-500"
            />
          </div>
        </div>

        {/* --- Action Buttons --- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={calculateBmi}
            className="w-full px-6 py-3 text-lg font-semibold text-white bg-purple-600 rounded-2xl shadow-md hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-pink-500 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Calculate BMI
          </button>
           <button
            onClick={resetFields}
            className="w-full px-6 py-3 text-lg font-semibold text-gray-300 bg-gray-700 rounded-2xl shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-gray-500 transition-all duration-300 ease-in-out"
          >
            Reset
          </button>
        </div>

        {/* --- Error Message Display --- */}
        {error && (
          <p className="text-center text-red-400 font-medium mt-4">{error}</p>
        )}

        {/* --- Result Display --- */}
        {bmi && (
          <div className="mt-8 p-6 bg-gray-800 rounded-2xl shadow-lg text-center transition-all duration-500 ease-in-out transform animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-200">Your BMI is</h2>
            <p className="text-5xl font-extrabold text-purple-400 my-2">{bmi}</p>
            <p className="text-xl font-semibold text-pink-500">{bmiCategory}</p>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
}
