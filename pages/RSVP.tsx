import React, { useState } from 'react';

const RSVP: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    attending: 'yes',
    plusOne: false,
    meal: 'STANDARD'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setSubmitted(true), 800);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brutal-green px-6">
        <div className="bg-white p-12 md:p-20 border-[6px] border-black shadow-brutal-xl text-center rounded-[3rem] animate-springy relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-brutal-yellow border-[4px] border-black rounded-full rotate-12 opacity-20"></div>
          <div className="w-24 h-24 bg-brutal-yellow border-[4px] border-black rounded-full flex items-center justify-center mx-auto mb-8 shadow-brutal text-5xl">✨</div>
          <h2 className="font-display text-6xl uppercase tracking-tighter mb-6 text-black">YOU'RE ON THE LIST!</h2>
          <p className="font-black text-xl uppercase italic bg-brutal-pink inline-block px-4 py-2 border-[3px] border-black rotate-1">IT'S GONNA BE A NIGHT TO REMEMBER</p>
          <div className="mt-12">
            <button 
              onClick={() => window.location.href = '#/'}
              className="bg-black text-white px-10 py-5 font-display text-2xl uppercase tracking-widest border-[4px] border-black shadow-brutal hover:bg-brutal-pink hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-2xl"
            >
              BACK TO HOME
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-32 px-6 bg-brutal-yellow/10">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-16 relative">
          <div className="bg-brutal-orange text-white inline-block px-8 py-4 border-[4px] border-black shadow-brutal-lg -rotate-3 rounded-2xl relative z-10">
            <h2 className="font-display text-8xl uppercase tracking-tighter">RSVP</h2>
          </div>
          <div className="bg-white border-[3px] border-black px-6 py-2 absolute -bottom-4 left-1/2 -translate-x-1/2 font-black uppercase text-xs rotate-2 rounded-full z-20">
            SHAKE IT OFF & RESPOND BY AUG 1ST
          </div>
        </header>

        <form onSubmit={handleSubmit} className="bg-white border-[6px] border-black p-10 md:p-16 shadow-brutal-xl space-y-12 rounded-[3rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 opacity-5 select-none pointer-events-none"></div>
          
          <div className="space-y-4">
            <label className="flex items-center gap-2 font-black uppercase text-sm tracking-widest text-brutal-blue">
               <span className="w-6 h-6 bg-brutal-blue border-2 border-black rounded-full inline-block"></span>
               WHO ARE YOU?
            </label>
            <input 
              type="text" 
              required
              className="w-full bg-stone-50 border-[4px] border-black p-6 focus:outline-none focus:bg-white focus:ring-4 focus:ring-brutal-yellow transition-all font-display text-3xl uppercase rounded-2xl placeholder:opacity-20"
              placeholder="E.G. SELENA G."
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2 font-black uppercase text-sm tracking-widest text-brutal-pink">
               <span className="w-6 h-6 bg-brutal-pink border-2 border-black rounded-full inline-block"></span>
               COMING TO THE PARTY?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button 
                type="button"
                onClick={() => setFormData({...formData, attending: 'yes'})}
                className={`py-6 border-[4px] border-black font-display text-3xl uppercase transition-all rounded-2xl shadow-brutal ${formData.attending === 'yes' ? 'bg-brutal-green scale-105 -rotate-1 shadow-brutal-lg' : 'bg-white hover:bg-stone-50'}`}
              >
                YES! I'M IN!
              </button>
              <button 
                type="button"
                onClick={() => setFormData({...formData, attending: 'no'})}
                className={`py-6 border-[4px] border-black font-display text-3xl uppercase transition-all rounded-2xl shadow-brutal ${formData.attending === 'no' ? 'bg-brutal-orange text-white scale-105 rotate-1 shadow-brutal-lg' : 'bg-white hover:bg-stone-50'}`}
              >
                UNFORTUNATELY NO
              </button>
            </div>
          </div>

          <div className="bg-brutal-purple/10 p-8 border-[4px] border-black rounded-2xl flex items-center justify-between group">
            <div className="space-y-1">
               <label className="font-display text-2xl uppercase">PLUS ONE?</label>
               <p className="font-black text-[10px] text-stone-500 uppercase tracking-widest group-hover:text-black transition-colors">BRINGING A GUEST TO THE STADIUM?</p>
            </div>
            <button 
              type="button"
              onClick={() => setFormData({...formData, plusOne: !formData.plusOne})}
              className={`w-20 h-10 rounded-full border-[4px] border-black relative transition-all ${formData.plusOne ? 'bg-black' : 'bg-white'}`}
            >
              <div className={`absolute top-1 w-6 h-6 rounded-full border-2 border-black transition-all ${formData.plusOne ? 'left-11 bg-brutal-green' : 'left-1 bg-stone-200'}`} />
            </button>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2 font-black uppercase text-sm tracking-widest text-brutal-purple">
               <span className="w-6 h-6 bg-brutal-purple border-2 border-black rounded-full inline-block"></span>
               SELECT YOUR FEAST
            </label>
            <select 
              className="w-full bg-white border-[4px] border-black p-6 font-display text-2xl uppercase appearance-none cursor-pointer shadow-brutal rounded-2xl focus:ring-4 focus:ring-brutal-purple transition-all"
              value={formData.meal}
              onChange={(e) => setFormData({...formData, meal: e.target.value})}
            >
              <option>STANDARD (CHEF'S SPECIAL)</option>
              <option>VEGETARIAN (LUSH GARDEN)</option>
              <option>VEGAN (PLANT POWER)</option>
              <option>GLUTEN-FREE (WHEAT FREE)</option>
            </select>
          </div>

          <button 
            type="submit"
            className="w-full bg-black text-white py-8 font-display text-4xl border-[4px] border-black shadow-brutal-lg hover:translate-x-1 hover:translate-y-1 hover:shadow-brutal transition-all uppercase rounded-2xl active:scale-95"
          >
            SEND RESPONSE! 💌
          </button>
        </form>
      </div>
    </div>
  );
};

export default RSVP;