'use client';

import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { fadeInLeft, fadeInRight, fadeInUp } from '@/lib/animations';
import { agents } from '@/lib/data';
import { GridPattern } from './patterns';

export default function Hero() {
  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      className="relative py-24 overflow-hidden"
    >
      {/* Background patterns */}
      <GridPattern className="text-blue-500/5 dark:text-blue-400/5" />
      
      {/* Animated background elements */}
      <div className="absolute -z-10 top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl animate-pulse-slow"></div>
      <div className="absolute -z-10 bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl animate-pulse-slow animation-delay-2000"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 right-[10%] w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 left-[10%] w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-float animation-delay-1000"></div>
      <div className="absolute top-1/2 left-[20%] w-12 h-12 bg-emerald-500/20 rounded-full blur-xl animate-float animation-delay-2000"></div>
      <div className="absolute bottom-1/3 right-[20%] w-14 h-14 bg-amber-500/20 rounded-full blur-xl animate-float animation-delay-3000"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <HeroContent />
          <HeroCards />
        </div>
      </div>
    </motion.section>
  );
}

function HeroContent() {
  return (
    <motion.div variants={fadeInLeft} className="w-full lg:w-1/2 space-y-8">
      <div className="inline-flex items-center justify-center p-2 bg-gray-100 dark:bg-gray-800 rounded-full backdrop-blur-sm">
        <SparklesIcon className="w-5 h-5 text-gray-900 dark:text-gray-100 mr-2" />
        <span className="text-gray-900 dark:text-gray-100 font-medium">AI-Powered Assistance</span>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
        Your Smart Assistant <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          For Everything
        </span>
      </h1>
      
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
        Explore our AI agents that help with phones, car accessories, insurance, and restaurant reservations.
      </p>
      
      <div className="flex flex-wrap gap-4">
        <HeroButtons />
      </div>
    </motion.div>
  );
}

function HeroButtons() {
  return (
    <>
      <motion.button 
        variants={fadeInUp}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1"
      >
        Get Started
      </motion.button>
      <motion.button 
        variants={fadeInUp}
        className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
      >
        Learn More
      </motion.button>
    </>
  );
}

function HeroCards() {
  return (
    <motion.div variants={fadeInRight} className="w-full lg:w-1/2">
      <div className="relative">
        <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10 p-8 flex items-center justify-center backdrop-blur-sm border border-white/20 dark:border-white/5">
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            {agents.map((agent, idx) => (
              <AgentPreviewCard key={agent.id} agent={agent} index={idx} />
            ))}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -z-10 -top-5 -right-5 w-20 h-20 bg-blue-500/30 rounded-full blur-xl"></div>
        <div className="absolute -z-10 -bottom-5 -left-5 w-20 h-20 bg-purple-500/30 rounded-full blur-xl"></div>
      </div>
    </motion.div>
  );
}

function AgentPreviewCard({ agent, index }: { agent: any, index: number }) {
  const Icon = agent.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1 }}
      className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-lg flex flex-col items-center text-center gap-2 transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700"
    >
      <div className={`p-3 rounded-full bg-${agent.color}-100 dark:bg-${agent.color}-900/30`}>
        <Icon className={`w-6 h-6 text-${agent.color}-500 dark:text-${agent.color}-400`} />
      </div>
      <h3 className="font-medium text-gray-900 dark:text-white">{agent.details.title}</h3>
    </motion.div>
  );
} 