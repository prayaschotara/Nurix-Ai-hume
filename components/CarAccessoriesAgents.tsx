"use client";

import React from 'react';
import { carAccessoriesAgents } from '../types/agent';
import HumeAgentCard from './HumeAgentCard';
import { TruckIcon } from '@heroicons/react/24/outline';

export default function CarAccessoriesAgents() {
    return (
        <section className="py-12 md:py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center justify-center p-2 bg-purple-50 rounded-2xl mb-4">
                        <TruckIcon className="w-6 h-6 text-purple-500 mr-2" />
                        <span className="text-purple-700 font-medium">Automotive Enhancement</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Car Accessories
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Our AI agent will help you find the perfect accessories to enhance your vehicle&apos;s comfort, 
                        performance, and style with personalized recommendations.
                    </p>
                </div>
                
                <div className="mx-auto">
                    {carAccessoriesAgents.map((agent) => (
                        <HumeAgentCard key={agent.id} agent={agent} />
                    ))}
                </div>
            </div>
        </section>
    );
} 