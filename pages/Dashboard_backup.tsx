import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { INITIAL_GUESTS, INITIAL_REGISTRY } from '../constants';
import { Guest, RegistryItem } from '../types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path || (path !== '/dashboard' && location.pathname.startsWith(path));
    return `flex items-center px-8 py-4 transition-all duration-300 text-sm font-bold ${
      isActive 
      ? 'bg-stone-700 text-brutal-pink border-r-[6px] border-brutal-pink translate-x-1' 
      : 'text-stone-400 hover:bg-stone-700 hover:text-stone-100'
    }`;
  };
  
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Top Bar with Exit Button */}
      <div className="bg-stone-800 text-white p-4 border-b-[4px] border-black flex justify-between items-center">
        <div className="bg-brutal-yellow p-2 border-[2px] border-black shadow-brutal inline-block -rotate-1">
          <h2 className="font-display text-xl text-black">ADMIN DASHBOARD</h2>
        </div>
        <button 
          onClick={() => navigate('/')} 
          className="group relative overflow-hidden bg-brutal-blue text-black border-[3px] border-black px-6 py-3 text-xs uppercase font-black tracking-widest shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-xl active:scale-95"
        >
          <span className="relative z-10">EXIT TO SITE</span>
          <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </div>

      <div className="flex flex-grow">
        <aside className="w-72 bg-stone-800 text-stone-300 flex flex-col hidden md:flex border-r-[4px] border-black relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-1 bg-brutal-pink animate-pulse"></div>
          
          <nav className="flex-grow mt-8 uppercase tracking-tighter">
            <Link to="/dashboard" className={getLinkClass('/dashboard')}>Overview</Link>
            <Link to="/dashboard/guests" className={getLinkClass('/dashboard/guests')}>Guests & RSVP</Link>
            <Link to="/dashboard/registry" className={getLinkClass('/dashboard/registry')}>Registry Manager</Link>
            <Link to="/dashboard/editor" className={getLinkClass('/dashboard/editor')}>Content Editor</Link>
            <Link to="/dashboard/security" className={getLinkClass('/dashboard/security')}>Security</Link>
          </nav>
        </aside>

        <main className="flex-grow overflow-auto">
          <div className="p-8 max-w-7xl mx-auto">
            <Routes>
              <Route index element={<Overview />} />
              <Route path="guests" element={<GuestList />} />
              <Route path="registry" element={<RegistryManager />} />
              <Route path="editor" element={<ContentEditor />} />
              <Route path="security" element={<SecuritySettings />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

const Overview = () => {
  const attendingCount = INITIAL_GUESTS.filter(g => g.attending === true).length;
  const claimedCount = INITIAL_REGISTRY.filter(item => item.claimedBy).length;

  const rsvpActivities = [...INITIAL_GUESTS].sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  const registryActivities = INITIAL_REGISTRY.filter(r => r.claimedBy).sort((a, b) => new Date(b.claimedAt || '').getTime() - new Date(a.claimedAt || '').getTime());

  return (
    <div className="fade-in">
      <div className="mb-12 border-b-8 border-black pb-4">
        <h3 className="font-display text-7xl text-stone-800 uppercase tracking-tighter">Overview</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 border-[4px] border-black shadow-brutal rounded-2xl hover:scale-105 transition-transform group">
          <div className="flex justify-between items-start">
            <p className="text-stone-400 font-black text-xs uppercase mb-4">Confirmed Guests</p>
            <span className="text-2xl group-hover:animate-bounce">🎟️</span>
          </div>
          <p className="text-7xl font-display text-brutal-pink">{attendingCount}</p>
        </div>
        <div className="bg-white p-8 border-[4px] border-black shadow-brutal rounded-2xl hover:scale-105 transition-transform group">
          <div className="flex justify-between items-start">
            <p className="text-stone-400 font-black text-xs uppercase mb-4">Gifts Claimed</p>
            <span className="text-2xl group-hover:animate-bounce">🎁</span>
          </div>
          <p className="text-7xl font-display text-brutal-blue">{claimedCount} / {INITIAL_REGISTRY.length}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* RSVP Side */}
        <div className="bg-white border-[4px] border-black shadow-brutal rounded-3xl overflow-hidden">
          <div className="bg-brutal-pink p-4 border-b-[4px] border-black">
            <h4 className="font-display text-2xl uppercase">Live RSVP Stream</h4>
          </div>
          <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
            {rsvpActivities.map((act) => (
              <div key={act.id} className="flex justify-between items-center p-3 border-2 border-transparent hover:border-black rounded-xl transition-all">
                <div>
                  <p className="font-black uppercase text-sm tracking-tight">{act.name}</p>
                  <span className={`text-[8px] font-black uppercase px-2 py-0.5 border-2 border-black rounded ${act.attending ? 'bg-brutal-green' : 'bg-brutal-orange text-white'}`}>
                    {act.attending ? 'Accepted' : 'Declined'}
                  </span>
                </div>
                <span className="text-[10px] font-black text-stone-300">{act.submittedAt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Registry Side */}
        <div className="bg-white border-[4px] border-black shadow-brutal rounded-3xl overflow-hidden">
          <div className="bg-brutal-blue p-4 border-b-[4px] border-black">
            <h4 className="font-display text-2xl uppercase text-white">Registry Activity</h4>
          </div>
          <div className="p-6 max-h-[400px] overflow-y-auto">
            {registryActivities.length > 0 ? (
              <div className="space-y-3">
                {/* Header */}
                <div className="grid grid-cols-12 gap-2 pb-2 border-b border-stone-200">
                  <div className="col-span-4 text-[10px] font-black uppercase text-stone-400">Person</div>
                  <div className="col-span-5 text-[10px] font-black uppercase text-stone-400">Gift</div>
                  <div className="col-span-3 text-[10px] font-black uppercase text-stone-400 text-right">Date</div>
                </div>
                {/* Data Rows */}
                {registryActivities.map((act) => (
                  <div key={act.id} className="grid grid-cols-12 gap-2 p-3 border-2 border-transparent hover:border-black hover:bg-stone-50 rounded-xl transition-all">
                    <div className="col-span-4">
                      <p className="font-black uppercase text-sm tracking-tight text-brutal-orange">{act.claimedBy}</p>
                    </div>
                    <div className="col-span-5">
                      <p className="font-black uppercase text-sm tracking-tight">{act.name}</p>
                      <p className="text-[10px] text-stone-500 uppercase">{act.priceRange}</p>
                    </div>
                    <div className="col-span-3 text-right">
                      <span className="text-[10px] font-black text-stone-400">{act.claimedAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-12 text-stone-300 font-display text-xl uppercase">No gifts claimed yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const GuestList = () => {
  const [filterAccepted, setFilterAccepted] = useState(false);
  const guests = filterAccepted ? INITIAL_GUESTS.filter(g => g.attending) : INITIAL_GUESTS;

  const exportData = (format: 'csv' | 'pdf') => {
    if (format === 'csv') {
      const csv = 'Name,Status,Meal,PlusOne,Timestamp\n' + guests.map(g => `"${g.name}",${g.attending ? 'Accepted' : 'Declined'},${g.mealPreference},${g.hasPlusOne},${g.submittedAt}`).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `wedding_guests_${Date.now()}.csv`;
      a.click();
    } else {
      alert(`Generating high-quality PDF for ${guests.length} guests...`);
    }
  };

  return (
    <div className="fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <div className="bg-brutal-pink inline-block p-4 border-[4px] border-black shadow-brutal -rotate-1 animate-springy">
          <h3 className="font-display text-5xl text-black uppercase tracking-tighter">Guest List</h3>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={() => setFilterAccepted(!filterAccepted)}
             className={`px-6 py-3 border-[4px] border-black font-black uppercase text-xs shadow-brutal rounded-xl transition-all active:scale-95 ${filterAccepted ? 'bg-brutal-green' : 'bg-white hover:bg-stone-50'}`}
           >
             {filterAccepted ? 'Showing: Accepted Only' : 'Filter: All Responses'}
           </button>
           <div className="flex bg-black p-1 rounded-xl border-[4px] border-black shadow-brutal">
             <button onClick={() => exportData('csv')} className="text-white text-[10px] font-black uppercase px-4 py-2 hover:bg-white hover:text-black rounded-lg transition-colors">CSV</button>
             <button onClick={() => exportData('pdf')} className="text-white text-[10px] font-black uppercase px-4 py-2 hover:bg-white hover:text-black rounded-lg transition-colors">PDF</button>
           </div>
        </div>
      </div>

      <div className="bg-white border-[4px] border-black shadow-brutal-xl rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-stone-800 text-[10px] uppercase tracking-widest text-white font-black">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Meal Choice</th>
              <th className="px-6 py-4 text-right">+1</th>
            </tr>
          </thead>
          <tbody className="divide-y-4 divide-stone-50">
            {guests.map(guest => (
              <tr key={guest.id} className="text-sm hover:bg-brutal-yellow/10 transition-colors group">
                <td className="px-6 py-6 font-black text-stone-800 uppercase tracking-tight">{guest.name}</td>
                <td className="px-6 py-6">
                  <span className={`px-4 py-2 rounded-xl border-[3px] border-black text-[10px] font-black uppercase shadow-brutal ${
                    guest.attending ? 'bg-brutal-green' : 'bg-brutal-orange text-white'
                  }`}>
                    {guest.attending ? 'ACCEPTED' : 'DECLINED'}
                  </span>
                </td>
                <td className="px-6 py-6 uppercase font-bold text-xs">{guest.mealPreference}</td>
                <td className="px-6 py-6 text-right font-black">{guest.hasPlusOne ? 'YES' : 'NO'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const RegistryManager = () => {
  const [registry, setRegistry] = useState<RegistryItem[]>(INITIAL_REGISTRY);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<RegistryItem | null>(null);

  const handleDelete = (id: string) => {
    if (confirm('Are you absolutely sure you want to delete this gift?')) {
      setRegistry(registry.filter(r => r.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newItem: RegistryItem = {
      id: editingItem?.id || `r${Date.now()}`,
      brand: formData.get('brand') as string,
      name: formData.get('name') as string,
      modelColor: formData.get('modelColor') as string,
      priceRange: formData.get('price') as string,
      category: 'Home & Living', // Default category
      description: `${formData.get('brand') as string} ${formData.get('name') as string}`.trim(), // Auto-generated description
      url: formData.get('url') as string,
      imageUrl: formData.get('img') as string,
      claimedBy: editingItem?.claimedBy,
      claimedAt: editingItem?.claimedAt,
    };

    if (editingItem) {
      setRegistry(registry.map(r => r.id === editingItem.id ? newItem : r));
    } else {
      setRegistry([...registry, newItem]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-12">
        <div className="bg-brutal-blue inline-block p-4 border-[4px] border-black shadow-brutal rotate-1 animate-springy">
          <h3 className="font-display text-5xl text-black uppercase">Registry Manager</h3>
        </div>
        <button 
          onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
          className="bg-black text-white px-8 py-4 text-sm uppercase font-black tracking-widest rounded-2xl border-[4px] border-black shadow-brutal hover:bg-brutal-yellow hover:text-black transition-all hover:-translate-y-1 active:scale-95"
        >
          Add New Item +
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {registry.map(item => (
          <div key={item.id} className="bg-white p-8 border-[4px] border-black shadow-brutal rounded-3xl flex flex-col group transition-all hover:-translate-y-2">
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col">
                {item.claimedBy && (
                  <span className="bg-brutal-pink text-black border-2 border-black px-2 py-0.5 text-[8px] font-black uppercase rounded-full self-start mb-2">CLAIMED</span>
                )}
                <h4 className="font-display text-2xl text-stone-800 uppercase leading-none">{item.name}</h4>
                <p className="text-stone-400 font-black uppercase text-[10px] mt-2">{item.brand || 'No Brand'}</p>
              </div>
              
              {!item.claimedBy && (
                <div className="flex gap-1">
                  <button onClick={() => { setEditingItem(item); setIsModalOpen(true); }} className="p-2 hover:bg-brutal-yellow border-2 border-transparent hover:border-black rounded-lg transition-all" title="Edit Item">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-brutal-orange border-2 border-transparent hover:border-black rounded-lg transition-all hover:text-white" title="Delete Item">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              )}
            </div>
            <div className="flex-grow">
               <div className="flex gap-2 mb-4">
                  <span className="bg-stone-100 px-2 py-1 text-[8px] font-black border border-black uppercase rounded-lg">{item.priceRange}</span>
                  {item.modelColor && <span className="bg-stone-100 px-2 py-1 text-[8px] font-black border border-black uppercase rounded-lg">{item.modelColor}</span>}
               </div>
               {item.url && <a href={item.url} target="_blank" className="text-[10px] font-black uppercase text-brutal-blue underline mb-2 block">View Product Page</a>}
            </div>
            {item.claimedBy && (
              <div className="mt-4 pt-4 border-t-2 border-dashed border-stone-200">
                <p className="text-[10px] font-black uppercase text-brutal-orange">Gifted by {item.claimedBy}</p>
                <p className="text-[8px] text-stone-300">on {item.claimedAt}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="bg-white border-[6px] border-black shadow-brutal-xl rounded-[3rem] p-12 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-springy">
             <div className="flex justify-between items-center mb-8 border-b-4 border-black pb-4">
               <h3 className="font-display text-4xl uppercase">{editingItem ? 'Update Gift' : 'Add New Gift'}</h3>
               <button onClick={() => setIsModalOpen(false)} className="font-black text-2xl hover:text-brutal-orange transition-colors">×</button>
             </div>
             <form onSubmit={handleSave} className="grid grid-cols-2 gap-6">
                <div className="col-span-1 flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase text-stone-400">Product Brand</label>
                  <input name="brand" defaultValue={editingItem?.brand} className="border-[3px] border-black p-4 rounded-xl focus:bg-brutal-yellow outline-none font-bold" placeholder="e.g. Dyson" />
                </div>
                <div className="col-span-1 flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase text-stone-400">Product Name</label>
                  <input name="name" defaultValue={editingItem?.name} required className="border-[3px] border-black p-4 rounded-xl focus:bg-brutal-yellow outline-none font-bold" placeholder="e.g. V15 Vacuum" />
                </div>
                <div className="col-span-1 flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase text-stone-400">Model / Color (Optional)</label>
                  <input name="modelColor" defaultValue={editingItem?.modelColor} className="border-[3px] border-black p-4 rounded-xl focus:bg-brutal-yellow outline-none font-bold" placeholder="e.g. Onyx Black" />
                </div>
                <div className="col-span-1 flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase text-stone-400">Price Range</label>
                  <input name="price" defaultValue={editingItem?.priceRange} required className="border-[3px] border-black p-4 rounded-xl focus:bg-brutal-yellow outline-none font-bold" placeholder="e.g. $700" />
                </div>
                <div className="col-span-2 flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase text-stone-400">Product Link (Optional)</label>
                  <input name="url" defaultValue={editingItem?.url} className="border-[3px] border-black p-4 rounded-xl focus:bg-brutal-yellow outline-none font-bold" placeholder="https://..." />
                </div>
                <div className="col-span-2 flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase text-stone-400">Product Image URL (Optional)</label>
                  <input name="img" defaultValue={editingItem?.imageUrl} className="border-[3px] border-black p-4 rounded-xl focus:bg-brutal-yellow outline-none font-bold" placeholder="https://image-url.com/..." />
                </div>
                <div className="col-span-2 flex gap-4 mt-4">
                  <button type="submit" className="flex-grow bg-black text-white py-4 font-display text-2xl uppercase tracking-widest border-[4px] border-black shadow-brutal hover:bg-brutal-green hover:text-black rounded-2xl active:translate-y-1">SAVE GIFT</button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 border-[4px] border-black font-black uppercase text-sm rounded-2xl">Cancel</button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

const ContentEditor = () => {
  const [photos, setPhotos] = useState(['https://picsum.photos/seed/taylor/600/800', 'https://picsum.photos/seed/couple/600/800', 'https://picsum.photos/seed/travis/600/800']);

  return (
    <div className="fade-in space-y-16">
      <div>
        <div className="bg-brutal-orange inline-block p-4 border-[4px] border-black shadow-brutal -rotate-2 mb-12 animate-springy">
          <h3 className="font-display text-5xl text-white uppercase tracking-tighter">Content Editor</h3>
        </div>
      </div>
      
      <div className="space-y-12 max-w-5xl">
        {/* Homepage Section */}
        <section className="bg-white p-8 border-[4px] border-black shadow-brutal-lg rounded-[2.5rem]">
           <h4 className="font-display text-3xl mb-8 uppercase border-b-4 border-black pb-4">1. Homepage Customization</h4>
           
           <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-stone-400">Homepage Main Title</label>
                <input defaultValue="Taylor & Travis" className="w-full border-b-[3px] border-black py-2 font-display text-xl focus:border-brutal-pink outline-none" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-stone-400">Emotion Tagline</label>
                <input defaultValue="From sold-out stadiums to forever." className="w-full border-b-[3px] border-black py-2 font-bold text-sm focus:border-brutal-blue outline-none" />
              </div>
           </div>

           <div className="mb-8">
              <label className="block text-[10px] uppercase font-black tracking-widest text-stone-400 mb-4">Official Invitation Text</label>
              <textarea 
                rows={3}
                defaultValue="Together with their families, Taylor Alison Swift and Travis Michael Kelce invite you to celebrate their love and commitment."
                className="w-full border-[3px] border-black p-4 font-bold text-lg focus:outline-none focus:bg-stone-50 rounded-2xl transition-colors"
              />
           </div>

           <div className="grid grid-cols-3 gap-6">
              {photos.map((p, idx) => (
                <div key={idx} className="relative aspect-[3/4] border-[3px] border-black rounded-2xl overflow-hidden group">
                   <img src={p} className="w-full h-full object-cover transition-all animate-floating" alt="couple" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                      <button className="bg-white px-3 py-1 rounded-lg font-black text-[8px] uppercase">Replace</button>
                      <button className="bg-brutal-orange text-white px-3 py-1 rounded-lg font-black text-[8px] uppercase">Remove</button>
                   </div>
                </div>
              ))}
              <button className="aspect-[3/4] border-[3px] border-black border-dashed rounded-2xl flex flex-col items-center justify-center gap-4 hover:bg-stone-50 transition-colors">
                <span className="text-4xl">+</span>
                <span className="text-[10px] font-black uppercase">Add Photo</span>
              </button>
           </div>
        </section>

        {/* Our Story Section */}
        <section className="bg-white p-8 border-[4px] border-black shadow-brutal-lg rounded-[2.5rem]">
           <h4 className="font-display text-3xl mb-8 uppercase border-b-4 border-black pb-4">2. "Our Story" Content</h4>
           <div className="space-y-8">
              <div>
                <label className="text-[10px] font-black uppercase text-stone-400">Story Intro Headline</label>
                <input defaultValue="A Stadium Symphony" className="w-full border-b-[3px] border-black py-2 font-display text-xl focus:border-brutal-green outline-none" />
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-stone-400">Quiet Rooms Text (Chapter 1)</label>
                  <textarea rows={4} className="w-full border-[3px] border-black p-4 rounded-xl text-sm italic font-bold" defaultValue="They met at a moment when both were standing at the top of their own worlds..." />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-stone-400">The Calm Text (Chapter 2)</label>
                  <textarea rows={4} className="w-full border-[3px] border-black p-4 rounded-xl text-sm italic font-bold" defaultValue="What surprised them most wasn't the attention, but the calm..." />
                </div>
              </div>
           </div>
        </section>

        {/* Wedding Details Section */}
        <section className="bg-white p-8 border-[4px] border-black shadow-brutal-lg rounded-[2.5rem]">
           <h4 className="font-display text-3xl mb-8 uppercase border-b-4 border-black pb-4">3. Logistics & Details</h4>
           <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-stone-400">Ceremony Time</label>
                <input defaultValue="September 26, 4:30 PM" className="w-full border-b-[3px] border-black py-2 font-bold focus:border-brutal-yellow outline-none" />
                <label className="text-[10px] font-black uppercase text-stone-400">Reception Style</label>
                <input defaultValue="Live band • Piano interludes • Late-night dancing" className="w-full border-b-[3px] border-black py-2 font-bold focus:border-brutal-yellow outline-none" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-stone-400">Dress Code Statement</label>
                <textarea rows={3} className="w-full border-[3px] border-black p-4 rounded-xl text-sm font-bold" defaultValue="Formal with personality encouraged. Think timeless — with a little sparkle." />
              </div>
           </div>
        </section>

        <button className="bg-black text-white w-full py-8 font-display text-4xl uppercase tracking-widest border-[6px] border-black shadow-brutal-xl hover:bg-brutal-pink hover:text-black transition-all rounded-[2rem] active:translate-y-2">
          SAVE ALL CHANGES ⚡️
        </button>
      </div>
    </div>
  );
};

const SecuritySettings = () => {
  const [user, setUser] = useState(localStorage.getItem('wedding_username') || 'abc');
  const [pass, setPass] = useState(localStorage.getItem('wedding_password') || '123456');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('wedding_username', user);
    localStorage.setItem('wedding_password', pass);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="fade-in">
      <div className="bg-brutal-purple text-white inline-block p-4 border-[4px] border-black shadow-brutal -rotate-2 mb-12 animate-springy">
        <h3 className="font-display text-5xl uppercase tracking-tighter">Security Ops</h3>
      </div>
      <div className="bg-white p-12 border-[4px] border-black shadow-brutal-xl rounded-[3rem] max-w-md space-y-8">
        <div>
          <label className="block text-[10px] uppercase font-black tracking-widest text-stone-400 mb-2">Access Key (Username)</label>
          <input 
            type="text" 
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full border-[3px] border-black p-4 rounded-2xl focus:outline-none focus:bg-brutal-yellow transition-all font-bold text-xl"
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase font-black tracking-widest text-stone-400 mb-2">Security Hash (Password)</label>
          <input 
            type="password" 
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full border-[3px] border-black p-4 rounded-2xl focus:outline-none focus:bg-brutal-yellow transition-all font-bold text-xl"
          />
        </div>
        <button 
          onClick={handleSave}
          className="w-full bg-black text-white py-6 font-display text-2xl uppercase tracking-widest border-[4px] border-black shadow-brutal hover:bg-brutal-green hover:text-black transition-all rounded-3xl active:scale-95"
        >
          {saved ? 'LOCKED IN!' : 'SAVE SECURITY KEY'}
        </button>
        <div className="p-4 bg-stone-50 border-2 border-dashed border-stone-200 rounded-2xl">
          <p className="text-[10px] text-stone-400 font-bold uppercase leading-tight">Warning: Credentials are stored locally. Don't lose them!</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;