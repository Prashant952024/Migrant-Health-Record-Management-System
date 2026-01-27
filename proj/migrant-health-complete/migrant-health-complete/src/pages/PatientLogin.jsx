import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mockApi from '../services/mockApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PatientLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    uhid: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    console.log('handleLogin called, form data:', form);
    
    if (!form.uhid.trim() || !form.password.trim()) {
      setError('Please enter both UHID and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Attempting patient login with:', form.uhid, form.password);
      const response = await mockApi.authenticatePatient(form.uhid, form.password);
      console.log('Patient login response:', response);
      
      if (response.success) {
        console.log('Login successful, storing patient info and navigating...');
        // Store patient info
        localStorage.setItem('patientInfo', JSON.stringify(response.patient));
        
        console.log('About to navigate to /patient/dashboard');
        // Navigate to patient dashboard
        navigate('/patient/dashboard');
        console.log('Navigation command executed');
      } else {
        console.log('Login failed:', response.error);
        setError(response.error || 'Invalid UHID or password');
      }
    } catch (error) {
      console.error('Patient login error:', error);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Welcome Content */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-4 font-['Poppins']">
                    Welcome to Your <span className="text-blue-600">Healthcare Portal</span>
                  </h1>
                  <p className="text-lg text-gray-600 font-['Roboto'] leading-relaxed">
                    Access your comprehensive health records, appointments, and 
                    healthcare journey with our secure patient portal.
                  </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 font-['Poppins']">Secure Access</h3>
                    <p className="text-sm text-gray-600 font-['Roboto']">Bank-level security with encrypted data protection</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 font-['Poppins']">24/7 Access</h3>
                    <p className="text-sm text-gray-600 font-['Roboto']">Access your health information anytime, anywhere</p>
                  </div>
                </div>

                {/* Your Security is Our Priority Section */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 font-['Poppins']">Your Security is Our Priority</h3>
                  <p className="text-sm text-gray-600 mb-6 font-['Roboto']">
                    We implement multiple layers of security and privacy measures with cutting edge security protocols that 
                    ensure HIPAA compliance.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-xs font-semibold text-gray-700 font-['Roboto']">256-bit Encryption</p>
                      <p className="text-xs text-gray-500 font-['Roboto']">Advanced security for all your data and files</p>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-xs font-semibold text-gray-700 font-['Roboto']">HIPAA Compliant</p>
                      <p className="text-xs text-gray-500 font-['Roboto']">Ensuring your medical information privacy</p>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-xs font-semibold text-gray-700 font-['Roboto']">Multi-Factor Auth</p>
                      <p className="text-xs text-gray-500 font-['Roboto']">Additional security layers for your health data</p>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-xs font-semibold text-gray-700 font-['Roboto']">Audit Logging</p>
                      <p className="text-xs text-gray-500 font-['Roboto']">Comprehensive activity tracking in your account</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Login Form */}
              <div className="max-w-md mx-auto w-full">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  {/* Logo and Header */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 font-['Poppins']">Patient Login</h2>
                    <p className="text-gray-600 font-['Roboto']">Enter your credentials to access your medical portal</p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-600 text-sm font-['Roboto']">{error}</p>
                      </div>
                    )}

                    {/* UHID Field */}
                    <div>
                      <label htmlFor="uhid" className="block text-sm font-medium text-gray-700 mb-2 font-['Roboto']">
                        UHID (Unique Health ID) *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="uhid"
                          name="uhid"
                          value={form.uhid}
                          onChange={handleInputChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-['Roboto']"
                          placeholder="Enter your UHID e.g. UH1234567890"
                          required
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500 font-['Roboto']">
                        Your unique 12-digit health identification number
                      </p>
                    </div>

                    {/* Password Field */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 font-['Roboto']">
                        Password *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={form.password}
                          onChange={handleInputChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-['Roboto']"
                          placeholder="Enter your secure password"
                          required
                        />
                      </div>
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 font-['Roboto']">
                          Remember me
                        </label>
                      </div>
                      <button type="button" className="text-sm text-blue-600 hover:text-blue-500 font-['Roboto']">
                        Forgot UHID?
                      </button>
                    </div>

                    {/* Login Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed font-['Poppins']"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Signing In to Portal
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Sign In to Portal
                        </>
                      )}
                    </button>

                    {/* Help Text */}
                    <div className="text-center">
                      <p className="text-sm text-gray-600 font-['Roboto']">
                        Don't have an account?{' '}
                        <button 
                          type="button" 
                          onClick={() => navigate('/hospital/register')}
                          className="text-blue-600 hover:text-blue-500 font-medium"
                        >
                          Register as New Patient
                        </button>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Features Section */}
          <div className="max-w-6xl mx-auto mt-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-['Poppins']">
                What You Can Do in Your Portal
              </h2>
              <p className="text-gray-600 font-['Roboto']">
                Access comprehensive healthcare that are available manage your health information from one 
                secure location.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Schedule Appointments */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-['Poppins']">Schedule Appointments</h3>
                <p className="text-sm text-gray-600 font-['Roboto']">
                  Book, reschedule, or cancel appointments with your healthcare 
                  providers and specialists.
                </p>
              </div>

              {/* View Medical Records */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h4a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-['Poppins']">View Medical Records</h3>
                <p className="text-sm text-gray-600 font-['Roboto']">
                  Access your complete medical history, lab results, and treatment 
                  plans.
                </p>
              </div>

              {/* Prescription Management */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-['Poppins']">Prescription Management</h3>
                <p className="text-sm text-gray-600 font-['Roboto']">
                  Request refills, view current medications, and track prescription 
                  history.
                </p>
              </div>

              {/* Secure Messaging */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-['Poppins']">Secure Messaging</h3>
                <p className="text-sm text-gray-600 font-['Roboto']">
                  Communicate directly with your healthcare team through encrypted 
                  messages.
                </p>
              </div>
            </div>

            {/* Quick Access Dashboard Preview */}
            <div className="bg-blue-50 rounded-2xl p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 font-['Poppins']">Quick Access Dashboard</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-white rounded-lg p-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900 font-['Roboto']">Next Appointment</span>
                      </div>
                      <span className="text-sm text-gray-600 font-['Roboto']">Tomorrow 2:30 PM</span>
                    </div>

                    <div className="flex items-center justify-between bg-white rounded-lg p-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h4a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900 font-['Roboto']">Lab Results</span>
                      </div>
                      <span className="text-sm text-green-600 font-['Roboto']">2 New Results</span>
                    </div>

                    <div className="flex items-center justify-between bg-white rounded-lg p-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900 font-['Roboto']">Prescriptions</span>
                      </div>
                      <span className="text-sm text-orange-600 font-['Roboto']">1 Expiry Soon</span>
                    </div>

                    <div className="flex items-center justify-between bg-white rounded-lg p-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900 font-['Roboto']">Messages</span>
                      </div>
                      <span className="text-sm text-blue-600 font-['Roboto']">3 Unread</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 font-['Poppins']">Understanding Your UHID</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 mb-2 font-['Poppins']">What is UHID?</h5>
                      <p className="text-sm text-gray-600 font-['Roboto']">
                        Unique Health ID is your permanent identifier across all our healthcare 
                        facilities and services.
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 mb-2 font-['Poppins']">Where to find it?</h5>
                      <p className="text-sm text-gray-600 font-['Roboto']">
                        Check your hospital card, discharge summary, or previous visit 
                        receipts.
                      </p>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-900 mb-2 font-['Poppins']">Sample Format:</h5>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-lg font-mono font-bold text-blue-600">UH1234567890</p>
                        <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-gray-600 font-['Roboto']">
                          <div>
                            <span className="font-medium">"UH" -</span>
                            <br />Prefix
                          </div>
                          <div>
                            <span className="font-medium">1234567890 -</span>
                            <br />Unique ID number
                          </div>
                          <div>
                            <span className="font-medium">Example -</span>
                            <br />Your actual UHID format
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-900 mb-2 font-['Poppins']">Need Help?</h5>
                      <p className="text-sm text-gray-600 font-['Roboto']">
                        Call our patient services at <span className="font-medium text-blue-600">(855) 123-4567</span> for assistance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}