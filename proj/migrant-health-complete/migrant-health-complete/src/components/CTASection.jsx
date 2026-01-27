import React from "react";

export default function CTASection() {
  return (
    <section id="get-started" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 py-12 bg-gradient-to-r from-[#F5F5DC] to-[#B6D7FF] rounded-3xl shadow-lg">
          <h2 className="text-5xl font-['Poppins'] font-bold text-[#0D3B66] mb-6">Take Action Today</h2>
          <p className="text-xl font-['Roboto'] text-[#2D9C8F] max-w-3xl mx-auto">Choose your path to better healthcare management and transform your health journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-[#B388EB]/20 transform hover:scale-105 transition-all duration-300 border-t-4 border-t-[#3A86FF]">
            <div className="w-16 h-16 bg-gradient-to-br from-[#3A86FF] to-[#D7E9F7] rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-['Montserrat'] font-medium text-2xl mb-4 text-[#2E2E2E]">Schedule Checkup</h4>
            <p className="text-[#6C757D] font-['Roboto'] text-lg mb-6 leading-relaxed">Book appointments with healthcare providers across Kerala. Get regular health monitoring and preventive care.</p>
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#3A86FF] to-[#2D9C8F] text-white font-['Roboto'] font-medium text-lg hover:from-[#2D9C8F] hover:to-[#3A86FF] transition-all duration-300 shadow-lg">
              Book Now
            </button>
          </div>

          <div className="bg-gradient-to-br from-[#FF6B6B] to-[#FFB347] text-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-[#E0E0E0]">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-['Montserrat'] font-medium text-2xl mb-4 text-white">Emergency Services</h4>
            <p className="text-white/90 font-['Roboto'] text-lg mb-6 leading-relaxed">Immediate medical assistance with multilingual support. 24/7 emergency response team ready to help.</p>
            <button className="px-8 py-4 rounded-2xl bg-white text-[#FF6B6B] font-['Roboto'] font-medium text-lg hover:bg-gray-100 transition-colors shadow-lg">
              Call Emergency
            </button>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-[#B388EB]/20 transform hover:scale-105 transition-all duration-300 flex flex-col border-t-4 border-t-[#2D9C8F]">
            <div className="w-16 h-16 bg-gradient-to-br from-[#2D9C8F] to-[#A8E6CF] rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-['Montserrat'] font-medium text-2xl mb-4 text-[#2E2E2E]">Generate Report</h4>
              <p className="text-[#6C757D] font-['Roboto'] text-lg mb-6 leading-relaxed">Download comprehensive health reports and medical history. Access your complete health journey.</p>
            </div>
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#B388EB] to-[#D7E9F7] text-white font-['Roboto'] font-medium text-lg hover:from-[#D7E9F7] hover:to-[#B388EB] transition-all duration-300 shadow-lg self-start">
              Generate Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
