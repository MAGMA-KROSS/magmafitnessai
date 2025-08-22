"use client"
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useUser } from "@clerk/nextjs";
import Image from 'next/image';
// --- Loading Component ---
const Loading = () => (
    <div className="flex justify-center items-center p-8">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-500"></div>
    </div>
);

// --- Main Profile Page Component ---
export default function App() {

    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(false);



    const handleGenerate = async () => {
        setLoading(true);
        setPlan(null);

        // Make sure the user is loaded before proceeding
        if (!isLoaded || !user) {
            setPlan("Could not get user information. Please try again.");
            setLoading(false);
            return;
        }

        try {
            // Step 1: Fetch user data from your new API route
            const userResponse = await fetch(`/api/user/${user.id}`);

            if (!userResponse.ok) {
                throw new Error('Failed to fetch user data from the database.');
            }

            const userData = await userResponse.json();

            // Step 2: Use the fetched data to generate the fitness plan
            const fitnessResponse = await fetch("/api/fitness", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData), // Use the data from the database here
            });

            if (fitnessResponse.ok) {
                const markdownText = await fitnessResponse.text();
                setPlan(markdownText);
            } else {
                const errorData = await fitnessResponse.json().catch(() => ({ error: 'Failed to parse error response.' }));
                setPlan(`Error generating plan: ${errorData.error || 'Unknown error'}`);
            }

        } catch (error) {
            console.error("API fetch error:", error);
            setPlan(`An error occurred: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const { isLoaded, isSignedIn, user } = useUser();
    if (!isLoaded || !isSignedIn) {
        return <div className='h-[80vh]'><Loading /></div>;
    }

    return (
        <div className="bg-black min-h-screen font-sans overflow-x-hidden text-gray-200">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            </div>

            <div className="relative container mx-auto px-4 py-12 md:py-20 z-10">
                <header className="flex flex-col items-center text-center mb-12">
                    <div className="relative group mb-4">
                        <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full transition-all duration-500 blur group-hover:blur-lg opacity-75"></div>

                        <Image
                            src={user.imageUrl}
                            alt="User Avatar"
                            width={128}
                            height={128}
                            className="relative rounded-full border-4 border-gray-900 object-cover"
                        />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">{user.fullName}</h1>
                    <p className="text-gray-400 mt-2">Welcome back to your dashboard.</p>
                </header>

                <main className="max-w-4xl mx-auto">
                    <div className="bg-gray-900/50 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-gray-800 shadow-2xl shadow-purple-500/10">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">MagamFitnessAI</h2>
                            <p className="text-gray-400 mb-6">Click the button to generate your personalized fitness and diet plan.</p>
                            <button onClick={handleGenerate} disabled={loading} className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold px-8 py-3 rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                                {loading ? "Generating..." : "Generate Fitness Plan"}
                            </button>
                        </div>

                        {loading && <Loading />}

                        {plan && (
                            <div className="mt-8 pt-6 border-t border-gray-800">
                                {/*
                                  We use the `components` prop to override the default HTML elements
                                  and apply our own Tailwind CSS classes for better spacing.
                                */}
                                <ReactMarkdown
                                    components={{
                                        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-6" {...props} />,
                                        h2: ({ node, ...props }) => <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mt-10 mb-5 border-b border-gray-700 pb-2" {...props} />,
                                        p: ({ node, ...props }) => <p className="text-gray-300 mb-4 leading-relaxed" {...props} />,
                                        ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-6 space-y-3" {...props} />,
                                        li: ({ node, ...props }) => <li className="text-gray-300" {...props} />,
                                        strong: ({ node, ...props }) => <strong className="font-bold text-purple-300" {...props} />,
                                    }}
                                >
                                    {plan}
                                </ReactMarkdown>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
