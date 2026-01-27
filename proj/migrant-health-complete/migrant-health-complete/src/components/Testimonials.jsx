import React from "react";

const TestCard = ({ name, role, text, image, stars, badge }) => (
  <div className="bg-white p-8 rounded-2xl shadow-xl border border-[#E0E0E0] border-t-4 border-t-[#3A86FF] hover:shadow-2xl hover:shadow-[#B388EB]/20 transition-all duration-300 transform hover:scale-105">
    <div className="flex items-center gap-4 mb-6">
      <img 
        src={image} 
        alt={name}
        className="w-16 h-16 rounded-full object-cover border-2 border-[#E0E0E0]"
      />
      <div className="flex-1">
        <div className="font-['Montserrat'] font-medium text-xl text-[#0D3B66]">{name}</div>
        <div className="text-sm font-['Roboto'] text-[#6C757D] mb-2">{role}</div>
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-4 h-4 ${i < stars ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
    
    <blockquote className="text-[#2E2E2E] font-['Roboto'] text-base leading-relaxed mb-6">
      "{text}"
    </blockquote>
    
    {badge && (
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">❤️</span>
        <span className="text-sm font-['Roboto'] font-medium text-[#6C757D]">{badge}</span>
      </div>
    )}
  </div>
);

export default function Testimonials() {
  const samples = [
    { 
      name: "Ravi Kumar", 
      role: "Construction Worker, Kochi", 
      text: "The digital health card changed my life! Now I can visit any hospital in Kerala and they have all my medical history. No more carrying thick paper files everywhere.", 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=60",
      stars: 5,
      badge: "Helped 247 workers get registered"
    },
    { 
      name: "Priya Devi", 
      role: "Domestic Worker, Thiruvananthapuram", 
      text: "The telemedicine feature is amazing! I can consult doctors in my native language from home. It saved me so much time and money.", 
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b131?auto=format&fit=crop&w=150&q=60",
      stars: 5,
      badge: "✅ 5+ telemedicine consultations"
    },
    { 
      name: "Abdul Rahman", 
      role: "Factory Worker, Kozhikode", 
      text: "Emergency services are fantastic! When I had an accident, the hospital immediately knew about my allergies and medical history. It literally saved my life.", 
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=60",
      stars: 5,
      badge: "🚨 Emergency response in 5 minutes"
    }
  ];

  return (
    <section className="bg-[#F5F7FA] py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 py-12 bg-gradient-to-r from-[#F5F5DC] to-[#B6D7FF] rounded-3xl shadow-lg">
          <h2 className="text-5xl font-['Poppins'] font-bold text-[#0D3B66] mb-6">Community Voices</h2>
          <p className="text-xl font-['Roboto'] text-[#2D9C8F] max-w-3xl mx-auto">Real stories from migrant workers who transformed their health journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {samples.map((s, i) => <TestCard key={i} {...s} />)}
        </div>
      </div>
    </section>
  );
}
