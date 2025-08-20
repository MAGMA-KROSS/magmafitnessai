"use client"
import { Footer } from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import React, { useState } from 'react';

// A simple component to render markdown-like text to HTML
// MOVED OUTSIDE: This prevents it from being re-created on every render.
const SimpleMarkdownRenderer = ({ content }) => {
  if (!content) return null;

  const lines = content.split('\n');

  const renderLine = (line, index) => {
    // Headings
    if (line.startsWith('# 🏋️')) return <h1 key={index} className="text-3xl font-bold text-purple-400 mt-6 mb-4">{line.substring(2)}</h1>;
    if (line.startsWith('## ')) return <h2 key={index} className="text-2xl font-bold text-purple-400 mt-6 mb-4">{line.substring(3)}</h2>;

    // List items
    if (line.startsWith('- ')) return <li key={index} className="ml-6 list-disc">{line.substring(2)}</li>;

    // Bold text within a line
    if (line.includes('**')) {
      const parts = line.split('**');
      const renderedParts = parts.map((part, partIndex) =>
        partIndex % 2 === 1 ? <strong className="font-bold text-pink-400" key={partIndex}>{part}</strong> : part
      );
      return <p key={index} className="my-2">{renderedParts}</p>;
    }

    // Paragraphs and other text
    return <p key={index} className="my-2">{line}</p>;
  };

  return (
    <div className="prose prose-invert text-gray-300">
      {lines.map((line, index) => renderLine(line, index))}
    </div>
  );
};

// Form field component for cleaner code
// MOVED OUTSIDE: This is the key fix. By defining it here, it's not re-created on each App re-render, preserving input focus.
const FormField = ({ label, name, type = 'text', placeholder, value, onChange, children }) => (
  <div>
    <label htmlFor={name} className="block text-lg font-medium text-purple-400 mb-1">{label}</label>
    {type === 'select' ? (
      <select id={name} name={name} value={value} onChange={onChange} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300">
        {children}
      </select>
    ) : (
      <input type={type} id={name} name={name} placeholder={placeholder} value={value} onChange={onChange} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300 placeholder-gray-500" />
    )}
  </div>
);


// Main App component for the Fitness Plan Generator
export default function App() {
  // State for form inputs, using a single object
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male',
    height_cm: '',
    weight_kg: '',
    activity_level: 'moderate',
    fitness_goal: 'bulk',
    workout_preference: 'gym',
    diet_preference: 'non-veg',
    equipment_available: 'basic gym equipment',
    injuries: 'none',
  });

  // State for API response and UI status
  const [plan, setPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes and update the formData state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission to the backend API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setPlan('');

    // Basic validation
    for (const key in formData) {
      if (formData[key] === '') {
        setError(`Please fill out the '${key.replace(/_/g, ' ')}' field.`);
        setIsLoading(false);
        return;
      }
    }

    try {
      // NOTE: This is a direct call to the Gemini API for demonstration.
      // In a real app, this logic would be on your backend server.
      // The empty key will be handled by the environment.
      const apiKey = "AIzaSyCrvVFsmztJF232MI8tEK2mn_mK-r34SUE"; // CORRECTED LINE: Removed the syntax error.
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

      const prompt = `
        You are a professional fitness and nutrition coach AI.
        Your task is to create a complete personalized fitness and diet plan based on the given input JSON.
        Format the output in Markdown.
        Include the following sections clearly:
        1. Body Stats (Estimated Body Fat %, BMI, BMR, TDEE)
        2. Daily Nutrition Goals (Calories, Protein, Carbs, Fats)
        3. Weekly Workout Plan (7-day schedule with exercises, sets, reps, rest)
        4. Diet Plan (3 Main Meals + 2 Snacks with food items and macros)
        5. Pro Tips (Lifestyle, recovery, hydration, sleep advice)

        Use the INPUT JSON as dynamic values and generate plans accordingly. Do not use repeating day names like "Thursday: Repeat Day 1". Write out the full plan for each day.
        
        INPUT JSON:
        ${JSON.stringify(formData, null, 2)}
      `;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(`API Error: ${response.statusText} - ${errorBody.error?.message || 'Unknown error'}`);
      }

      const result = await response.json();
      const planText = result.candidates[0].content.parts[0].text;
      setPlan(planText);

    } catch (err) {
      setError(err.message || 'Failed to generate plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-black font-sans text-white">
        <div className="p-8 space-y-8 max-w-4xl w-full">
          {/* --- Title --- */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-purple-400">Personalized Fitness Plan Generator</h1>
            <p className="text-gray-400 mt-2">Powered by AI</p>
          </div>

          {/* --- Form --- */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Name" name="name" placeholder="e.g., Alex" value={formData.name} onChange={handleInputChange} />
            <FormField label="Age" name="age" type="number" placeholder="e.g., 25" value={formData.age} onChange={handleInputChange} />
            <FormField label="Gender" name="gender" type="select" value={formData.gender} onChange={handleInputChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </FormField>
            <FormField label="Height (cm)" name="height_cm" type="number" placeholder="e.g., 175" value={formData.height_cm} onChange={handleInputChange} />
            <FormField label="Weight (kg)" name="weight_kg" type="number" placeholder="e.g., 70" value={formData.weight_kg} onChange={handleInputChange} />
            <FormField label="Activity Level" name="activity_level" type="select" value={formData.activity_level} onChange={handleInputChange}>
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="light">Lightly Active (light exercise/sports 1-3 days/week)</option>
              <option value="moderate">Moderately Active (moderate exercise/sports 3-5 days/week)</option>
              <option value="active">Very Active (hard exercise/sports 6-7 days a week)</option>
            </FormField>
            <FormField label="Fitness Goal" name="fitness_goal" type="select" value={formData.fitness_goal} onChange={handleInputChange}>
              <option value="cut">Weight Loss (Cut)</option>
              <option value="bulk">Muscle Gain (Bulk)</option>
              <option value="maintain">Maintain Fitness</option>
            </FormField>
            <FormField label="Workout Preference" name="workout_preference" type="select" value={formData.workout_preference} onChange={handleInputChange}>
              <option value="gym">Gym</option>
              <option value="home">Home</option>
            </FormField>
            <FormField label="Diet Preference" name="diet_preference" type="select" value={formData.diet_preference} onChange={handleInputChange}>
              <option value="non-veg">Non-Vegetarian</option>
              <option value="veg">Vegetarian</option>
            </FormField>
            <FormField label="Equipment Available" name="equipment_available" placeholder="e.g., Dumbbells, resistance bands" value={formData.equipment_available} onChange={handleInputChange} />
            <FormField label="Injuries or Limitations" name="injuries" placeholder="e.g., Knee pain, none" value={formData.injuries} onChange={handleInputChange} />

            <div className="md:col-span-2">
              <button type="submit" disabled={isLoading} className="w-full px-6 py-4 text-lg font-semibold text-white bg-purple-600 rounded-2xl shadow-md hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-pink-500 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed">
                {isLoading ? 'Generating Your Plan...' : 'Generate Plan'}
              </button>
            </div>
          </form>

          {/* --- Error Message Display --- */}
          {error && <p className="text-center text-red-400 font-medium mt-4">{error}</p>}

          {/* --- Result Display --- */}
          {plan && (
            <div className="mt-8 p-6 bg-gray-800 rounded-2xl shadow-lg transition-all duration-500 transform animate-fade-in">
              <SimpleMarkdownRenderer content={plan} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
