'use client';

import Link from 'next/link';
import { SparklesIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <div className="backdrop-blur-lg bg-white/80 dark:bg-black/80 border-b border-gray-200/20 dark:border-gray-800/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo and Brand */}
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 p-1.5 rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-110">
                                <SparklesIcon className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                BITONTREE
                            </span>
                        </Link>

                        

                        {/* Actions */}
                        <div className="flex items-center space-x-4">
                            {/* Theme Toggle */}
                            {mounted && (
                                <button
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className="p-2 rounded-lg text-gray-600 dark:text-gray-300
                                             hover:bg-gray-100 dark:hover:bg-gray-800
                                             transition-all duration-200"
                                    aria-label="Toggle theme"
                                >
                                    {theme === 'dark' ? (
                                        <SunIcon className="w-5 h-5" />
                                    ) : (
                                        <MoonIcon className="w-5 h-5" />
                                    )}
                                </button>
                            )}

                            {/* Contact Button */}
                            <a
                                href="#contact"
                                className="inline-flex items-center px-4 py-2 rounded-lg
                                         bg-gradient-to-r from-blue-600 to-purple-600 
                                         hover:from-blue-700 hover:to-purple-700
                                         dark:from-blue-500 dark:to-purple-500
                                         dark:hover:from-blue-600 dark:hover:to-purple-600
                                         text-white
                                         hover:shadow-lg hover:scale-105
                                         transition-all duration-200
                                         text-sm font-medium"
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
} 