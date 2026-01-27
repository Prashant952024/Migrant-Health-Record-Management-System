import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mockApi from '../services/mockApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [uhid, setUhid] = useState('');
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  async function checkAuthentication() {
    const token = localStorage.getItem('doctorToken') || sessionStorage.getItem('doctorToken');
    if (!token) {
      navigate('/doctor/login');
      return;
    }

    try {
      const verification = await mockApi.verifyDoctorToken(token);
      if (!verification.success) {
        navigate('/doctor/login');
        return;
      }

      const doctorData = await mockApi.getDoctorByToken(token);
      if (doctorData.success) {
        setDoctor(doctorData.doctor);
      } else {
        navigate('/doctor/login');
      }
    } catch (err) {
      navigate('/doctor/login');
    }
  }

  async function handleSearchPatient(e) {
    e.preventDefault();
    if (!uhid.trim()) {
      setError('Please enter a UHID');
      return;
    }

    setSearchLoading(true);
    setError('');
    setPatient(null);

    try {
      const token = localStorage.getItem('doctorToken') || sessionStorage.getItem('doctorToken');
      const result = await mockApi.getDoctorPatientDetails(uhid, token);
      
      if (result.success) {
        setPatient(result.patient);
      } else {
        setError(result.error || 'Patient not found');
      }
    } catch (err) {
      setError('Error searching for patient');
    }
    setSearchLoading(false);
  }

  function handleLogout() {
    localStorage.removeItem('doctorToken');
    localStorage.removeItem('doctorInfo');
    sessionStorage.removeItem('doctorToken');
    sessionStorage.removeItem('doctorInfo');
    navigate('/doctor/login');
  }

  function clearPatientData() {
    setPatient(null);
    setUhid('');
    setError('');
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] to-[#E3F2FD] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-[#3A86FF] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-[#6C757D] font-['Roboto']">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] to-[#E3F2FD]">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#F5F5DC] to-[#B6D7FF] py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-4xl font-['Poppins'] font-bold text-[#0D3B66] mb-2">
                  Doctor Dashboard
                </h1>
                <p className="text-[#2D9C8F] font-['Roboto'] text-lg mb-2">
                  Welcome back, <span className="font-semibold">{doctor.name}</span>
                </p>
                <p className="text-[#6C757D] font-['Roboto']">
                  {doctor.specialization} • {doctor.hospital}
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-[#6C757D] font-['Roboto']">Doctor ID</div>
                  <div className="text-lg font-['Montserrat'] font-semibold text-[#0D3B66]">{doctor.doctorId}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg font-['Roboto'] font-medium hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          
          {/* Patient Search Section */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#E0E0E0]">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-['Poppins'] font-bold text-[#0D3B66] mb-2">
                  Patient Record Lookup
                </h2>
                <p className="text-[#6C757D] font-['Roboto']">
                  Enter patient UHID to access comprehensive medical records
                </p>
              </div>

              <form onSubmit={handleSearchPatient} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={uhid}
                      onChange={(e) => setUhid(e.target.value)}
                      placeholder="Enter Patient UHID (e.g., 867159943420)"
                      className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A86FF] font-['Roboto'] text-lg bg-[#F8F9FA]"
                      disabled={searchLoading}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={searchLoading}
                    className="px-8 py-3 bg-gradient-to-r from-[#3A86FF] to-[#2D9C8F] text-white rounded-lg font-['Roboto'] font-semibold hover:from-[#2D9C8F] hover:to-[#3A86FF] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 min-w-[150px]"
                  >
                    {searchLoading ? (
                      <>
                        <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Searching...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                        <span>Search Patient</span>
                      </>
                    )}
                  </button>
                </div>
                
                {patient && (
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={clearPatientData}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg font-['Roboto'] font-medium hover:bg-gray-600 transition-colors"
                    >
                      Clear Results
                    </button>
                  </div>
                )}
              </form>

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 font-['Roboto'] text-center">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Patient Details Section */}
          {patient && (
            <div className="max-w-6xl mx-auto space-y-6">
              
              {/* Patient Basic Info */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#E0E0E0] border-t-4 border-t-[#3A86FF]">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-['Poppins'] font-bold text-[#0D3B66] mb-2">
                      {patient.name}
                    </h3>
                    <div className="flex items-center space-x-6 text-sm font-['Roboto'] text-[#6C757D]">
                      <span><strong>UHID:</strong> {patient.uhid}</span>
                      <span><strong>Age:</strong> {patient.age}</span>
                      <span><strong>Gender:</strong> {patient.gender}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${patient.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {patient.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[#6C757D] font-['Roboto']">Aadhaar Verified</div>
                    <div className={`text-lg font-semibold ${patient.aadhaar_verified ? 'text-green-600' : 'text-red-600'}`}>
                      {patient.aadhaar_verified ? '✓ Verified' : '✗ Not Verified'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-['Montserrat'] font-semibold text-[#0D3B66]">Contact Information</h4>
                    <p className="text-[#6C757D] font-['Roboto']"><strong>Phone:</strong> {patient.phone}</p>
                    <p className="text-[#6C757D] font-['Roboto']"><strong>Email:</strong> {patient.email}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-['Montserrat'] font-semibold text-[#0D3B66]">Location Details</h4>
                    <p className="text-[#6C757D] font-['Roboto']"><strong>Home State:</strong> {patient.home_state}</p>
                    <p className="text-[#6C757D] font-['Roboto']"><strong>Current City:</strong> {patient.destination_city}</p>
                    <p className="text-[#6C757D] font-['Roboto']"><strong>Local Address:</strong> {patient.local_address}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-['Montserrat'] font-semibold text-[#0D3B66]">Employment</h4>
                    <p className="text-[#6C757D] font-['Roboto']"><strong>Industry:</strong> {patient.industry}</p>
                  </div>
                </div>
              </div>

              {/* Baseline Health Tests */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#E0E0E0] border-t-4 border-t-[#2D9C8F]">
                <h3 className="text-xl font-['Poppins'] font-bold text-[#0D3B66] mb-4">Baseline Health Tests</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  <div className="text-center p-3 bg-[#F8F9FA] rounded-lg">
                    <div className="text-sm text-[#6C757D] font-['Roboto']">Height</div>
                    <div className="text-lg font-['Montserrat'] font-semibold text-[#0D3B66]">{patient.baseline_tests.height} cm</div>
                  </div>
                  <div className="text-center p-3 bg-[#F8F9FA] rounded-lg">
                    <div className="text-sm text-[#6C757D] font-['Roboto']">Weight</div>
                    <div className="text-lg font-['Montserrat'] font-semibold text-[#0D3B66]">{patient.baseline_tests.weight} kg</div>
                  </div>
                  <div className="text-center p-3 bg-[#F8F9FA] rounded-lg">
                    <div className="text-sm text-[#6C757D] font-['Roboto']">BMI</div>
                    <div className="text-lg font-['Montserrat'] font-semibold text-[#0D3B66]">{patient.baseline_tests.bmi}</div>
                  </div>
                  <div className="text-center p-3 bg-[#F8F9FA] rounded-lg">
                    <div className="text-sm text-[#6C757D] font-['Roboto']">Blood Sugar</div>
                    <div className="text-lg font-['Montserrat'] font-semibold text-[#0D3B66]">{patient.baseline_tests.blood_sugar}</div>
                  </div>
                  <div className="text-center p-3 bg-[#F8F9FA] rounded-lg">
                    <div className="text-sm text-[#6C757D] font-['Roboto']">Blood Pressure</div>
                    <div className="text-lg font-['Montserrat'] font-semibold text-[#0D3B66]">{patient.baseline_tests.bp}</div>
                  </div>
                  <div className="text-center p-3 bg-[#F8F9FA] rounded-lg">
                    <div className="text-sm text-[#6C757D] font-['Roboto']">Blood Group</div>
                    <div className="text-lg font-['Montserrat'] font-semibold text-[#0D3B66]">{patient.baseline_tests.blood_group}</div>
                  </div>
                  <div className="text-center p-3 bg-[#F8F9FA] rounded-lg">
                    <div className="text-sm text-[#6C757D] font-['Roboto']">Hemoglobin</div>
                    <div className="text-lg font-['Montserrat'] font-semibold text-[#0D3B66]">{patient.baseline_tests.hb}</div>
                  </div>
                </div>
              </div>

              {/* Sensitive Health Flags */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#E0E0E0] border-t-4 border-t-[#FF6B6B]">
                <h3 className="text-xl font-['Poppins'] font-bold text-[#0D3B66] mb-4">Sensitive Health Flags</h3>
                <div className="flex space-x-6">
                  <div className={`px-4 py-2 rounded-lg ${patient.sensitive_flags.hiv ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    <strong>HIV:</strong> {patient.sensitive_flags.hiv ? 'Positive' : 'Negative'}
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${patient.sensitive_flags.tb ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    <strong>TB:</strong> {patient.sensitive_flags.tb ? 'Positive' : 'Negative'}
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${patient.sensitive_flags.dengue ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    <strong>Dengue:</strong> {patient.sensitive_flags.dengue ? 'Positive' : 'Negative'}
                  </div>
                </div>
              </div>

              {/* Medical History & Visits */}
              {patient.visits && patient.visits.length > 0 && (
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#E0E0E0] border-t-4 border-t-[#B388EB]">
                  <h3 className="text-xl font-['Poppins'] font-bold text-[#0D3B66] mb-4">
                    Medical History ({patient.visits.length} visits)
                  </h3>
                  <div className="space-y-4">
                    {patient.visits.map((visit, index) => (
                      <div key={visit.id} className="border border-[#E0E0E0] rounded-lg p-4 hover:bg-[#F8F9FA] transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-['Montserrat'] font-semibold text-[#0D3B66]">{visit.hospital}</h4>
                            <p className="text-[#6C757D] font-['Roboto'] text-sm">Dr. {visit.doctor}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-['Roboto'] font-semibold text-[#3A86FF]">{visit.date}</div>
                          </div>
                        </div>
                        <div className="mb-2">
                          <strong className="text-[#0D3B66] font-['Roboto']">Diagnosis:</strong>
                          <span className="text-[#6C757D] font-['Roboto'] ml-2">{visit.diagnosis}</span>
                        </div>
                        <div className="mb-2">
                          <strong className="text-[#0D3B66] font-['Roboto']">Notes:</strong>
                          <p className="text-[#6C757D] font-['Roboto'] mt-1">{visit.notes}</p>
                        </div>
                        {visit.reports && visit.reports.length > 0 && (
                          <div>
                            <strong className="text-[#0D3B66] font-['Roboto']">Reports:</strong>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {visit.reports.map((report, idx) => (
                                <span key={idx} className="px-2 py-1 bg-[#E3F2FD] text-[#3A86FF] rounded text-xs font-['Roboto']">
                                  {report}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sample UHIDs for Testing */}
          {!patient && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="text-lg font-['Montserrat'] font-semibold text-[#0D3B66] mb-4">
                  Sample UHIDs for Testing
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-['Roboto']">
                  <div className="text-center p-3 bg-white rounded-lg cursor-pointer hover:bg-gray-50" onClick={() => setUhid('867159943420')}>
                    <div className="font-semibold text-[#3A86FF]">867159943420</div>
                    <div className="text-[#6C757D]">Arjun Krishnan</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg cursor-pointer hover:bg-gray-50" onClick={() => setUhid('867159943421')}>
                    <div className="font-semibold text-[#3A86FF]">867159943421</div>
                    <div className="text-[#6C757D]">Priya Devi</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg cursor-pointer hover:bg-gray-50" onClick={() => setUhid('867159943422')}>
                    <div className="font-semibold text-[#3A86FF]">867159943422</div>
                    <div className="text-[#6C757D]">Ravi Kumar</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}