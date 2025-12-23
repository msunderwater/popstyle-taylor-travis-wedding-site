
import React from 'react';

const ImageWithFallback: React.FC<{ src: string, alt: string, className?: string }> = ({ src, alt, className }) => {
  const [error, setError] = React.useState(false);
  return (
    <div className={`relative overflow-hidden ${className} ${error ? 'bg-brutal-purple/20' : ''}`}>
      {!error ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover transition-all duration-700"
          onError={() => setError(true)}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
          <span className="text-6xl mb-4">📖</span>
          <p className="font-black uppercase">Missing Story Photo</p>
          <p className="text-[10px] opacity-50">{src}</p>
        </div>
      )}
    </div>
  );
};

const OurStory: React.FC = () => {
  return (
    <div className="bg-brutal-purple/5 min-h-screen pt-20 pb-32 px-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative">
        <div className="absolute top-0 right-0 font-display text-[15rem] text-brutal-pink opacity-10 select-none -z-0">LOVE</div>
        <div className="absolute bottom-40 left-0 font-display text-[15rem] text-brutal-blue opacity-10 select-none -z-0 rotate-90">STORY</div>

        <header className="mb-40 relative z-10 flex flex-col items-center md:items-start">
           <div className="inline-block bg-white border-[6px] border-black p-12 shadow-brutal-xl -rotate-2 rounded-[3rem]">
             <h2 className="font-display text-7xl md:text-[10rem] uppercase tracking-tighter leading-none">
               THE <span className="text-brutal-orange underline decoration-black decoration-[8px]">LEGEND</span>
             </h2>
           </div>
           <div className="mt-8 bg-brutal-green px-6 py-2 border-[4px] border-black font-black uppercase text-2xl rotate-1 shadow-brutal">
             A Stadium Symphony
           </div>
        </header>

        <div className="space-y-48">
           <div className="grid md:grid-cols-2 gap-20 items-center relative z-10">
              <div className="relative group animate-floating">
                 <div className="absolute inset-0 bg-brutal-blue border-[4px] border-black translate-x-6 translate-y-6 rounded-[3rem]"></div>
                 <div className="absolute inset-0 bg-brutal-yellow border-[4px] border-black translate-x-3 translate-y-3 rounded-[3rem]"></div>
                 <div className="relative bg-white border-[4px] border-black p-2 rounded-[3rem] overflow-hidden aspect-square group-hover:scale-[0.98] transition-transform">
                    <ImageWithFallback src="./story1.jpg" alt="Two Worlds" className="w-full h-full" />
                    <div className="absolute top-10 left-10 bg-brutal-pink text-white font-display text-5xl p-4 border-[3px] border-black shadow-brutal -rotate-12">POW!</div>
                 </div>
              </div>
              <div className="space-y-12">
                 <div className="bg-white border-[6px] border-black p-10 shadow-brutal-lg rotate-1 rounded-[3rem]">
                   <h4 className="font-display text-5xl text-black uppercase tracking-tighter mb-6">QUIET ROOMS <br/> & MILLIONS</h4>
                   <p className="font-bold text-xl leading-relaxed italic text-stone-600">
                     "They met at a moment when both were standing at the top of their own worlds — one built on lyrics, the other on stadium lights."
                   </p>
                 </div>
                 <p className="font-display text-3xl leading-relaxed uppercase tracking-tight text-brutal-blue">
                   Two superstars finding a way back to themselves, together.
                 </p>
              </div>
           </div>

           <div className="grid md:grid-cols-2 gap-20 items-center relative z-10 flex-row-reverse">
              <div className="md:order-2 relative group animate-floating-delay-2">
                 <div className="absolute inset-0 bg-brutal-orange border-[4px] border-black -translate-x-6 translate-y-6 rounded-[3rem]"></div>
                 <div className="absolute inset-0 bg-brutal-green border-[4px] border-black -translate-x-3 translate-y-3 rounded-[3rem]"></div>
                 <div className="relative bg-white border-[4px] border-black p-2 rounded-[3rem] overflow-hidden aspect-square group-hover:scale-[0.98] transition-transform">
                    <ImageWithFallback src="./story2.jpg" alt="The Calm" className="w-full h-full" />
                    <div className="absolute bottom-10 right-10 bg-brutal-yellow text-black font-display text-5xl p-4 border-[3px] border-black shadow-brutal rotate-6">WHAM!</div>
                 </div>
              </div>
              <div className="md:order-1 space-y-12">
                 <div className="bg-brutal-pink text-white border-[6px] border-black p-10 shadow-brutal-lg -rotate-1 rounded-[3rem]">
                   <h4 className="font-display text-5xl uppercase tracking-tighter mb-6">THE CALM <br/> IN THE CHAOS</h4>
                   <p className="font-bold text-xl leading-relaxed italic">
                     "What surprised them most wasn't the attention, but the calm. Between tour schedules and game days, they found something grounding: laughter without performance."
                   </p>
                 </div>
                 <div className="flex gap-4">
                    <div className="bg-black text-white p-4 font-black uppercase text-xs rounded-xl shadow-brutal">NO CONDITIONS</div>
                    <div className="bg-white border-[3px] border-black p-4 font-black uppercase text-xs rounded-xl shadow-brutal">JUST US</div>
                 </div>
              </div>
           </div>

           <div className="grid md:grid-cols-2 gap-20 items-center relative z-10">
              <div className="relative group animate-floating-delay-1">
                 <div className="absolute inset-0 bg-brutal-purple border-[4px] border-black translate-x-6 translate-y-6 rounded-[3rem]"></div>
                 <div className="absolute inset-0 bg-brutal-orange border-[4px] border-black translate-x-3 translate-y-3 rounded-[3rem]"></div>
                 <div className="relative bg-white border-[4px] border-black p-2 rounded-[3rem] overflow-hidden aspect-square group-hover:scale-[0.98] transition-transform">
                    <ImageWithFallback src="./story3.jpg" alt="Forever Starts Now" className="w-full h-full" />
                    <div className="absolute top-10 left-10 bg-brutal-green text-white font-display text-5xl p-4 border-[3px] border-black shadow-brutal -rotate-3">BOOM!</div>
                 </div>
              </div>
              <div className="space-y-12">
                 <div className="bg-brutal-blue text-white border-[6px] border-black p-10 shadow-brutal-lg rotate-1 rounded-[3rem]">
                   <h4 className="font-display text-5xl uppercase tracking-tighter mb-6">FOREVER <br/> STARTS NOW</h4>
                   <p className="font-bold text-xl leading-relaxed italic">
                     "The proposal wasn't planned for cameras or crowds. It was just them, under stadium lights after a game, when he realized this was home. She said yes before he finished the question."
                   </p>
                 </div>
                 <div className="flex gap-4">
                    <div className="bg-brutal-yellow text-black p-4 font-black uppercase text-xs rounded-xl shadow-brutal border-[3px] border-black">TEAM FOREVER</div>
                    <div className="bg-brutal-pink text-white p-4 font-black uppercase text-xs rounded-xl shadow-brutal border-[3px] border-black">ENDGAME</div>
                 </div>
              </div>
           </div>
        </div>

        <div className="mt-48 text-center relative z-10">
          <div className="bg-white border-[6px] border-black p-16 md:p-32 rounded-[5rem] shadow-brutal-xl relative overflow-hidden group">
             <div className="absolute inset-0 checkered opacity-5 group-hover:opacity-10 transition-opacity"></div>
             <p className="relative font-display text-4xl md:text-6xl text-black leading-tight z-10 uppercase tracking-tight">
               "This wedding isn't the <span className="text-brutal-orange">finale</span>. <br/> 
               It's the <span className="text-brutal-pink">pause</span> before the <br/>
               next <span className="text-brutal-blue underline decoration-4">verse</span>."
             </p>
             <div className="mt-12 flex justify-center gap-4 relative z-10">
                <div className="w-16 h-16 bg-brutal-yellow border-[3px] border-black rounded-full flex items-center justify-center font-display text-3xl shadow-brutal">🎶</div>
                <div className="w-16 h-16 bg-brutal-green border-[3px] border-black rounded-full flex items-center justify-center font-display text-3xl shadow-brutal">🏉</div>
                <div className="w-16 h-16 bg-brutal-pink border-[3px] border-black rounded-full flex items-center justify-center font-display text-3xl shadow-brutal">💖</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
