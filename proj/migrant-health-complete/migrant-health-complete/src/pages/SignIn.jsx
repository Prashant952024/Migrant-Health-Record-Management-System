import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SignIn(){
  const nav = useNavigate();
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-teal-700 to-teal-900">
      {/* Header */}
      <div className="text-center py-16">
        <h1 className="text-white text-5xl font-['Poppins'] font-bold mb-3">MIGRANT WORKER HEALTH MANAGEMENT</h1>
        <h2 className="text-white text-4xl font-['Poppins'] font-bold mb-6">PORTAL</h2>
        <p className="text-[#D7E9F7] text-xl font-['Roboto'] max-w-3xl mx-auto">Choose your access level to continue</p>
      </div>

      {/* Login Cards */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Hospital Login */}
          <div className="bg-blue-500 rounded-2xl p-8 text-white text-center shadow-lg">
            <div className="mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm8 8v2a1 1 0 01-1 1H6a1 1 0 01-1-1v-2h8z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Hospital Login</h3>
              <p className="text-sm text-white/80 mb-6">Access patient records, manage registrations, and coordinate healthcare services</p>
            </div>
            <button 
              onClick={()=>nav('/hospital/login')} 
              className="w-full bg-white text-blue-500 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors"
            >
              Hospital Access
            </button>
          </div>

          {/* Admin Login */}
          <div className="bg-teal-500 rounded-2xl p-8 text-white text-center shadow-lg">
            <div className="mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Admin Login</h3>
              <p className="text-sm text-white/80 mb-6">System administration, analytics, and comprehensive health program oversight</p>
            </div>
            <button 
              onClick={()=>nav('/admin/login')} 
              className="w-full bg-white text-teal-500 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors"
            >
              Admin Login
            </button>
          </div>

          {/* Patient Login */}
          <div className="bg-orange-500 rounded-2xl p-8 text-white text-center shadow-lg">
            <div className="mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Patient Login</h3>
              <p className="text-sm text-white/80 mb-6">View your health records, track medical history, and access health services</p>
            </div>
            <button 
              onClick={()=>nav('/patient/login')} 
              className="w-full bg-white text-orange-500 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors"
            >
              Patient Portal
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section - Health Records Management */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Comprehensive Health Records Management</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Digitized healthcare records ensuring continuity of care across multiple healthcare providers 
              and locations throughout Kerala. Experience the future of healthcare with our innovative, 
              community-focused platform.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Digital Identity Cards */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-teal-500">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2">Digital Identity Cards</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Unique Health ID with biometric authentication</li>
                    <li>• Multi-language support (Malayalam, Hindi, Tamil, Bengali)</li>
                    <li>• Offline-capable health cards for remote access</li>
                    <li>• QR code integration for quick access</li>
                  </ul>
                  <button className="mt-4 bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors">
                    Access Database
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Access */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2">Mobile Access</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Native smartphone app for iOS & Android</li>
                    <li>• Smart push notifications and reminders</li>
                    <li>• Telemedicine integration with video calls</li>
                    <li>• Medication reminders and health tips</li>
                  </ul>
                  <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
                    Download App
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-xl mx-auto flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-teal-600">156</span>
              </div>
              <h4 className="font-semibold text-gray-800">Primary Healthcare</h4>
              <p className="text-sm text-gray-600">Centers connected</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-xl mx-auto flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-red-600">24/7</span>
              </div>
              <h4 className="font-semibold text-gray-800">Emergency Services</h4>
              <p className="text-sm text-gray-600">Available support</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl mx-auto flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-purple-600">89</span>
              </div>
              <h4 className="font-semibold text-gray-800">Pharmacy Network</h4>
              <p className="text-sm text-gray-600">Pharmacies connected</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-xl mx-auto flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-orange-600">42</span>
              </div>
              <h4 className="font-semibold text-gray-800">Mental Health</h4>
              <p className="text-sm text-gray-600">Counselors available</p>
            </div>
          </div>

          {/* Interactive Healthcare Map */}
          <div className="mt-16 bg-gray-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Interactive Healthcare Map</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Hospitals</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Clinics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">Pharmacies</span>
                  </div>
                </div>
                <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
                  View Full Map
                </button>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <img 
                  src="x.png" 
                  alt="Kerala Medical Facilities Map showing Hospitals, Clinics, and Pharmacies" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-sm text-gray-600 mt-2 text-center">Kerala Medical Facilities</p>
              </div>
            </div>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {/* Telemedicine */}
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-xl mx-auto flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">Telemedicine Services</h3>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Total Consultations</span>
                  <span className="font-semibold">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Wait Time</span>
                  <span className="font-semibold">8 min</span>
                </div>
                <div className="flex justify-between">
                  <span>Languages Supported</span>
                  <span className="font-semibold">5</span>
                </div>
              </div>
              <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                Start Consultation
              </button>
            </div>

            {/* Insurance Integration */}
            <div className="bg-green-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-xl mx-auto flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">Insurance Integration</h3>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Coverage Rate</span>
                  <span className="font-semibold">98%</span>
                </div>
                <div className="flex justify-between">
                  <span>Claims Processed</span>
                  <span className="font-semibold">2.1k</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Processing</span>
                  <span className="font-semibold">2.3 days</span>
                </div>
              </div>
              <button className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors">
                Check Coverage
              </button>
            </div>

            {/* Occupational Health */}
            <div className="bg-orange-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-xl mx-auto flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">Occupational Health</h3>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Industries Covered</span>
                  <span className="font-semibold">15</span>
                </div>
                <div className="flex justify-between">
                  <span>Safety Assessments</span>
                  <span className="font-semibold">892</span>
                </div>
                <div className="flex justify-between">
                  <span>Training Programs</span>
                  <span className="font-semibold">23</span>
                </div>
              </div>
              <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors">
                View Programs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
