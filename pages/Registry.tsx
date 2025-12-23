import React, { useState } from 'react';
import { INITIAL_REGISTRY } from '../constants';

const Registry: React.FC = () => {
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [guestName, setGuestName] = useState('');
  const [registryItems, setRegistryItems] = useState(INITIAL_REGISTRY);

  // Filter out claimed items for guests
  const availableItems = registryItems.filter(item => !item.claimedBy);

  const handleClaim = (item: any) => {
    setSelectedItem(item);
    setClaimModalOpen(true);
  };

  const submitClaim = () => {
    if (guestName.trim() && selectedItem) {
      const updatedItems = registryItems.map(item => 
        item.id === selectedItem.id 
          ? { ...item, claimedBy: guestName.trim(), claimedAt: new Date().toISOString().split('T')[0] }
          : item
      );
      setRegistryItems(updatedItems);
      setClaimModalOpen(false);
      setGuestName('');
      setSelectedItem(null);
      alert(`Thank you ${guestName}! Your gift has been registered. Taylor & Travis will be so excited!`);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16 relative">
          <div className="bg-brutal-pink border-[4px] border-black p-6 rotate-1 shadow-brutal-lg mb-8 rounded-[2rem] inline-block relative transition-transform hover:rotate-0">
             <div className="absolute -top-8 -right-8 w-16 h-16 bg-brutal-yellow border-[3px] border-black rounded-full flex items-center justify-center font-display text-2xl animate-springy shadow-brutal">🎁</div>
             <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-none text-black px-4">REGISTRY</h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <p className="font-display text-xl md:text-2xl italic uppercase text-stone-800 leading-tight">
              "YOU'RE THE REAL GIFT... BUT WE ALSO LIKE COOL STUFF!"
            </p>
          </div>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {availableItems.map((item, idx) => (
            <div key={item.id} className="group relative animate-floating">
               {/* Background Shadow Layer */}
               <div className={`absolute inset-0 border-[4px] border-black rounded-[2rem] translate-x-4 translate-y-4 transition-all group-hover:translate-x-2 group-hover:translate-y-2 ${
                 idx % 3 === 0 ? 'bg-brutal-green' : idx % 3 === 1 ? 'bg-brutal-orange' : 'bg-brutal-blue'
               }`}></div>
               
               {/* Main Card */}
               <div className="relative bg-white border-[4px] border-black rounded-[2rem] overflow-hidden flex flex-col h-full transition-transform group-hover:scale-[0.98]">
                  <div className={`h-64 border-b-[4px] border-black flex items-center justify-center p-12 transition-colors ${
                    idx % 3 === 0 ? 'bg-brutal-green/10 group-hover:bg-brutal-green/30' : 
                    idx % 3 === 1 ? 'bg-brutal-orange/10 group-hover:bg-brutal-orange/30' : 
                    'bg-brutal-blue/10 group-hover:bg-brutal-blue/30'
                  }`}>
                    <div className="relative">
                       <span className="font-display text-[8rem] text-black/5 uppercase select-none">{item.name[0]}</span>
                       <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-32 h-32 bg-white border-[4px] border-black rounded-3xl shadow-brutal flex items-center justify-center font-display text-6xl rotate-3 group-hover:rotate-12 transition-transform">
                             {item.icon || '🎁'}
                          </div>
                       </div>
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="space-y-3 mb-6">
                       <h4 className="font-display text-3xl uppercase tracking-tighter leading-none">{item.name}</h4>
                       <div className="flex flex-col gap-2">
                         {item.brand && <p className="font-black uppercase text-xs text-stone-400">{item.brand}</p>}
                         {item.modelColor && <p className="font-bold text-xs text-stone-600">{item.modelColor}</p>}
                       </div>
                    </div>
                    
                    <div className="mt-auto space-y-4">
                      {item.url && (
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] font-black uppercase text-brutal-blue underline block hover:text-brutal-pink transition-colors"
                        >
                          View Product Page →
                        </a>
                      )}
                      <div className="flex justify-between items-center bg-stone-50 p-4 border-[3px] border-black rounded-2xl">
                        <span className="font-display text-3xl">{item.priceRange}</span>
                        <button 
                          onClick={() => handleClaim(item)}
                          className="bg-black text-white px-6 py-3 font-display text-sm border-[2px] border-black shadow-brutal hover:bg-brutal-pink hover:text-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-xl uppercase tracking-widest"
                        >
                          GIFT IT!
                        </button>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          ))}
        </div>
        
        {/* Claim Modal */}
        {claimModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <div className="bg-white border-[6px] border-black shadow-brutal-xl rounded-[3rem] p-12 max-w-md w-full animate-springy">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-brutal-green border-[4px] border-black rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🎁</div>
                <h3 className="font-display text-3xl uppercase mb-2">Claim This Gift</h3>
                <p className="font-bold text-lg">{selectedItem?.name}</p>
                <p className="text-brutal-orange font-black text-sm uppercase">{selectedItem?.priceRange}</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-stone-400 mb-2">
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full border-[3px] border-black p-4 rounded-xl focus:bg-brutal-yellow outline-none font-bold text-xl" 
                    placeholder="e.g. Sarah Johnson"
                    autoFocus
                  />
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={submitClaim}
                    disabled={!guestName.trim()}
                    className="flex-grow bg-black text-white py-4 font-display text-xl uppercase tracking-widest border-[4px] border-black shadow-brutal hover:bg-brutal-green hover:text-black rounded-2xl disabled:opacity-50 disabled:hover:bg-black disabled:hover:text-white transition-all"
                  >
                    Claim Gift
                  </button>
                  <button 
                    onClick={() => {
                      setClaimModalOpen(false);
                      setGuestName('');
                      setSelectedItem(null);
                    }}
                    className="px-6 border-[4px] border-black font-black uppercase text-sm rounded-2xl hover:bg-stone-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Registry;