"use client";

import React from 'react';
import { insuranceAgents } from '../types/agent';
import HumeAgentCard from './HumeAgentCard';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function InsuranceAgents() {
    return (
        <section className="py-12 md:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center justify-center p-2 bg-emerald-50 rounded-2xl mb-4">
                        <ShieldCheckIcon className="w-6 h-6 text-emerald-500 mr-2" />
                        <span className="text-emerald-700 font-medium">Protection Services</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Insurance Assistance
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Our AI agent can help with policy details, filing claims, and finding the best 
                        coverage options tailored to your needs.
                    </p>
                </div>
                
                <div className="mx-auto">
                    {insuranceAgents.map((agent) => (
                        <HumeAgentCard key={agent.id} agent={agent} />
                    ))}
                </div>
            </div>
        </section>
    );
} 