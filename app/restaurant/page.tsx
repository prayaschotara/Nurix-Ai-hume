import Link from 'next/link';
import Header from '../../components/Header';
import { Agent } from '../../types/agent';
import HumeAgentCard from '../../components/HumeAgentCard';
import { BuildingStorefrontIcon, ArrowLeftIcon, CheckCircleIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function RestaurantPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero section with decorative elements */}
        <div className="relative bg-gradient-to-br from-amber-50 via-amber-100 to-white py-16 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200 rounded-full opacity-20 -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-300 rounded-full opacity-10 translate-y-1/3 -translate-x-1/4 blur-2xl"></div>
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium mb-8 group transition-all">
              <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mr-3 group-hover:shadow group-hover:-translate-x-0.5 transition-all">
                <ArrowLeftIcon className="w-4 h-4 text-amber-500" />
              </div>
              <span>Back to assistants</span>
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="inline-flex items-center p-2 px-3 bg-amber-100 rounded-xl mb-4 shadow-sm">
                  <BuildingStorefrontIcon className="w-5 h-5 text-amber-500 mr-2" />
                  <span className="text-amber-700 font-medium text-sm">Dining Experience</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Restaurant <span className="text-amber-600">Assistant</span></h1>
                <p className="text-lg text-gray-600 max-w-2xl">Your personal concierge for reservations, menu recommendations, and exceptional dining experiences.</p>
              </div>
              
              <div className="hidden md:block mt-6 md:mt-0">
                <div className="bg-white p-3 rounded-2xl shadow-lg flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-xl">
                    <SparklesIcon className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-gray-900">AI Powered</span>
                    <span className="text-xs text-gray-500">Hume AI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-amber-50 rounded-2xl p-8 border border-amber-100 shadow-sm overflow-hidden relative">
                  {/* Subtle decorative element */}
                  <div className="absolute -top-8 -right-8 w-16 h-16 bg-amber-200 rounded-full opacity-50"></div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-6 relative">How can our agent help you?</h2>
                  <ul className="space-y-4">
                    {[
                      "Make reservations at your favorite restaurants",
                      "Get detailed information about menus and specials",
                      "Arrange for special dietary requirements and preferences",
                      "Plan special occasions and private dining experiences",
                      "Provide recommendations for restaurants based on your preferences"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Card footer with statistics */}
                  <div className="mt-8 pt-6 border-t border-amber-200">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <span className="block text-2xl font-bold text-amber-600">300+</span>
                        <span className="text-xs text-gray-500">Restaurants</span>
                      </div>
                      <div className="text-center">
                        <span className="block text-2xl font-bold text-amber-600">5★</span>
                        <span className="text-xs text-gray-500">Experience</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Available Agents</h3>
                <p className="text-gray-600 text-sm">Our restaurant concierges are ready to help you plan the perfect dining experience tailored to your preferences.</p>
              </div>
              
              <div className="space-y-8">
                {Agent.map((agent) => (
                  <HumeAgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 