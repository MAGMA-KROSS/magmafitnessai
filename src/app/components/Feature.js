// app/components/FeaturesOverview.jsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Dumbbell, Apple, TrendingUp, Calculator } from 'lucide-react';

// Default features data if none are provided via props.
const defaultFeatures = [
  {
    icon: Dumbbell,
    title: 'AI Personalized Workout Plans',
    description: 'Our AI analyzes your goals and fitness level to create workout plans that are perfect for you.',
  },
  {
    icon: Apple,
    title: 'Goal-based Diet Plans',
    description: 'Receive customized meal plans and nutritional guidance to complement your workouts and reach your goals faster.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Visually track your strength, weight, and measurement progress with intuitive charts and graphs.',
  },
  {
    icon: Calculator,
    title: 'Fitness Calculators & Guides',
    description: 'Access a suite of tools and expert guides for everything from calorie counting to exercise form.',
  },
];

/**
 * A responsive and animated component to display a grid of feature cards for MagamFitnessAI.
 *
 * @param {object} props - The props for the component.
 * @param {Array<object>} [props.features=defaultFeatures] - An array of feature objects to display.
 * @returns {JSX.Element} The rendered FeaturesOverview component.
 */
export const FeaturesOverview = ({ features = defaultFeatures }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // The animation will only trigger once
    threshold: 0.1,   // Trigger when 10% of the component is visible
  });

  // Animation variants for the container to orchestrate children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger the animation of each card
      },
    },
  };

  // Animation variants for each feature card
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id='Feature' className="py-16 sm:py-24 bg-transparent text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Why Choose MagamFitnessAI?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-300 md:text-xl">
            Your all-in-one AI fitness companion.
          </p>
        </div>

        {/* Animated Features Grid */}
        <motion.div
          ref={ref}
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-neutral-900/50 rounded-xl shadow-md 
                         hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1
                         transition-all duration-300 ease-in-out"
              variants={itemVariants}
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-600 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
              </div>

              {/* Title */}
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-base text-neutral-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
