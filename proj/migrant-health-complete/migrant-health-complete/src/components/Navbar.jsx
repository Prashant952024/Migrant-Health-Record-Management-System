import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function KeralaBadge(){ return (
  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2D9C8F] to-[#A8E6CF] flex items-center justify-center text-white font-bold font-['Poppins'] shadow-lg">KH</div>
);}

export default function Navbar(){
  const nav = useNavigate();
  return (
    <header className="bg-gradient-to-r from-[#0D3B66] to-[#3A86FF] shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <KeralaBadge />
          <div>
            <div className="text-sm font-semibold text-white font-['Poppins']">Kerala Health Portal</div>
            <div className="text-xs text-[#D7E9F7] font-['Roboto']">Migrant Worker Health</div>
          </div>
        </div>
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-white hover:bg-[#3A86FF]/20 px-3 py-2 rounded-lg font-['Roboto'] font-medium transition-all duration-200 relative group">
            Home
          </Link>
          <Link to="/about" className="text-white hover:bg-[#3A86FF]/20 px-3 py-2 rounded-lg font-['Roboto'] font-medium transition-all duration-200 relative group">
            About
          </Link>
          <Link to="/contact" className="text-white hover:bg-[#3A86FF]/20 px-3 py-2 rounded-lg font-['Roboto'] font-medium transition-all duration-200 relative group">
            Contact
          </Link>
          <button 
            onClick={()=>nav('/signin')} 
            className="ml-4 px-6 py-2 rounded-full bg-gradient-to-r from-[#2D9C8F] to-[#A8E6CF] text-white font-['Roboto'] font-medium hover:from-[#A8E6CF] hover:to-[#2D9C8F] transition-all duration-200 shadow-lg"
          >
            Sign In
          </button>
        </nav>
      </div>
    </header>
  );
}
