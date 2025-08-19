// app/components/Testimonials.jsx
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Default testimonials data if none are provided via props.
const defaultTestimonials = [
  {
    image: 'https://placehold.co/100x100/333/FFF?text=AP',
    alt: 'Aniket Sharma, a young professional from Mumbai',
    quote: 'MagamFitnessAI has completely transformed my workout routine. The AI-driven plans are challenging yet perfectly suited to my level. I’ve seen more progress in 3 months than I did in the last year!',
    name: 'Aniket Sharma',
    location: 'Mumbai, Maharashtra',
  },
  {
    image: 'https://placehold.co/100x100/333/FFF?text=PS',
    alt: 'Priya Singh, a college student from Delhi',
    quote: 'As a student, my schedule is chaotic. This app adapts to my time constraints and helps me stay consistent with both my diet and exercise. It’s like having a personal coach in my pocket.',
    name: 'Priya Singh',
    location: 'Delhi',
  },
  {
    image: 'https://placehold.co/100x100/333/FFF?text=RV',
    alt: 'Rajesh Verma, a middle-aged man from Bengaluru',
    quote: 'Getting back into fitness in my 40s was daunting. The guidance and progress tracking are incredibly motivating. The calculators and guides are a fantastic bonus. Highly recommended!',
    name: 'Rajesh Verma',
    location: 'Bengaluru, Karnataka',
  },
];

/**
 * A responsive and animated component to display user testimonials.
 *
 * @param {object} props - The props for the component.
 * @param {Array<object>} [props.testimonials=defaultTestimonials] - An array of testimonial objects to display.
 * @returns {JSX.Element} The rendered Testimonials component.
 */
export const Testimonials = ({ testimonials = defaultTestimonials }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

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
    <section className="py-16 sm:py-24 bg-transparent text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            What Our Users Say
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-300 md:text-xl">
            Real stories from real members of the MagamFitnessAI community.
          </p>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          ref={ref}
          className="mt-16 grid gap-12 lg:grid-cols-3 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              variants={itemVariants}
            >
              <div className="relative">
                <Image
                  className="rounded-full shadow-lg"
                  src={testimonial.image}
                  alt={testimonial.alt}
                  width={100}
                  height={100}
                  unoptimized={true} // FIX: Added this prop to allow SVG placeholders
                  style={{
                    boxShadow: '0 0 15px 2px rgba(192, 132, 252, 0.4)',
                  }}
                />
              </div>
              <blockquote className="mt-6 text-neutral-200">
                <p>&ldquo;{testimonial.quote}&rdquo;</p>
              </blockquote>
              <footer className="mt-4">
                <p className="text-base font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-neutral-400">{testimonial.location}</p>
              </footer>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
