import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mockApi from '../services/mockApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Derived metrics used to drive chart widths/heights without changing textual content
  const circumference = 2 * Math.PI * 35; // r=35
  const genderPct = data?.genderPct || { male: 61.3, female: 38.7 };
  const maleArc = (genderPct.male / 100) * circumference;
  const femaleArc = (genderPct.female / 100) * circumference;
  const ageGroups = data?.ageGroups || { '18-25': 42, '26-35': 54, '36-45': 46, '46-55': 32, '56+': 18 };
  const ageCounts = Object.values(ageGroups);
  const maxAge = Math.max(1, ...ageCounts);
  const scaleH = (val) => {
    const maxHeight = 130;
    const minHeight = 20;
    return Math.round(minHeight + (val / maxAge) * (maxHeight - minHeight));
  };
  const diseaseTracker = data?.diseaseTracker || { diabetes: 60, hypertension: 80, cardiovascular: 45 };
  const diseases = data?.diseases || { dengue: 35, tb: 28 };
  const diseaseVals = [
    diseaseTracker.diabetes || 0,
    diseaseTracker.hypertension || 0,
    diseaseTracker.cardiovascular || 0,
    diseases.dengue || 0,
    diseases.tb || 0,
  ];
  const maxDisease = Math.max(1, ...diseaseVals);
  const scaleDisease = (v) => Math.round(30 + (v / maxDisease) * (110 - 30));

  useEffect(() => {
    // Check if admin is authenticated
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }

    async function loadData() {
      try {
        const res = await mockApi.getAnalytics();
        setData(res);
      } catch (error) {
        console.error('Error loading analytics:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 font-['Roboto']">Loading analytics...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 font-['Poppins']">Admin Analytics</h1>
                <p className="text-gray-600 font-['Roboto']">Comprehensive health data monitoring and insights</p>
              </div>
              <div className="flex space-x-3">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 font-['Roboto']">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Export Data
                </button>
                <button 
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 font-['Roboto']"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 font-['Poppins']">24,847</p>
                  <p className="text-sm text-gray-600 font-['Roboto']">Total registrations</p>
                  <p className="text-xs text-green-600 font-['Roboto']">↗ +14.2% from last month</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 font-['Poppins']">3,429</p>
                  <p className="text-sm text-gray-600 font-['Roboto']">Pending applications</p>
                  <p className="text-xs text-green-600 font-['Roboto']">↗ +2.1% from last week</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 font-['Poppins']">156</p>
                  <p className="text-sm text-gray-600 font-['Roboto']">Active patients</p>
                  <p className="text-xs text-red-600 font-['Roboto']">↓ -0.8% from last month</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 font-['Poppins']">99.8%</p>
                  <p className="text-sm text-gray-600 font-['Roboto']">Compliance Score</p>
                  <p className="text-xs text-green-600 font-['Roboto']">↗ Excellent</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Charts and Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Demographics */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 font-['Poppins']">Demographics</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-['Roboto']">View all</button>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 font-['Roboto']">By Gender</span>
                    <span className="font-medium text-gray-900 font-['Roboto']">14.3%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: `${genderPct.male || 67}%`}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 font-['Roboto']">Female</span>
                    <span className="font-medium text-gray-900 font-['Roboto']">47.1%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-pink-500 h-2 rounded-full" style={{width: `${genderPct.female || 47}%`}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 font-['Roboto']">By Age Group</span>
                    <span className="font-medium text-gray-900 font-['Roboto']">85</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Disease Tracker */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 font-['Poppins']">Disease Tracker</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-['Roboto']">View all</button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-600 font-['Roboto']">Diabetes</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 font-['Roboto']">5,345</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-600 font-['Roboto']">Hypertension</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 font-['Roboto']">4,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-600 font-['Roboto']">Cardiovascular</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 font-['Roboto']">2,156</span>
                </div>
              </div>
              {/* Simple chart representation */}
              <div className="mt-6 h-32 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg flex items-end justify-center p-4">
                <div className="flex items-end space-x-2">
                  <div className="w-8 bg-blue-500 rounded-t" style={{height: `${scaleDisease(diseaseVals[0])}px`}}></div>
                  <div className="w-8 bg-green-500 rounded-t" style={{height: `${scaleDisease(diseaseVals[1])}px`}}></div>
                  <div className="w-8 bg-yellow-500 rounded-t" style={{height: `${scaleDisease(diseaseVals[2])}px`}}></div>
                  <div className="w-8 bg-red-500 rounded-t" style={{height: `${scaleDisease(diseaseVals[3])}px`}}></div>
                  <div className="w-8 bg-purple-500 rounded-t" style={{height: `${scaleDisease(diseaseVals[4])}px`}}></div>
                </div>
              </div>
            </div>

            {/* Geographic Distribution */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 font-['Poppins']">Geographic Distribution</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-['Roboto']">Explore</button>
              </div>
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 font-['Roboto']">Data not geographic</p>
                <p className="text-2xl font-bold text-gray-900 font-['Poppins']">5,247</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 font-['Roboto']">Karnataka</span>
                  <span className="font-medium text-gray-900 font-['Roboto']">2,456</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 font-['Roboto']">Tamil Nadu</span>
                  <span className="font-medium text-gray-900 font-['Roboto']">1,891</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 font-['Roboto']">Kerala</span>
                  <span className="font-medium text-gray-900 font-['Roboto']">1,547</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 font-['Roboto']">Andhra Pradesh</span>
                  <span className="font-medium text-gray-900 font-['Roboto']">900</span>
                </div>
              </div>
              {/* Map placeholder */}
              <div className="mt-4 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Advanced Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Male/Female Ratio */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 font-['Poppins']">Male/Female Ratio</h3>
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {/* Male portion */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="15"
                      strokeDasharray={`${maleArc} ${Math.max(0, circumference - maleArc)}`}
                      strokeDashoffset="0"
                    />
                    {/* Female portion */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="#ec4899"
                      strokeWidth="15"
                      strokeDasharray={`${femaleArc} ${Math.max(0, circumference - femaleArc)}`}
                      strokeDashoffset={`-${maleArc}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900 font-['Poppins']">61.3%</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center space-x-6 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-600 font-['Roboto']">Male: 61.3%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
                  <span className="text-gray-600 font-['Roboto']">Female: 38.7%</span>
                </div>
              </div>
            </div>

            {/* Age Group Distribution */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 font-['Poppins']">Age Group Distribution</h3>
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="h-48 flex items-end space-x-2 mb-4">
                {/* Age group bars */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full flex justify-center mb-2">
                    <div className="w-8 bg-blue-500 rounded-t" style={{height: `${scaleH(ageGroups['18-25'])}px`}}></div>
                  </div>
                  <div className="text-xs text-gray-600 font-['Roboto'] text-center">
                    <div className="font-semibold">4,202</div>
                    <div>18-25</div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full flex justify-center mb-2">
                    <div className="w-8 bg-pink-500 rounded-t" style={{height: `${scaleH(ageGroups['26-35'])}px`}}></div>
                  </div>
                  <div className="text-xs text-gray-600 font-['Roboto'] text-center">
                    <div className="font-semibold">5,450</div>
                    <div>26-35</div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full flex justify-center mb-2">
                    <div className="w-8 bg-blue-500 rounded-t" style={{height: `${scaleH(ageGroups['36-45'])}px`}}></div>
                  </div>
                  <div className="text-xs text-gray-600 font-['Roboto'] text-center">
                    <div className="font-semibold">4,680</div>
                    <div>36-45</div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full flex justify-center mb-2">
                    <div className="w-8 bg-pink-500 rounded-t" style={{height: `${scaleH(ageGroups['46-55'])}px`}}></div>
                  </div>
                  <div className="text-xs text-gray-600 font-['Roboto'] text-center">
                    <div className="font-semibold">3,240</div>
                    <div>46-55</div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full flex justify-center mb-2">
                    <div className="w-8 bg-blue-500 rounded-t" style={{height: `${scaleH(ageGroups['56+'])}px`}}></div>
                  </div>
                  <div className="text-xs text-gray-600 font-['Roboto'] text-center">
                    <div className="font-semibold">1,377</div>
                    <div>56+</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center space-x-6 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                  <span className="text-gray-600 font-['Roboto'] text-xs">Male</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-1"></div>
                  <span className="text-gray-600 font-['Roboto'] text-xs">Female</span>
                </div>
              </div>
            </div>

            {/* Home State Distribution */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 font-['Poppins']">Home State Distribution</h3>
                <div className="flex space-x-2">
                  <button className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded font-['Roboto']">Map</button>
                  <button className="text-xs px-2 py-1 text-gray-600 rounded font-['Roboto']">Chart</button>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-['Roboto']">Bihar</span>
                  <div className="flex items-center flex-1 mx-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="w-20 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 font-['Roboto'] ml-2">5,447</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-['Roboto']">Uttar Pradesh</span>
                  <div className="flex items-center flex-1 mx-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="w-16 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 font-['Roboto'] ml-2">4,812</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-['Roboto']">West Bengal</span>
                  <div className="flex items-center flex-1 mx-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="w-12 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 font-['Roboto'] ml-2">3,921</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-['Roboto']">Odisha</span>
                  <div className="flex items-center flex-1 mx-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="w-10 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 font-['Roboto'] ml-2">3,247</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-['Roboto']">Jharkhand</span>
                  <div className="flex items-center flex-1 mx-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="w-8 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 font-['Roboto'] ml-2">2,847</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-['Roboto']">Assam</span>
                  <div className="flex items-center flex-1 mx-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="w-6 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 font-['Roboto'] ml-2">2,234</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-['Roboto']">Rajasthan</span>
                  <div className="flex items-center flex-1 mx-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="w-4 h-2 bg-purple-600 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 font-['Roboto'] ml-2">1,549</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-600 font-['Roboto']">Migrants</span>
                </div>
              </div>
            </div>
          </div>

          {/* Disease Tracking Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Contagious Disease Tracker */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 font-['Poppins']">Contagious Disease Tracker</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 font-['Roboto']">Last 12 months</span>
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="h-48 relative mb-4">
                <svg viewBox="0 0 400 160" className="w-full h-full">
                  {/* Chart area */}
                  <rect x="0" y="0" width="400" height="160" fill="#f8fafc" rx="4"/>
                  
                  {/* COVID-19 area (red) */}
                  <path d="M0 140 Q50 130 100 125 Q150 120 200 115 Q250 110 300 105 Q350 100 400 95 L400 160 L0 160 Z" fill="#fca5a5" opacity="0.7"/>
                  
                  {/* Tuberculosis area (orange) */}
                  <path d="M0 140 Q50 135 100 132 Q150 128 200 125 Q250 120 300 115 Q350 110 400 105 L400 160 L0 160 Z" fill="#fdba74" opacity="0.7"/>
                  
                  {/* Hepatitis area (yellow) */}
                  <path d="M0 140 Q50 138 100 136 Q150 134 200 132 Q250 130 300 128 Q350 125 400 122 L400 160 L0 160 Z" fill="#fde68a" opacity="0.7"/>
                  
                  {/* Dengue area (green) */}
                  <path d="M0 140 Q50 139 100 138 Q150 137 200 136 Q250 135 300 134 Q350 132 400 130 L400 160 L0 160 Z" fill="#86efac" opacity="0.7"/>
                  
                  {/* Malaria area (blue) */}
                  <path d="M0 140 Q50 139.5 100 139 Q150 138.5 200 138 Q250 137.5 300 137 Q350 136 400 135 L400 160 L0 160 Z" fill="#93c5fd" opacity="0.7"/>
                </svg>
                <div className="absolute bottom-2 left-4 right-4 flex justify-between text-xs text-gray-500 font-['Roboto']">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                  <span>Nov</span>
                  <span>Dec</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-xs font-['Roboto']">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-300 rounded mr-2"></div>
                  <span className="text-gray-600">COVID-19</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-300 rounded mr-2"></div>
                  <span className="text-gray-600">Tuberculosis</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-300 rounded mr-2"></div>
                  <span className="text-gray-600">Hepatitis</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-300 rounded mr-2"></div>
                  <span className="text-gray-600">Dengue</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-300 rounded mr-2"></div>
                  <span className="text-gray-600">Malaria</span>
                </div>
              </div>
            </div>

            {/* Safety Status */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 font-['Poppins']">Safety Status</h3>
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-40 h-40">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {/* Safe portion (large green) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="15"
                      strokeDasharray="200 20"
                      strokeDashoffset="0"
                    />
                    {/* At Risk portion (small red) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="15"
                      strokeDasharray="20 200"
                      strokeDashoffset="-200"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 font-['Roboto']">At Risk</p>
                      <p className="text-2xl font-bold text-red-600 font-['Poppins']">9.2%</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600 font-['Roboto']">Safe</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 font-['Roboto']">90.8%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600 font-['Roboto']">At Risk</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 font-['Roboto']">9.2%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Registrations Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 font-['Poppins']">Recent Registrations</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded font-['Roboto']">Last 30 days</button>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded font-['Roboto']">All Locations</button>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded font-['Roboto']">All Statuses</button>
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded font-['Roboto']">Export CSV</button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Roboto']">Patient Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Roboto']">UHID Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Roboto']">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Roboto']">Actions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Roboto']">Registered at</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-['Roboto']">UHID:867159943420</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-['Roboto']">Rajesh Kumar</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 font-['Roboto']">Active</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-700 font-['Roboto']">View Details</button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-['Roboto']">2024-09-15 10:32</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-['Roboto']">UHID:867159943421</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-['Roboto']">Priya Devi</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 font-['Roboto']">Pending</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-700 font-['Roboto']">View Details</button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-['Roboto']">2024-09-14 15:45</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-['Roboto']">UHID:867159943422</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-['Roboto']">Ravi Kumar</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 font-['Roboto']">Active</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-700 font-['Roboto']">View Details</button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-['Roboto']">2024-09-13 09:20</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-['Roboto']">UHID:867159943423</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-['Roboto']">Lakshmi Menon</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 font-['Roboto']">Critical</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-700 font-['Roboto']">View Details</button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-['Roboto']">2024-09-12 14:15</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700 font-['Roboto']">Showing 4 of 156 results</p>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded font-['Roboto']">Previous</button>
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded font-['Roboto']">1</button>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded font-['Roboto']">2</button>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded font-['Roboto']">Next</button>
                </div>
              </div>
            </div>
          </div>

          {/* Kerala Districts Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Kerala Districts Map */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="mb-4">
                <nav className="flex text-sm text-blue-600 font-['Roboto']">
                  <span className="hover:underline cursor-pointer">Analytics</span>
                  <span className="mx-2 text-gray-400">›</span>
                  <span className="hover:underline cursor-pointer">GIS View</span>
                  <span className="mx-2 text-gray-400">›</span>
                  <span className="text-gray-900">Thiruvananthapuram District</span>
                </nav>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-6 font-['Poppins']">Kerala Districts Map</h3>
              
              {/* Map Area */}
              <div className="relative h-64 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                {/* Kerala Map Outline */}
                <svg viewBox="0 0 300 400" className="w-full h-full">
                  {/* Kerala state outline (simplified) */}
                  <path 
                    d="M80 50 Q90 45 110 60 Q130 50 150 65 Q170 70 180 90 Q185 110 190 130 Q195 150 185 170 Q180 190 175 210 Q170 230 165 250 Q160 270 155 290 Q150 310 140 330 Q130 350 120 360 Q100 370 80 360 Q60 350 50 330 Q45 310 50 290 Q55 270 60 250 Q65 230 70 210 Q75 190 70 170 Q65 150 70 130 Q75 110 80 90 Q85 70 80 50 Z" 
                    fill="#e5e7eb" 
                    stroke="#d1d5db" 
                    strokeWidth="1"
                  />
                  
                  {/* District markers */}
                  <circle cx="120" cy="100" r="4" fill="#ef4444" /> {/* High Risk - Red */}
                  <circle cx="140" cy="180" r="4" fill="#3b82f6" /> {/* Medium Risk - Blue */}
                  <circle cx="100" cy="300" r="4" fill="#10b981" /> {/* Low Risk - Green */}
                </svg>
                
                <button className="absolute bottom-2 right-2 text-xs text-blue-600 hover:text-blue-700 font-['Roboto']">
                  Zoom In
                </button>
              </div>
              
              {/* Legend */}
              <div className="flex items-center space-x-6 text-sm font-['Roboto']">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">High Risk</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Medium Risk</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Low Risk</span>
                </div>
              </div>
            </div>

            {/* District Statistics */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              {/* Statistics Cards */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 font-['Roboto']">Registered</p>
                  <p className="text-2xl font-bold text-gray-900 font-['Poppins']">3,247</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 font-['Roboto']">Active Cases</p>
                  <p className="text-2xl font-bold text-orange-600 font-['Poppins']">892</p>
                  <p className="text-xs text-orange-600 font-['Roboto']">+7.2%</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 font-['Roboto']">Treated</p>
                  <p className="text-2xl font-bold text-green-600 font-['Poppins']">2,355</p>
                  <p className="text-xs text-green-600 font-['Roboto']">+8.1%</p>
                </div>
              </div>

              {/* 30-Day Trend */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 font-['Poppins']">30-Day Trend</h4>
                <div className="h-32 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-end p-4">
                  {/* Trend line visualization */}
                  <div className="w-full h-full relative">
                    <svg viewBox="0 0 300 100" className="w-full h-full">
                      <defs>
                        <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1"/>
                        </linearGradient>
                      </defs>
                      <path 
                        d="M0 80 Q75 70 150 60 Q225 50 300 40" 
                        stroke="#3b82f6" 
                        strokeWidth="2" 
                        fill="none"
                      />
                      <path 
                        d="M0 80 Q75 70 150 60 Q225 50 300 40 L300 100 L0 100 Z" 
                        fill="url(#trendGradient)"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Top Industries */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3 font-['Poppins']">Top Industries</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 font-['Roboto']">IT Services</span>
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 rounded-full mr-3">
                        <div className="w-20 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 font-['Roboto'] w-8">1,247</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 font-['Roboto']">Tourism</span>
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 rounded-full mr-3">
                        <div className="w-16 h-2 bg-green-600 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 font-['Roboto'] w-8">987</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 font-['Roboto']">Education</span>
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 rounded-full mr-3">
                        <div className="w-12 h-2 bg-purple-600 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 font-['Roboto'] w-8">634</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 font-['Roboto']">Manufacturing</span>
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 rounded-full mr-3">
                        <div className="w-8 h-2 bg-orange-600 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 font-['Roboto'] w-8">474</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Thiruvananthapuram District Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 font-['Poppins']">Thiruvananthapuram District Details</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-['Roboto'] hover:bg-blue-700">
                  <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Export CSV
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Roboto']">UHID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Roboto']">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Roboto']">Last Visit Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Roboto']">Primary Condition</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Roboto']">Risk Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Roboto']">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-['Roboto']">UH+++001</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 font-['Roboto']">Active Treatment</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-['Roboto']">2024-09-14</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-['Roboto']">Diabetes Type 2</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 font-['Roboto']">Medium</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-700 font-['Roboto']">View Details</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-['Roboto']">UH+++002</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 font-['Roboto']">Critical</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-['Roboto']">2024-09-13</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-['Roboto']">Hypertension</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 font-['Roboto']">High</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-700 font-['Roboto']">View Details</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-['Roboto']">UH+++003</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 font-['Roboto']">Follow-up</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-['Roboto']">2024-09-12</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-['Roboto']">Cardiovascular</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 font-['Roboto']">Low</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-700 font-['Roboto']">View Details</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* System Health Monitoring */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 font-['Poppins']">System Health Monitoring</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-gray-900 font-['Poppins']">99.98%</p>
                <p className="text-sm text-gray-600 font-['Roboto']">Uptime</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 4.414V13a1 1 0 11-2 0V4.414L7.707 5.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-gray-900 font-['Poppins']">2.3ms</p>
                <p className="text-sm text-gray-600 font-['Roboto']">Response Time</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-gray-900 font-['Poppins']">145ms</p>
                <p className="text-sm text-gray-600 font-['Roboto']">Database Latency</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-gray-900 font-['Poppins']">1,247</p>
                <p className="text-sm text-gray-600 font-['Roboto']">Active Sessions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
