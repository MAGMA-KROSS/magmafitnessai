"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Dumbbell, Waves, Users, Zap, Utensils, HeartPulse, ShieldCheck, Info, Link } from 'lucide-react';
import { useAuth } from "@clerk/nextjs";
// Neon glow button component
const NeonButton = ({ children, onClick, disabled = false, type = 'button', className = '' }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-semibold text-purple-600 transition-all duration-300 ease-out border-2 border-purple-600 rounded-lg shadow-md group ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
  >
    <span className="absolute inset-0 w-full h-full bg-black"></span>
    <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear-out-of-range transform-translate-x-full translate-y-full bg-purple-600 group-hover:mb-0 group-hover:mr-0"></span>
    <span className="absolute top-0 left-0 w-full h-12 -mt-1 -ml-1 transition-all duration-200 ease-linear-in-range transform -translate-x-full -translate-y-full bg-purple-600 group-hover:mt-0 group-hover:ml-0"></span>
    <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-black">{children}</span>
  </button>
);

// Main Onboarding Component
export default function onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: '',
    fitnessGoal: '',
    workoutType: '',
    dietType: '',
    equipment: [],
    notes: '',
  });
  const [isComplete, setIsComplete] = useState(false);
  const totalSteps = 3;
  const { getToken } = useAuth();


  const handleEquipmentChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const equipment = checked
        ? [...prev.equipment, value]
        : prev.equipment.filter(item => item !== value);
      return { ...prev, equipment };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken(); // 🔑 Get token before request
      console.log("Token:", token); // Debugging - check if you are actually getting it

      const res = await fetch("/api/user/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Pass token
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {

        setIsComplete(true);
      } else {
        const errorData = await res.json();
        console.error("Error response:", errorData);
        alert("❌ Error saving user: " + errorData.message);
      }
    } catch (err) {
      console.error("Request failed:", err);
      alert("⚠️ Something went wrong. Check console.");
    }

  };


  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold text-purple-600 mb-6 flex items-center gap-2"><HeartPulse size={24} />Personal Info</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="age" className="block mb-1 text-sm font-medium text-gray-300">Age</label>
                <input type="number" name="age" id="age" value={formData.age} onChange={handleChange} className="input-field" placeholder="e.g., 25" required />
              </div>
              <div>
                <label htmlFor="gender" className="block mb-1 text-sm font-medium text-gray-300">Gender</label>
                <select name="gender" id="gender" value={formData.gender} onChange={handleChange} className="input-field" required>
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="height" className="block mb-1 text-sm font-medium text-gray-300">Height (cm)</label>
                <input type="number" name="height" id="height" value={formData.height} onChange={handleChange} className="input-field" placeholder="e.g., 180" required />
              </div>
              <div>
                <label htmlFor="weight" className="block mb-1 text-sm font-medium text-gray-300">Weight (kg)</label>
                <input type="number" name="weight" id="weight" value={formData.weight} onChange={handleChange} className="input-field" placeholder="e.g., 75" required />
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold text-purple-500 mb-6 flex items-center gap-2"><Waves size={24} />Lifestyle</h2>
            <div className="space-y-6">
              <fieldset>
                <legend className="block mb-2 text-sm font-medium text-gray-300">Activity Level</legend>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Sedentary', 'Light', 'Moderate', 'Active'].map(level => (
                    <label key={level} className={`radio-label ${formData.activityLevel === level ? 'radio-label-checked' : ''}`}>
                      <input type="radio" name="activityLevel" value={level} checked={formData.activityLevel === level} onChange={handleChange} className="sr-only" />
                      {level}
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="block mb-2 text-sm font-medium text-gray-300">Fitness Goal</legend>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Bulk', 'Cut', 'Maintain'].map(goal => (
                    <label key={goal} className={`radio-label ${formData.fitnessGoal === goal ? 'radio-label-checked' : ''}`}>
                      <input type="radio" name="fitnessGoal" value={goal} checked={formData.fitnessGoal === goal} onChange={handleChange} className="sr-only" />
                      {goal}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div key="step3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold text-purple-500 mb-6 flex items-center gap-2"><Zap size={24} />Preferences</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="workoutType" className="block mb-1 text-sm font-medium text-gray-300">Workout Type</label>
                <select name="workoutType" id="workoutType" value={formData.workoutType} onChange={handleChange} className="input-field">
                  <option value="" disabled>Select Workout</option>
                  <option value="Calisthenics">Calisthenics</option>
                  <option value="Gym">Gym</option>
                  <option value="Home">Home</option>
                </select>
              </div>
              <div>
                <label htmlFor="dietType" className="block mb-1 text-sm font-medium text-gray-300">Diet Type</label>
                <select name="dietType" id="dietType" value={formData.dietType} onChange={handleChange} className="input-field">
                  <option value="" disabled>Select Diet</option>
                  <option value="Veg">Vegetarian</option>
                  <option value="Non-Veg">Non-Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Keto">Keto</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
              <fieldset>
                <legend className="block mb-2 text-sm font-medium text-gray-300">Equipment Availability</legend>
                <div className="grid grid-cols-2 gap-4">
                  {['Dumbbells', 'Resistance Bands', 'Pull-up Bar', 'None'].map(item => (
                    <label key={item} className={`checkbox-label ${formData.equipment.includes(item) ? 'checkbox-label-checked' : ''}`}>
                      <input type="checkbox" value={item} checked={formData.equipment.includes(item)} onChange={handleEquipmentChange} className="sr-only" />
                      {item}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div>
                <label htmlFor="notes" className="block mb-1 text-sm font-medium text-gray-300">Injury/Restriction Notes</label>
                <textarea name="notes" id="notes" value={formData.notes} onChange={handleChange} className="input-field min-h-[100px]" placeholder="Any details you want to share..."></textarea>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };


  if (isComplete) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center p-4 font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center p-8 bg-gray-900/50 border border-purple-600/30 rounded-2xl shadow-2xl shadow-Let's build your personalized profile/10 max-w-md"
        >
          <ShieldCheck className="mx-auto h-16 w-16 text-purple-600" />
          <h2 className="mt-4 text-3xl font-extrabold text-white">Setup Complete!</h2>
          <p className="mt-2 text-gray-300">Welcome to MagamFitnessAI. Your personalized plan is being generated.</p>
          <p className="mt-4 text-sm text-gray-500">You can now close this window.</p>
          <NeonButton>
            <Link href="/dashboard">Personalized Plan</Link>
          </NeonButton>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
        
            <h1 className="text-4xl font-extrabold tracking-tighter text-white">
              Magma<span className="text-purple-600">FitnessAI</span>
            </h1>
         
          <p className="text-gray-400">Let's build your personalized profile</p>
        </div>
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-purple-500">Step {currentStep} of {totalSteps}</p>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <motion.div
              className="bg-purple-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 shadow-2xl shadow-cyan-500/10">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 pt-6 border-t border-gray-700 flex justify-between items-center">
            <NeonButton onClick={handleBack} disabled={currentStep === 1} className={currentStep === 1 ? 'invisible' : ''}>
              <ChevronLeft size={20} className="mr-2" /> Back
            </NeonButton>

            {currentStep < totalSteps && (
              <NeonButton onClick={handleNext}>
                Next <ChevronRight size={20} className="ml-2" />
              </NeonButton>
            )}

            {currentStep === totalSteps && (
              <NeonButton type="submit">
                Finish Setup <ShieldCheck size={20} className="ml-2" />
              </NeonButton>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}