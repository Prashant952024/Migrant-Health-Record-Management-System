import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mockApi from '../services/mockApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function HospitalLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
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
    
    if (!form.username.trim() || !form.password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Attempting hospital login with:', form.username, form.password);
      const response = await mockApi.hospitalLogin(form.username, form.password);
      console.log('Hospital login response:', response);
      
      if (response.success) {
        console.log('Login successful, storing token and navigating...');
        // Store token and hospital info
        localStorage.setItem('hospitalToken', response.token);
        localStorage.setItem('hospitalInfo', JSON.stringify(response.hospital));
        
        console.log('About to navigate to /hospital');
        // Navigate to hospital dashboard
        navigate('/hospital');
        console.log('Navigation command executed');
      } else {
        console.log('Login failed:', response.error);
        setError(response.error || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Hospital login error:', error);
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
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Side - Healthcare Management Portal */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-4 font-['Poppins']">
                    Advanced Healthcare <span className="text-blue-600">Management Portal</span>
                  </h1>
                  <p className="text-lg text-gray-600 font-['Roboto'] leading-relaxed">
                    Streamline your healthcare management with our comprehensive digital platform designed for medical 
                    professionals, administrators, and healthcare providers
                  </p>
                </div>

                {/* Key Metrics Cards */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2 font-['Poppins']">15K+</div>
                    <div className="text-sm text-gray-600 font-['Roboto']">Patients Managed</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2 font-['Poppins']">98%</div>
                    <div className="text-sm text-gray-600 font-['Roboto']">System Uptime</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2 font-['Poppins']">24/7</div>
                    <div className="text-sm text-gray-600 font-['Roboto']">Support Available</div>
                  </div>
                </div>

                {/* Enterprise-Grade Security */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 font-['Poppins']">Enterprise-Grade Security</h3>
                  <p className="text-sm text-gray-600 mb-6 font-['Roboto']">
                    Your data is our priority with a robust security platform to medical-grade security 
                    protecting your information with cutting-edge protocols.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-xs font-semibold text-gray-700 font-['Roboto']">SSL Encryption</p>
                      <p className="text-xs text-gray-500 font-['Roboto']">End-to-end secure data encryption for all transactions</p>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-xs font-semibold text-gray-700 font-['Roboto']">HIPAA Compliant</p>
                      <p className="text-xs text-gray-500 font-['Roboto']">Full compliance with healthcare data protection standards</p>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-xs font-semibold text-gray-700 font-['Roboto']">ISO Authentication</p>
                      <p className="text-xs text-gray-500 font-['Roboto']">International standards for information security management</p>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-xs font-semibold text-gray-700 font-['Roboto']">Administrative Tools</p>
                      <p className="text-xs text-gray-500 font-['Roboto']">Complete activity logging with audit trail system</p>
                    </div>
                  </div>
                </div>

                {/* Comprehensive Healthcare Management */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 font-['Poppins']">Comprehensive Healthcare Management</h3>
                  <p className="text-sm text-gray-600 mb-6 font-['Roboto']">
                    Everything you need to manage your health information facility efficiently in one integrated platform.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Patient Management */}
                    <div>
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-blue-900 font-['Poppins']">Patient Management</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-600 font-['Roboto']">
                        <li>• Electronic Health Records (EHR)</li>
                        <li>• Patient Registration Systems</li>
                        <li>• Medical History Tracking</li>
                        <li>• Appointment Scheduling</li>
                        <li>• Insurance and Billing Management</li>
                        <li>• Prescription Management</li>
                      </ul>
                    </div>

                    {/* Clinical Operations */}
                    <div>
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h4a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-green-900 font-['Poppins']">Clinical Operations</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-600 font-['Roboto']">
                        <li>• Laboratory Monitoring</li>
                        <li>• Clinical Decision Support</li>
                        <li>• Treatment Plans Coordination</li>
                        <li>• Medication Management</li>
                        <li>• Clinical Documentation</li>
                        <li>• Treatment Plan Tracking</li>
                      </ul>
                    </div>

                    {/* Administrative Tools */}
                    <div>
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13V12a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-purple-900 font-['Poppins']">Administrative Tools</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-600 font-['Roboto']">
                        <li>• Financial Management & Billing</li>
                        <li>• Staff Scheduling & Human Resources</li>
                        <li>• Inventory & Supply Management</li>
                        <li>• Compliance & Reporting</li>
                        <li>• Performance & Reporting</li>
                        <li>• Data Analytics & Business Intelligence</li>
                      </ul>
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
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2v8h12V6H4z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M9 9a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0V9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 font-['Poppins']">Healthcare Portal Login</h2>
                    <p className="text-gray-600 font-['Roboto']">Enter your hospital credentials to access the management portal</p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-600 text-sm font-['Roboto']">{error}</p>
                      </div>
                    )}

                    {/* Username Field */}
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2 font-['Roboto']">
                        Username *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={form.username}
                          onChange={handleInputChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-['Roboto']"
                          placeholder="Enter your hospital username"
                          required
                        />
                      </div>
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
                        Forgot password?
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
                          Accessing Portal
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Access Healthcare Portal
                        </>
                      )}
                    </button>

                    {/* Help Text */}
                    <div className="text-center">
                      <p className="text-sm text-gray-600 font-['Roboto']">
                        Need access?{' '}
                        <button 
                          type="button" 
                          className="text-blue-600 hover:text-blue-500 font-medium"
                        >
                          Contact Administrator
                        </button>
                      </p>
                    </div>
                  </form>

                  {/* Hospital Credentials Info */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2 font-['Poppins']">Test Credentials</h4>
                    <div className="text-sm text-gray-600 font-['Roboto'] space-y-1">
                      <div><strong>Kochi GMC:</strong> kochi_gmc / hospital123</div>
                      <div><strong>Thrissur DH:</strong> thrissur_dh / district456</div>
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