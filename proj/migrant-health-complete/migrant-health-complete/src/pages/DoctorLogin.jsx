import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mockApi from '../services/mockApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DoctorLogin() {
  const navigate = useNavigate();
  const [doctorId, setDoctorId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    if (!doctorId.trim() || !password.trim()) {
      setError('Please enter both Doctor ID and Password');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const res = await mockApi.doctorLogin(doctorId, password);
      
      if (res.success) {
        // Store doctor info in session/localStorage if remember me is checked
        if (rememberMe) {
          localStorage.setItem('doctorToken', res.token);
          localStorage.setItem('doctorInfo', JSON.stringify(res.doctor));
        } else {
          sessionStorage.setItem('doctorToken', res.token);
          sessionStorage.setItem('doctorInfo', JSON.stringify(res.doctor));
        }
        
        // Add a small delay to ensure token is stored before navigation
        setTimeout(() => {
          navigate('/doctor/dashboard');
        }, 100);
      } else {
        setError(res.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    }
    setLoading(false);
  }

  function handleRegister() {
    alert('Contact system administrator for doctor registration');
  }

  function handleGetHelp() {
    alert('For technical support, call: +91-1234567890 or email: support@migranthealth.gov.in');
  }

  async function handleResetDatabase() {
    try {
      await mockApi.resetDatabase();
      alert('Database reset successfully! You can now try logging in again.');
    } catch (err) {
      alert('Failed to reset database');
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] to-[#E3F2FD] py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Side - Information Panel */}
              <div className="bg-gradient-to-br from-[#E3F2FD] to-[#BBDEFB] rounded-3xl p-8 shadow-xl">
                <div className="mb-8">
                  <h2 className="text-3xl font-['Poppins'] font-bold text-[#0D3B66] mb-4">
                    Secure Doctor Portal Access
                  </h2>
                  <p className="text-[#2D9C8F] font-['Roboto'] text-lg leading-relaxed">
                    Access your patient records, manage appointments, and collaborate with your medical team through our secure, HIPAA-compliant platform trusted by healthcare professionals worldwide.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Instant Patient Access */}
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-[#2D9C8F] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-lg">✓</span>
                    </div>
                    <div>
                      <h4 className="font-['Montserrat'] font-semibold text-[#0D3B66] text-lg mb-2">
                        Instant Patient Access
                      </h4>
                      <p className="text-[#6C757D] font-['Roboto'] text-sm leading-relaxed">
                        View comprehensive patient histories, test results, and treatment plans in real-time.
                      </p>
                    </div>
                  </div>

                  {/* Secure Communication */}
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-[#2D9C8F] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-lg">✓</span>
                    </div>
                    <div>
                      <h4 className="font-['Montserrat'] font-semibold text-[#0D3B66] text-lg mb-2">
                        Secure Communication
                      </h4>
                      <p className="text-[#6C757D] font-['Roboto'] text-sm leading-relaxed">
                        Encrypted messaging with colleagues and secure patient communication tools.
                      </p>
                    </div>
                  </div>

                  {/* Advanced Analytics */}
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-[#2D9C8F] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-lg">✓</span>
                    </div>
                    <div>
                      <h4 className="font-['Montserrat'] font-semibold text-[#0D3B66] text-lg mb-2">
                        Advanced Analytics
                      </h4>
                      <p className="text-[#6C757D] font-['Roboto'] text-sm leading-relaxed">
                        Comprehensive reporting and analytics to improve patient outcomes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Help Section */}
                <div className="mt-8 p-6 bg-white/60 rounded-2xl border border-[#E0E0E0]">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-[#3A86FF] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="font-['Montserrat'] font-semibold text-[#0D3B66]">Need Help?</h4>
                  </div>
                  <p className="text-[#6C757D] font-['Roboto'] text-sm mb-4">
                    Our technical support team is available 24/7 to assist with login issues or account access.
                  </p>
                  <div className="flex space-x-4">
                    <button 
                      onClick={handleGetHelp}
                      className="flex-1 px-4 py-2 bg-[#3A86FF] text-white rounded-lg font-['Roboto'] font-medium hover:bg-[#2D9C8F] transition-colors text-sm"
                    >
                      📞 Call Support
                    </button>
                    <button 
                      onClick={handleGetHelp}
                      className="flex-1 px-4 py-2 bg-[#2D9C8F] text-white rounded-lg font-['Roboto'] font-medium hover:bg-[#3A86FF] transition-colors text-sm"
                    >
                      ✉️ Email Help
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side - Login Form */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-[#E0E0E0]">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#3A86FF] to-[#2D9C8F] rounded-full mx-auto flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h1 className="text-3xl font-['Poppins'] font-bold text-[#0D3B66] mb-2">Doctor Login</h1>
                  <p className="text-[#2D9C8F] font-['Roboto']">Enter your credentials to access your medical portal</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  {/* Doctor ID Field */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-['Roboto'] font-semibold text-[#2E2E2E]">
                      <svg className="w-4 h-4 mr-2 text-[#3A86FF]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-2 2-2-2-2-2 2-2 1.257-1.257A6 6 0 1118 8zm-6-2a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      Doctor ID
                    </label>
                    <input
                      type="text"
                      value={doctorId}
                      onChange={(e) => setDoctorId(e.target.value)}
                      placeholder="Enter your unique Doctor ID"
                      className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A86FF] font-['Roboto'] bg-[#F8F9FA]"
                      disabled={loading}
                    />
                    <p className="text-xs text-[#6C757D] font-['Roboto']">
                      Your unique identifier provided during registration
                    </p>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-['Roboto'] font-semibold text-[#2E2E2E]">
                      <svg className="w-4 h-4 mr-2 text-[#3A86FF]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your secure password"
                      className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A86FF] font-['Roboto'] bg-[#F8F9FA]"
                      disabled={loading}
                    />
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 text-[#3A86FF] border-[#E0E0E0] rounded focus:ring-[#3A86FF]"
                        disabled={loading}
                      />
                      <span className="text-sm font-['Roboto'] text-[#6C757D]">Remember me</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Contact administrator for password reset')}
                      className="text-sm font-['Roboto'] text-[#3A86FF] hover:text-[#2D9C8F] transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600 font-['Roboto']">{error}</p>
                    </div>
                  )}

                  {/* Debug Section */}
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="text-sm font-semibold text-yellow-800 mb-2">Debug Tools</h4>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={handleResetDatabase}
                        className="w-full px-3 py-2 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
                      >
                        Reset Database
                      </button>
                      <div className="text-xs text-yellow-700">
                        <p><strong>Test Credentials:</strong></p>
                        <p>ID: DR001, Password: doctor123</p>
                        <p>ID: DR002, Password: cardio456</p>
                      </div>
                    </div>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#3A86FF] to-[#2D9C8F] text-white py-3 rounded-lg font-['Roboto'] font-semibold hover:from-[#2D9C8F] hover:to-[#3A86FF] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Logging in...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Secure Login</span>
                      </>
                    )}
                  </button>

                  {/* Need Access Section */}
                  <div className="text-center pt-4 border-t border-[#E0E0E0]">
                    <p className="text-sm text-[#6C757D] font-['Roboto'] mb-4">Need access?</p>
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={handleRegister}
                        className="flex-1 px-4 py-2 border border-[#3A86FF] text-[#3A86FF] rounded-lg font-['Roboto'] font-medium hover:bg-[#3A86FF] hover:text-white transition-colors flex items-center justify-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                        </svg>
                        <span>Register</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleGetHelp}
                        className="flex-1 px-4 py-2 border border-[#2D9C8F] text-[#2D9C8F] rounded-lg font-['Roboto'] font-medium hover:bg-[#2D9C8F] hover:text-white transition-colors flex items-center justify-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        <span>Get Help</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}