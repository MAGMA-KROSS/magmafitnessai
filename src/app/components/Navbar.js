// app/components/Navbar.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useUser, UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

// Add default values to props to prevent errors if they are not passed.
// navLinks defaults to an empty array [].
// ctaButton defaults to an empty object {}.
const Navbar = ({ navLinks = [], ctaButton = {} }) => {
    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const menuVariants = {
        hidden: { x: '100%', opacity: 0, transition: { type: 'tween', duration: 0.3, ease: 'easeOut' } },
        visible: { x: 0, opacity: 1, transition: { type: 'tween', duration: 0.3, ease: 'easeIn' } },
    };

    const linkVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1 + 0.3, duration: 0.3 },
        }),
    };

    return (
        <header className="bg-black backdrop-blur-md sticky top-0 z-50 border-b border-black">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold text-white">
                            <h1 className="text-2xl font-extrabold tracking-tighter text-white">
                                Magma<span className="text-purple-600">FitnessAI</span>
                            </h1>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        {/* This map is now safe because navLinks is guaranteed to be an array */}
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-white hover:text-indigo-500 transition-colors duration-300 relative group"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA Button & User Auth */}
                    <div className="hidden md:block">
                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                        <SignedOut>
                            {/* Ensure ctaButton.href exists before rendering the Link */}
                            {ctaButton.href && (
                                <SignInButton mode="modal">
                                    <button className="inline-block bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                        {ctaButton.label || 'Sign In'}
                                    </button>
                                </SignInButton>
                            )}
                        </SignedOut>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                            aria-expanded={isOpen}
                            className="text-white hover:text-indigo-600 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu using Framer Motion */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="md:hidden fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-8"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={menuVariants}
                    >
                        <button
                            onClick={toggleMenu}
                            aria-label="Close menu"
                            className="absolute top-4 right-4 text-gray-800 hover:text-indigo-600"
                        >
                            <X size={28} />
                        </button>

                        {/* Mobile Navigation Links */}
                        <div className="flex flex-col items-center space-y-6">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    custom={index}
                                    initial="hidden"
                                    animate="visible"
                                    variants={linkVariants}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-2xl text-gray-700 hover:text-indigo-600 transition-colors duration-300"
                                        onClick={toggleMenu}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Mobile Auth Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                transition: { delay: (navLinks.length || 0) * 0.1 + 0.4, duration: 0.3 },
                            }}
                        >
                            <SignedIn>
                                <UserButton afterSignOutUrl="/" />
                            </SignedIn>
                            <SignedOut>
                                {ctaButton.href && (
                                    <SignInButton mode="modal">
                                        <button className="inline-block bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-lg" onClick={toggleMenu}>
                                            {ctaButton.label || 'Sign In'}
                                        </button>
                                    </SignInButton>
                                )}
                            </SignedOut>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
