import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function HospitalDashboard(){
  const nav = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  const statsData = [
    { title: "Total Registrations", value: "19,847", change: "+12.5%", icon: "👥", color: "text-[#2D9C8F]" },
    { title: "Active Patients", value: "2,341", change: "+8.2%", icon: "👤", color: "text-[#3A86FF]" },
    { title: "Consultations Today", value: "127", change: "+15.7%", icon: "🩺", color: "text-[#B388EB]" },
    { title: "System Efficiency", value: "94.7%", change: "+2.1%", icon: "⚡", color: "text-[#FF6B6B]" }
  ];

  const recentActivities = [
    { id: "MIG-8847", action: "Registration Fee Recalculated", time: "2 minutes ago", type: "success" },
    { id: "MIG-8848", action: "Medical Updated", time: "5 minutes ago", type: "info" },
    { id: "MIG-8849", action: "Medical Record Accessed", time: "12 minutes ago", type: "warning" },
    { id: "MIG-8850", action: "Photograph Recaptured", time: "18 minutes ago", type: "error" },
    { id: "MIG-8851", action: "Photograph Recaptured", time: "25 minutes ago", type: "info" }
  ];

  const analyticsData = [
    { title: "Total Registrations", value: "2,847", subtitle: "This month", color: "bg-gradient-to-r from-[#3A86FF] to-[#D7E9F7]" },
    { title: "Health Screenings", value: "1,234", subtitle: "Completed", color: "bg-gradient-to-r from-[#2D9C8F] to-[#A8E6CF]" },
    { title: "Follow-up Required", value: "456", subtitle: "Pending", color: "bg-gradient-to-r from-[#B388EB] to-[#D7E9F7]" },
    { title: "Success Rate", value: "98.2%", subtitle: "Treatment outcomes", color: "bg-gradient-to-r from-[#FF6B6B] to-[#FFB347]" }
  ];

  const networkData = [
    { name: "Govt Medical College Kochi", status: "Online", connection: "Active (24/7 connected)", color: "text-[#2D9C8F]" },
    { name: "District Hospital Thrissur", status: "Online", connection: "Active (24/7 connected)", color: "text-[#2D9C8F]" },
    { name: "Community Health Centre Kannur", status: "Offline", connection: "Last seen 5 minutes ago", color: "text-[#FF6B6B]" }
  ];

  const notifications = [
    { type: "System Maintenance Scheduled", message: "Scheduled maintenance on Sunday 3:00 AM - 6:00 AM. Limited functionality expected during this time.", priority: "medium", time: "2 hours ago" },
    { type: "New Patient Onboard", message: "New Migrant Rajesh Kumar has onboarded successfully, migrant has completed basic screening.", priority: "low", time: "5 hours ago" },
    { type: "Pending Equipment Renewal", message: "The ultrasound machine requires regular maintenance, scheduled for next maintenance on November 15th.", priority: "high", time: "1 day ago" }
  ];

  return (
    <>
      <Navbar />
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#F5F5DC] to-[#B6D7FF] py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-4xl font-['Poppins'] font-bold text-[#0D3B66] mb-2">Hospital Dashboard</h1>
              <p className="text-[#2D9C8F] font-['Roboto'] text-lg">Comprehensive migrant health management and real-time monitoring dashboard providing seamless healthcare supervision, registration oversight, and clinical insights across Kerala.</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <span className="text-4xl">🏥</span>
              <div className="text-right">
                <div className="text-sm text-[#6C757D] font-['Roboto']">Last Updated</div>
                <div className="text-lg font-['Montserrat'] font-semibold text-[#0D3B66]">Just now</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-xl border border-[#E0E0E0] border-t-4 border-t-[#3A86FF] hover:shadow-2xl hover:shadow-[#B388EB]/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl">{stat.icon}</div>
                <div className={`text-sm font-['Roboto'] font-semibold ${stat.color}`}>{stat.change}</div>
              </div>
              <div className="text-3xl font-['Poppins'] font-bold text-[#2E2E2E] mb-1">{stat.value}</div>
              <div className="font-['Montserrat'] font-medium text-[#6C757D] text-sm">{stat.title}</div>
            </div>
          ))}
        </div>

        {/* Primary Actions */}
        <div className="mb-8">
          <div className="text-center mb-8 py-8 bg-gradient-to-r from-[#F5F5DC] to-[#B6D7FF] rounded-3xl shadow-lg">
            <h2 className="text-3xl font-['Poppins'] font-bold text-[#0D3B66] mb-2">Primary Actions</h2>
            <p className="text-[#2D9C8F] font-['Roboto']">Choose your next step to efficiently manage migrant healthcare services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Register a Migrant */}
            <div className="bg-gradient-to-br from-[#2D9C8F] to-[#A8E6CF] text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
              </div>
              <h4 className="font-['Montserrat'] font-semibold text-2xl mb-4">Register a Migrant</h4>
              <p className="text-white/90 font-['Roboto'] text-base mb-6 leading-relaxed">Register a new migrant worker with comprehensive health tracking and medical history generation</p>
              <button 
                onClick={() => nav('/hospital/register')} 
                className="px-6 py-3 bg-white text-[#2D9C8F] font-['Roboto'] font-semibold rounded-2xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                Register a migrant
              </button>
            </div>

            {/* Update Records */}
            <div className="bg-gradient-to-br from-[#3A86FF] to-[#D7E9F7] text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </div>
              <h4 className="font-['Montserrat'] font-semibold text-2xl mb-4">Update Records</h4>
              <p className="text-white/90 font-['Roboto'] text-base mb-6 leading-relaxed">Modify or edit non-critical medical patient data and keep records up to date</p>
              <button 
                onClick={() => nav('/hospital/update')} 
                className="px-6 py-3 bg-white text-[#3A86FF] font-['Roboto'] font-semibold rounded-2xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                Update records
              </button>
            </div>

            {/* Doctor's Login */}
            <div className="bg-gradient-to-br from-[#B388EB] to-[#D7E9F7] text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-['Montserrat'] font-semibold text-2xl mb-4">Doctor's Login</h4>
              <p className="text-white/90 font-['Roboto'] text-base mb-6 leading-relaxed">Secure portal access for healthcare professionals to manage patient records and consultations</p>
              <button 
                onClick={() => nav('/doctor/login')} 
                className="px-6 py-3 bg-white text-[#B388EB] font-['Roboto'] font-semibold rounded-2xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                Doctor Login
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity & Quick UHID Lookup */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-xl border border-[#E0E0E0]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-['Montserrat'] font-bold text-[#0D3B66]">Recent Activity</h3>
              <button className="text-sm text-[#3A86FF] hover:text-[#2D9C8F] font-['Roboto'] font-medium">View all activities ↗</button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-[#F5F7FA] transition-colors">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'success' ? 'bg-[#2D9C8F]' :
                    activity.type === 'info' ? 'bg-[#3A86FF]' :
                    activity.type === 'warning' ? 'bg-[#FFB347]' : 'bg-[#FF6B6B]'
                  }`}></div>
                  <div className="flex-1">
                    <div className="font-['Roboto'] font-medium text-[#2E2E2E]">{activity.id} - {activity.action}</div>
                    <div className="text-sm text-[#6C757D] font-['Roboto']">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick UHID Lookup */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-[#E0E0E0] border-t-4 border-t-[#2D9C8F]">
            <h3 className="text-xl font-['Montserrat'] font-bold text-[#0D3B66] mb-4">Quick UHID Lookup</h3>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Enter UHID" 
                className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A86FF] font-['Roboto']"
              />
              <button className="w-full bg-gradient-to-r from-[#2D9C8F] to-[#A8E6CF] text-white py-3 rounded-lg font-['Roboto'] font-semibold hover:from-[#A8E6CF] hover:to-[#2D9C8F] transition-all duration-300">
                Lookup Patient
              </button>
            </div>
            <div className="mt-6 p-4 bg-[#F5F7FA] rounded-lg">
              <h4 className="font-['Montserrat'] font-semibold text-[#0D3B66] mb-2">System Status</h4>
              <div className="space-y-2 text-sm font-['Roboto']">
                <div className="flex justify-between">
                  <span className="text-[#6C757D]">Database</span>
                  <span className="text-[#2D9C8F]">Online</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6C757D]">API Services</span>
                  <span className="text-[#2D9C8F]">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6C757D]">Backup Status</span>
                  <span className="text-[#FFB347]">Running</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6C757D]">Next Backup</span>
                  <span className="text-[#6C757D]">2h 15m</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-['Poppins'] font-bold text-[#0D3B66]">Analytics Overview</h2>
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A86FF] font-['Roboto']"
            >
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Quarter</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {analyticsData.map((item, index) => (
              <div key={index} className={`${item.color} text-white p-6 rounded-2xl shadow-xl`}>
                <h4 className="font-['Montserrat'] font-semibold text-lg mb-2">{item.title}</h4>
                <div className="text-3xl font-['Poppins'] font-bold mb-1">{item.value}</div>
                <div className="text-white/80 font-['Roboto'] text-sm">{item.subtitle}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hospital Network */}
        <div className="mb-8">
          <h2 className="text-2xl font-['Poppins'] font-bold text-[#0D3B66] mb-6">Hospital Network</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {networkData.map((hospital, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-xl border border-[#E0E0E0] hover:shadow-2xl hover:shadow-[#B388EB]/20 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-['Montserrat'] font-semibold text-[#0D3B66]">{hospital.name}</h4>
                  <div className={`px-3 py-1 rounded-full text-xs font-['Roboto'] font-semibold ${
                    hospital.status === 'Online' ? 'bg-[#A8E6CF] text-[#2D9C8F]' : 'bg-[#FFB347] text-[#FF6B6B]'
                  }`}>
                    {hospital.status}
                  </div>
                </div>
                <p className={`text-sm font-['Roboto'] ${hospital.color}`}>{hospital.connection}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications & Alerts */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-['Poppins'] font-bold text-[#0D3B66]">Notifications & Alerts</h2>
            <button className="text-sm text-[#3A86FF] hover:text-[#2D9C8F] font-['Roboto'] font-medium">View all notifications ↗</button>
          </div>
          <div className="space-y-4">
            {notifications.map((notif, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                notif.priority === 'high' ? 'bg-red-50 border-l-red-500' :
                notif.priority === 'medium' ? 'bg-blue-50 border-l-blue-500' : 'bg-green-50 border-l-green-500'
              }`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-['Montserrat'] font-semibold text-[#0D3B66] mb-1">{notif.type}</h4>
                    <p className="text-[#6C757D] font-['Roboto'] text-sm">{notif.message}</p>
                  </div>
                  <span className="text-xs text-[#6C757D] font-['Roboto']">{notif.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help & Support */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-[#E0E0E0] border-t-4 border-t-[#3A86FF] text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#3A86FF] to-[#D7E9F7] rounded-2xl mx-auto flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-['Montserrat'] font-bold text-[#0D3B66] mb-2">User Manual</h3>
            <p className="text-[#6C757D] font-['Roboto'] text-sm mb-4">Comprehensive guide for hospital dashboard features</p>
            <button className="px-6 py-2 bg-gradient-to-r from-[#3A86FF] to-[#2D9C8F] text-white font-['Roboto'] font-semibold rounded-lg hover:from-[#2D9C8F] hover:to-[#3A86FF] transition-all duration-300">
              Read Manual ↗
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border border-[#E0E0E0] border-t-4 border-t-[#2D9C8F] text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#2D9C8F] to-[#A8E6CF] rounded-2xl mx-auto flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <h3 className="font-['Montserrat'] font-bold text-[#0D3B66] mb-2">Technical Support</h3>
            <p className="text-[#6C757D] font-['Roboto'] text-sm mb-4">24/7 helpline for technical assistance and troubleshooting</p>
            <button className="px-6 py-2 bg-gradient-to-r from-[#2D9C8F] to-[#A8E6CF] text-white font-['Roboto'] font-semibold rounded-lg hover:from-[#A8E6CF] hover:to-[#2D9C8F] transition-all duration-300">
              Contact Support ↗
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border border-[#E0E0E0] border-t-4 border-t-[#B388EB] text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#B388EB] to-[#D7E9F7] rounded-2xl mx-auto flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-['Montserrat'] font-bold text-[#0D3B66] mb-2">Training Videos</h3>
            <p className="text-[#6C757D] font-['Roboto'] text-sm mb-4">Step-by-step video tutorials for efficient dashboard usage</p>
            <button className="px-6 py-2 bg-gradient-to-r from-[#B388EB] to-[#D7E9F7] text-white font-['Roboto'] font-semibold rounded-lg hover:from-[#D7E9F7] hover:to-[#B388EB] transition-all duration-300">
              Watch Videos ↗
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
