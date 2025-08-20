// app/components/HeroSection.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import React from 'react';
// Assuming DarkVeil is correctly installed and imported
// npm install @reactbits/ui
import DarkVeil from '@/blocks/Backgrounds/DarkVeil/DarkVeil';

export const HeroSection = ({
  headline = "Your Personal AI Fitness Coach — Anytime, Anywhere",
  subtext = "Get customized workout and diet plans tailored just for you.",
  buttonLabel = "Start Your Fitness Journey",
  buttonLink = "/calculators",
}) => {
  
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger the animation of children
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id='Home' className="relative flex items-center justify-center w-full min-h-[85vh] text-white overflow-hidden">
      {/* 1. Animated Background using DarkVeil */}
      {/* This container ensures the background covers the entire section */}
      <div className="absolute inset-0 w-full h-full z-0" aria-hidden="true">
        <DarkVeil speed={1.7}/>
      </div>

      {/* 2. Semi-transparent dark overlay for readability */}
      <div className="absolute inset-0 z-10" aria-hidden="true" />

      {/* 3. Content container */}
      <motion.div
        className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Headline with gradient text */}
        <motion.h1
          className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          variants={itemVariants}
        >
          <span className="bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent">
            {headline}
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="mt-6 max-w-2xl text-lg text-neutral-200 md:text-xl"
          variants={itemVariants}
        >
          {subtext}
        </motion.p>

        {/* Call-to-Action Button */}
        <motion.div variants={itemVariants} className="mt-10">
          <Link
            href={buttonLink}
            className="inline-block px-8 py-4 text-lg font-semibold bg-purple-600 rounded-lg shadow-lg
                       hover:bg-purple-700 hover:scale-105
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-purple-500
                       transition-all duration-300 ease-in-out"
            aria-label="Start your fitness journey and navigate to the dashboard"
          >
            {buttonLabel}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};
