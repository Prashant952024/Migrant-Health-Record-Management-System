import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import mockApi from '../services/mockApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PatientProfileUpdate() {
  const location = useLocation();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(location.state?.patient || null);
  const [form, setForm] = useState({
    local_address: '',
    industry: '',
    destination_city: '',
    phone: ''
  });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (patient) {
      setForm({
        local_address: patient.local_address || '',
        industry: patient.industry || '',
        destination_city: patient.destination_city || '',
        phone: patient.phone || ''
      });
    }
  }, [patient]);

  function onChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function handleSaveChanges(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await mockApi.updateNonMedical(patient.uhid, form, 'Healthcare Staff');
      if (res.success) {
        setMsg('Patient information updated successfully');
        setPatient(res.patient);
      } else {
        setMsg(res.error || 'Failed to update patient information');
      }
    } catch (error) {
      setMsg('Error updating patient information');
    }
    setLoading(false);
  }

  function handleCancel() {
    navigate('/hospital/update');
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-['Poppins'] font-semibold text-gray-900">No patient data found</h2>
          <button 
            onClick={() => navigate('/hospital/update')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-['Roboto']"
          >
            Go back to search
          </button>
        </div>
      </div>
    );
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
              <button 
                onClick={() => navigate('/hospital/update')}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <nav className="flex space-x-8">
                <a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-4 text-sm font-medium font-['Roboto']">Patient Management</a>
                <a href="#" className="text-gray-500 hover:text-gray-700 pb-4 text-sm font-medium font-['Roboto']">Update Records</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-green-600 font-['Roboto'] font-medium">✓ Last Updated</span>
              <span className="text-sm text-gray-600 font-['Roboto']">1 hour ago</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Main Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-['Poppins'] font-bold text-gray-900">Update Patient Records</h1>
          <p className="text-gray-600 font-['Roboto'] mt-1">Modify non-medical patient information securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Patient Profile Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-['Poppins'] font-semibold text-gray-900 mb-6">Patient Profile Summary</h2>
              
              {/* Patient Avatar and Basic Info */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-['Poppins'] font-semibold text-gray-900">{patient.name}</h3>
                  <p className="text-sm text-blue-600 font-['Roboto'] font-medium">Patient Status: Active</p>
                </div>
              </div>

              {/* Patient Details */}
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-['Roboto'] text-gray-600">UHID</span>
                  <span className="text-sm font-['Roboto'] font-medium text-gray-900">{patient.uhid}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-['Roboto'] text-gray-600">Age</span>
                  <span className="text-sm font-['Roboto'] font-medium text-gray-900">{patient.age} years</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-['Roboto'] text-gray-600">Gender</span>
                  <span className="text-sm font-['Roboto'] font-medium text-gray-900">{patient.gender}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-['Roboto'] text-gray-600">Home State</span>
                  <span className="text-sm font-['Roboto'] font-medium text-gray-900">{patient.home_state}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-['Roboto'] text-gray-600">Registration Date</span>
                  <span className="text-sm font-['Roboto'] font-medium text-gray-900">March 5, 2024</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-['Roboto'] text-gray-600">Last Visit Status</span>
                  <span className="text-sm font-['Roboto'] font-medium text-green-600">Visited</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-['Roboto'] text-gray-600">Documentation Status</span>
                  <span className="text-sm font-['Roboto'] font-medium text-green-600">Verified</span>
                </div>
              </div>

              {/* Medical Call Alert */}
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-['Roboto'] font-semibold text-red-800">Medical Call Alert</h4>
                    <p className="text-xs text-red-700 font-['Roboto'] mt-1">
                      Blood pressure readings require immediate medical attention and follow-up consultation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Update Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-['Poppins'] font-semibold text-gray-900 mb-6">Update Non-Medical Information</h2>
              <p className="text-sm text-gray-600 font-['Roboto'] mb-6">Modify patient contact and demographic information</p>

              {/* Yellow Warning Banner */}
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <p className="text-sm text-yellow-800 font-['Roboto']">
                    Only authorized healthcare staff can modify patient medical data
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveChanges} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-['Roboto'] mb-2">
                    Address
                  </label>
                  <textarea
                    name="local_address"
                    value={form.local_address}
                    onChange={onChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-['Roboto'] resize-none"
                    placeholder="Enter complete address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 font-['Roboto'] mb-2">
                    Construction
                  </label>
                  <input
                    type="text"
                    name="industry"
                    value={form.industry}
                    onChange={onChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-['Roboto']"
                    placeholder="Enter industry/occupation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 font-['Roboto'] mb-2">
                    Destination
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
                    Phone
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

                {msg && (
                  <div className={`p-3 rounded-lg text-sm font-['Roboto'] ${
                    msg.includes('successfully') 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {msg}
                  </div>
                )}

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-['Roboto'] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 font-['Roboto'] font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-['Poppins'] font-semibold text-gray-900 mb-6">Recent Activity</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-['Roboto'] text-gray-900">Non-medical information updated</p>
                <p className="text-xs text-gray-500 font-['Roboto']">By: Healthcare Staff • 30 minutes ago</p>
              </div>
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
              </svg>
            </div>

            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-['Roboto'] text-gray-900">Visit information updated</p>
                <p className="text-xs text-gray-500 font-['Roboto']">By: Healthcare Staff • 2 hours ago</p>
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
              </svg>
            </div>

            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-['Roboto'] text-gray-900">Medical referrals reviewed</p>
                <p className="text-xs text-gray-500 font-['Roboto']">By: Healthcare Staff • 1 day ago</p>
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Statistics */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20a3 3 0 01-3-3v-2a3 3 0 016 0v2a3 3 0 01-3 3zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="text-2xl font-['Poppins'] font-bold text-gray-900">1,247</div>
            <div className="text-sm text-gray-600 font-['Roboto']">Total Patients</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="text-2xl font-['Poppins'] font-bold text-gray-900">23</div>
            <div className="text-sm text-gray-600 font-['Roboto']">Records Updated Today</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="text-2xl font-['Poppins'] font-bold text-gray-900">8</div>
            <div className="text-sm text-gray-600 font-['Roboto']">Pending Verifications</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
            <div className="text-2xl font-['Poppins'] font-bold text-gray-900">3</div>
            <div className="text-sm text-gray-600 font-['Roboto']">Critical Updates</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-['Poppins'] font-semibold text-gray-900 mb-6">Quick Actions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-['Roboto'] font-medium text-gray-900">Lookup Another UHID</p>
                  <p className="text-sm text-gray-500 font-['Roboto']">Search for another patient</p>
                </div>
              </div>
            </button>

            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-['Roboto'] font-medium text-gray-900">Register New Patient</p>
                  <p className="text-sm text-gray-500 font-['Roboto']">Add new patient to system</p>
                </div>
              </div>
            </button>

            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-['Roboto'] font-medium text-gray-900">Export Records</p>
                  <p className="text-sm text-gray-500 font-['Roboto']">Download patient data</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}