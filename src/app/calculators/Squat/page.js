"use client"
import { Footer } from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import React, { useState } from 'react';

// Strength standards data for Squat based on common public data sets.
// Bodyweight is the key (in kg), and values are estimated 1RM in kg.
const squatStandards = {
    male: {
        52: { beginner: 52.5, intermediate: 85, advanced: 125 },
        56: { beginner: 60, intermediate: 95, advanced: 137.5 },
        60: { beginner: 65, intermediate: 105, advanced: 152.5 },
        67.5: { beginner: 75, intermediate: 120, advanced: 172.5 },
        75: { beginner: 85, intermediate: 135, advanced: 192.5 },
        82.5: { beginner: 92.5, intermediate: 147.5, advanced: 210 },
        90: { beginner: 100, intermediate: 160, advanced: 227.5 },
        100: { beginner: 107.5, intermediate: 172.5, advanced: 245 },
        110: { beginner: 115, intermediate: 182.5, advanced: 260 },
        120: { beginner: 122.5, intermediate: 192.5, advanced: 275 },
    },
    female: {
        44: { beginner: 30, intermediate: 47.5, advanced: 70 },
        48: { beginner: 35, intermediate: 55, advanced: 80 },
        52: { beginner: 40, intermediate: 62.5, advanced: 90 },
        56: { beginner: 42.5, intermediate: 67.5, advanced: 97.5 },
        60: { beginner: 47.5, intermediate: 75, advanced: 107.5 },
        67.5: { beginner: 52.5, intermediate: 85, advanced: 120 },
        75: { beginner: 57.5, intermediate: 92.5, advanced: 130 },
        82.5: { beginner: 62.5, intermediate: 100, advanced: 140 },
        90: { beginner: 65, intermediate: 105, advanced: 150 },
    }
};

// Main App component for the Squat Standards Calculator
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

        const genderStandards = squatStandards[gender];
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
                        <h1 className="text-4xl font-bold text-purple-400">Squat Standards</h1>
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
                            <h2 className="text-2xl font-bold text-gray-200">Estimated 1-Rep Max Squat</h2>
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
