
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Our Story', path: '/our-story', color: 'bg-brutal-pink' },
    { name: 'RSVP', path: '/rsvp', color: 'bg-brutal-green' },
    { name: 'Registry', path: '/registry', color: 'bg-brutal-purple' },
  ];

  if (location.pathname.startsWith('/dashboard')) return null;

  return (
    <header className="sticky top-4 z-50 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-white border-[4px] border-black shadow-brutal p-4 rounded-3xl">
        <Link to="/" className="group flex items-center gap-2">
          <div className="bg-brutal-yellow p-2 border-[3px] border-black shadow-brutal group-hover:rotate-12 transition-transform rounded-xl">
             <span className="font-display text-3xl tracking-tighter">T+T</span>
          </div>
          <span className="hidden sm:inline font-black uppercase text-xs tracking-widest bg-black text-white px-2 py-1 -rotate-2">Wedding '26</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`font-black uppercase text-xs px-6 py-2 border-[3px] border-black transition-all rounded-full hover:translate-y-[-4px] hover:shadow-brutal ${location.pathname === link.path ? `${link.color} shadow-brutal translate-y-[-4px]` : 'bg-white hover:bg-stone-50'}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden w-12 h-12 flex items-center justify-center border-[3px] border-black bg-brutal-orange shadow-brutal active:shadow-none active:translate-x-1 active:translate-y-1 transition-all rounded-xl" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="space-y-1">
            <div className={`w-6 h-1 bg-white border border-black ${isOpen ? 'rotate-45 translate-y-2' : ''} transition-all`}></div>
            <div className={`w-6 h-1 bg-white border border-black ${isOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-1 bg-white border border-black ${isOpen ? '-rotate-45 -translate-y-2' : ''} transition-all`}></div>
          </div>
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <nav className="md:hidden fixed inset-x-6 top-24 bg-brutal-yellow p-8 border-[4px] border-black shadow-brutal-lg flex flex-col items-center space-y-4 rounded-3xl z-40 animate-springy">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`${link.color} font-display text-4xl uppercase border-[4px] border-black px-8 py-4 shadow-brutal w-full text-center hover:scale-105 transition-transform rounded-2xl`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
