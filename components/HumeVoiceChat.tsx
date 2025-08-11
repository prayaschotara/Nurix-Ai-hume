"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MicrophoneIcon, XMarkIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useVoice, VoiceReadyState } from '@humeai/voice-react';

interface HumeVoiceChatProps {
    isOpen: boolean;
    onClose: () => void;
    agentName: string;
    agentAvatar: string;
    agentId: string;
}

export default function HumeVoiceChat({ 
    isOpen, 
    onClose, 
    agentName, 
    agentAvatar, 
    agentId 
}: HumeVoiceChatProps) {
    const { connect, disconnect, readyState, messages } = useVoice();
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Auto-connect when modal opens
    useEffect(() => {
        console.log('🔄 Modal state changed:', { isOpen, readyState });
        if (isOpen && (readyState === VoiceReadyState.CLOSED || readyState === 'idle')) {
            console.log('🚀 Auto-connecting...');
            handleConnect();
        }
    }, [isOpen]);

    // Auto-disconnect when modal closes
    useEffect(() => {
        if (!isOpen && readyState === VoiceReadyState.OPEN) {
            console.log('🔌 Auto-disconnecting...');
            disconnect();
        }
    }, [isOpen, readyState, disconnect]);

    // Log readyState changes
    useEffect(() => {
        console.log('📡 Voice readyState changed:', readyState);
    }, [readyState]);

    // Monitor messages for speaking state
    useEffect(() => {
        if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            console.log('📨 Last message:', lastMessage);
            
            // Check if AI is speaking
            if (lastMessage.type === 'assistant_message') {
                setIsSpeaking(true);
                console.log('🗣️ AI started speaking');
            } else if (lastMessage.type === 'assistant_end') {
                setIsSpeaking(false);
                console.log('🔇 AI finished speaking');
            }
        }
    }, [messages]);

    const handleConnect = async () => {
        try {
            console.log('🔌 Attempting to connect...');
            console.log('📋 Agent ID:', agentId);
            console.log('🔑 API Key exists:', !!process.env.NEXT_PUBLIC_HUME_API_KEY);
            console.log('🔑 API Key preview:', process.env.NEXT_PUBLIC_HUME_API_KEY?.substring(0, 10) + '...');
            
            setIsConnecting(true);
            setError(null);
            
            // Connect using the agent ID
            const result = await connect({
                auth: { type: "apiKey", value: process.env.NEXT_PUBLIC_HUME_API_KEY || '' },
                configId: agentId
            });
            
            console.log('✅ Connect result:', result);
        } catch (err) {
            console.error('❌ Connection failed:', err);
            console.error('❌ Error details:', {
                name: err instanceof Error ? err.name : 'Unknown',
                message: err instanceof Error ? err.message : 'Unknown error',
                stack: err instanceof Error ? err.stack : 'No stack trace'
            });
            setError(err instanceof Error ? err.message : 'Failed to connect');
        } finally {
            setIsConnecting(false);
        }
    };

    const handleDisconnect = () => {
        disconnect();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden animate-scaleIn">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16">
                                <Image
                                    src={agentAvatar}
                                    alt={agentName}
                                    fill
                                    className="object-cover rounded-full border-2 border-white/20"
                                    unoptimized
                                />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{agentName}</h2>
                                <p className="text-blue-100 text-sm">Voice Assistant</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            {/* Connection Status */}
                            <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${
                                    readyState === VoiceReadyState.OPEN ? 'bg-green-400' :
                                    readyState === VoiceReadyState.CONNECTING ? 'bg-yellow-400' :
                                    readyState === 'idle' ? 'bg-gray-400' :
                                    'bg-red-400'
                                }`} />
                                <span className="text-sm">
                                    {readyState === VoiceReadyState.OPEN ? 'Connected' :
                                     readyState === VoiceReadyState.CONNECTING ? 'Connecting...' :
                                     readyState === 'idle' ? 'Ready' :
                                     'Disconnected'}
                                </span>
                            </div>
                            
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Connection Controls */}
                    {(readyState === VoiceReadyState.CLOSED || readyState === 'idle') && (
                        <div className="text-center py-8">
                            <PhoneIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Start Voice Conversation
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">
                                Click the button below to begin talking with {agentName}
                            </p>
                            <button
                                onClick={handleConnect}
                                disabled={isConnecting}
                                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-8 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 mx-auto"
                            >
                                {isConnecting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Connecting...
                                    </>
                                ) : (
                                    <>
                                        <MicrophoneIcon className="w-5 h-5" />
                                        Start Conversation
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {/* Active Conversation */}
                    {readyState === VoiceReadyState.OPEN && (
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MicrophoneIcon className="w-10 h-10 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Conversation Active
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">
                                You're now connected! Speak naturally to interact with {agentName}
                            </p>
                            
                            {/* Speaking Indicator */}
                            {isSpeaking && (
                                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                    <div className="flex items-center justify-center text-sm text-blue-700">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse mr-2"></div>
                                        <span>AI is speaking - please wait...</span>
                                    </div>
                                </div>
                            )}
                            
                            <button
                                onClick={handleDisconnect}
                                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-medium transition-colors"
                            >
                                End Conversation
                            </button>
                        </div>
                    )}

                    {/* Connecting State */}
                    {readyState === VoiceReadyState.CONNECTING && (
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Connecting...
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Establishing connection with {agentName}
                            </p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center text-red-700">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm font-medium">Connection Error: {error}</span>
                            </div>
                            <button
                                onClick={handleConnect}
                                className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* Messages Display */}
                    {messages.length > 0 && (
                        <div className="mt-6 border-t pt-4">
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                Conversation History
                            </h4>
                            <div className="space-y-3 max-h-40 overflow-y-auto">
                                {messages.map((msg, index) => (
                                    <div key={index} className="text-sm">
                                        <span className="font-medium text-gray-600 dark:text-gray-400">
                                            {msg.type === 'user_message' ? 'You' : agentName}:
                                        </span>
                                        <span className="ml-2 text-gray-700 dark:text-gray-300">
                                            {msg.type === 'assistant_message' || msg.type === 'user_message' 
                                                ? (msg as any).message?.content || 'Audio message'
                                                : 'System message'
                                            }
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
