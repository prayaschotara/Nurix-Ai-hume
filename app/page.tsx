'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import HumeAgentCard from '../components/HumeAgentCard';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  DevicePhoneMobileIcon, 
  TruckIcon, 
  ShieldCheckIcon, 
  BuildingStorefrontIcon,
  SparklesIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

// Define all agents in one place for easy management
const agents = [
  {
    id: 'phone-agent',
    name: 'Alex Morgan',
    role: 'Smartphone Specialist',
    category: 'phone',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah&backgroundColor=b6e3f4',
    description: 'Expert in smartphone technology, helping you find the perfect device or get the best value for your used phone.',
    features: [
      'Compare smartphones based on your needs',
      'Get detailed technical specifications',
      'Find the best deals on new and used phones',
      'Get accurate trade-in valuations',
      'Discover options for selling your used phone'
    ],
    supportCall: true,
    icon: DevicePhoneMobileIcon,
    color: 'blue',
    humeAgentId: process.env.NEXT_PUBLIC_HUME_PHONE_SERVICE_AGENT_ID || 'phone-specialist',
    details: {
      title: 'Phone Buy & Sell',
      subtitle: 'Smart solutions for mobile',
      description: 'Find the perfect smartphone or get the best value for your used device with personalized recommendations and valuations.',
    }
  },
  {
    id: 'car-agent',
    name: 'Jordan Lee',
    role: 'Automotive Specialist',
    category: 'car_accessories',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Mike&backgroundColor=d0f0c0',
    description: "Automotive expert helping you find the perfect accessories to enhance your vehicle's comfort, performance, and style.",
    features: [
      'Find accessories for your vehicle make and model',
      'Compare different brands and quality options', 
      'Get recommendations on electronic gadgets',
      'Learn about installation options', 
      'Discover premium brands and special deals'
    ],
    supportCall: true,
    icon: TruckIcon,
    color: 'purple',
    humeAgentId: process.env.NEXT_PUBLIC_HUME_CAR_ACCESSORIES_AGENT_ID,
    details: {
      title: 'Car Accessories',
      subtitle: 'Vehicle accessories',
      description: "Enhance your vehicle with the perfect accessories and equipment tailored to your car's make, model, and your personal preferences.",
    }
  },
  {
    id: 'insurance-agent',
    name: 'Taylor Kim',
    role: 'Insurance Advisor',
    category: 'insurance',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=jey2&backgroundColor=50C878',
    description: "Insurance expert providing guidance on policy options, claims, and coverage to protect what matters most to you.",
    features: [
      'Explain policy details and coverage options',
      'Help you file claims and track their status',
      'Compare rates from different providers',
      'Recommend appropriate coverage',
      'Guide you through policy renewals'
    ],
    supportCall: true,
    icon: ShieldCheckIcon,
    color: 'emerald',
    humeAgentId: process.env.NEXT_PUBLIC_HUME_INSURANCE_AGENT_ID || 'insurance-advisor',
    details: {
      title: 'Insurance',
      subtitle: 'Protection services',
      description: "Get expert guidance on policy options, claims, and coverage to protect what matters most to you with personalized advice.",
    }
  },
  {
    id: 'restaurant-agent',
    name: 'Jamie Rivera',
    role: 'Dining Concierge',
    category: 'restaurant',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sofia&backgroundColor=ffdfbf',
    description: "Culinary expert helping you with reservations, menu recommendations, and creating exceptional dining experiences.",
    features: [
      'Make reservations at your favorite restaurants',
      'Get detailed information about menus',
      'Arrange for special dietary requirements',
      'Plan special occasions and private dining',
      'Provide restaurant recommendations'
    ],
    supportCall: true,
    icon: BuildingStorefrontIcon,
    color: 'amber',
    humeAgentId: process.env.NEXT_PUBLIC_HUME_RESTAURANT_AGENT_ID || 'restaurant-concierge',
    details: {
      title: 'Restaurant',
      subtitle: 'Dining solutions',
      description: 'Your personal concierge for reservations, menu recommendations, and exceptional dining experiences tailored to your preferences.',
    }
  }
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const GridPattern = ({ className }: { className?: string }) => (
  <svg className={`absolute -z-10 opacity-30 ${className}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#gridPattern)" />
  </svg>
);

const DotsPattern = ({ className }: { className?: string }) => (
  <svg className={`absolute -z-10 opacity-40 ${className}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="dotsPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="currentColor" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dotsPattern)" />
  </svg>
);

// Component for feature item
const FeatureItem = ({ feature, color }: { feature: string, color: string }) => (
  <motion.div 
    variants={fadeInUp}
    className="flex items-start"
  >
    <div className={`flex-shrink-0 w-5 h-5 rounded-full ${color} flex items-center justify-center mr-3 mt-0.5`}>
      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
  </motion.div>
);

// Component for agent section
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AgentSection({ agent, isReversed, index }: { agent: any, isReversed: boolean, index: number }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const Icon = agent.icon;
  
  // Updated getThemeColors function with proper dark mode handling
  const getThemeColors = () => {
    switch (agent.color) {
      case 'blue':
        return {
          text: 'text-blue-600 dark:text-blue-400',
          textLight: 'text-blue-500 dark:text-blue-300',
          bg: 'bg-blue-500/80 dark:bg-blue-500/30',
          accent: 'bg-blue-500',
          accentLight: 'bg-blue-100 dark:bg-blue-800/50',
          shadow: 'shadow-blue-500/20 dark:shadow-blue-400/10',
          gradient: 'from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700',
          iconBg: 'bg-blue-100 dark:bg-blue-800/30',
          patternColor: 'text-blue-500/5 dark:text-blue-400/5',
          cardBg: 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm',
          cardBorder: 'border border-gray-100/50 dark:border-gray-700/50',
          cardShadow: 'shadow-lg shadow-blue-500/5 dark:shadow-blue-500/10'
        };
      case 'purple':
        return {
          text: 'text-purple-600 dark:text-purple-400',
          textLight: 'text-purple-500 dark:text-purple-300',
          bg: 'bg-purple-500/80 dark:bg-purple-500/30',
          accent: 'bg-purple-500',
          accentLight: 'bg-purple-100 dark:bg-purple-800/50',
          shadow: 'shadow-purple-500/20 dark:shadow-purple-400/10',
          gradient: 'from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700',
          iconBg: 'bg-purple-100 dark:bg-purple-800/30',
          patternColor: 'text-purple-500/5 dark:text-purple-400/5',
          cardBg: 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm',
          cardBorder: 'border border-gray-100/50 dark:border-gray-700/50',
          cardShadow: 'shadow-lg shadow-purple-500/5 dark:shadow-purple-500/10'
        };
      case 'emerald':
        return {
          text: 'text-emerald-600 dark:text-emerald-400',
          textLight: 'text-emerald-500 dark:text-emerald-300',
          bg: 'bg-emerald-500',
          accent: 'bg-emerald-500',
          accentLight: 'bg-emerald-100 dark:bg-emerald-800',
          shadow: 'shadow-emerald-500/20',
          gradient: 'from-emerald-500 to-emerald-600',
          iconBg: 'bg-emerald-100 dark:bg-emerald-800/50',
          patternColor: 'text-emerald-500/10 dark:text-emerald-400/10',
          cardBg: 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm',
          cardBorder: 'border border-gray-100/50 dark:border-gray-700/50',
          cardShadow: 'shadow-lg shadow-emerald-500/5 dark:shadow-emerald-500/10'
        };
      case 'amber':
        return {
          text: 'text-amber-600 dark:text-amber-400',
          textLight: 'text-amber-500 dark:text-amber-300',
          bg: 'bg-amber-500',
          accent: 'bg-amber-500',
          accentLight: 'bg-amber-100 dark:bg-amber-800',
          shadow: 'shadow-amber-500/20',
          gradient: 'from-amber-500 to-amber-600',
          iconBg: 'bg-amber-100 dark:bg-amber-800/50',
          patternColor: 'text-amber-500/10 dark:text-amber-400/10',
          cardBg: 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm',
          cardBorder: 'border border-gray-100/50 dark:border-gray-700/50',
          cardShadow: 'shadow-lg shadow-amber-500/5 dark:shadow-amber-500/10'
        };
      default:
        return {
          text: 'text-gray-600 dark:text-gray-400',
          textLight: 'text-gray-500 dark:text-gray-300',
          bg: 'bg-gray-500',
          accent: 'bg-gray-500',
          accentLight: 'bg-gray-100 dark:bg-gray-800',
          shadow: 'shadow-gray-500/20',
          gradient: 'from-gray-500 to-gray-600',
          iconBg: 'bg-gray-100 dark:bg-gray-800/50',
          patternColor: 'text-gray-500/10 dark:text-gray-400/10',
          cardBg: 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm',
          cardBorder: 'border border-gray-100/50 dark:border-gray-700/50',
          cardShadow: 'shadow-lg shadow-gray-500/5 dark:shadow-gray-500/10'
        };
    }
  };

  const colors = getThemeColors();

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={staggerContainer}
      className={`py-20 relative overflow-hidden ${
        index % 2 === 1 
          ? 'bg-gray-50/80 dark:bg-gray-900/30' 
          : 'bg-white/80 dark:bg-black/30'
      }`}
      id={agent.id}
    >
      {/* Background patterns with adjusted opacity */}
      {/* <PatternComponent className={`opacity-50 ${colors.patternColor}`} /> */}
      
      
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
          
          {/* Details Column */}
          <motion.div 
            variants={isReversed ? fadeInRight : fadeInLeft} 
            className="w-full lg:w-1/2 space-y-8"
          >
            <div className="space-y-6">
              <div className={`inline-flex items-center p-2 px-3 ${colors.iconBg} rounded-xl backdrop-blur-sm`}>
                <Icon className={`w-5 h-5 ${colors.text} mr-2`} />
                <span className={`${colors.text} font-medium text-sm`}>{agent.details.subtitle}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {agent.details.title} <span className={colors.text}>Assistant</span>
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {agent.details.description}
              </p>
            </div>
            
            <div className="space-y-4">
              {agent.features.map((feature: string, idx: number) => (
                <FeatureItem key={idx} feature={feature} color={colors.bg} />
              ))}
            </div>
            
            <motion.div variants={fadeInUp}>
              <button className={`mt-4 inline-flex items-center px-5 py-3 rounded-lg bg-gradient-to-r ${colors.gradient} text-white hover:shadow-lg ${colors.shadow} transition-all duration-300 transform hover:-translate-y-1`}>
                <span className="mr-2">Talk to {agent.name}</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
          
          {/* Agent Card Column */}
          <motion.div 
            variants={isReversed ? fadeInLeft : fadeInRight} 
            className={`w-full lg:w-1/2 ${isReversed ? 'lg:order-first' : ''}`}
          >
            <div className={`rounded-2xl overflow-hidden ${colors.cardBg} ${colors.cardBorder} ${colors.cardShadow} transition-all duration-300 hover:scale-[1.02]`}>
              <HumeAgentCard agent={agent} />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

// Hero component
const Hero = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={staggerContainer}
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
          <motion.div variants={fadeInLeft} className="w-full lg:w-1/2 space-y-8">
            <div className="inline-flex items-center justify-center p-2 bg-gray-100 dark:bg-gray-800 rounded-full backdrop-blur-sm">
              <SparklesIcon className="w-5 h-5 text-gray-900 dark:text-gray-100 mr-2" />
              <span className="text-gray-900 dark:text-gray-100 font-medium">AI-Powered Assistance</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              Your Smart Assistant <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">For Everything</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
              Explore our AI agents that help with phones, car accessories, insurance, and restaurant reservations.
            </p>
            
            <div className="flex flex-wrap gap-4">
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
            </div>
          </motion.div>
          
          <motion.div variants={fadeInRight} className="w-full lg:w-1/2">
            <div className="relative">
              {/* Hero image or illustration */}
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10 p-8 flex items-center justify-center backdrop-blur-sm border border-white/20 dark:border-white/5">
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  {agents.map((agent, idx) => {
                    const Icon = agent.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + idx * 0.1 }}
                        className={`p-4 rounded-xl bg-white dark:bg-gray-800 shadow-lg dark:shadow-${agent.color}-500/10 
                          flex flex-col items-center text-center gap-2 transform hover:-translate-y-1 transition-all duration-300 
                          border border-gray-100 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-${agent.color}-500/20`}
                      >
                        <div className={`p-3 rounded-full bg-${agent.color}-100 dark:bg-${agent.color}-900/30`}>
                          <Icon className={`w-6 h-6 text-${agent.color}-500 dark:text-${agent.color}-400`} />
                        </div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {agent.details.title}
                        </h3>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              
              
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// Footer component
const Footer = () => (
  <footer className="py-12 border-t border-gray-200 dark:border-gray-800 relative overflow-hidden">
    {/* Background pattern */}
    <DotsPattern className="text-gray-500/5 dark:text-gray-400/5" />
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="bg-gray-900 dark:bg-white p-1.5 rounded">
              <SparklesIcon className="w-5 h-5 text-white dark:text-gray-900" />
            </div>
            <span className="font-bold text-gray-900 dark:text-white">BITONTREE</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            AI-powered assistance for your daily needs
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Services</h3>
          <ul className="space-y-2">
            {agents.map((agent, idx) => (
              <li key={idx}>
                <a href={`#${agent.id}`} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
                  {agent.details.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">About</a></li>
            <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">Careers</a></li>
            <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">Blog</a></li>
          </ul>
        </div>
        
        <div id="contact">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Contact</h3>
          <ul className="space-y-2">
            <li className="text-gray-600 dark:text-gray-400 text-sm">hello@bitontree.ai</li>
            <li className="text-gray-600 dark:text-gray-400 text-sm">+1 (555) 123-4567</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © 2024 Bitontree. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default function Home() {
  // Fix for dark mode
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <Header />
      <Hero />
      
      {/* Agent Sections */}
      {agents.map((agent, index) => (
        <AgentSection 
          key={agent.id} 
          agent={agent} 
          isReversed={index % 2 === 1}
          index={index}
        />
      ))}
      <div id="contact"></div>
      <Footer />
    </div>
  );
} 