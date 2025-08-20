"use client"
import { Footer } from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import React, { useState } from 'react';

// Main App component which contains the Body Fat Calculator
export default function App() {
    // State variables for user inputs
    const [gender, setGender] = useState('male');
    const [height, setHeight] = useState('');
    const [waist, setWaist] = useState('');
    const [neck, setNeck] = useState('');
    const [hip, setHip] = useState(''); // Only for females

    // State variables for results and errors
    const [bodyFat, setBodyFat] = useState(null);
    const [error, setError] = useState('');

    /**
     * Calculates the body fat percentage using the U.S. Navy method.
     * The formula is different for males and females.
     * It validates all necessary inputs before calculation.
     */
    const calculateBodyFat = () => {
        // --- Input Validation ---
        const inputs = [height, waist, neck];
        if (gender === 'female') {
            inputs.push(hip);
        }

        if (inputs.some(val => !val || +val <= 0)) {
            setError('Please fill in all required fields with valid positive numbers.');
            setBodyFat(null);
            return;
        }

        // --- Body Fat Calculation ---
        let bfp = 0;
        // Note: The formulas require height, waist, neck, and hip measurements in centimeters.
        // The Math.log10() function is used as required by the formula.
        if (gender === 'male') {
            // Formula for men
            bfp = 86.010 * Math.log10(parseFloat(waist) - parseFloat(neck)) - 70.041 * Math.log10(parseFloat(height)) + 36.76;
        } else {
            // Formula for women
            bfp = 163.205 * Math.log10(parseFloat(waist) + parseFloat(hip) - parseFloat(neck)) - 97.684 * Math.log10(parseFloat(height)) - 78.387;
        }

        // --- Update State ---
        if (bfp > 0) {
            setBodyFat(bfp.toFixed(1)); // Set result to one decimal place
            setError(''); // Clear any previous errors
        } else {
            setError('Calculation resulted in a non-positive value. Please check your measurements.');
            setBodyFat(null);
        }
    };

    /**
     * Resets all state variables to their initial values.
     */
    const resetFields = () => {
        setGender('male');
        setHeight('');
        setWaist('');
        setNeck('');
        setHip('');
        setBodyFat(null);
        setError('');
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-black font-sans text-white">
                <div className="p-8 space-y-6 max-w-md w-full">
                    {/* --- Title --- */}
                    <h1 className="text-4xl font-bold text-center text-purple-400">Body Fat Calculator</h1>
                    <p className="text-center text-gray-400">U.S. Navy Method</p>

                    {/* --- Input Section --- */}
                    <div className="space-y-4">
                        {/* Gender Selection */}
                        <div className="flex justify-center gap-4">
                            <button onClick={() => setGender('male')} className={`px-6 py-2 rounded-2xl transition-colors duration-300 ${gender === 'male' ? 'bg-pink-500 text-white' : 'bg-gray-700 text-gray-300'}`}>Male</button>
                            <button onClick={() => setGender('female')} className={`px-6 py-2 rounded-2xl transition-colors duration-300 ${gender === 'female' ? 'bg-pink-500 text-white' : 'bg-gray-700 text-gray-300'}`}>Female</button>
                        </div>

                        {/* Measurement Inputs */}
                        <div>
                            <label htmlFor="height" className="block text-lg font-medium text-purple-400 mb-1">Height (cm)</label>
                            <input type="number" id="height" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g., 175" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300" />
                        </div>
                        <div>
                            <label htmlFor="waist" className="block text-lg font-medium text-purple-400 mb-1">Waist (cm)</label>
                            <input type="number" id="waist" value={waist} onChange={(e) => setWaist(e.target.value)} placeholder="At naval" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300" />
                        </div>
                        <div>
                            <label htmlFor="neck" className="block text-lg font-medium text-purple-400 mb-1">Neck (cm)</label>
                            <input type="number" id="neck" value={neck} onChange={(e) => setNeck(e.target.value)} placeholder="Below larynx" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300" />
                        </div>
                        {/* Hip input - only for females */}
                        {gender === 'female' && (
                            <div className="transition-all duration-500 ease-in-out">
                                <label htmlFor="hip" className="block text-lg font-medium text-purple-400 mb-1">Hip (cm)</label>
                                <input type="number" id="hip" value={hip} onChange={(e) => setHip(e.target.value)} placeholder="At largest point" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300" />
                            </div>
                        )}
                    </div>

                    {/* --- Action Buttons --- */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={calculateBodyFat} className="w-full px-6 py-3 text-lg font-semibold text-white bg-purple-600 rounded-2xl shadow-md hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-pink-500 transition-all duration-300 transform hover:scale-105">Calculate Body Fat</button>
                        <button onClick={resetFields} className="w-full px-6 py-3 text-lg font-semibold text-gray-300 bg-gray-700 rounded-2xl shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-gray-500 transition-all duration-300">Reset</button>
                    </div>

                    {/* --- Error Message Display --- */}
                    {error && <p className="text-center text-red-400 font-medium mt-4">{error}</p>}

                    {/* --- Result Display --- */}
                    {bodyFat && (
                        <div className="mt-8 p-6 bg-gray-800 rounded-2xl shadow-lg text-center transition-all duration-500 transform animate-fade-in">
                            <h2 className="text-2xl font-bold text-gray-200">Your Body Fat is</h2>
                            <p className="text-5xl font-extrabold text-purple-400 my-2">{bodyFat}%</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
