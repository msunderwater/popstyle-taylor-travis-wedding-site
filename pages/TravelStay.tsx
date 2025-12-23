
import React from 'react';

const TravelStay: React.FC = () => {
  return (
    <div className="bg-brutal-pink/5 pt-20 pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24 relative">
          <h2 className="font-display text-7xl md:text-[10rem] text-brutal-blue leading-none mb-4 rotate-1">Getting Here</h2>
          <div className="inline-block bg-brutal-pink text-white px-8 py-3 font-black uppercase text-xl -rotate-2 border-[4px] border-black shadow-brutal">
            The Nashville Guide
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Air Travel */}
          <div className="bg-white border-[4px] border-black p-8 hover:translate-y-[-8px] transition-transform shadow-brutal-lg rounded-[2rem]">
             <div className="w-16 h-16 bg-brutal-orange rounded-full flex items-center justify-center mb-6 border-[3px] border-black shadow-brutal">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             <h4 className="font-display text-3xl mb-4 uppercase">Air & Transit</h4>
             <div className="space-y-4">
                <p className="font-black text-brutal-pink uppercase italic">FLY INTO BNA</p>
                <p className="text-sm font-bold">Nashville International is only 15 mins from the estate. Grab an Uber or use our exclusive shuttle!</p>
                <div className="bg-brutal-yellow/20 p-4 border-2 border-black border-dashed rounded-xl">
                  <p className="font-black text-xs uppercase mb-1">The Lavender Shuttle</p>
                  <p className="text-xs italic font-bold">Leaves BNA every 30 mins on Friday between 10 AM - 6 PM.</p>
                </div>
             </div>
          </div>

          {/* Where to Stay */}
          <div className="bg-white border-[4px] border-black p-8 hover:translate-y-[-8px] transition-transform shadow-brutal-lg rounded-[2rem]">
             <div className="w-16 h-16 bg-brutal-pink rounded-full flex items-center justify-center mb-6 border-[3px] border-black shadow-brutal">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
             </div>
             <h4 className="font-display text-3xl mb-4 uppercase">Stay Stylish</h4>
             <div className="space-y-6">
                <div className="group cursor-pointer">
                  <p className="font-black text-brutal-pink text-lg uppercase underline decoration-2">THE HERMITAGE HOTEL</p>
                  <p className="text-sm font-bold">Use code "KITCHENLIGHTS" for our block rate. The most historic stay in town.</p>
                </div>
                <div className="group cursor-pointer">
                  <p className="font-black text-brutal-blue text-lg uppercase underline decoration-2">NOELLE NASHVILLE</p>
                  <p className="text-sm font-bold">Modern, artsy, and right in the heart of the action. Highly recommended!</p>
                </div>
             </div>
          </div>

          {/* Local Spots */}
          <div className="bg-white border-[4px] border-black p-8 hover:translate-y-[-8px] transition-transform shadow-brutal-lg rounded-[2rem]">
             <div className="w-16 h-16 bg-brutal-blue rounded-full flex items-center justify-center mb-6 border-[3px] border-black shadow-brutal">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
             </div>
             <h4 className="font-display text-3xl mb-4 uppercase">The Hot List</h4>
             <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="bg-brutal-yellow border-2 border-black text-black px-2 py-0.5 font-black text-[10px] rounded uppercase">FOOD</span>
                  <p className="text-sm font-bold">Hattie B's Hot Chicken</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="bg-brutal-pink border-2 border-black text-white px-2 py-0.5 font-black text-[10px] rounded uppercase">TUNE</span>
                  <p className="text-sm font-bold">The Bluebird Cafe (Book early!)</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="bg-brutal-blue border-2 border-black text-white px-2 py-0.5 font-black text-[10px] rounded uppercase">CHILL</span>
                  <p className="text-sm font-bold">Arrington Vineyards</p>
                </div>
             </div>
          </div>
        </div>

        {/* Driving Section */}
        <div className="mt-20 bg-black text-white p-12 md:p-20 border-[8px] border-brutal-yellow shadow-brutal-xl relative rounded-[3rem] overflow-hidden">
          <div className="absolute inset-0 checkered opacity-10"></div>
          <div className="relative z-10 md:flex items-center justify-between">
            <div className="max-w-xl">
              <h3 className="font-display text-6xl mb-6 text-brutal-yellow italic uppercase">Driving In?</h3>
              <p className="text-xl mb-8 font-bold leading-relaxed">
                If you're road-tripping to Nashville, follow I-40 East or West directly to West End. Parking at Centennial Greenhouse is limited, so we highly recommend using the valet service provided at our gate.
              </p>
              <div className="flex space-x-4">
                <button className="bg-brutal-pink text-white px-10 py-4 font-black uppercase text-sm border-[3px] border-white shadow-brutal-lg hover:bg-white hover:text-black transition-all rounded-xl">Open in Maps</button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-64 h-64 border-[6px] border-brutal-blue rotate-12 flex items-center justify-center bg-white text-black font-display text-5xl shadow-brutal-xl rounded-[2rem]">ROAD TRIP!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelStay;
