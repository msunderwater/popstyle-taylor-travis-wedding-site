
import React from 'react';

const WeddingDetails: React.FC = () => {
  return (
    <div className="bg-brutal-yellow/5 min-h-screen pt-20 pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 font-display text-[12rem] text-brutal-pink opacity-5 select-none pointer-events-none">DETAILS</div>
          <h2 className="font-display text-7xl md:text-9xl text-brutal-pink -rotate-2 relative z-10">The Big Day</h2>
          <div className="bg-brutal-blue text-white px-6 py-2 inline-block font-sans font-black uppercase mt-4 rotate-1 border-[4px] border-black shadow-brutal">
            Saturday, Sept 26, 2026
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Venue Specifics */}
          <div className="bg-white border-[4px] border-black p-10 shadow-brutal-lg rounded-[2rem]">
             <h3 className="font-display text-5xl text-brutal-blue mb-6 italic">The Venue</h3>
             <div className="space-y-6">
                <div>
                   <p className="font-black text-brutal-pink uppercase tracking-widest text-sm mb-1">Location</p>
                   <p className="font-display text-3xl leading-none mb-2">The Centennial Greenhouse</p>
                   <p className="font-bold text-lg font-bold">@ Nashville Historic Estate</p>
                   <p className="text-stone-600">2500 West End Ave, Nashville, TN 37203</p>
                </div>
                <div className="bg-brutal-yellow/10 p-6 border-2 border-dashed border-black rounded-2xl">
                  <p className="font-black text-sm mb-2 uppercase">Pro Tip:</p>
                  <p className="text-sm italic font-medium">Use the "Nashville Gold" entrance. Valet starts 1 hour before the ceremony. Look for the giant floral arches!</p>
                </div>
             </div>
          </div>

          {/* Schedule */}
          <div className="bg-brutal-pink text-white border-[4px] border-black p-10 shadow-brutal-lg rounded-[2rem]">
             <h3 className="font-display text-5xl mb-6 italic">The Vibe</h3>
             <ul className="space-y-8 uppercase tracking-tighter">
                {[
                  { time: '04:30 PM', label: "The Vows (I Do's)" },
                  { time: '06:00 PM', label: "Cocktails & Acoustic Sets" },
                  { time: '07:30 PM', label: "Dinner & Speeches" },
                  { time: '09:00 PM', label: "Party Til The End" },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-4 group">
                    <span className="text-3xl font-display text-brutal-yellow group-hover:scale-110 transition-transform">{item.time}</span>
                    <span className="text-xl font-black">{item.label}</span>
                  </li>
                ))}
             </ul>
          </div>
        </div>

        {/* Dress Code Section */}
        <div className="bg-brutal-blue text-white border-[6px] border-black p-12 text-center rounded-[3rem] relative overflow-hidden shadow-brutal-xl">
          <div className="absolute top-0 left-0 w-20 h-20 bg-brutal-yellow -translate-x-10 -translate-y-10 rotate-45"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-brutal-pink translate-x-10 translate-y-10 rotate-45"></div>
          
          <h3 className="font-display text-6xl mb-6 drop-shadow-md uppercase">What to Wear?</h3>
          <p className="text-2xl font-black italic mb-4 text-brutal-yellow uppercase tracking-widest">"Formal with Main Character Energy"</p>
          <p className="max-w-2xl mx-auto text-lg opacity-90 font-bold leading-relaxed">
            Think sequins, bold colors, and velvet. Travis wants to see your best suits; Taylor wants to see your brightest sparkles. No boring outfits allowed!
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeddingDetails;
