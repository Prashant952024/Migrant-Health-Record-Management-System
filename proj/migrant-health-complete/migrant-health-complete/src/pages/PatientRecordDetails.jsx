import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PatientRecordDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get patient data from navigation state or use mock data
  const patientData = location.state?.patientData || {
    name: 'Arjun Krishnan',
    uhid: 'MH2024-7834',
    age: 32,
    gender: 'Male',
    phone: '+91 9876543210',
    status: 'Active',
    treatmentSummary: 'Currently: 26:31 remaining',
    baselineHealth: {
      weight: 70,
      height: 175,
      bmi: 22.9,
      bloodSugar: 92,
      bp: '120/80',
      bloodGroup: 'O+',
      hemoglobin: 14.2
    },
    lastAccessed: 'Dr. Rajesh Kumar',
    lastAccessDate: '2024-09-20',
    medicalHistory: [
      {
        id: 1,
        type: 'Regular Checkup',
        date: '2024-09-15',
        hospital: 'General Hospital Kochi Medical College',
        diagnosis: 'Hypertension, Mild Anemia',
        notes: 'Patient shows improved BP levels and improved cardiac function medication progress. Recommended follow-up.',
        doctor: 'Dr. Anil Kumar',
        status: 'completed',
        reports: ['BP Report', 'Blood Test Report']
      },
      {
        id: 2,
        type: 'Emergency Visit',
        date: '2024-08-25',
        hospital: 'Emergency Care Center AIMS',
        diagnosis: 'Acute Gastritis, Dehydration',
        notes: 'Patient presented with severe stomach pain and vomiting. Treated with IV fluids and anti-emetics.',
        doctor: 'Dr. Priya Nair',
        status: 'completed',
        reports: ['Emergency Report']
      }
    ],
    emergencyContacts: [
      { type: 'Primary Contact', name: 'Meera Krishnan', phone: '+91 9876543211' },
      { type: 'Secondary Contact', name: 'Ravi Kumar - Chennai', phone: '+91 9876543212' },
      { type: 'Employer Contact', name: 'Site Supervisor', phone: '+91 9876543213' }
    ],
    insurance: {
      provider: 'State Health Insurance',
      policyNumber: 'SHI-2024-789456',
      coverage: 'Full Medical Coverage',
      premium: '₹2,500/year',
      benefits: {
        coverageLimit: '₹5,00,000',
        claimsUsed: '₹45,000',
        remaining: '₹4,55,000'
      }
    },
    medications: [
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', startDate: '2024-08-15', status: 'Active' },
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', startDate: '2024-07-20', status: 'Active' },
      { name: 'Iron Supplement', dosage: '200mg', frequency: 'Once daily', startDate: '2024-09-01', status: 'Active' },
      { name: 'Paracetamol', dosage: '650mg', frequency: 'As needed', startDate: '2024-09-10', status: 'Completed' }
    ],
    upcomingAppointments: [
      { type: 'Cardiology Follow-up', doctor: 'Dr. Anil Kumar', date: '2024-09-28', time: '10:30 AM', status: 'Scheduled' },
      { type: 'Blood Test', facility: 'Lab Diagnostic', date: '2024-09-25', time: '9:00 AM', status: 'Confirmed' },
      { type: 'General Checkup', doctor: 'Dr. Priya Nair', date: '2024-10-15', time: '2:00 PM', status: 'Pending' }
    ],
    healthAlerts: [
      { type: 'Critical Alert', message: 'Blood pressure health parameter abnormal consultation report required', severity: 'high' },
      { type: 'Medication Reminder', message: 'Iron supplement due in 30 minutes. Take with meals.', severity: 'medium' },
      { type: 'Health Tip', message: 'Regular exercise can help manage hypertension. Consider 30 minutes of walking daily.', severity: 'low' }
    ]
  };

  const [activeTab, setActiveTab] = useState('overview');

  const handleAddVisit = () => {
    // Implementation for adding a new visit
    console.log('Adding new visit...');
  };

  const handleUploadReports = () => {
    // Implementation for uploading reports
    console.log('Uploading reports...');
  };

  const handleNewTreatment = () => {
    // Implementation for new treatment
    console.log('Starting new treatment...');
  };

  const handleScheduleAppointment = () => {
    // Implementation for scheduling appointment
    console.log('Scheduling appointment...');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
      <div className="pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Patient Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center space-x-3">
                    <h1 className="text-2xl font-['Poppins'] font-bold text-gray-900">{patientData.name}</h1>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-['Roboto'] font-medium">{patientData.uhid}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 font-['Roboto']">
                    <span>Age: {patientData.age}</span>
                    <span>•</span>
                    <span>Gender: {patientData.gender}</span>
                    <span>•</span>
                    <span>Phone: {patientData.phone}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 font-['Roboto']">Treatment: {patientData.treatmentSummary}</div>
                <div className="text-sm text-green-600 font-['Roboto'] font-medium mt-1">Status: {patientData.status}</div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Baseline Health Metrics */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-['Poppins'] font-semibold text-gray-900 mb-4">📊 Baseline Health Metrics</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-['Poppins'] font-bold text-blue-600">{patientData.baselineHealth?.weight || 'N/A'}</div>
                    <div className="text-sm text-gray-600 font-['Roboto']">Weight (kg)</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-['Poppins'] font-bold text-green-600">{patientData.baselineHealth?.height || 'N/A'}</div>
                    <div className="text-sm text-gray-600 font-['Roboto']">Height (cm)</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-['Poppins'] font-bold text-purple-600">{patientData.baselineHealth?.bmi || 'N/A'}</div>
                    <div className="text-sm text-gray-600 font-['Roboto']">BMI</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-['Poppins'] font-bold text-orange-600">{patientData.baselineHealth?.bloodSugar || 'N/A'}</div>
                    <div className="text-sm text-gray-600 font-['Roboto']">Blood Sugar</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-['Poppins'] font-bold text-red-600">{patientData.baselineHealth?.bp || 'N/A'}</div>
                    <div className="text-sm text-gray-600 font-['Roboto']">BP</div>
                  </div>
                  <div className="text-center p-3 bg-indigo-50 rounded-lg">
                    <div className="text-2xl font-['Poppins'] font-bold text-indigo-600">{patientData.baselineHealth?.bloodGroup || 'N/A'}</div>
                    <div className="text-sm text-gray-600 font-['Roboto']">Blood Group</div>
                  </div>
                  <div className="text-center p-3 bg-pink-50 rounded-lg">
                    <div className="text-2xl font-['Poppins'] font-bold text-pink-600">{patientData.baselineHealth?.hemoglobin || 'N/A'}</div>
                    <div className="text-sm text-gray-600 font-['Roboto']">Hemoglobin</div>
                  </div>
                </div>
              </div>

              {/* Medical History Timeline */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-['Poppins'] font-semibold text-gray-900 mb-4">🏥 Medical History Timeline</h2>
                <div className="space-y-4">
                  {(patientData.medicalHistory || []).map((visit, index) => (
                    <div key={visit.id} className="border-l-4 border-blue-200 pl-4 pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-['Roboto'] font-medium ${
                              visit.type === 'Regular Checkup' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {visit.type}
                            </span>
                            <span className="text-sm text-gray-500 font-['Roboto']">{visit.date}</span>
                          </div>
                          <h3 className="font-['Poppins'] font-semibold text-gray-900 mb-1">{visit.hospital}</h3>
                          <p className="text-sm text-orange-600 font-['Roboto'] font-medium mb-2">Diagnosis: {visit.diagnosis}</p>
                          <p className="text-sm text-gray-600 font-['Roboto'] mb-3">Notes: {visit.notes}</p>
                          <div className="flex items-center space-x-4 text-xs">
                            <span className="text-blue-600 font-['Roboto']">Doctor: {visit.doctor}</span>
                            <div className="flex space-x-2">
                              {(visit.reports || []).map((report, idx) => (
                                <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-['Roboto']">
                                  📄 {report}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-['Poppins'] font-semibold text-gray-900 mb-4">📞 Emergency Contacts</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {(patientData.emergencyContacts || []).map((contact, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-['Roboto'] font-semibold text-gray-900 mb-1">{contact.type}</h3>
                      <p className="text-sm text-gray-700 font-['Roboto'] mb-1">{contact.name}</p>
                      <p className="text-sm text-blue-600 font-['Roboto']">{contact.phone}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insurance & Benefits */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-['Poppins'] font-semibold text-gray-900 mb-4">🛡️ Insurance & Benefits</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-['Roboto'] font-semibold text-gray-700 mb-3">Health Insurance</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-['Roboto']">Provider:</span>
                        <span className="font-['Roboto'] font-medium">{patientData.insurance.provider}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-['Roboto']">Policy Number:</span>
                        <span className="font-['Roboto'] font-medium">{patientData.insurance.policyNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-['Roboto']">Coverage:</span>
                        <span className="font-['Roboto'] font-medium">{patientData.insurance.coverage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-['Roboto']">Premium:</span>
                        <span className="font-['Roboto'] font-medium">{patientData.insurance.premium}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-['Roboto'] font-semibold text-gray-700 mb-3">Coverage Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-['Roboto']">Coverage Limit:</span>
                        <span className="font-['Roboto'] font-medium text-green-600">{patientData.insurance.benefits.coverageLimit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-['Roboto']">Claims Used:</span>
                        <span className="font-['Roboto'] font-medium text-orange-600">{patientData.insurance.benefits.claimsUsed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-['Roboto']">Remaining:</span>
                        <span className="font-['Roboto'] font-medium text-blue-600">{patientData.insurance.benefits.remaining}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Medications */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-['Poppins'] font-semibold text-gray-900 mb-4">💊 Current Medications</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 font-['Roboto'] font-semibold text-gray-700">Medication</th>
                        <th className="text-left py-3 px-2 font-['Roboto'] font-semibold text-gray-700">Dosage</th>
                        <th className="text-left py-3 px-2 font-['Roboto'] font-semibold text-gray-700">Frequency</th>
                        <th className="text-left py-3 px-2 font-['Roboto'] font-semibold text-gray-700">Started</th>
                        <th className="text-left py-3 px-2 font-['Roboto'] font-semibold text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(patientData.medications || []).map((med, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-3 px-2 font-['Roboto']">{med.name}</td>
                          <td className="py-3 px-2 font-['Roboto']">{med.dosage}</td>
                          <td className="py-3 px-2 font-['Roboto']">{med.frequency}</td>
                          <td className="py-3 px-2 font-['Roboto']">{med.startDate}</td>
                          <td className="py-3 px-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-['Roboto'] font-medium ${
                              med.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {med.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Upcoming Appointments & Follow-ups */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-['Poppins'] font-semibold text-gray-900 mb-4">📅 Upcoming Appointments & Follow-ups</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {(patientData.upcomingAppointments || []).map((appointment, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${
                      appointment.status === 'Scheduled' ? 'border-blue-400 bg-blue-50' :
                      appointment.status === 'Confirmed' ? 'border-green-400 bg-green-50' : 'border-yellow-400 bg-yellow-50'
                    }`}>
                      <h3 className="font-['Roboto'] font-semibold text-gray-900 mb-2">{appointment.type}</h3>
                      <p className="text-sm text-gray-700 font-['Roboto'] mb-1">
                        {appointment.doctor || appointment.facility}
                      </p>
                      <p className="text-sm text-gray-600 font-['Roboto'] mb-2">
                        📅 {appointment.date} at {appointment.time}
                      </p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-['Roboto'] font-medium ${
                        appointment.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                        appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Health Alerts & Notifications */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-['Poppins'] font-semibold text-gray-900 mb-4">🚨 Health Alerts & Notifications</h2>
                <div className="space-y-3">
                  {(patientData.healthAlerts || []).map((alert, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${
                      alert.severity === 'high' ? 'border-red-400 bg-red-50' :
                      alert.severity === 'medium' ? 'border-yellow-400 bg-yellow-50' : 'border-blue-400 bg-blue-50'
                    }`}>
                      <div className="flex items-start">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                          alert.severity === 'high' ? 'bg-red-100' :
                          alert.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                        }`}>
                          {alert.severity === 'high' ? '🚨' : alert.severity === 'medium' ? '⚠️' : '💡'}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-['Roboto'] font-semibold mb-1 ${
                            alert.severity === 'high' ? 'text-red-800' :
                            alert.severity === 'medium' ? 'text-yellow-800' : 'text-blue-800'
                          }`}>
                            {alert.type}
                          </h3>
                          <p className="text-sm text-gray-700 font-['Roboto']">{alert.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Quick Actions & Summary */}
            <div className="space-y-6">
              
              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-['Poppins'] font-semibold text-gray-900 mb-4">⚡ Quick Actions</h2>
                <div className="space-y-3">
                  <button
                    onClick={handleAddVisit}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-['Roboto'] font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Visit
                  </button>
                  
                  <button
                    onClick={handleUploadReports}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-['Roboto'] font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Upload Reports
                  </button>
                  
                  <button
                    onClick={handleNewTreatment}
                    className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-['Roboto'] font-medium hover:bg-orange-700 transition-colors flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    New Treatment
                  </button>
                  
                  <button
                    onClick={handleScheduleAppointment}
                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-['Roboto'] font-medium hover:bg-purple-700 transition-colors flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4M8 7H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2M8 7V5h8v2" />
                    </svg>
                    Schedule Appointment
                  </button>
                  
                  <button className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg font-['Roboto'] font-medium hover:bg-gray-700 transition-colors flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Generate Reports
                  </button>
                </div>
              </div>

              {/* Audit Trail */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-['Poppins'] font-semibold text-gray-900 mb-4">🔍 Audit Trail</h2>
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="text-gray-600 font-['Roboto']">Last accessed by:</p>
                    <p className="font-['Roboto'] font-semibold text-gray-900">{patientData.lastAccessed}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-600 font-['Roboto']">Previous access:</p>
                    <p className="font-['Roboto'] font-medium text-blue-600">{patientData.lastAccessDate}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-600 font-['Roboto']">Record created by:</p>
                    <p className="font-['Roboto'] font-medium text-gray-900">Nurse Lakshmi</p>
                    <p className="text-xs text-gray-500 font-['Roboto']">Date: 2024-01-15 at 2:30 PM</p>
                  </div>
                </div>
              </div>

              {/* Health Summary */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-['Poppins'] font-semibold text-gray-900 mb-4">📈 Health Summary</h2>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-['Poppins'] font-bold text-green-600">3</div>
                    <div className="text-sm text-gray-600 font-['Roboto']">Active Treatments</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-['Poppins'] font-bold text-blue-600">5</div>
                    <div className="text-sm text-gray-600 font-['Roboto']">Total Visits</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-['Poppins'] font-bold text-purple-600">2</div>
                    <div className="text-sm text-gray-600 font-['Roboto']">Ongoing Medications</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-3xl font-['Poppins'] font-bold text-orange-600">98%</div>
                    <div className="text-sm text-gray-600 font-['Roboto']">Health Score</div>
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
};

export default PatientRecordDetails;