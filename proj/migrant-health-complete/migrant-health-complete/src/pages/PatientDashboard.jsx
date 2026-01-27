import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PatientDashboard(){
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Check if patient is authenticated
    const patientInfo = localStorage.getItem('patientInfo');
    if (!patientInfo) {
      navigate('/patient/login');
      return;
    }
    
    try {
      const parsedPatient = JSON.parse(patientInfo);
      setPatient(parsedPatient);
    } catch (error) {
      console.error('Error parsing patient info:', error);
      navigate('/patient/login');
    }
  }, [navigate]);

  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-['Roboto']">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 font-['Poppins']">Patient Dashboard</h1>
                <p className="text-gray-600 font-['Roboto']">Hello, {patient.name} - {new Date().toLocaleDateString()}</p>
              </div>
              <div className="flex gap-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-['Roboto'] hover:bg-blue-700">
                  My Profile
                </button>
                <button 
                  onClick={() => {
                    localStorage.removeItem('patientInfo');
                    navigate('/patient/login');
                  }}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg font-['Roboto'] hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Patient Info Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-bold text-gray-900 font-['Poppins']">KER-2024-789012</h2>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    Active Patient
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-3 font-['Poppins']">{patient.name}</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-['Roboto']">
                  <div>
                    <span className="text-gray-500">Date of Birth:</span>
                    <div className="font-medium text-gray-900">March 15, 1992</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Age:</span>
                    <div className="font-medium text-gray-900">{patient.age} Years</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Gender:</span>
                    <div className="font-medium text-gray-900">{patient.gender}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Mobile Number:</span>
                    <div className="font-medium text-gray-900">{patient.phone}</div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center text-blue-700 text-sm font-['Roboto']">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    From Kerala - QR of Registration
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Baseline Health Metrics */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 font-['Poppins']">Baseline Health Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600 font-['Poppins']">{patient.baseline_tests?.height || 175}</div>
                    <div className="text-sm text-gray-600 font-['Roboto']">Height</div>
                    <div className="text-xs text-gray-500 font-['Roboto']">cm</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 font-['Poppins']">{patient.baseline_tests?.weight || 70}</div>
                    <div className="text-sm text-gray-600 font-['Roboto']">Weight</div>
                    <div className="text-xs text-gray-500 font-['Roboto']">kg</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 font-['Poppins']">{patient.baseline_tests?.bmi || 22.9}</div>
                    <div className="text-sm text-gray-600 font-['Roboto']">BMI</div>
                    <div className="text-xs text-gray-500 font-['Roboto']">Normal</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 font-['Poppins']">{patient.baseline_tests?.bp || '120/80'}</div>
                    <div className="text-sm text-gray-600 font-['Roboto']">Blood Pressure</div>
                    <div className="text-xs text-gray-500 font-['Roboto']">mmHg</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 font-['Poppins']">{patient.baseline_tests?.blood_sugar || 92}</div>
                    <div className="text-sm text-gray-600 font-['Roboto']">Blood Sugar</div>
                    <div className="text-xs text-gray-500 font-['Roboto']">mg/dL</div>
                  </div>
                  <div className="text-center p-3 bg-indigo-50 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600 font-['Poppins']">{patient.baseline_tests?.blood_group || 'O+'}</div>
                    <div className="text-sm text-gray-600 font-['Roboto']">Blood Group</div>
                    <div className="text-xs text-gray-500 font-['Roboto']">Type</div>
                  </div>
                  <div className="text-center p-3 bg-pink-50 rounded-lg">
                    <div className="text-2xl font-bold text-pink-600 font-['Poppins']">{patient.baseline_tests?.hb || 14.2}</div>
                    <div className="text-sm text-gray-600 font-['Roboto']">Hemoglobin</div>
                    <div className="text-xs text-gray-500 font-['Roboto']">g/dL</div>
                  </div>
                  <div className="text-center p-3 bg-teal-50 rounded-lg">
                    <div className="text-2xl font-bold text-teal-600 font-['Poppins']">37.2</div>
                    <div className="text-sm text-gray-600 font-['Roboto']">Temperature</div>
                    <div className="text-xs text-gray-500 font-['Roboto']">°C</div>
                  </div>
                </div>
              </div>

              {/* Vaccination Status */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 font-['Poppins']">Vaccination Status</h3>
                  <button className="text-blue-600 text-sm font-['Roboto'] hover:underline">Add Vaccination Record</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-green-800 font-['Poppins']">COVID-19</h4>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Complete</span>
                    </div>
                    <p className="text-sm text-green-700 font-['Roboto']">Booster completed</p>
                    <p className="text-xs text-green-600 font-['Roboto']">Last dose: Jan 15, 2024</p>
                  </div>
                  <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-green-800 font-['Poppins']">Hepatitis B</h4>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Complete</span>
                    </div>
                    <p className="text-sm text-green-700 font-['Roboto']">3 doses completed</p>
                    <p className="text-xs text-green-600 font-['Roboto']">Last dose: Mar 10, 2023</p>
                  </div>
                  <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-yellow-800 font-['Poppins']">Influenza</h4>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Pending</span>
                    </div>
                    <p className="text-sm text-yellow-700 font-['Roboto']">Annual dose pending</p>
                    <p className="text-xs text-yellow-600 font-['Roboto']">Due: Oct 15, 2024</p>
                  </div>
                </div>
              </div>

              {/* Visit History */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 font-['Poppins']">Visit History</h3>
                  <div className="flex gap-2">
                    <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm font-['Roboto']">
                      <option>All Facilities</option>
                      <option>Government Hospital</option>
                      <option>Private Clinic</option>
                    </select>
                    <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm font-['Roboto']">
                      <option>Last 1 Month</option>
                      <option>Last 3 Months</option>
                      <option>Last 6 Months</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {patient.visits && patient.visits.slice(0, 4).map((visit, index) => (
                    <div key={visit.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900 font-['Poppins']">{visit.date} - {visit.diagnosis}</h4>
                          <p className="text-sm text-gray-600 font-['Roboto']">{visit.hospital}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-blue-600 text-sm font-['Roboto'] hover:underline">View Report</button>
                          <span className="text-blue-600">📄</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 font-['Roboto']">{visit.notes}</p>
                      <div className="mt-2 text-xs text-gray-500 font-['Roboto']">
                        Doctor: {visit.doctor}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medical Reports */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 font-['Poppins']">Medical Reports</h3>
                  <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm font-['Roboto']">
                    <option>All Reports</option>
                    <option>Lab Reports</option>
                    <option>Imaging</option>
                    <option>Prescriptions</option>
                  </select>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 font-semibold text-gray-900 font-['Poppins']">Report Name</th>
                        <th className="text-left py-3 font-semibold text-gray-900 font-['Poppins']">Type</th>
                        <th className="text-left py-3 font-semibold text-gray-900 font-['Poppins']">Date</th>
                        <th className="text-left py-3 font-semibold text-gray-900 font-['Poppins']">Hospital</th>
                        <th className="text-left py-3 font-semibold text-gray-900 font-['Poppins']">Status</th>
                        <th className="text-left py-3 font-semibold text-gray-900 font-['Poppins']">Action</th>
                      </tr>
                    </thead>
                    <tbody className="font-['Roboto']">
                      <tr className="border-b border-gray-100">
                        <td className="py-3">
                          <div className="flex items-center">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            Complete Blood Count.pdf
                          </div>
                        </td>
                        <td className="py-3">Lab Report</td>
                        <td className="py-3">Dec 15, 2024</td>
                        <td className="py-3">KIMS Hospital</td>
                        <td className="py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span></td>
                        <td className="py-3">
                          <button className="text-blue-600 hover:underline">📄</button>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3">
                          <div className="flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            Chest X-Ray Report.pdf
                          </div>
                        </td>
                        <td className="py-3">Imaging</td>
                        <td className="py-3">Dec 10, 2024</td>
                        <td className="py-3">General Hospital</td>
                        <td className="py-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">In Review</span></td>
                        <td className="py-3">
                          <button className="text-blue-600 hover:underline">📄</button>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3">
                          <div className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            Prescription-Dec2024.pdf
                          </div>
                        </td>
                        <td className="py-3">Prescription</td>
                        <td className="py-3">Dec 08, 2024</td>
                        <td className="py-3">Family Clinic</td>
                        <td className="py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span></td>
                        <td className="py-3">
                          <button className="text-blue-600 hover:underline">📄</button>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3">
                          <div className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            Allergy Test Results.pdf
                          </div>
                        </td>
                        <td className="py-3">Lab Report</td>
                        <td className="py-3">Nov 28, 2024</td>
                        <td className="py-3">AIIMS Kerala</td>
                        <td className="py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span></td>
                        <td className="py-3">
                          <button className="text-blue-600 hover:underline">📄</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Health Insights & Trends */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 font-['Poppins']">Health Insights & Trends</h3>
                  <select className="text-sm border border-gray-300 rounded-lg px-2 py-1 font-['Roboto']">
                    <option>Last 6 Months</option>
                    <option>Last Year</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2 font-['Poppins']">Health Score Trend</h4>
                  <div className="flex items-center mb-2">
                    <div className="text-3xl font-bold text-green-600 font-['Poppins']">87</div>
                    <div className="ml-2 text-sm text-gray-600 font-['Roboto']">/100</div>
                  </div>
                  <p className="text-sm text-gray-600 font-['Roboto']">
                    Health score increased 5pts this 
                    based on stable vitals and adherence
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3 font-['Poppins']">Overall Health Score</h4>
                  <div className="text-right text-3xl font-bold text-green-600 mb-2 font-['Poppins']">87/100</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-['Roboto']">
                      <span>Excellent Health</span>
                      <span className="text-green-600">87</span>
                    </div>
                    <div className="flex justify-between text-sm font-['Roboto']">
                      <span>Vaccination Status</span>
                      <span className="text-green-600">95</span>
                    </div>
                    <div className="flex justify-between text-sm font-['Roboto']">
                      <span>BMI Maintenance</span>
                      <span className="text-green-600">80</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2 font-['Poppins']">Health Goals</h4>
                  <ul className="space-y-1 text-sm text-green-700 font-['Roboto']">
                    <li>• Annual Check-up</li>
                    <li>• Vaccination Updates</li>
                    <li>• BMI Maintenance</li>
                  </ul>
                </div>
              </div>

              {/* Upcoming Appointments */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 font-['Poppins']">Upcoming Appointments</h3>
                  <button className="text-blue-600 text-sm font-['Roboto'] hover:underline">Book Appointment</button>
                </div>

                <div className="space-y-3">
                  <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-blue-900 font-['Poppins']">Jan 25, 2025 - 4:30 AM</div>
                      <span className="text-blue-600">📅</span>
                    </div>
                    <div className="text-sm text-blue-800 font-['Roboto']">Cardiology Follow-up</div>
                    <div className="text-xs text-blue-600 font-['Roboto']">at Priya Medica - AIIMS Kochi Ernakulam</div>
                    <div className="text-xs text-blue-500 font-['Roboto']">Dr. Smith, Cardiologist</div>
                  </div>

                  <div className="p-3 border border-green-200 rounded-lg bg-green-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-green-900 font-['Poppins']">Jan 30, 2025 - 2:15 PM</div>
                      <span className="text-green-600">📅</span>
                    </div>
                    <div className="text-sm text-green-800 font-['Roboto']">Annual Health Check-up</div>
                    <div className="text-xs text-green-600 font-['Roboto']">at General Health Clinic</div>
                    <div className="text-xs text-green-500 font-['Roboto']">Dr. Ramesh, Family Medicine</div>
                  </div>
                </div>
              </div>

              {/* Health Reminders */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 font-['Poppins']">Health Reminders</h3>
                  <button className="text-blue-600 text-sm font-['Roboto'] hover:underline">Add Reminder</button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-yellow-600">💊</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-yellow-900 font-['Poppins']">Medication Reminder</div>
                      <div className="text-sm text-yellow-700 font-['Roboto']">Take BP medication morning</div>
                      <div className="text-xs text-yellow-600 font-['Roboto']">Due at 7:00 AM</div>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600">💉</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-blue-900 font-['Poppins']">Vaccination Due</div>
                      <div className="text-sm text-blue-700 font-['Roboto']">Annual influenza vaccination</div>
                      <div className="text-xs text-blue-600 font-['Roboto']">Due by Dec 31</div>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600">💚</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-green-900 font-['Poppins']">Health Check Reminder</div>
                      <div className="text-sm text-green-700 font-['Roboto']">Monthly blood pressure monitoring</div>
                      <div className="text-xs text-green-600 font-['Roboto']">Due in 3 days</div>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-orange-600">⚕️</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-orange-900 font-['Poppins']">Exercise Reminder</div>
                      <div className="text-sm text-orange-700 font-['Roboto']">30 minutes daily walk recommended</div>
                      <div className="text-xs text-orange-600 font-['Roboto']">Start today</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 font-['Poppins']">Emergency Contacts</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-red-600">🚨</span>
                      </div>
                      <div>
                        <div className="font-medium text-red-900 font-['Poppins']">Emergency Helpline</div>
                        <div className="text-sm text-red-700 font-['Roboto']">108</div>
                      </div>
                    </div>
                    <button className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-['Roboto']">
                      Call Now
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600">👨‍⚕️</span>
                      </div>
                      <div>
                        <div className="font-medium text-blue-900 font-['Poppins']">Primary Doctor</div>
                        <div className="text-sm text-blue-700 font-['Roboto']">Dr. Sarah Johnson</div>
                      </div>
                    </div>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-['Roboto']">
                      Call
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-600">🏥</span>
                      </div>
                      <div>
                        <div className="font-medium text-green-900 font-['Poppins']">Nearest Hospital</div>
                        <div className="text-sm text-green-700 font-['Roboto']">KIMS Kochi - 2.3 km away</div>
                      </div>
                    </div>
                    <button className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-['Roboto']">
                      Call
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 font-['Poppins']">Quick Actions</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <span className="text-blue-600">📅</span>
                    </div>
                    <div className="text-sm font-medium text-blue-900 font-['Roboto']">Book Appointment</div>
                    <div className="text-xs text-blue-600 font-['Roboto']">Schedule a new appointment</div>
                  </button>

                  <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-2">
                      <span className="text-green-600">📄</span>
                    </div>
                    <div className="text-sm font-medium text-green-900 font-['Roboto']">Request Report</div>
                    <div className="text-xs text-green-600 font-['Roboto']">Add new medical report</div>
                  </button>

                  <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                      <span className="text-purple-600">💉</span>
                    </div>
                    <div className="text-sm font-medium text-purple-900 font-['Roboto']">Medication Tracker</div>
                    <div className="text-xs text-purple-600 font-['Roboto']">Manage prescriptions</div>
                  </button>

                  <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                      <span className="text-orange-600">💚</span>
                    </div>
                    <div className="text-sm font-medium text-orange-900 font-['Roboto']">Health Planner</div>
                    <div className="text-xs text-orange-600 font-['Roboto']">Create wellness plans</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}