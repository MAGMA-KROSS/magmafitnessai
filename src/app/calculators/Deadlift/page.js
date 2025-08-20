"use client"
import { Footer } from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import React, { useState } from 'react';

// Strength standards data for Deadlift based on common public data sets.
// Bodyweight is the key (in kg), and values are estimated 1RM in kg.
const deadliftStandards = {
    male: {
        52: { beginner: 60, intermediate: 100, advanced: 147.5 },
        56: { beginner: 67.5, intermediate: 110, advanced: 162.5 },
        60: { beginner: 75, intermediate: 122.5, advanced: 177.5 },
        67.5: { beginner: 87.5, intermediate: 140, advanced: 200 },
        75: { beginner: 100, intermediate: 157.5, advanced: 222.5 },
        82.5: { beginner: 110, intermediate: 172.5, advanced: 242.5 },
        90: { beginner: 120, intermediate: 185, advanced: 260 },
        100: { beginner: 130, intermediate: 200, advanced: 280 },
        110: { beginner: 140, intermediate: 215, advanced: 297.5 },
        120: { beginner: 147.5, intermediate: 227.5, advanced: 312.5 },
    },
    female: {
        44: { beginner: 35, intermediate: 57.5, advanced: 85 },
        48: { beginner: 40, intermediate: 65, advanced: 95 },
        52: { beginner: 45, intermediate: 72.5, advanced: 105 },
        56: { beginner: 50, intermediate: 80, advanced: 115 },
        60: { beginner: 55, intermediate: 87.5, advanced: 125 },
        67.5: { beginner: 62.5, intermediate: 97.5, advanced: 140 },
        75: { beginner: 67.5, intermediate: 107.5, advanced: 152.5 },
        82.5: { beginner: 72.5, intermediate: 115, advanced: 165 },
        90: { beginner: 77.5, intermediate: 122.5, advanced: 175 },
    }
};

// Main App component for the Deadlift Standards Calculator
export default function App() {
    // State variables for user inputs
    const [gender, setGender] = useState('male');
    const [bodyWeight, setBodyWeight] = useState('');

    // State variables for results and errors
    const [standards, setStandards] = useState(null);
    const [error, setError] = useState('');

    /**
     * Estimates the 1RM for different levels using linear interpolation
     * based on the predefined standards data.
     */
    const calculateStandards = () => {
        const weightNum = parseFloat(bodyWeight);
        if (!weightNum || weightNum <= 0) {
            setError('Please enter a valid, positive body weight.');
            setStandards(null);
            return;
        }

        const genderStandards = deadliftStandards[gender];
        const bodyweightKeys = Object.keys(genderStandards).map(parseFloat);

        // Find the two closest bodyweight points for interpolation
        let lowerBound = null;
        let upperBound = null;

        if (weightNum <= bodyweightKeys[0]) {
            lowerBound = upperBound = bodyweightKeys[0];
        } else if (weightNum >= bodyweightKeys[bodyweightKeys.length - 1]) {
            lowerBound = upperBound = bodyweightKeys[bodyweightKeys.length - 1];
        } else {
            for (let i = 0; i < bodyweightKeys.length - 1; i++) {
                if (weightNum >= bodyweightKeys[i] && weightNum <= bodyweightKeys[i + 1]) {
                    lowerBound = bodyweightKeys[i];
                    upperBound = bodyweightKeys[i + 1];
                    break;
                }
            }
        }

        if (lowerBound === null || upperBound === null) {
            setError('Could not determine standards for the entered weight.');
            setStandards(null);
            return;
        }

        const lowerStandards = genderStandards[lowerBound];
        const upperStandards = genderStandards[upperBound];

        const calculated = {};

        // Linear interpolation function
        const interpolate = (level) => {
            if (lowerBound === upperBound) {
                return lowerStandards[level];
            }
            const weightRange = upperBound - lowerBound;
            const valueRange = upperStandards[level] - lowerStandards[level];
            const weightDiff = weightNum - lowerBound;
            return lowerStandards[level] + (weightDiff / weightRange) * valueRange;
        };

        calculated.beginner = interpolate('beginner').toFixed(1);
        calculated.intermediate = interpolate('intermediate').toFixed(1);
        calculated.advanced = interpolate('advanced').toFixed(1);

        setStandards(calculated);
        setError('');
    };

    /**
     * Resets all state variables to their initial values.
     */
    const resetFields = () => {
        setGender('male');
        setBodyWeight('');
        setStandards(null);
        setError('');
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-black font-sans text-white">
                <div className="p-8 space-y-6 max-w-md w-full">
                    {/* --- Title --- */}
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-purple-400">Deadlift Standards</h1>
                        <p className="text-gray-400 mt-1">Estimate average 1-Rep Max by bodyweight</p>
                    </div>

                    {/* --- Input Section --- */}
                    <div className="space-y-4">
                        {/* Gender Selection */}
                        <div>
                            <label className="block text-lg font-medium text-purple-400 mb-2">Gender</label>
                            <div className="flex justify-center gap-4">
                                <button onClick={() => setGender('male')} className={`w-full py-2 rounded-2xl transition-colors duration-300 ${gender === 'male' ? 'bg-pink-500 text-white' : 'bg-gray-700 text-gray-300'}`}>Male</button>
                                <button onClick={() => setGender('female')} className={`w-full py-2 rounded-2xl transition-colors duration-300 ${gender === 'female' ? 'bg-pink-500 text-white' : 'bg-gray-700 text-gray-300'}`}>Female</button>
                            </div>
                        </div>

                        {/* Bodyweight Input */}
                        <div>
                            <label htmlFor="bodyWeight" className="block text-lg font-medium text-purple-400 mb-1">Your Body Weight (kg)</label>
                            <input type="number" id="bodyWeight" value={bodyWeight} onChange={(e) => setBodyWeight(e.target.value)} placeholder="e.g., 75" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300 placeholder-gray-500" />
                        </div>
                    </div>

                    {/* --- Action Buttons --- */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={calculateStandards} className="w-full px-6 py-3 text-lg font-semibold text-white bg-purple-600 rounded-2xl shadow-md hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-pink-500 transition-all duration-300 transform hover:scale-105">Calculate Standards</button>
                        <button onClick={resetFields} className="w-full px-6 py-3 text-lg font-semibold text-gray-300 bg-gray-700 rounded-2xl shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-gray-500 transition-all duration-300">Reset</button>
                    </div>

                    {/* --- Error Message Display --- */}
                    {error && <p className="text-center text-red-400 font-medium mt-4">{error}</p>}

                    {/* --- Result Display --- */}
                    {standards && (
                        <div className="mt-8 p-6 bg-gray-800 rounded-2xl shadow-lg text-center transition-all duration-500 transform animate-fade-in space-y-4">
                            <h2 className="text-2xl font-bold text-gray-200">Estimated 1-Rep Max Deadlift</h2>
                            {/* Beginner */}
                            <div>
                                <p className="text-lg text-pink-400 font-semibold">Beginner</p>
                                <p className="text-4xl font-bold text-purple-400">{standards.beginner} <span className="text-2xl text-gray-400">kg</span></p>
                            </div>
                            {/* Intermediate */}
                            <div>
                                <p className="text-lg text-pink-400 font-semibold">Intermediate</p>
                                <p className="text-4xl font-bold text-purple-400">{standards.intermediate} <span className="text-2xl text-gray-400">kg</span></p>
                            </div>
                            {/* Advanced */}
                            <div>
                                <p className="text-lg text-pink-400 font-semibold">Advanced</p>
                                <p className="text-4xl font-bold text-purple-400">{standards.advanced} <span className="text-2xl text-gray-400">kg</span></p>
                            </div>
                            <p className="text-sm text-gray-500 pt-2">These are statistical averages and your actual strength may vary. Use them as a general guideline.</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
