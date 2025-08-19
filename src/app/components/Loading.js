import React from 'react';

const LoadingSpinner = () => {
  return (
    // The parent div creates the gradient border by using padding.
    // The spinning animation is applied to this element.
    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-400 p-1 animate-spin">
      
      {/* The inner div creates the "hole" in the middle.
          Its background color should match the background of the page.
          Change `bg-gray-900` to `bg-white` or any other color as needed. */}
      <div className="w-full bg-black h-full rounded-full">
      </div>
    </div>
  );
};


/**
 * This is the main App component, which serves as a demonstration of the spinner.
 * It centers the LoadingSpinner on a dark background.
 */
export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] font-sans bg-black text-white">
      <h2 className="mb-4 text-2xl font-semibold">Loading</h2>
      <p className="mb-8 text-gray-400">Please Wait</p>
      <LoadingSpinner />
    </div>
  );
}
