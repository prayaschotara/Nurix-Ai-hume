"use client";

import React from 'react';
import { phoneAgents } from '../types/agent';
import HumeAgentCard from './HumeAgentCard';
import { DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

export default function PhoneAgents() {
    return (
        <section className="py-12 md:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center justify-center p-2 bg-blue-50 rounded-2xl mb-4">
                        <DevicePhoneMobileIcon className="w-6 h-6 text-blue-500 mr-2" />
                        <span className="text-blue-700 font-medium">Smartphone Services</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Phone Buy & Sell
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Our AI agent will help you find the perfect smartphone, get the best trade-in value, 
                        and provide expert guidance for all your phone-related needs.
                    </p>
                </div>
                
                <div className="mx-auto">
                    {phoneAgents.map((agent) => (
                        <HumeAgentCard key={agent.id} agent={agent} />
                    ))}
                </div>
            </div>
        </section>
    );
} 