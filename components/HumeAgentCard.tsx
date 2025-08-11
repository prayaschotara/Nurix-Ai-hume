"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { MicrophoneIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { Agent } from '../types/agent';
import { HUME_RESTAURANT_AGENT_ID } from '../types/agent';
import HumeVoiceChat from './HumeVoiceChat';

interface HumeAgentCardProps {
    agent: Agent;
}

export default function HumeAgentCard({ agent }: HumeAgentCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isConversationActive, setIsConversationActive] = useState(false);
    const [isEndingConversation, setIsEndingConversation] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    


    const getThemeColors = () => {
        switch (agent.category) {
            case 'restaurant':
                return {
                    gradient: 'from-amber-50 to-amber-100',
                    gradientHover: 'from-amber-100 to-amber-200',
                    accent: 'bg-amber-500',
                    accentHover: 'hover:bg-amber-600',
                    accentLight: 'bg-amber-100',
                    text: 'text-amber-900',
                    textLight: 'text-amber-700',
                    badgeBg: 'bg-amber-100',
                    badgeText: 'text-amber-800',
                    shadow: 'shadow-amber-200',
                    borderHover: 'border-amber-300',
                    iconBg: 'bg-amber-500/10'
                };
            case 'insurance':
                return {
                    gradient: 'from-emerald-50 to-emerald-100',
                    gradientHover: 'from-emerald-100 to-emerald-200',
                    accent: 'bg-emerald-500',
                    accentHover: 'hover:bg-emerald-600',
                    accentLight: 'bg-emerald-100',
                    text: 'text-emerald-900',
                    textLight: 'text-emerald-700',
                    badgeBg: 'bg-emerald-100',
                    badgeText: 'text-emerald-800',
                    shadow: 'shadow-emerald-200',
                    borderHover: 'border-emerald-300',
                    iconBg: 'bg-emerald-500/10'
                };
            case 'phone':
                return {
                    gradient: 'from-blue-50 to-blue-100',
                    gradientHover: 'from-blue-100 to-blue-200',
                    accent: 'bg-blue-500',
                    accentHover: 'hover:bg-blue-600',
                    accentLight: 'bg-blue-100',
                    text: 'text-blue-900',
                    textLight: 'text-blue-700',
                    badgeBg: 'bg-blue-100',
                    badgeText: 'text-blue-800',
                    shadow: 'shadow-blue-200',
                    borderHover: 'border-blue-300',
                    iconBg: 'bg-blue-500/10'
                };
            case 'car_accessories':
                return {
                    gradient: 'from-purple-50 to-purple-100',
                    gradientHover: 'from-purple-100 to-purple-200',
                    accent: 'bg-purple-500',
                    accentHover: 'hover:bg-purple-600',
                    accentLight: 'bg-purple-100',
                    text: 'text-purple-900',
                    textLight: 'text-purple-700',
                    badgeBg: 'bg-purple-100',
                    badgeText: 'text-purple-800',
                    shadow: 'shadow-purple-200',
                    borderHover: 'border-purple-300',
                    iconBg: 'bg-purple-500/10'
                };
            default:
                return {
                    gradient: 'from-gray-50 to-gray-100',
                    gradientHover: 'from-gray-100 to-gray-200',
                    accent: 'bg-gray-500',
                    accentHover: 'hover:bg-gray-600',
                    accentLight: 'bg-gray-100',
                    text: 'text-gray-900',
                    textLight: 'text-gray-700',
                    badgeBg: 'bg-gray-100',
                    badgeText: 'text-gray-800',
                    shadow: 'shadow-gray-200',
                    borderHover: 'border-gray-300',
                    iconBg: 'bg-gray-500/10'
                };
        }
    };

    const getCategoryDisplayName = () => {
        switch (agent.category) {
            case 'restaurant':
                return 'Restaurant Concierge';
            case 'insurance':
                return 'Insurance Advisor';
            case 'phone':
                return 'Phone Specialist';
            case 'car_accessories':
                return 'Automotive Specialist';
            default:
                return String(agent.category).charAt(0).toUpperCase() + String(agent.category).slice(1);
        }
    };

    const colors = getThemeColors();

    const handleStartConversation = () => {
        setIsModalOpen(true);
        setIsConversationActive(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setIsConversationActive(false);
    };

    const handleEndConversation = async () => {
        setIsEndingConversation(true);
        setIsModalOpen(false);
        setIsConversationActive(false);
        // The modal will handle closing the WebSocket connection
        setTimeout(() => {
            setIsEndingConversation(false);
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 3000); // Hide after 3 seconds
        }, 1000);
    };

    return (
        <>
            <div 
                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden max-w-3xl mx-auto transition-all duration-300
                            ${isHovered ? `shadow-xl border-2 ${colors.borderHover}` : 'border border-gray-100 dark:border-gray-700'}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Header with gradient background */}
                <div className={`bg-gradient-to-r ${isHovered ? colors.gradientHover : colors.gradient} dark:from-gray-800 dark:to-gray-700 p-8 transition-all duration-300`}>
                    <div className="flex items-center gap-8">
                        {/* Agent avatar */}
                        <div className="relative w-24 h-24 flex-shrink-0">
                            {/* Pulsing background effect */}
                            <div className={`absolute inset-0 rounded-full ${colors.accentLight} opacity-20`}></div>
                            
                            {/* Glow effect */}
                            <div className={`absolute -inset-1 rounded-full blur-md opacity-50 ${colors.accent} 
                                          ${isHovered ? 'opacity-40' : 'opacity-0'} transition-opacity duration-300`}></div>
                            
                            {/* Avatar image */}
                            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg z-10">
                                <Image
                                    src={agent.avatar}
                                    alt={agent.name}
                                    fill
                                    className="object-cover transition-transform duration-500 hover:scale-110"
                                    unoptimized
                                />
                            </div>
                        </div>
                        
                        {/* Agent info */}
                        <div className="flex-grow">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className={`text-2xl font-bold ${colors.text}`}>{agent.name}</h3>
                                <span className={`px-3 py-1.5 text-xs font-medium rounded-full ${colors.badgeBg} ${colors.badgeText}
                                               shadow-sm transition-all duration-300 ${isHovered ? 'shadow-md scale-105' : ''}`}>
                                    {getCategoryDisplayName()}
                                </span>
                            </div>
                            <p className={`text-sm font-medium ${colors.textLight} mb-2`}>{agent.role}</p>
                            
                            {/* AI Badge */}
                            <div className="flex items-center mt-2">
                                <div className={`mr-2 p-1 rounded-md ${colors.iconBg}`}>
                                    <SparklesIcon className={`w-3.5 h-3.5 ${colors.text}`} />
                                </div>
                                <span className="text-xs font-medium text-gray-600">Powered by Hume AI EVI3</span>
                            </div>

                            {/* Conversation Status Badge */}
                            {isConversationActive && (
                                <div className="flex items-center mt-2">
                                    <div className="mr-2 p-1 rounded-md bg-green-100">
                                        <div className="w-3.5 h-3.5 rounded-full bg-green-500 animate-pulse"></div>
                                    </div>
                                    <span className="text-xs font-medium text-green-700">Conversation Active</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Description */}
                <div className="p-8 pt-6">
                    {agent.description && (
                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            {agent.description}
                        </p>
                    )}
                
                    {/* Features */}
                    <div className="mb-6">
                        <h4 className={`text-sm font-semibold mb-3 ${colors.text}`}>Capabilities</h4>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                            {agent.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3 group">
                                    <div className={`flex-shrink-0 w-5 h-5 rounded-full ${colors.accentLight} flex items-center justify-center 
                                                  transition-all duration-300 group-hover:scale-110 ${colors.shadow}`}>
                                        <svg className={`w-3 h-3 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300 text-sm transition-all duration-300 group-hover:text-gray-900 dark:group-hover:text-white">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Start Conversation Button */}
                    {agent.supportCall && !isConversationActive && (
                        <button
                            onClick={handleStartConversation}
                            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl w-full transition-all duration-300 
                                       ${colors.accent} ${colors.accentHover} text-white shadow-md font-medium transform hover:translate-y-[-2px]`}
                        >
                            <MicrophoneIcon className="w-5 h-5" />
                            <span>Start Voice Conversation</span>
                        </button>
                    )}

                    {/* End Conversation Button */}
                    {agent.supportCall && isConversationActive && (
                        <button
                            onClick={handleEndConversation}
                            disabled={isEndingConversation}
                            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl w-full transition-all duration-300 
                                       ${isEndingConversation ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'} 
                                       text-white shadow-md font-medium transform hover:translate-y-[-2px]`}
                        >
                            {isEndingConversation ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Ending...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <span>End Conversation</span>
                                </>
                            )}
                        </button>
                    )}

                    {/* Conversation Status Indicator */}
                    {isConversationActive && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center justify-center text-sm text-green-700">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                                <span>Voice conversation is active - Click "End Conversation" to close</span>
                            </div>
                        </div>
                    )}

                    {/* Success Message */}
                    {showSuccessMessage && (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg animate-pulse">
                            <div className="flex items-center justify-center text-sm text-blue-700">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Conversation ended successfully</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Hume AI Voice Chat - Only render when open */}
            {isModalOpen && (
                <HumeVoiceChat
                    key={`modal-${agent.id}`}
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    agentName={agent.name}
                    agentAvatar={agent.avatar}
                    agentId={agent.humeAgentId || HUME_RESTAURANT_AGENT_ID}
                />
            )}
        </>
    );
}


