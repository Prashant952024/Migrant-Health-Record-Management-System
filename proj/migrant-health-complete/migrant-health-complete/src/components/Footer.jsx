import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer(){
  return (
    <footer className="bg-gradient-to-r from-[#0D3B66] to-[#2E2E2E] text-[#6C757D] mt-12">
      <div className="container mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="font-['Poppins'] font-semibold text-lg text-white mb-3">Kerala Health Portal</div>
          <p className="text-sm font-['Roboto'] text-[#6C757D] leading-relaxed">Comprehensive healthcare management for migrant workers across Kerala.</p>
        </div>
        <div>
          <div className="font-['Montserrat'] font-medium text-white mb-3">Quick Links</div>
          <ul className="space-y-2 text-sm font-['Roboto']">
            <li><Link to="/" className="text-[#3A86FF] hover:text-[#FF6B6B] transition-colors">Home</Link></li>
            <li><Link to="/about" className="text-[#3A86FF] hover:text-[#FF6B6B] transition-colors">About</Link></li>
            <li><Link to="/contact" className="text-[#3A86FF] hover:text-[#FF6B6B] transition-colors">Contact</Link></li>
            <li><Link to="/signin" className="text-[#3A86FF] hover:text-[#FF6B6B] transition-colors">Sign In</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-['Montserrat'] font-medium text-white mb-3">Government Links</div>
          <ul className="space-y-2 text-sm font-['Roboto']">
            <li><a href="#" className="text-[#3A86FF] hover:text-[#FF6B6B] transition-colors">Kerala Government</a></li>
            <li><a href="#" className="text-[#3A86FF] hover:text-[#FF6B6B] transition-colors">Health Department</a></li>
            <li><a href="#" className="text-[#3A86FF] hover:text-[#FF6B6B] transition-colors">Labour Department</a></li>
          </ul>
        </div>
        <div>
          <div className="font-['Montserrat'] font-medium text-white mb-3">Contact Info</div>
          <div className="space-y-2 text-sm font-['Roboto']">
            <div className="text-[#B0BEC5]">support@keralahealth.gov.in</div>
            <div className="text-[#B0BEC5]">Emergency Hotline: 108</div>
            <div className="text-[#B0BEC5]">Thiruvananthapuram, Kerala</div>
          </div>
        </div>
      </div>
      <div className="border-t border-[#2E2E2E]">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm font-['Roboto'] text-[#B0BEC5]">© 2025 Government of Kerala. All rights reserved.</div>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="text-[#3A86FF] hover:text-[#2D9C8F] transition-colors text-sm font-['Roboto']">Privacy Policy</a>
            <a href="#" className="text-[#3A86FF] hover:text-[#2D9C8F] transition-colors text-sm font-['Roboto']">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
