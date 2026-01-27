import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "General Inquiry", message: "" });
  const [emailSubscribe, setEmailSubscribe] = useState("");

  function onChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log("Contact form submitted:", form);
    alert("Message sent successfully!");
    setForm({ name: "", email: "", subject: "General Inquiry", message: "" });
  }

  function onSubscribe(e) {
    e.preventDefault();
    console.log("Newsletter subscription:", emailSubscribe);
    alert("Successfully subscribed to newsletter!");
    setEmailSubscribe("");
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-[#F5F7FA] py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-['Poppins'] font-bold text-[#0D3B66] mb-6">Get In Touch</h1>
          <p className="text-xl font-['Roboto'] text-[#2D9C8F] max-w-3xl mx-auto leading-relaxed">
            We're here to help. Contact our support team for assistance with healthcare services, 
            technical support, or general inquiries.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=100&q=60" 
                alt="Support representative" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-gray-800">24/7 Support Available</h3>
                <p className="text-sm text-gray-600">Multilingual assistance for all your healthcare needs</p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-['Roboto'] font-medium text-[#2E2E2E] mb-2">Full Name</label>
                  <input 
                    name="name" 
                    value={form.name} 
                    onChange={onChange} 
                    placeholder="Enter your name" 
                    className="w-full bg-white border border-[#E0E0E0] rounded-lg p-4 font-['Roboto'] text-[#2E2E2E] focus:ring-2 focus:ring-[#3A86FF] focus:border-[#3A86FF] transition-colors" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-['Roboto'] font-medium text-[#2E2E2E] mb-2">Email Address</label>
                  <input 
                    name="email" 
                    type="email" 
                    value={form.email} 
                    onChange={onChange} 
                    placeholder="Enter your email" 
                    className="w-full bg-white border border-[#E0E0E0] rounded-lg p-4 font-['Roboto'] text-[#2E2E2E] focus:ring-2 focus:ring-[#3A86FF] focus:border-[#3A86FF] transition-colors" 
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-['Roboto'] font-medium text-[#2E2E2E] mb-2">Subject</label>
                <select 
                  name="subject" 
                  value={form.subject} 
                  onChange={onChange} 
                  className="w-full bg-white border border-[#E0E0E0] rounded-lg p-4 font-['Roboto'] text-[#2E2E2E] focus:ring-2 focus:ring-[#3A86FF] focus:border-[#3A86FF] transition-colors"
                >
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Registration Help</option>
                  <option>Medical Records</option>
                  <option>Emergency Services</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-['Roboto'] font-medium text-[#2E2E2E] mb-2">Message</label>
                <textarea 
                  name="message" 
                  value={form.message} 
                  onChange={onChange} 
                  placeholder="How can we help you?" 
                  rows="5" 
                  className="w-full bg-white border border-[#E0E0E0] rounded-lg p-4 font-['Roboto'] text-[#2E2E2E] focus:ring-2 focus:ring-[#3A86FF] focus:border-[#3A86FF] transition-colors resize-none" 
                  required 
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[#3A86FF] to-[#2D9C8F] text-white font-['Roboto'] font-medium py-4 px-6 rounded-lg hover:from-[#2D9C8F] hover:to-[#3A86FF] transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-2xl mx-auto flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Emergency</h3>
            <div className="text-2xl font-bold text-red-600 mb-1">108</div>
            <p className="text-sm text-gray-600 mb-4">24/7 Emergency Services</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl mx-auto flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Support Email</h3>
            <div className="text-sm font-semibold text-green-600 mb-1">support@keralahalth.in</div>
            <p className="text-sm text-gray-600 mb-4">General Support</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl mx-auto flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Main Office</h3>
            <div className="text-sm font-semibold text-blue-600 mb-1">Thiruvananthapuram</div>
            <p className="text-sm text-gray-600 mb-4">Kerala Health Dept.</p>
          </div>
        </div>

        {/* Health Journey Achievements */}
        <div className="mt-20">
          <div className="text-center mb-12 py-12 bg-gradient-to-r from-[#F5F5DC] to-[#B6D7FF] rounded-3xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#0D3B66] mb-4">Health Journey Achievements</h2>
            <p className="text-[#2D9C8F]">Track your wellness milestones and earn rewards for healthy choices</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl mx-auto flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Health Champion</h3>
              <p className="text-sm text-gray-600 mb-3">Complete 5 health checkups</p>
              <div className="text-2xl font-bold text-yellow-600 mb-1">4/5</div>
              <div className="text-xs text-gray-500">Almost there!</div>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-2xl mx-auto flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Wellness Warrior</h3>
              <p className="text-sm text-gray-600 mb-3">30 days of health tracking</p>
              <div className="text-2xl font-bold text-green-600 mb-1">✓</div>
              <div className="text-xs text-gray-500">Completed</div>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl mx-auto flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Community Helper</h3>
              <p className="text-sm text-gray-600 mb-3">Help 10 workers register</p>
              <div className="text-2xl font-bold text-purple-600 mb-1">7/10</div>
              <div className="text-xs text-gray-500">Keep going!</div>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl mx-auto flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Health Advocate</h3>
              <p className="text-sm text-gray-600 mb-3">Share 5 health tips</p>
              <div className="text-2xl font-bold text-blue-600 mb-1">2/5</div>
              <div className="text-xs text-gray-500">Getting started</div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-20 bg-gradient-to-r from-[#2D9C8F] to-[#A8E6CF] rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Stay Connected with Your Health Journey</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Get weekly health tips, system updates, and community stories delivered to your inbox
          </p>
          
          <form onSubmit={onSubscribe} className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              value={emailSubscribe}
              onChange={(e) => setEmailSubscribe(e.target.value)}
              placeholder="Enter your email address" 
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button 
              type="submit"
              className="bg-gradient-to-r from-[#B388EB] to-[#D7E9F7] hover:from-[#D7E9F7] hover:to-[#B388EB] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-green-100 text-sm mt-4">Join 12,000+ migrant workers staying informed about their health</p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
