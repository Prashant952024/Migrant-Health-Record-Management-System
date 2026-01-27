import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RegistrationSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // Get registration data from navigation state
  const registrationData = location.state?.registrationData || {
    fullName: 'John Michael Das',
    phone: '+91 9876543210',
    email: 'john@example.com',
    gender: 'Male',
    emergencyContact: '+91 9876543210',
    bloodGroup: 'B+',
    language: 'English',
    state: 'Kerala',
    uhid: '867159943420',
    temporaryPassword: '••••••••••••'
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadUHID = () => {
    // Implementation for downloading UHID card
    console.log('Downloading UHID Card...');
  };

  const handleSendCredentials = () => {
    // Implementation for sending credentials
    console.log('Sending credentials...');
  };

  const handlePrintCard = () => {
    // Implementation for printing card
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-green-500 text-white p-6 rounded-t-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Registration Successful!</h1>
                <p className="text-purple-100">Your ID has been generated successfully!</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-b-lg">
            {/* UHID Card Section */}
            <div className="p-6 border-b">
              <div className="grid md:grid-cols-2 gap-6">
                {/* UHID Card */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Your Universal Health ID</h3>
                      <p className="text-green-100 text-sm">Keep this safe for all your healthcare needs</p>
                    </div>
                    <div className="bg-white p-2 rounded">
                      <span className="text-green-600 font-bold text-xs">ID</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm text-green-100 mb-1">Universal Health ID</div>
                    <div className="text-2xl font-bold tracking-wider">{registrationData.uhid}</div>
                    <div className="text-xs text-green-200 mt-1">12-Digit Code</div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Generated: Sep 23, 2025</span>
                    <span>Valid</span>
                  </div>
                </div>

                {/* Temporary Password */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Temporary Password
                      <button
                        onClick={() => copyToClipboard(registrationData.temporaryPassword)}
                        className="ml-2 text-purple-600 hover:text-purple-800"
                      >
                        <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </label>
                    <div className="bg-gray-100 p-3 rounded-lg font-mono text-lg tracking-wider">
                      {registrationData.temporaryPassword}
                      {copied && <span className="text-green-600 text-sm ml-2">Copied!</span>}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Send this • <span className="text-red-600">Valid for 7 days</span> • Change on first login
                    </p>
                  </div>

                  <div className="text-right">
                    <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                      Show
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 border-b">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={handleDownloadUHID}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download UHID Card
                </button>
                
                <button
                  onClick={handleSendCredentials}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Credentials
                </button>
                
                <button
                  onClick={handlePrintCard}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-lg font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-200 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print Card
                </button>
              </div>
            </div>

            {/* Important Security Information */}
            <div className="p-6 border-b">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Important Security Information</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <ul className="list-disc space-y-1 pl-5">
                        <li>This is a temporary password. Change it on first login.</li>
                        <li>Please change your password after you login</li>
                        <li>Keep your UHID and password safe and secure</li>
                        <li>Never share your password with unauthorized persons</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Summary */}
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Registration Summary</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Personal Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Full Name:</span>
                      <span className="font-medium">{registrationData.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gender:</span>
                      <span className="font-medium">{registrationData.gender}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Blood Group:</span>
                      <span className="font-medium">{registrationData.bloodGroup}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Preferred Language:</span>
                      <span className="font-medium">{registrationData.language}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Contact Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{registrationData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email (Optional):</span>
                      <span className="font-medium">{registrationData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Emergency Contact:</span>
                      <span className="font-medium">{registrationData.emergencyContact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">State:</span>
                      <span className="font-medium">{registrationData.state}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Registration Details</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Registration Date:</span>
                    <span className="font-medium">Sep 23, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Verification:</span>
                    <span className="font-medium text-green-600">Verified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h2>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">Create Password</h3>
                  <p className="text-xs text-gray-600">Update your temporary password for accessing future services</p>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">Link Insurance</h3>
                  <p className="text-xs text-gray-600">Connect with your health insurance for a streamlined experience</p>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4M8 7H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2M8 7V5h8v2" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">Book Appointment</h3>
                  <p className="text-xs text-gray-600">Schedule your first appointment with a healthcare provider</p>
                </div>

                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M6.938 12.79a4 4 0 001.875-8.557 4 4 0 006.374 0 4 4 0 001.875 8.557" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">Download App</h3>
                  <p className="text-xs text-gray-600">Get the mobile app for easy access to health services</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RegistrationSuccess;