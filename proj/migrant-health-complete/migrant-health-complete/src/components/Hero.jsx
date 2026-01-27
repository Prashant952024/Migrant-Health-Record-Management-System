import React from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signin');
  };

  return (
    <section className="bg-gradient-to-br from-[#4285F4] via-[#34A853] to-[#0F7B7B] text-white min-h-screen flex items-center relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-8 py-20 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center">
            <span className="bg-white/15 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-['Roboto'] font-medium border border-white/20 text-white/90">
              New Initiative • Government of Kerala
            </span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-['Poppins'] font-bold leading-tight text-white">
            Empowering Migrant<br />
            Workers Through<br />
            <span className="text-white/80">Digital Health Records</span>
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-white/80 font-['Roboto'] max-w-2xl leading-relaxed">
            Comprehensive healthcare management system for migrant workers in Kerala — equitable access, better surveillance, and faster clinical care.
          </p>

          {/* CTA Button */}
          <div className="mt-10">
            <button 
              onClick={handleGetStarted}
              className="inline-flex items-center px-10 py-5 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FFB347] text-white font-['Roboto'] font-bold text-lg hover:from-[#FFB347] hover:to-[#FF6B6B] transition-all duration-300 cursor-pointer shadow-2xl transform hover:scale-105 hover:shadow-3xl"
            >
              Getting Started
              <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

          {/* Feature Icons */}
          <div className="flex items-center gap-12 text-white/80 font-['Roboto'] text-lg">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#34A853] rounded flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#FFB347] rounded flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>100% Data Secure</span>
            </div>
          </div>
        </div>

        {/* Right Side - Health Worker Card */}
        <div className="flex justify-center md:justify-end">
          <div className="relative">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-sm transform rotate-3"></div>
            
            {/* Main Card */}
            <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-6 max-w-sm w-full transform -rotate-1 hover:rotate-0 transition-transform duration-500">
              {/* Header with tropical background */}
              <div className="bg-gradient-to-r from-[#34A853] to-[#4285F4] rounded-2xl p-4 mb-4 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1580281657521-8c6f6a1d9f8b?auto=format&fit=crop&w=700&q=60" 
                  alt="health worker" 
                  className="w-full h-32 object-cover rounded-xl opacity-20"
                />
                
                {/* Tropical Elements */}
                <div className="absolute top-4 right-4">
                  <svg className="w-8 h-8 text-white/30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L8 8h8l-4-6zm0 20l4-6H8l4 6zm10-10l-6-4v8l6-4zM2 12l6 4V8l-6 4z"/>
                  </svg>
                </div>
                <div className="absolute bottom-4 left-4">
                  <svg className="w-6 h-6 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L8 8h8l-4-6zm0 20l4-6H8l4 6zm10-10l-6-4v8l6-4zM2 12l6 4V8l-6 4z"/>
                  </svg>
                </div>
              </div>
              
              {/* Profile Section */}
              <div className="bg-white rounded-2xl p-4 shadow-lg relative -mt-8 z-10">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#4285F4] to-[#34A853] rounded-full flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=100&q=60" 
                      alt="Dr. Priya Nair" 
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-lg font-['Poppins'] font-bold text-gray-800">Dr. Priya Nair</div>
                    <div className="text-sm font-['Roboto'] text-gray-600">Community Health Officer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
