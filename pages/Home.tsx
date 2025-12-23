
import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';

// --- Vercel 部署静态资源引用 ---
// 请确保这些文件直接放在你的项目根目录下
const IMAGES = {
  BRIDE_HERO: "./bride.jpg", 
  GROOM_HERO: "./groom.jpg", 
  COLLAGE_1: "./photo1.jpg",  
  COLLAGE_2: "./photo2.jpg",  
  COLLAGE_3: "./photo3.jpg",  
  VENUE: "./venue.jpg",     
};

const ImageWithFallback: React.FC<{ src: string, alt: string, className?: string }> = ({ src, alt, className }) => {
  const [error, setError] = React.useState(false);
  return (
    <div className={`relative overflow-hidden ${className} ${error ? 'bg-brutal-orange/20' : ''}`}>
      {!error ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover transition-all duration-500"
          onError={() => setError(true)}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
          <span className="text-4xl mb-2">📸</span>
          <p className="text-[10px] font-black uppercase leading-tight">Image Missing:<br/>{src.replace('./', '')}</p>
        </div>
      )}
    </div>
  );
};

const Sticker: React.FC<{ children: React.ReactNode, color: string, className?: string, rotate?: string }> = ({ children, color, className, rotate = "rotate-0" }) => (
  <div className={`absolute pointer-events-none sm:pointer-events-auto sticker-hover cursor-default z-20 hidden lg:flex items-center justify-center px-4 py-2 border-[3px] border-black shadow-brutal font-display uppercase text-sm ${color} ${rotate} ${className}`}>
    {children}
  </div>
);

const PhotoAvatar: React.FC<{ src: string, name: string, type: 'bride' | 'groom', className?: string }> = ({ src, name, type, className }) => (
  <div className={`relative w-48 h-48 md:w-64 md:h-64 group ${className}`}>
    <div className="absolute inset-0 bg-black rounded-3xl translate-x-3 translate-y-3"></div>
    <div className={`relative inset-0 w-full h-full rounded-3xl border-[4px] border-black overflow-hidden ${type === 'bride' ? 'bg-brutal-pink' : 'bg-brutal-blue'}`}>
      <ImageWithFallback src={src} alt={name} className="w-full h-full" />
      <div className="absolute inset-0 border-[12px] border-white/20 pointer-events-none"></div>
    </div>
    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white border-[3px] border-black px-6 py-2 font-display text-xl shadow-brutal whitespace-nowrap group-hover:bg-brutal-yellow transition-colors z-10">
      {name}
    </div>
  </div>
);

const Home: React.FC = () => {
  const { content } = useContent();
  
  return (
    <div className="relative pb-32 overflow-hidden">
      <Sticker color="bg-brutal-pink" className="top-40 left-10" rotate="-rotate-12">❤️ Long Story Short</Sticker>
      <Sticker color="bg-brutal-green" className="top-24 right-20" rotate="rotate-6">Touchdown '26 🏟️</Sticker>
      <Sticker color="bg-brutal-yellow" className="bottom-[40%] left-24" rotate="rotate-12">Electric City 🎸</Sticker>
      <Sticker color="bg-brutal-purple" className="bottom-[30%] right-10 text-white" rotate="-rotate-6">Better than Revenge ✨</Sticker>

      <div className="bg-brutal-orange text-white py-4 border-y-[4px] border-black overflow-hidden mt-12 mb-12 transform -rotate-1 shadow-brutal">
        <div className="animate-marquee inline-block">
          <span className="font-inline text-3xl mx-12">SEPTEMBER 2026 • NASHVILLE, TN • TAYLOR & TRAVIS • THE LOVE STORY CONTINUES • STADIUM VIBES • </span>
          <span className="font-inline text-3xl mx-12">SEPTEMBER 2026 • NASHVILLE, TN • TAYLOR & TRAVIS • THE LOVE STORY CONTINUES • STADIUM VIBES • </span>
        </div>
      </div>

      <section className="px-6 pt-12 flex flex-col items-center relative">
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 mb-16">
          <PhotoAvatar src={IMAGES.BRIDE_HERO} name="TAYLOR" type="bride" className="rotate-[-5deg] animate-floating" />
          <div className="font-display text-7xl text-brutal-pink animate-springy">+</div>
          <PhotoAvatar src={IMAGES.GROOM_HERO} name="TRAVIS" type="groom" className="rotate-[5deg] animate-floating-delay-1" />
        </div>

        <div className="relative mb-20 text-center">
          <div className="absolute top-2 left-2 text-brutal-blue font-display text-[4rem] md:text-[8rem] opacity-20 select-none">TAYLOR + TRAVIS</div>
          <h1 className="relative font-display text-[4rem] md:text-[8rem] text-black tracking-tighter leading-none">
            TAYLOR <span className="text-brutal-pink">&</span> TRAVIS
          </h1>
          <p className="mt-8 font-black text-2xl uppercase italic text-stone-600 bg-brutal-yellow inline-block px-4 py-2 border-[3px] border-black shadow-brutal rotate-1">
            "{content.mainQuote}"
          </p>
        </div>
      </section>

      <section className="px-6 mb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
           <div className="relative group rotate-[-3deg] hover:rotate-0 transition-all duration-500 animate-floating">
             <div className="absolute inset-0 bg-brutal-blue border-[4px] border-black translate-x-3 translate-y-3 rounded-2xl"></div>
             <ImageWithFallback src={IMAGES.COLLAGE_1} alt="Taylor" className="relative border-[4px] border-black rounded-2xl w-full aspect-[3/4] shadow-xl" />
           </div>
           <div className="relative group rotate-[2deg] hover:rotate-0 transition-all duration-500 z-10 scale-110 animate-floating-delay-1">
             <div className="absolute inset-0 bg-brutal-pink border-[4px] border-black translate-x-3 translate-y-3 rounded-2xl"></div>
             <ImageWithFallback src={IMAGES.COLLAGE_2} alt="Couple" className="relative border-[4px] border-black rounded-2xl w-full aspect-[3/4] shadow-2xl" />
           </div>
           <div className="relative group rotate-[-2deg] hover:rotate-0 transition-all duration-500 animate-floating-delay-2">
             <div className="absolute inset-0 bg-brutal-yellow border-[4px] border-black translate-x-3 translate-y-3 rounded-2xl"></div>
             <ImageWithFallback src={IMAGES.COLLAGE_3} alt="Travis" className="relative border-[4px] border-black rounded-2xl w-full aspect-[3/4] shadow-xl" />
           </div>
        </div>
      </section>

      <section className="px-6 mb-32 relative">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute inset-0 bg-brutal-pink border-[4px] border-black translate-x-4 translate-y-4 rounded-3xl"></div>
          <div className="relative bg-[#fffef0] border-[4px] border-black p-8 md:p-20 text-center flex flex-col items-center rounded-3xl overflow-hidden shadow-brutal-xl">
            <div className="absolute top-6 right-6 w-20 h-24 border-[3px] border-black bg-brutal-orange p-2 rotate-12 flex flex-col items-center justify-center">
               <div className="text-[10px] font-black uppercase text-white mb-1">USA 2026</div>
               <div className="w-full h-full border border-white flex items-center justify-center font-display text-white">T+T</div>
            </div>
            <div className="w-20 h-20 border-[3px] border-black rounded-full mb-10 flex items-center justify-center bg-brutal-yellow shadow-brutal">
               <span className="font-serif italic text-4xl text-black">&</span>
            </div>
            <div className="space-y-6 mb-12 z-10">
              <h2 className="font-serif text-3xl md:text-5xl italic leading-tight text-stone-800">
                Together with their families,<br/>
                <span className="font-black text-black not-italic underline decoration-brutal-pink decoration-4 underline-offset-8">Taylor Alison Swift</span> & <br/>
                <span className="font-black text-black not-italic underline decoration-brutal-blue decoration-4 underline-offset-8">Travis Michael Kelce</span><br/>
                invite you to celebrate their love.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 w-full mb-12">
               <div className="bg-brutal-green border-[3px] border-black p-6 rounded-2xl shadow-brutal -rotate-2">
                  <div className="text-xs font-black uppercase tracking-widest text-stone-500 mb-2">WHEN</div>
                  <div className="font-display text-2xl">SEPTEMBER 26, 2026</div>
                  <div className="font-black italic">CEREMONY AT 4:30 PM</div>
               </div>
               <div className="bg-brutal-blue text-white border-[3px] border-black p-6 rounded-2xl shadow-brutal rotate-2">
                  <div className="text-xs font-black uppercase tracking-widest opacity-70 mb-2">WHERE</div>
                  <div className="font-display text-2xl">CENTENNIAL GREENHOUSE</div>
                  <div className="font-black italic">NASHVILLE, TENNESSEE</div>
               </div>
            </div>
            <Link to="/rsvp" className="group relative">
               <div className="absolute inset-0 bg-black rounded-xl translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all"></div>
               <div className="relative bg-white border-[4px] border-black px-12 py-5 font-display text-3xl uppercase tracking-widest text-black hover:bg-brutal-pink transition-colors rounded-xl">
                  YES, I'M IN!
               </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 mb-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
             <div className="h-[4px] bg-black flex-grow"></div>
             <h3 className="font-display text-6xl uppercase text-brutal-pink bg-white px-8 border-[4px] border-black shadow-brutal rotate-[-2deg]">THE LINEUP</h3>
             <div className="h-[4px] bg-black flex-grow"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             {[
               { time: '16:30', event: 'THE VOWS', desc: 'The "I Dos"', color: 'bg-brutal-pink' },
               { time: '18:00', event: 'COCKTAILS', desc: 'Acoustic Sets', color: 'bg-brutal-yellow' },
               { time: '19:30', event: 'THE FEAST', desc: 'Dinner & Toasts', color: 'bg-brutal-blue text-white' },
               { time: '21:00', event: 'AFTERPARTY', desc: 'Reputation Vibes', color: 'bg-brutal-purple text-white' }
             ].map((item, idx) => (
               <div key={idx} className={`${item.color} border-[4px] border-black p-8 rounded-3xl shadow-brutal hover:scale-105 transition-transform relative overflow-hidden group`}>
                  <div className="absolute top-0 right-0 w-12 h-12 bg-black/10 rounded-bl-3xl group-hover:w-full group-hover:h-full transition-all"></div>
                  <div className="bg-white text-black border-2 border-black px-3 py-1 inline-block font-black text-sm mb-6 rounded-lg relative">{item.time}</div>
                  <div className="font-display text-3xl mb-1 relative uppercase">{item.event}</div>
                  <div className="font-black uppercase text-xs opacity-80 italic relative">{item.desc}</div>
               </div>
             ))}
          </div>
        </div>
      </section>

      <section className="px-6">
        <div className="max-w-6xl mx-auto bg-white border-[4px] border-black rounded-[3rem] p-12 relative overflow-hidden shadow-brutal-lg">
           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #23a094, #23a094 10px, transparent 10px, transparent 20px)' }}></div>
           <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                 <div className="bg-brutal-orange text-white inline-block px-4 py-2 border-[3px] border-black font-display text-2xl mb-6 shadow-brutal rotate-[-2deg]">THE VENUE</div>
                 <h4 className="font-display text-4xl mb-6 tracking-tight">CENTENNIAL GREENHOUSE @ NASHVILLE ESTATE</h4>
                 <p className="font-bold text-lg leading-relaxed mb-8">
                    A glass oasis in the heart of music city. Lush greens, high ceilings, and enough space for a championship celebration.
                 </p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-brutal-yellow/10 p-6 border-[3px] border-black shadow-brutal rounded-2xl">
                       <div className="w-10 h-10 border-[3px] border-black bg-brutal-yellow flex items-center justify-center font-black mb-3">P</div>
                       <p className="font-black uppercase text-xs">VALET AT "LOVER'S LANE" GATE</p>
                    </div>
                    <div className="bg-brutal-pink/10 p-6 border-[3px] border-black shadow-brutal rounded-2xl">
                       <div className="w-10 h-10 border-[3px] border-black bg-brutal-pink flex items-center justify-center font-black mb-3">!</div>
                       <p className="font-black uppercase text-xs">NASHVILLE GOLD ENTRANCE ONLY</p>
                    </div>
                 </div>
              </div>
              <div className="relative group animate-floating-delay-3">
                 <div className="absolute inset-0 bg-brutal-blue border-[4px] border-black translate-x-4 translate-y-4 rounded-[2rem]"></div>
                 <div className="relative bg-black border-[4px] border-black p-1 rounded-[2rem] overflow-hidden aspect-video transition-transform group-hover:scale-[1.02]">
                    <ImageWithFallback src={IMAGES.VENUE} alt="Venue" className="w-full h-full opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent flex items-end p-6">
                       <p className="text-white font-display text-2xl">2500 WEST END AVE</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
