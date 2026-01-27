import React, { useState, useEffect } from 'react';
import mockApi from '../services/mockApi';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ViewPastRecords(){
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [medical, setMedical] = useState(null);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDoctorAuthenticated, setIsDoctorAuthenticated] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState(null);

  useEffect(() => {
    checkDoctorAuthentication();
  }, []);

  async function checkDoctorAuthentication() {
    const token = localStorage.getItem('doctorToken') || sessionStorage.getItem('doctorToken');
    if (token) {
      try {
        const verification = await mockApi.verifyDoctorToken(token);
        if (verification.success) {
          const doctorData = await mockApi.getDoctorByToken(token);
          if (doctorData.success) {
            setIsDoctorAuthenticated(true);
            setDoctorInfo(doctorData.doctor);
          }
        }
      } catch (err) {
        console.error('Doctor authentication check failed:', err);
      }
    }
  }

  async function accessRecords(){
    if(!identifier) {
      setMsg('Please enter UHID');
      return;
    }

    // For non-doctor users, require password
    if(!isDoctorAuthenticated && !password) {
      setMsg('Please enter both UHID and password');
      return;
    }
    
    setLoading(true);
    try {
      let res;
      
      if (isDoctorAuthenticated) {
        // Doctor authentication - no password needed
        const token = localStorage.getItem('doctorToken') || sessionStorage.getItem('doctorToken');
        res = await mockApi.getDoctorPatientDetails(identifier, token);
      } else {
        // Regular patient authentication with password
        res = await mockApi.authenticatePatient(identifier, password);
      }
      
      if(res.success){ 
        // Transform data structure to match PatientRecordDetails expectations
        const transformedPatient = {
          ...res.patient,
          baselineHealth: {
            weight: res.patient.baseline_tests?.weight || 0,
            height: res.patient.baseline_tests?.height || 0,
            bmi: res.patient.baseline_tests?.bmi || 0,
            bloodSugar: res.patient.baseline_tests?.blood_sugar || 0,
            bp: res.patient.baseline_tests?.bp || '0/0',
            bloodGroup: res.patient.baseline_tests?.blood_group || 'Unknown',
            hemoglobin: res.patient.baseline_tests?.hb || 0
          },
          medicalHistory: res.patient.visits?.map(visit => ({
            ...visit,
            type: visit.type || 'Medical Visit',
            status: visit.status || 'completed',
            reports: visit.reports || []
          })) || [],
          emergencyContacts: [
            { type: 'Primary Contact', name: 'Emergency Contact', phone: res.patient.phone || 'N/A' }
          ],
          insurance: {
            provider: 'State Health Insurance',
            policyNumber: 'Not Available',
            coverage: 'Basic Coverage',
            premium: 'N/A',
            benefits: {
              coverageLimit: 'N/A',
              claimsUsed: 'N/A',
              remaining: 'N/A'
            }
          },
          medications: [],
          upcomingAppointments: [],
          healthAlerts: [],
          lastAccessed: isDoctorAuthenticated ? `Dr. ${doctorInfo?.name}` : 'Healthcare Staff',
          lastAccessDate: new Date().toISOString().split('T')[0],
          treatmentSummary: `Status: ${res.patient.status || 'Active'}`
        };
        
        // Navigate to patient record details page
        navigate(`/patient-records/${res.patient.uhid}`, {
          state: {
            patientData: transformedPatient
          }
        });
      } else {
        setMsg(res.error || 'Invalid credentials or patient not found');
      }
    } catch (error) {
      setMsg('Error accessing records. Please try again.');
    }
    setLoading(false);
  }

  const recentActivities = [
    { id: 1, type: 'Successful patient record access', desc: 'Dr. Kumar accessed John Doe\'s medical history', status: 'Success', icon: '✓', color: 'green' },
    { id: 2, type: 'Failed authentication attempt', desc: 'Invalid credentials for UHID: KER-0045789', status: 'Failed', icon: '✗', color: 'red' },
    { id: 3, type: 'Record update completed', desc: 'Medical history updated for patient ID: 78903', status: 'Updated', icon: '🔄', color: 'blue' },
    { id: 4, type: 'Medical record warning', desc: 'Attention needed for flagged medical condition', status: 'Warning', icon: '⚠', color: 'yellow' }
  ];

  const complianceItems = [
    { text: 'End-to-end encryption for all patient medical information', completed: true },
    { text: 'Multi-factor authentication', completed: true },
    { text: 'Regular security audits', completed: true },
    { text: 'Comprehensive audit logging', completed: true },
    { text: 'Access controls and monitoring', completed: true }
  ];

  const securityMeasures = [
    { text: 'AES-256 encryption at-rest', icon: '🔐' },
    { text: 'SSL/TLS encrypted transit', icon: '🔒' },
    { text: 'Role-based access controls', icon: '👤' },
    { text: 'Automated security updates', icon: '🔄' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Access Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h1 className="text-3xl font-['Poppins'] font-bold text-gray-900 mb-2">
                {isDoctorAuthenticated ? 'Doctor Portal - Patient Records' : 'Access Patient Records'}
              </h1>
              <p className="text-gray-600 font-['Roboto']">
                {isDoctorAuthenticated 
                  ? `Welcome Dr. ${doctorInfo?.name} - Enter patient UHID to view medical records`
                  : 'Enter patient credentials to view medical history'
                }
              </p>
              {isDoctorAuthenticated && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700 font-['Roboto']">
                    <strong>Doctor Access:</strong> {doctorInfo?.specialization} • {doctorInfo?.hospital}
                  </p>
                </div>
              )}
            </div>

            <div className="max-w-md mx-auto space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 font-['Roboto'] mb-2">
                  Universal Health ID (UHID) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                    placeholder="867159943420"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-['Roboto'] text-lg tracking-wider"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-4 0V4a2 2 0 114 0v2" />
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-gray-500 font-['Roboto'] mt-1">Enter universal health ID or registered phone number</p>
              </div>

              {!isDoctorAuthenticated && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-['Roboto'] mb-2">
                    Patient Password *
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-['Roboto']"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 font-['Roboto'] mt-1">Password should be correct before viewing patient records</p>
                </div>
              )}

              <button
                onClick={accessRecords}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-['Roboto'] font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                )}
                {loading ? 'Accessing Records...' : (isDoctorAuthenticated ? 'View Patient Records' : 'Access Patient Records')}
              </button>

              {/* Doctor Logout Button */}
              {isDoctorAuthenticated && (
                <button
                  onClick={() => {
                    localStorage.removeItem('doctorToken');
                    localStorage.removeItem('doctorInfo');
                    sessionStorage.removeItem('doctorToken');
                    sessionStorage.removeItem('doctorInfo');
                    navigate('/doctor/login');
                  }}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-['Roboto'] font-medium hover:bg-red-600 transition-colors flex items-center justify-center mt-3"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout from Doctor Portal
                </button>
              )}

              {msg && (
                <div className={`text-center text-sm font-['Roboto'] ${msg.includes('Invalid') || msg.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                  {msg}
                </div>
              )}

              {/* Debug Section - Remove in production */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                <h3 className="text-sm font-['Roboto'] font-semibold text-gray-700 mb-2">Test Credentials (Debug Mode):</h3>
                <div className="text-xs font-['Roboto'] text-gray-600 space-y-1">
                  <div>UHID: 867159943420 | Password: patient123 (Arjun Krishnan)</div>
                  <div>UHID: 867159943421 | Password: priya456 (Priya Devi)</div>
                  <div>UHID: 867159943422 | Password: ravi789 (Ravi Kumar)</div>
                </div>
                <button
                  onClick={async () => {
                    try {
                      await mockApi.resetDatabase();
                      setMsg('Database reset successfully. Try logging in again.');
                    } catch (error) {
                      setMsg('Error resetting database');
                    }
                  }}
                  className="mt-2 px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                >
                  Reset Database
                </button>
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="mb-8">
            <h2 className="text-2xl font-['Poppins'] font-bold text-gray-900 text-center mb-6">Secure Patient Record Management</h2>
            <p className="text-center text-gray-600 font-['Roboto'] mb-8">Our system ensures end-to-end encryption and comprehensive audit trails when you access and manage patient medical records with full audit trail compliance.</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-['Poppins'] font-semibold text-gray-900 mb-2">Enhanced Security</h3>
                <p className="text-sm text-gray-600 font-['Roboto'] mb-4">Multi-layer encryption and secure authentication protocols to ensure complete data protection and access to patient records.</p>
                <ul className="text-xs text-gray-500 font-['Roboto'] space-y-1">
                  <li>• Multi-factor authentication</li>
                  <li>• End-to-end data encryption</li>
                  <li>• Secure session management</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-['Poppins'] font-semibold text-gray-900 mb-2">Complete Audit Trail</h3>
                <p className="text-sm text-gray-600 font-['Roboto'] mb-4">Every patient record access and modification is logged with comprehensive audit trails for full compliance.</p>
                <ul className="text-xs text-gray-500 font-['Roboto'] space-y-1">
                  <li>• Detailed access logging</li>
                  <li>• Real-time activity monitoring</li>
                  <li>• Comprehensive audit reports</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-['Poppins'] font-semibold text-gray-900 mb-2">Comprehensive Records</h3>
                <p className="text-sm text-gray-600 font-['Roboto'] mb-4">Access and view detailed patient medical records including history, treatments, and diagnostic reports.</p>
                <ul className="text-xs text-gray-500 font-['Roboto'] space-y-1">
                  <li>• Complete medical history</li>
                  <li>• Diagnostic reports and labs</li>
                  <li>• Treatment documentation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-['Poppins'] font-semibold text-gray-900">System Status</h2>
              <span className="text-sm text-gray-500 font-['Roboto']">All systems operational</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="w-10 h-10 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-['Roboto'] font-semibold text-gray-900">Database</h3>
                <p className="text-xs text-gray-500 font-['Roboto']">Online</p>
                <p className="text-xs text-green-600 font-['Roboto']">99.9% uptime</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-['Roboto'] font-semibold text-gray-900">Authentication</h3>
                <p className="text-xs text-gray-500 font-['Roboto']">Secure</p>
                <p className="text-xs text-blue-600 font-['Roboto']">Active</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full mx-auto flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-['Roboto'] font-semibold text-gray-900">Device</h3>
                <p className="text-xs text-gray-500 font-['Roboto']">Connected</p>
                <p className="text-xs text-purple-600 font-['Roboto']">Trusted</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="w-10 h-10 bg-orange-100 rounded-full mx-auto flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                </div>
                <h3 className="font-['Roboto'] font-semibold text-gray-900">API Services</h3>
                <p className="text-xs text-gray-500 font-['Roboto']">Running</p>
                <p className="text-xs text-orange-600 font-['Roboto']">Responsive</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Recent Access Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-['Poppins'] font-semibold text-gray-900">Recent Access Activity</h3>
                <a href="#" className="text-blue-600 text-sm font-['Roboto'] hover:underline">View All</a>
              </div>
              <p className="text-sm text-gray-600 font-['Roboto'] mb-4">Live monitoring of recent access attempts</p>
              
              <div className="space-y-3">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                      activity.color === 'green' ? 'bg-green-500' : 
                      activity.color === 'red' ? 'bg-red-500' : 
                      activity.color === 'blue' ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-['Roboto'] font-semibold text-gray-900">{activity.type}</h4>
                      <p className="text-xs text-gray-600 font-['Roboto']">{activity.desc}</p>
                      <span className={`inline-block text-xs px-2 py-1 rounded-full mt-1 ${
                        activity.status === 'Success' ? 'bg-green-100 text-green-800' :
                        activity.status === 'Failed' ? 'bg-red-100 text-red-800' :
                        activity.status === 'Updated' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance and Security */}
            <div className="space-y-6">
              {/* HIPAA Compliance */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-['Poppins'] font-semibold text-gray-900">HIPAA Compliance</h3>
                </div>
                <p className="text-sm text-gray-600 font-['Roboto'] mb-4">Meeting all standards for protected health information handling.</p>
                
                <div className="space-y-2">
                  {complianceItems.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-700 font-['Roboto']">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Security Measures */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-['Poppins'] font-semibold text-gray-900">Data Security Measures</h3>
                </div>
                <p className="text-sm text-gray-600 font-['Roboto'] mb-4">Advanced security protocols protecting patient information.</p>
                
                <div className="space-y-3">
                  {securityMeasures.map((measure, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-lg mr-3">{measure.icon}</span>
                      <span className="text-sm text-gray-700 font-['Roboto']">{measure.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-blue-600 rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-['Poppins'] font-bold mb-2">Need Help?</h2>
            <p className="font-['Roboto'] mb-6">Our support team is available 24/7 to assist with any technical issues</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-lg mx-auto flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-['Poppins'] font-semibold mb-1">Phone Support</h3>
                <p className="text-sm text-blue-100 font-['Roboto']">Call us at technical issues</p>
                <p className="text-sm font-['Roboto'] font-semibold">+91 94000 12345</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-lg mx-auto flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-['Poppins'] font-semibold mb-1">Email Support</h3>
                <p className="text-sm text-blue-100 font-['Roboto']">Send us a detailed message</p>
                <p className="text-sm font-['Roboto'] font-semibold">support@migranthealth.kerala.gov.in</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-lg mx-auto flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="font-['Poppins'] font-semibold mb-1">Live Chat</h3>
                <p className="text-sm text-blue-100 font-['Roboto']">Chat with our support team</p>
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-['Roboto'] font-semibold mt-2 hover:bg-blue-50 transition-colors">
                  Start Chat
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
