import React from "react";

const Card = ({ title, value, sub, bgColor, textColor, icon, percentage }) => (
  <div className={`${bgColor} rounded-2xl p-8 shadow-xl border border-[#E0E0E0] relative overflow-hidden hover:shadow-2xl hover:shadow-[#B388EB]/20 transition-all duration-300 transform hover:scale-105`}>
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center space-x-3">
        <div className="text-xs text-[#6C757D] font-['Roboto'] font-medium">{percentage}</div>
        <div className={`w-12 h-12 ${textColor === 'text-white' ? 'bg-white/20' : 'bg-gray-100'} rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
        <div className={`px-3 py-1 ${textColor === 'text-white' ? 'bg-white/20 text-white' : 'bg-gray-100 text-[#6C757D]'} rounded-full text-xs font-['Roboto'] font-medium`}>
          Active
        </div>
      </div>
    </div>
    <div className={`text-4xl font-['Poppins'] font-bold ${textColor} mb-2`}>{value}</div>
    <div className={`font-['Montserrat'] font-medium ${textColor === 'text-white' ? 'text-white' : 'text-[#0D3B66]'} text-xl mb-1`}>{title}</div>
    <div className={`text-sm font-['Roboto'] ${textColor === 'text-white' ? 'text-white/80' : 'text-[#6C757D]'}`}>{sub}</div>
  </div>
);

export default function ImpactCards() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 py-12 bg-gradient-to-r from-[#F5F5DC] to-[#B6D7FF] rounded-3xl shadow-lg">
          <h2 className="text-5xl font-['Poppins'] font-bold text-[#0D3B66] mb-6">Impact at a Glance</h2>
          <p className="text-xl font-['Roboto'] text-[#2D9C8F] max-w-3xl mx-auto">Real-time metrics showcasing our community impact</p>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <Card 
            title="Registered Workers" 
            value="45,672" 
            sub="Active health profiles managed" 
            bgColor="bg-white"
            textColor="text-gray-800"
            percentage="+12%"
            icon={
              <svg className="w-6 h-6 text-[#6C757D]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            }
          />
          
          <Card 
            title="Healthcare Centers" 
            value="234" 
            sub="Connected to the network" 
            bgColor="bg-white border-t-4 border-t-[#3A86FF]"
            textColor="text-gray-800"
            percentage="+8%"
            icon={
              <svg className="w-6 h-6 text-[#3A86FF]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            }
          />
          
          <Card 
            title="System Uptime" 
            value="98%" 
            sub="Reliable 24/7 availability" 
            bgColor="bg-white border-t-4 border-t-[#2D9C8F]"
            textColor="text-gray-800"
            percentage="+2%"
            icon={
              <svg className="w-6 h-6 text-[#2D9C8F]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            }
          />
          
          <Card 
            title="Data Protection" 
            value="100%" 
            sub="End-to-end encrypted" 
            bgColor="bg-white"
            textColor="text-gray-800"
            percentage=""
            icon={
              <svg className="w-6 h-6 text-[#6C757D]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
}
