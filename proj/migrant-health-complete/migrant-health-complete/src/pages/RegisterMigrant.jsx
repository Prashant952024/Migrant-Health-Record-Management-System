import React, { useState } from 'react';
import mockApi from '../services/mockApi';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RegisterMigrant(){
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: '', age: '', gender: 'Male', home_state: '', destination_city: '', industry: '', 
    aadhaar_verified: false, local_address: '', phone: '', emergency_contact: '', 
    emergency_contact_phone: '', baseline_tests: {}, upload_photo: null, languages: [],
    insurance_number: '', insurance_provider: '', medical_history: '', allergies: ''
  });
  const [result, setResult] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const registrationProgress = [
    { step: 1, title: "Registration Progress", completed: true },
    { step: 2, title: "Personal Info", completed: currentStep > 2 },
    { step: 3, title: "Verification", completed: currentStep > 3 },
    { step: 4, title: "Complete", completed: currentStep > 4 }
  ];

  function onChange(e){ 
    const {name, value, type, checked} = e.target;
    if(name.startsWith('baseline_')) {
      const key = name.replace('baseline_','');
      setForm(f=>({...f, baseline_tests:{...f.baseline_tests, [key]: value}}));
    } else if(name === 'aadhaar_verified'){
      setForm(f=>({...f, aadhaar_verified: checked}));
    } else {
      setForm(f=>({...f, [name]: value}));
    }
  }

  function handleFileUpload(e) {
    const files = Array.from(e.target.files);
    setUploadedFiles(prev => [...prev, ...files]);
  }

  async function submit(e){
    e.preventDefault();
    const payload = {...form};
    const res = await mockApi.registerPatient(payload);
    
    if (res.success) {
      // Navigate to success page with registration data
      nav('/registration-success', {
        state: {
          registrationData: {
            fullName: form.name,
            phone: form.phone,
            email: form.email || 'N/A',
            gender: form.gender,
            emergencyContact: form.emergency_contact_phone,
            bloodGroup: form.blood_group || 'N/A',
            language: form.languages?.[0] || 'English',
            state: form.home_state,
            uhid: res.uhid,
            temporaryPassword: res.temporaryPassword || 'Temp@123456'
          }
        }
      });
    } else {
      setResult(res);
    }
  }

  const statsData = [
    { value: "45,672", label: "Total Registered", icon: "👥" },
    { value: "234", label: "Active Centers", icon: "🏥" },
    { value: "98.5%", label: "Success Rate", icon: "✅" },
    { value: "100%", label: "Data Security", icon: "🔒" }
  ];

  return (
    <>
      <Navbar />
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#8B5CF6] via-[#EC4899] to-[#F59E0B] py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-['Poppins'] font-bold text-white mb-4">Register a Migrant Worker</h1>
          <p className="text-xl text-white/90 font-['Roboto'] max-w-3xl mx-auto leading-relaxed">
            Complete registration to receive your Unique Health ID (UHID) and access comprehensive healthcare services across Kerala
          </p>
          
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
            {statsData.map((stat, index) => (
              <div key={index} className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/30 hover:bg-white/20 transition-all duration-300">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-['Poppins'] font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/80 font-['Roboto']">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="bg-gradient-to-r from-[#10B981] to-[#059669] rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-[#10B981]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-['Montserrat'] font-semibold text-lg">Registration Progress</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-sm font-['Roboto']">Personal Info</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-white/50 rounded-full"></div>
                <span className="text-sm font-['Roboto']">Verification</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                <span className="text-sm font-['Roboto']">Complete</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-8">
          {/* Personal Information Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-[#E0E0E0] overflow-hidden">
            <div className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#6366F1] font-bold">1</span>
                </div>
                <h3 className="text-xl font-['Montserrat'] font-bold text-white">Personal Information</h3>
                <span className="text-sm text-white/80 font-['Roboto']">Basic details about the migrant worker</span>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-['Roboto'] font-semibold text-[#2E2E2E]">Full Name *</label>
                  <input 
                    name="name" 
                    value={form.name} 
                    onChange={onChange} 
                    placeholder="Enter full name as per Aadhaar" 
                    className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] font-['Roboto']" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-['Roboto'] font-semibold text-[#2E2E2E]">Age *</label>
                  <input 
                    name="age" 
                    value={form.age} 
                    onChange={onChange} 
                    placeholder="Age in years" 
                    className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A86FF] font-['Roboto']" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-['Roboto'] font-semibold text-[#2E2E2E]">Gender *</label>
                  <select 
                    name="gender" 
                    value={form.gender} 
                    onChange={onChange} 
                    className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A86FF] font-['Roboto']"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-['Roboto'] font-semibold text-[#2E2E2E]">Source State</label>
                  <input 
                    name="home_state" 
                    value={form.home_state} 
                    onChange={onChange} 
                    placeholder="State of origin" 
                    className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A86FF] font-['Roboto']"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-['Roboto'] font-semibold text-[#2E2E2E]">Destination City</label>
                  <input 
                    name="destination_city" 
                    value={form.destination_city} 
                    onChange={onChange} 
                    placeholder="Current working city" 
                    className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A86FF] font-['Roboto']"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-['Roboto'] font-semibold text-[#2E2E2E]">Industry</label>
                  <input 
                    name="industry" 
                    value={form.industry} 
                    onChange={onChange} 
                    placeholder="Construction, Manufacturing, etc." 
                    className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A86FF] font-['Roboto']"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Aadhaar Information Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-[#E0E0E0] overflow-hidden">
            <div className="bg-gradient-to-r from-[#FF6B6B] to-[#FFB347] p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#FF6B6B] font-bold">2</span>
                </div>
                <h3 className="text-xl font-['Montserrat'] font-bold text-white">Aadhaar Information</h3>
                <span className="text-sm text-white/80 font-['Roboto']">Identity verification details</span>
              </div>
            </div>
            <div className="p-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-['Roboto'] font-semibold text-[#2E2E2E]">Aadhaar Number</label>
                  <input 
                    name="aadhaar_number" 
                    value={form.aadhaar_number || ''} 
                    onChange={onChange} 
                    placeholder="12-digit Aadhaar number" 
                    className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] font-['Roboto']"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <input 
                    type="checkbox" 
                    name="aadhaar_verified" 
                    checked={form.aadhaar_verified} 
                    onChange={onChange}
                    className="w-5 h-5 text-[#2D9C8F] bg-gray-100 border-gray-300 rounded focus:ring-[#2D9C8F] focus:ring-2"
                  />
                  <label className="text-sm font-['Roboto'] font-medium text-[#2E2E2E]">Aadhaar Verified</label>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Address Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-[#E0E0E0] overflow-hidden">
            <div className="bg-gradient-to-r from-[#B388EB] to-[#D7E9F7] p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#B388EB] font-bold">3</span>
                </div>
                <h3 className="text-xl font-['Montserrat'] font-bold text-white">Contact & Address</h3>
                <span className="text-sm text-white/80 font-['Roboto']">Communication and location information</span>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-['Roboto'] font-semibold text-[#2E2E2E]">Contact Phone *</label>
                  <input 
                    name="phone" 
                    value={form.phone} 
                    onChange={onChange} 
                    placeholder="10-digit mobile number" 
                    className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B388EB] font-['Roboto']"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-['Roboto'] font-semibold text-[#2E2E2E]">Emergency Contact Phone</label>
                  <input 
                    name="emergency_contact_phone" 
                    value={form.emergency_contact_phone} 
                    onChange={onChange} 
                    placeholder="Emergency contact number" 
                    className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B388EB] font-['Roboto']"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-['Roboto'] font-semibold text-[#2E2E2E]">Local Address in Kerala</label>
                  <textarea 
                    name="local_address" 
                    value={form.local_address} 
                    onChange={onChange} 
                    placeholder="Complete address including pin code" 
                    rows="3"
                    className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B388EB] font-['Roboto']"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Baseline Health Tests Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-[#E0E0E0] overflow-hidden">
            <div className="bg-gradient-to-r from-[#06B6D4] to-[#0891B2] p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#06B6D4] font-bold">🩺</span>
                </div>
                <h3 className="text-xl font-['Montserrat'] font-bold text-white">Baseline Health Tests</h3>
                <span className="text-sm text-white/80 font-['Roboto']">Initial health assessment parameters</span>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-['Roboto'] font-semibold text-[#2E2E2E]">Height (cm)</label>
                  <input 
                    name="baseline_height" 
                    value={form.baseline_tests.height || ''} 
                    onChange={onChange} 
                    placeholder="Height in centimeters" 
                    className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D9C8F] font-['Roboto']"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-['Roboto'] font-semibold text-[#2E2E2E]">Weight (kg)</label>
                  <input 
                    name="baseline_weight" 
                    value={form.baseline_tests.weight || ''} 
                    onChange={onChange} 
                    placeholder="Weight in kilograms" 
                    className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D9C8F] font-['Roboto']"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-['Roboto'] font-semibold text-[#2E2E2E]">Blood Sugar</label>
                  <input 
                    name="baseline_blood_sugar" 
                    value={form.baseline_tests.blood_sugar || ''} 
                    onChange={onChange} 
                    placeholder="Blood sugar level" 
                    className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D9C8F] font-['Roboto']"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-['Roboto'] font-semibold text-[#2E2E2E]">Blood Pressure</label>
                  <input 
                    name="baseline_bp" 
                    value={form.baseline_tests.bp || ''} 
                    onChange={onChange} 
                    placeholder="Blood pressure reading" 
                    className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D9C8F] font-['Roboto']"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-['Roboto'] font-semibold text-[#2E2E2E]">Blood Group</label>
                  <select 
                    name="baseline_blood_group" 
                    value={form.baseline_tests.blood_group || ''} 
                    onChange={onChange} 
                    className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D9C8F] font-['Roboto']"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-['Roboto'] font-semibold text-[#2E2E2E]">Hemoglobin</label>
                  <input 
                    name="baseline_hb" 
                    value={form.baseline_tests.hb || ''} 
                    onChange={onChange} 
                    placeholder="Hemoglobin level" 
                    className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D9C8F] font-['Roboto']"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contagious Diseases Screening */}
          <div className="bg-white rounded-2xl shadow-xl border border-[#E0E0E0] overflow-hidden">
            <div className="bg-gradient-to-r from-[#EF4444] to-[#DC2626] p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#EF4444] font-bold">🦠</span>
                </div>
                <h3 className="text-xl font-['Montserrat'] font-bold text-white">Contagious Diseases Screening</h3>
                <span className="text-sm text-white/80 font-['Roboto']">Check diseases that could spread to others</span>
              </div>
            </div>
            <div className="p-8">
              <div className="bg-gradient-to-r from-[#FFB347]/10 to-[#FF6B6B]/10 rounded-xl p-6 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#FFB347] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-['Roboto'] font-semibold text-[#2E2E2E] mb-2">Essential for low-confidence migration users disconnected</p>
                    <p className="font-['Roboto'] text-[#6C757D] text-sm">Complete screening helps prevent community spread and ensures workplace safety.</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['AIDS', 'HIV', 'STD', 'COVID', 'Hepatitis'].map((disease) => (
                  <label key={disease} className="flex items-center space-x-3 p-3 border border-[#E0E0E0] rounded-lg hover:bg-[#F5F7FA] transition-colors">
                    <input 
                      type="checkbox" 
                      name={`disease_${disease.toLowerCase()}`}
                      className="w-5 h-5 text-[#FF6B6B] bg-gray-100 border-gray-300 rounded focus:ring-[#FF6B6B] focus:ring-2"
                    />
                    <span className="font-['Roboto'] font-medium text-[#2E2E2E]">{disease}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Upload Lab Reports */}
          <div className="bg-white rounded-2xl shadow-xl border border-[#E0E0E0] overflow-hidden">
            <div className="bg-gradient-to-r from-[#3A86FF] to-[#D7E9F7] p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#3A86FF] font-bold">📎</span>
                </div>
                <h3 className="text-xl font-['Montserrat'] font-bold text-white">Upload Lab Reports</h3>
                <span className="text-sm text-white/80 font-['Roboto']">Upload baseline test results or X-ray or Blood</span>
              </div>
            </div>
            <div className="p-8">
              <div className="border-2 border-dashed border-[#E0E0E0] rounded-xl p-8 text-center hover:border-[#3A86FF] transition-colors">
                <div className="w-16 h-16 bg-[#3A86FF]/10 rounded-full mx-auto flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#3A86FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h4 className="font-['Montserrat'] font-semibold text-[#2E2E2E] mb-2">Drag & Drop Files Here</h4>
                <p className="text-[#6C757D] font-['Roboto'] text-sm mb-4">or click to browse files</p>
                <input 
                  type="file" 
                  multiple 
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileUpload}
                  className="hidden" 
                  id="file-upload"
                />
                <label 
                  htmlFor="file-upload" 
                  className="inline-block px-6 py-3 bg-gradient-to-r from-[#3A86FF] to-[#2D9C8F] text-white font-['Roboto'] font-semibold rounded-lg cursor-pointer hover:from-[#2D9C8F] hover:to-[#3A86FF] transition-all duration-300"
                >
                  Choose Files
                </label>
              </div>
              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-['Montserrat'] font-semibold text-[#2E2E2E] mb-3">Uploaded Files:</h4>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[#F5F7FA] rounded-lg">
                        <span className="font-['Roboto'] text-[#2E2E2E]">{file.name}</span>
                        <span className="text-[#2D9C8F] font-['Roboto'] text-sm">✓ Uploaded</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white rounded-2xl shadow-xl border border-[#E0E0E0] overflow-hidden">
            <div className="bg-gradient-to-r from-[#FF6B6B] to-[#FFB347] p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#FF6B6B] font-bold">🚨</span>
                </div>
                <h3 className="text-xl font-['Montserrat'] font-bold text-white">Emergency Contact</h3>
                <span className="text-sm text-white/80 font-['Roboto']">Person to contact in case of medical emergency</span>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-['Roboto'] font-semibold text-[#2E2E2E]">Emergency Contact Name</label>
                  <input 
                    name="emergency_contact" 
                    value={form.emergency_contact} 
                    onChange={onChange} 
                    placeholder="Full name of emergency contact" 
                    className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] font-['Roboto']"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-['Roboto'] font-semibold text-[#2E2E2E]">Emergency Contact Phone</label>
                  <input 
                    name="emergency_contact_phone" 
                    value={form.emergency_contact_phone} 
                    onChange={onChange} 
                    placeholder="Phone number" 
                    className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] font-['Roboto']"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Insurance & Benefits */}
          <div className="bg-white rounded-2xl shadow-xl border border-[#E0E0E0] overflow-hidden">
            <div className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#F59E0B] font-bold">🛡️</span>
                </div>
                <h3 className="text-xl font-['Montserrat'] font-bold text-white">Insurance & Benefits</h3>
                <span className="text-sm text-white/80 font-['Roboto']">Healthcare coverage information</span>
              </div>
            </div>
            <div className="p-8">
              <div className="bg-gradient-to-r from-[#A8E6CF]/20 to-[#2D9C8F]/10 rounded-xl p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#2D9C8F] rounded-full mx-auto flex items-center justify-center mb-2">
                      <span className="text-white font-bold">✓</span>
                    </div>
                    <div className="font-['Roboto'] font-semibold text-[#2E2E2E]">Pradhan Mantri Jan</div>
                    <div className="font-['Roboto'] text-[#6C757D] text-sm">Arogya Yojana (PMJAY)</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#2D9C8F] rounded-full mx-auto flex items-center justify-center mb-2">
                      <span className="text-white font-bold">₹</span>
                    </div>
                    <div className="font-['Roboto'] font-semibold text-[#2E2E2E]">ESI Scheme Benefits</div>
                    <div className="font-['Roboto'] text-[#6C757D] text-sm">Employee State Insurance</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#2D9C8F] rounded-full mx-auto flex items-center justify-center mb-2">
                      <span className="text-white font-bold">⚕️</span>
                    </div>
                    <div className="font-['Roboto'] font-semibold text-[#2E2E2E]">Rashtriya Swasthya</div>
                    <div className="font-['Roboto'] text-[#6C757D] text-sm">Bima Yojana (RSBY)</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-['Roboto'] font-semibold text-[#2E2E2E]">Insurance Number</label>
                  <input 
                    name="insurance_number" 
                    value={form.insurance_number} 
                    onChange={onChange} 
                    placeholder="PMJAY/ESI/RSBY Number" 
                    className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D9C8F] font-['Roboto']"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-['Roboto'] font-semibold text-[#2E2E2E]">Insurance Provider</label>
                  <select 
                    name="insurance_provider" 
                    value={form.insurance_provider} 
                    onChange={onChange} 
                    className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D9C8F] font-['Roboto']"
                  >
                    <option value="">Select Provider</option>
                    <option value="PMJAY">Pradhan Mantri Jan Arogya Yojana</option>
                    <option value="ESI">Employee State Insurance</option>
                    <option value="RSBY">Rashtriya Swasthya Bima Yojana</option>
                    <option value="Private">Private Insurance</option>
                    <option value="None">No Insurance</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Languages & Communication */}
          <div className="bg-white rounded-2xl shadow-xl border border-[#E0E0E0] overflow-hidden">
            <div className="bg-gradient-to-r from-[#B388EB] to-[#D7E9F7] p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#B388EB] font-bold">🗣️</span>
                </div>
                <h3 className="text-xl font-['Montserrat'] font-bold text-white">Languages & Communication</h3>
                <span className="text-sm text-white/80 font-['Roboto']">Preferred languages for medical consultations</span>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Hindi', 'English', 'Malayalam', 'Tamil', 'Telugu', 'Bengali', 'Odia', 'Assamese'].map((language) => (
                  <label key={language} className="flex items-center space-x-3 p-3 border border-[#E0E0E0] rounded-lg hover:bg-[#F5F7FA] transition-colors">
                    <input 
                      type="checkbox" 
                      name={`language_${language.toLowerCase()}`}
                      className="w-5 h-5 text-[#B388EB] bg-gray-100 border-gray-300 rounded focus:ring-[#B388EB] focus:ring-2"
                    />
                    <span className="font-['Roboto'] font-medium text-[#2E2E2E]">{language}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="bg-white rounded-2xl shadow-xl border border-[#E0E0E0] overflow-hidden">
            <div className="bg-gradient-to-r from-[#6C757D] to-[#2E2E2E] p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#6C757D] font-bold">📋</span>
                </div>
                <h3 className="text-xl font-['Montserrat'] font-bold text-white">Terms & Conditions</h3>
                <span className="text-sm text-white/80 font-['Roboto']">Agreement for healthcare services</span>
              </div>
            </div>
            <div className="p-8">
              <div className="bg-[#F5F7FA] rounded-xl p-6 mb-6">
                <h4 className="font-['Montserrat'] font-semibold text-[#2E2E2E] mb-4">Important Information:</h4>
                <ul className="space-y-2 text-[#6C757D] font-['Roboto'] text-sm">
                  <li>• I acknowledge that the data provided is correct and complete.</li>
                  <li>• I understand that false information may result in denial of services.</li>
                  <li>• I consent to digital storage and processing of my health records.</li>
                  <li>• I authorize healthcare providers to access my medical history for treatment.</li>
                  <li>• I understand that emergency services can access my records without consent.</li>
                </ul>
              </div>
              
              <div className="flex items-start space-x-3">
                <input 
                  type="checkbox" 
                  required
                  className="w-5 h-5 text-[#2D9C8F] bg-gray-100 border-gray-300 rounded focus:ring-[#2D9C8F] focus:ring-2 mt-1"
                />
                <label className="font-['Roboto'] text-[#2E2E2E]">
                  I acknowledge the conditions of the healthcare system and agree to receive healthcare services through digital record management. I consent to my data being stored securely and shared with authorized healthcare providers for treatment purposes.
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-2xl shadow-xl border border-[#E0E0E0] p-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-6">
              <button 
                type="button" 
                onClick={() => nav('/hospital')} 
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-[#6C757D] to-[#2E2E2E] text-white font-['Roboto'] font-semibold rounded-xl hover:from-[#2E2E2E] hover:to-[#6C757D] transition-all duration-300 shadow-lg"
              >
                ← Cancel
              </button>
              <button 
                type="submit" 
                className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-['Roboto'] font-bold text-lg rounded-xl hover:from-[#059669] hover:to-[#10B981] transition-all duration-300 shadow-xl transform hover:scale-105"
              >
                Register Migrant →
              </button>
            </div>
          </div>
        </form>

        {/* Error Result */}
        {result && !result.success && (
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-8 shadow-xl text-white">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full mx-auto flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-3xl font-['Poppins'] font-bold mb-4">Registration Failed</h2>
              <p className="text-xl font-['Roboto'] mb-6">{result.message || 'Please check your information and try again.'}</p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
