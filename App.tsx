
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { ContentProvider } from './contexts/ContentContext.tsx';
import Header from './components/Header.tsx';
import Home from './pages/Home.tsx';
import OurStory from './pages/OurStory.tsx';
import RSVP from './pages/RSVP.tsx';
import Registry from './pages/Registry.tsx';
import Login from './pages/Login.tsx';
import Dashboard from './pages/Dashboard.tsx';

const App: React.FC = () => {
  return (
    <ContentProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-sans selection:bg-brutal-yellow selection:text-black">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/our-story" element={<OurStory />} />
              <Route path="/rsvp" element={<RSVP />} />
              <Route path="/registry" element={<Registry />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ContentProvider>
  );
};

const Footer: React.FC = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/dashboard')) return null;

  return (
    <footer className="py-12 bg-white border-t-[3px] border-black">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <Link 
          to="/login" 
          className="font-black uppercase text-xs tracking-widest px-6 py-2 border-2 border-black bg-white shadow-brutal hover:bg-black hover:text-white transition-all inline-block"
        >
          Couple Login
        </Link>
      </div>
    </footer>
  );
};

export default App;
