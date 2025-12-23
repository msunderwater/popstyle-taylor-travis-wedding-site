
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize default credentials if not set
    if (!localStorage.getItem('wedding_username')) {
      localStorage.setItem('wedding_username', 'abc');
      localStorage.setItem('wedding_password', '123456');
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedUser = localStorage.getItem('wedding_username');
    const storedPass = localStorage.getItem('wedding_password');

    if (username === storedUser && password === storedPass) {
      navigate('/dashboard');
    } else {
      setError('Invalid username or password! Try again.');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-brutal-cream px-6">
      <div className="max-w-md w-full relative">
        {/* Background Decorative Frame */}
        <div className="absolute inset-0 bg-brutal-blue border-[4px] border-black translate-x-4 translate-y-4 rounded-3xl"></div>
        
        <div className="relative bg-white border-[4px] border-black p-10 rounded-3xl shadow-brutal text-center">
          <div className="bg-brutal-pink border-[3px] border-black inline-block px-6 py-2 -rotate-3 mb-8 shadow-brutal">
            <h2 className="font-display text-4xl text-black">COUPLE LOGIN</h2>
          </div>
          
          <p className="font-black uppercase text-xs tracking-widest text-stone-500 mb-8">Access the Admin Dashboard</p>
          
          <form onSubmit={handleLogin} className="space-y-6 text-left">
            <div className="space-y-2">
              <label className="font-black text-xs uppercase tracking-widest">Username</label>
              <input 
                type="text" 
                placeholder="Enter username"
                className="w-full bg-stone-50 border-[3px] border-black py-3 px-4 rounded-xl focus:outline-none focus:bg-brutal-yellow transition-colors font-bold"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="font-black text-xs uppercase tracking-widest">Password</label>
              <input 
                type="password" 
                placeholder="Enter password"
                className="w-full bg-stone-50 border-[3px] border-black py-3 px-4 rounded-xl focus:outline-none focus:bg-brutal-yellow transition-colors font-bold"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-brutal-orange font-black text-xs uppercase animate-pulse">{error}</p>
            )}

            <button 
              type="submit"
              className="w-full bg-black text-white py-4 font-display text-xl uppercase tracking-widest border-[3px] border-black shadow-brutal hover:bg-brutal-green hover:text-black transition-all active:translate-x-1 active:translate-y-1 active:shadow-none rounded-xl"
            >
              Enter Dashboard
            </button>
          </form>
          
          <button 
            onClick={() => navigate('/')}
            className="mt-10 font-black text-xs uppercase tracking-widest text-stone-400 hover:text-black hover:underline transition-colors"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
