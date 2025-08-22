import React from 'react';

// Main App component for the Contact Page
export default function App() {
  // This component is primarily for UI and form submission via HTML attributes.
  // For more complex logic like client-side validation or showing a success message,
  // you would add state and a handleSubmit function.

  return (
    <div id='Contact' className="flex items-center justify-center min-h-screen bg-black font-sans text-white">
      <div className="p-8 space-y-6 max-w-md w-full">
        {/* --- Title --- */}
        <div className="text-center">
            <h1 className="text-4xl font-bold text-purple-600">Contact Us</h1>
            <p className="text-gray-400 mt-1">We&apos;d love to hear from you!</p>
        </div>

        {/* --- Contact Form --- */}
        {/* IMPORTANT: Replace "https://formfree.io/f/{your-form-id}" 
          with your actual Formfree.io endpoint URL.
        */}
        <form 
          action="https://formfree.io/f/xnnzgbko" 
          method="POST"
          className="space-y-4"
        >
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-purple-600 mb-1">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" // 'name' attribute is crucial for form submission
              placeholder="e.g., Alex Smith" 
              required 
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300 placeholder-gray-500"
            />
          </div>
          
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-purple-600 mb-1">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" // 'name' attribute is crucial for form submission
              placeholder="e.g., alex.smith@example.com" 
              required 
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300 placeholder-gray-500"
            />
          </div>

          {/* Message Textarea */}
          <div>
            <label htmlFor="message" className="block text-lg font-medium text-purple-600 mb-1">Message</label>
            <textarea 
              id="message" 
              name="message" // 'name' attribute is crucial for form submission
              rows="5"
              placeholder="Your message here..." 
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300 placeholder-gray-500 resize-none"
            ></textarea>
          </div>

          {/* --- Submit Button --- */}
          <div>
            <button 
              type="submit" 
              className="w-full mt-4 px-6 py-3 text-lg font-semibold text-white bg-purple-600 rounded-2xl shadow-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-pink-500 transition-all duration-300 transform hover:scale-105"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
