import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mockApi from '../services/mockApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function UpdateRecords(){
  const navigate = useNavigate();
  const [uhid, setUhid] = useState('');
  const [patient, setPatient] = useState(null);
  const [form, setForm] = useState({ local_address:'', industry:'', destination_city:'', phone:'' });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

    async function lookup() {
    console.log('lookup function called with UHID:', uhid);
    setMsg('');
    if (!uhid.trim()) {
      setMsg('Please enter a UHID');
      return;
    }
    
    setLoading(true);
    console.log('About to call getPatientNonMedical');
    try {
      const res = await mockApi.getPatientNonMedical(uhid);
      console.log('getPatientNonMedical response:', res);
      
      if (res.success) {
        console.log('Success, about to navigate to patient-profile-update with patient:', res.patient);
        // Clear loading state before navigation
        setLoading(false);
        navigate('/hospital/patient-profile-update', { 
          state: { patient: res.patient },
          replace: false
        });
      } else {
        console.log('Failed:', res.error);
        setMsg(res.error || 'Patient not found');
        setLoading(false);
      }
    } catch (error) {
      console.log('Error:', error);
      setMsg('Error looking up patient');
      setLoading(false);
    }
  }

  function onChange(e){ 
    const {name,value} = e.target; 
    setForm(f=>({...f,[name]:value})); 
  }

  async function submit(e){
    e.preventDefault();
    setLoading(true);
    const res = await mockApi.updateNonMedical(uhid, form, 'Healthcare Staff');
    if(res.success){ 
      setMsg('Patient information updated successfully'); 
      setPatient(res.patient); 
    } else {
      setMsg(res.error || 'Failed to update patient information');
    }
    setLoading(false);
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <nav className="flex space-x-8">
                <a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-4 text-sm font-medium font-['Roboto']">Patient Management</a>
                <a href="#" className="text-gray-500 hover:text-gray-700 pb-4 text-sm font-medium font-['Roboto']">Update Patient Information</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 font-['Roboto']">Search Results</span>
              <span className="text-sm text-blue-600 font-['Roboto'] font-medium">Last Updated: 1 hour ago</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Main Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-['Poppins'] font-bold text-gray-900">Patient Information Update</h1>
          <p className="text-gray-600 font-['Roboto'] mt-1">Manage non-medical patient information securely</p>
        </div>

        {/* Patient Lookup Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-['Poppins'] font-semibold text-gray-900">Step 1: Patient Lookup</h2>
          </div>
          <p className="text-sm text-gray-600 font-['Roboto'] mb-4">Enter the patient's UHID to retrieve their current details</p>
          
          <div className="max-w-md">
            <label className="block text-sm font-medium text-gray-700 font-['Roboto'] mb-2">
              Universal Health ID (UHID) *
            </label>
            <div className="flex space-x-3">
              <input 
                type="text"
                value={uhid} 
                onChange={e=>setUhid(e.target.value)}
                placeholder="867159943420"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-['Roboto']"
              />
              <button 
                onClick={lookup}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-['Roboto'] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Searching...' : 'Look Up Patient'}
              </button>
            </div>
            {msg && (
              <div className={`mt-3 p-3 rounded-lg text-sm font-['Roboto'] ${
                msg.includes('successfully') || msg.includes('found') 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {msg}
              </div>
            )}
          </div>
        </div>

        {/* Patient Information Form */}
        {patient && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-['Poppins'] font-semibold text-gray-900">Patient Information</h2>
                <p className="text-sm text-gray-600 font-['Roboto']">Update non-medical information for {patient.name}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-600 font-['Roboto']">Active Patient</span>
              </div>
            </div>

            {/* Patient Basic Info Display */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-500 font-['Roboto'] font-medium">Full Name</label>
                  <p className="text-sm font-['Roboto'] font-medium text-gray-900">{patient.name}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-['Roboto'] font-medium">UHID</label>
                  <p className="text-sm font-['Roboto'] font-medium text-gray-900">{patient.uhid}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-['Roboto'] font-medium">Age & Gender</label>
                  <p className="text-sm font-['Roboto'] font-medium text-gray-900">{patient.age} years, {patient.gender}</p>
                </div>
              </div>
            </div>

            {/* Editable Form */}
            <form onSubmit={submit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-['Roboto'] mb-2">
                    Local Address *
                  </label>
                  <input 
                    type="text"
                    name="local_address" 
                    value={form.local_address} 
                    onChange={onChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-['Roboto']"
                    placeholder="Enter current local address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 font-['Roboto'] mb-2">
                    Industry/Occupation *
                  </label>
                  <input 
                    type="text"
                    name="industry" 
                    value={form.industry} 
                    onChange={onChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-['Roboto']"
                    placeholder="Enter industry or occupation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 font-['Roboto'] mb-2">
                    Destination City *
                  </label>
                  <input 
                    type="text"
                    name="destination_city" 
                    value={form.destination_city} 
                    onChange={onChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-['Roboto']"
                    placeholder="Enter destination city"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 font-['Roboto'] mb-2">
                    Phone Number *
                  </label>
                  <input 
                    type="tel"
                    name="phone" 
                    value={form.phone} 
                    onChange={onChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-['Roboto']"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-500 font-['Roboto']">
                  * Required fields must be completed
                </div>
                <button 
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-['Roboto'] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Updating...' : 'Update Patient Information'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Recent Activity Log */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-['Poppins'] font-semibold text-gray-900">Recent Activity Log</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-['Roboto'] font-medium">View All</button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-['Roboto'] text-gray-900">Phone number updated</p>
                <p className="text-xs text-gray-500 font-['Roboto']">By: Healthcare Staff • 2 hours ago</p>
              </div>
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
              </svg>
            </div>

            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-['Roboto'] text-gray-900">Local address modified</p>
                <p className="text-xs text-gray-500 font-['Roboto']">By: Healthcare Staff • 1 day ago</p>
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
              </svg>
            </div>

            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-['Roboto'] text-gray-900">Industry information updated</p>
                <p className="text-xs text-gray-500 font-['Roboto']">By: Healthcare Staff • 3 days ago</p>
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Information Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-['Poppins'] font-semibold text-gray-900">Data Security</h3>
            </div>
            <p className="text-sm text-gray-600 font-['Roboto'] mb-4">All updates are secure and logged with comprehensive audit trails for full compliance and data protection.</p>
            <ul className="text-xs text-gray-500 font-['Roboto'] space-y-1">
              <li>• 256-bit encryption</li>
              <li>• HIPAA compliant</li>
              <li>• Audit trail logging</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-['Poppins'] font-semibold text-gray-900">Access Control</h3>
            </div>
            <p className="text-sm text-gray-600 font-['Roboto'] mb-4">Role-based access control staff can only update information according to their permission level.</p>
            <ul className="text-xs text-gray-500 font-['Roboto'] space-y-1">
              <li>• Role-based permissions</li>
              <li>• Session monitoring</li>
              <li>• Access logging</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="font-['Poppins'] font-semibold text-gray-900">Audit Trail</h3>
            </div>
            <p className="text-sm text-gray-600 font-['Roboto'] mb-4">Complete audit trails for every patient record access and modification with full compliance.</p>
            <ul className="text-xs text-gray-500 font-['Roboto'] space-y-1">
              <li>• Detailed change logs</li>
              <li>• User activity tracking</li>
              <li>• Compliance reports</li>
            </ul>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-['Poppins'] font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-2">
                <div className="w-8 h-8 bg-green-500 rounded-full"></div>
              </div>
              <p className="text-sm font-['Roboto'] font-medium text-gray-900">Database</p>
              <p className="text-xs text-green-600 font-['Roboto']">Online</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-2">
                <div className="w-8 h-8 bg-green-500 rounded-full"></div>
              </div>
              <p className="text-sm font-['Roboto'] font-medium text-gray-900">API Services</p>
              <p className="text-xs text-green-600 font-['Roboto']">Running</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full mx-auto flex items-center justify-center mb-2">
                <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
              </div>
              <p className="text-sm font-['Roboto'] font-medium text-gray-900">Security</p>
              <p className="text-xs text-yellow-600 font-['Roboto']">Monitoring</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-2">
                <div className="w-8 h-8 bg-green-500 rounded-full"></div>
              </div>
              <p className="text-sm font-['Roboto'] font-medium text-gray-900">Backup</p>
              <p className="text-xs text-green-600 font-['Roboto']">Success</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
