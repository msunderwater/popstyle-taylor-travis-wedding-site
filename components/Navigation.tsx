
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 py-8 px-4 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-stone-500">
      <Link to="/our-story" className="hover:text-stone-900 transition-colors border-b border-transparent hover:border-stone-300 pb-1">Our Story</Link>
      <Link to="/details" className="hover:text-stone-900 transition-colors border-b border-transparent hover:border-stone-300 pb-1">Wedding Details</Link>
      <Link to="/travel" className="hover:text-stone-900 transition-colors border-b border-transparent hover:border-stone-300 pb-1">Travel & Stay</Link>
      <Link to="/rsvp" className="hover:text-stone-900 transition-colors border-b border-transparent hover:border-stone-300 pb-1">RSVP</Link>
      <Link to="/registry" className="hover:text-stone-900 transition-colors border-b border-transparent hover:border-stone-300 pb-1">Registry</Link>
    </nav>
  );
};

export default Navigation;
