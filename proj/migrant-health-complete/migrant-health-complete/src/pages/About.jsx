import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Navbar />
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#F5F5DC] to-[#B6D7FF] py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-['Poppins'] font-bold text-[#0D3B66] mb-6">About the Kerala Migrant Health Initiative</h1>
          <p className="text-xl font-['Roboto'] text-[#2D9C8F] max-w-4xl mx-auto leading-relaxed">
            Transforming healthcare accessibility for migrant workers through innovative digital solutions, 
            community engagement, and sustainable development practices rooted in Kerala's values of 
            inclusivity and care.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Our Mission & Vision */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Mission & Vision</h3>
            
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-blue-600 mb-3">Mission</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                To provide comprehensive, accessible, and culturally sensitive healthcare services to migrant workers in Kerala, ensuring their health and well-being while contributing to the state's sustainable development goals.
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-semibold text-blue-600 mb-3">Vision</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                To create a model healthcare ecosystem that serves as a beacon for migrant worker welfare, promoting equity, dignity, and community integration across Kerala and beyond.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-blue-600 mb-3">Values</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Compassionate care for all</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Cultural sensitivity and respect</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Innovation in healthcare delivery</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Community-centered approach</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Sustainable development focus</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <section className="mt-16 bg-gradient-to-r from-[#F5F5DC] to-[#B6D7FF] rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#0D3B66] mb-2">Sustainable Development Goals Impact</h3>
            <p className="text-[#2D9C8F] text-sm">Tracking our contribution to UN SDGs through comprehensive healthcare delivery for migrant workers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* SDG 3 - Good Health */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Good Health</h4>
                  <p className="text-sm text-gray-600">Well-being for All</p>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Health Coverage</span>
                  <span className="text-sm font-semibold text-red-500">84%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{width: '84%'}}></div>
                </div>
              </div>
            </div>

            {/* SDG 8 - Decent Work */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  8
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Decent Work</h4>
                  <p className="text-sm text-gray-600">Economic Growth</p>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Worker Protection</span>
                  <span className="text-sm font-semibold text-blue-500">87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '87%'}}></div>
                </div>
              </div>
            </div>

            {/* SDG 10 - Reduced Inequalities */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  10
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Reduced Inequalities</h4>
                  <p className="text-sm text-gray-600">Equal Access</p>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Equal Access</span>
                  <span className="text-sm font-semibold text-purple-500">91%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: '91%'}}></div>
                </div>
              </div>
            </div>

            {/* SDG 16 - Peace & Justice */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  16
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Peace & Justice</h4>
                  <p className="text-sm text-gray-600">Strong Institutions</p>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Legal Protection</span>
                  <span className="text-sm font-semibold text-orange-500">89%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{width: '89%'}}></div>
                </div>
              </div>
            </div>

            {/* SDG 17 - Partnerships */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  17
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Partnerships</h4>
                  <p className="text-sm text-gray-600">for the Goals</p>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Collaboration</span>
                  <span className="text-sm font-semibold text-green-500">96%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '96%'}}></div>
                </div>
              </div>
            </div>

            {/* SDG 9 - Innovation */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  9
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Innovation</h4>
                  <p className="text-sm text-gray-600">Infrastructure</p>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Digital Access</span>
                  <span className="text-sm font-semibold text-teal-500">93%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-teal-500 h-2 rounded-full" style={{width: '93%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
