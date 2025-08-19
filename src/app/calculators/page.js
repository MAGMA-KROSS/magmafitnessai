"use client"
import React, { useState, useEffect } from 'react';
import { HeartPulse, Landmark, Cake, TrendingUp, Receipt, Percent, Calendar, Clock, Flame } from 'lucide-react';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';

// --- Data for the calculator cards ---
// To add a new calculator, just add a new object to this array.
const calculatorData = [
  {
    icon: <HeartPulse size={32} className="text-pink-400" />,
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index.",
  },
  {
    icon: <Flame size={32} className="text-orange-400" />,
    title: "Calorie Calculator",
    description: "Estimate your daily calorie needs.",
  },
  {
    icon: <Flame size={32} className="text-orange-400" />,
    title: "Body Fat Calculator",
    description: "Estimate your body fat percentage.",
  },
  
];

// --- Reusable Calculator Card Component ---
const CalculatorCard = ({ icon, title, description, delay }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    const animationClasses = isVisible 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-5';

    return (
        // Gradient border container
        <div className={`
            p-0.5 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-purple-600
            transform transition-all duration-300 ease-in-out
            hover:scale-[1.03] hover:shadow-2xl hover:shadow-purple-500/40
            ${animationClasses}
        `}>
            {/* Inner card content */}
            <div className="h-full w-full bg-[#0c0c0c] rounded-[14px] p-6 flex flex-col justify-between">
                <div>
                    <div className="mb-4">
                        {icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
                    <p className="text-sm text-gray-400">{description}</p>
                </div>
                <button 
                    className="
                        mt-6 w-full py-2.5 px-4 rounded-lg text-sm font-semibold 
                        bg-purple-600 text-white
                        hover:bg-purple-800 focus:outline-none focus:ring-2 
                        focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-pink-500
                        transition-colors duration-200
                    "
                >
                    Use Now
                </button>
            </div>
        </div>
    );
};


// --- Main App Component ---
export default function App() {

  return (
    <>
    <Navbar/>
    <div className=" min-h-screen font-sans text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        
        {/* Header Section */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-300 mb-3">
            Explore Smart Calculators
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Your one-stop destination for quick, reliable, and easy-to-use fitness tools.
          </p>
        </header>

        {/* Responsive Grid Layout */}
        <main className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {calculatorData.map((calculator, index) => (
            <CalculatorCard
              key={calculator.title}
              icon={calculator.icon}
              title={calculator.title}
              description={calculator.description}
              delay={index * 100} // Staggered animation delay
            />
          ))}
        </main>
        
      </div>
    </div>
    <Footer/>
    </>
  );
}
