import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { INITIAL_GUESTS, INITIAL_REGISTRY } from '../constants';
import { Guest, RegistryItem } from '../types';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [guests, setGuests] = useState<Guest[]>(INITIAL_GUESTS);
  const [registryItems, setRegistryItems] = useState<RegistryItem[]>(INITIAL_REGISTRY);
  const [guestFilter, setGuestFilter] = useState<'all' | 'attending' | 'not-attending'>('all');
  const navigate = useNavigate();

  // Website content state
  const [content, setContent] = useState({
    // Basic Information
    weddingDate: "SEPTEMBER 26, 2026",
    ceremonyTime: "CEREMONY AT 4:30 PM",
    venueName: "CENTENNIAL GREENHOUSE",
    venueLocation: "NASHVILLE, TENNESSEE",
    venueAddress: "2500 WEST END AVE",
    
    // Couple Information
    brideFullName: "Taylor Alison Swift",
    groomFullName: "Travis Michael Kelce",
    brideDisplayName: "TAYLOR",
    groomDisplayName: "TRAVIS",
    
    // Quotes & Main Text
    mainQuote: "FROM SOLD-OUT STADIUMS TO FOREVER",
    bannerText: "SEPTEMBER 2026 • NASHVILLE, TN • TAYLOR & TRAVIS • THE LOVE STORY CONTINUES • STADIUM VIBES",
    invitationOpening: "Together with their families,",
    invitationClosing: "invite you to celebrate their love.",
    
    // Story Content
    storyTitle: "THE LEGEND",
    storySubtitle: "A Stadium Symphony",
    story1Title: "QUIET ROOMS & MILLIONS",
    story1Text: "They met at a moment when both were standing at the top of their own worlds — one built on lyrics, the other on stadium lights.",
    story2Title: "THE CALM IN THE CHAOS",
    story2Text: "What surprised them most wasn't the attention, but the calm. Between tour schedules and game days, they found something grounding: laughter without performance.",
    story3Title: "FOREVER STARTS NOW",
    story3Text: "The proposal wasn't planned for cameras or crowds. It was just them, under stadium lights after a game, when he realized this was home. She said yes before he finished the question.",
    finalStoryQuote: "This wedding isn't the finale. It's the pause before the next verse.",
    
    // Wedding Schedule
    event1: "THE VOWS",
    time1: "16:30",
    event2: "COCKTAILS", 
    time2: "18:00",
    event3: "THE FEAST",
    time3: "19:30",
    event4: "AFTERPARTY",
    time4: "21:00",
    
    // Venue Information
    venueDescription: "A glass oasis in the heart of music city. Lush greens, high ceilings, and enough space for a championship celebration.",
    parkingInstructions: "VALET AT LOVER'S LANE GATE",
    entranceInstructions: "NASHVILLE GOLD ENTRANCE ONLY"
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [showAddGiftModal, setShowAddGiftModal] = useState(false);
  const [newGift, setNewGift] = useState({
    name: '',
    brand: '',
    modelColor: '',
    description: '',
    priceRange: '',
    category: 'Home & Living' as 'Home & Living' | 'Music Studio Essentials' | 'Honeymoon Experiences',
    icon: '🎁',
    url: ''
  });

  const handleContentChange = (field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveContent = async () => {
    setIsSaving(true);
    setSaveMessage('');
    
    try {
      // Save to localStorage for now (in real app, this would be an API call)
      localStorage.setItem('websiteContent', JSON.stringify(content));
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveMessage('✅ All changes saved successfully!');
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
      
    } catch (error) {
      setSaveMessage('❌ Error saving changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleNewGiftChange = (field: string, value: string) => {
    setNewGift(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addNewGift = () => {
    if (newGift.name.trim() && newGift.brand.trim() && newGift.priceRange.trim() && newGift.url.trim()) {
      const gift = {
        id: `r${Date.now()}`,
        name: newGift.name,
        brand: newGift.brand,
        modelColor: newGift.modelColor,
        description: newGift.description,
        priceRange: newGift.priceRange,
        category: newGift.category,
        icon: newGift.icon,
        url: newGift.url
      };
      
      setRegistryItems(prev => [...prev, gift]);
      setNewGift({
        name: '',
        brand: '',
        modelColor: '',
        description: '',
        priceRange: '',
        category: 'Home & Living',
        icon: '🎁',
        url: ''
      });
      setShowAddGiftModal(false);
    }
  };

  // Load saved content on component mount
  useEffect(() => {
    const savedContent = localStorage.getItem('websiteContent');
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        setContent(parsed);
      } catch (error) {
        console.error('Error loading saved content:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('credentials');
    navigate('/');
  };

  const SidebarLink: React.FC<{ id: string, children: React.ReactNode, icon?: string }> = ({ id, children, icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full text-left px-6 py-4 border-b-2 border-black/10 font-display text-lg uppercase tracking-wide transition-all ${
        activeTab === id 
          ? 'bg-brutal-pink text-white' 
          : 'bg-white text-black hover:bg-brutal-yellow'
      }`}
    >
      {icon && <span className="mr-3">{icon}</span>}
      {children}
    </button>
  );

  const claimedItems = registryItems.filter(item => item.claimedBy);
  const recentRSVPs = guests.filter(guest => guest.submittedAt).slice(0, 3);

  return (
    <div className="min-h-screen bg-white flex">
      <div className="w-80 bg-white border-r-[4px] border-black">
        <div className="p-8 border-b-[4px] border-black bg-brutal-pink text-white relative overflow-hidden transform -rotate-1">
          {/* Pop Art Style Background Shapes */}
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-brutal-yellow border-[3px] border-black rounded-full animate-bounce"></div>
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-brutal-blue border-[3px] border-black animate-ping"></div>
          <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-brutal-green border-[2px] border-black rotate-45 animate-spin"></div>
          <div className="absolute bottom-6 right-1/3 w-6 h-6 bg-brutal-orange border-[2px] border-black rounded-full animate-bounce delay-300"></div>
          
          {/* Ben-Day Dots Pattern */}
          <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)', backgroundSize: '12px 12px'}}></div>
          
          {/* Main Text with Pop Art Style */}
          <div className="relative z-10 transform rotate-1">
            <h1 className="font-display text-4xl uppercase tracking-wider font-black relative">
              <span className="relative inline-block transform hover:scale-110 hover:-rotate-2 transition-all cursor-default">
                <span className="absolute inset-0 text-black translate-x-2 translate-y-2">DASHBOARD</span>
                <span className="relative text-white border-[3px] border-black px-2 bg-brutal-pink">DASHBOARD</span>
              </span>
              <span className="ml-3 text-3xl animate-bounce inline-block">💥</span>
            </h1>
            <div className="mt-4 flex items-center gap-3">
              <div className="bg-brutal-yellow text-black px-4 py-2 border-[3px] border-black shadow-brutal transform -rotate-1">
                <p className="font-black text-sm tracking-widest">TAYLOR & TRAVIS</p>
              </div>
              <div className="bg-white text-black px-3 py-2 border-[3px] border-black shadow-brutal transform rotate-2">
                <span className="text-xs font-black">2026</span>
              </div>
              <div className="bg-brutal-green text-white px-3 py-2 border-[3px] border-black shadow-brutal animate-pulse">
                <span className="text-xs font-black">ADMIN</span>
              </div>
            </div>
          </div>
          
          {/* Comic Book Style Elements */}
          <div className="absolute top-3 left-3 w-4 h-4 bg-brutal-blue border-[2px] border-black transform rotate-45 animate-pulse"></div>
          <div className="absolute bottom-3 right-3 w-4 h-4 bg-brutal-green border-[2px] border-black rounded-full animate-pulse delay-200"></div>
          
          {/* Exclamation Marks */}
          <div className="absolute top-2 right-1/2 text-2xl font-black animate-bounce delay-100">!</div>
          <div className="absolute bottom-2 left-1/4 text-lg font-black animate-bounce delay-400">★</div>
        </div>
        
        <nav className="pt-8">
          <SidebarLink id="overview" icon="📊">Overview</SidebarLink>
          <SidebarLink id="guests" icon="👥">Guest List</SidebarLink>
          <SidebarLink id="registry" icon="🎁">Registry</SidebarLink>
          <SidebarLink id="content" icon="📝">Content</SidebarLink>
          <SidebarLink id="settings" icon="⚙️">Settings</SidebarLink>
        </nav>

        <div className="absolute bottom-0 w-80 p-6">
          <button 
            onClick={handleLogout}
            className="w-full bg-brutal-orange text-white py-3 px-6 font-display text-sm uppercase tracking-widest border-[3px] border-black shadow-brutal hover:bg-red-500 transition-all rounded-xl"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1 p-12 overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <header className="mb-12">
              <h2 className="font-display text-6xl uppercase tracking-tighter text-brutal-blue mb-4">Overview</h2>
              <p className="font-bold text-xl text-stone-600">Wedding management dashboard</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-brutal-pink text-white border-[4px] border-black p-8 rounded-3xl shadow-brutal">
                <div className="text-5xl mb-4">👥</div>
                <div className="font-display text-4xl">{guests.filter(g => g.attending).length}</div>
                <div className="font-bold uppercase text-sm">Attending</div>
              </div>
              <div className="bg-brutal-green text-white border-[4px] border-black p-8 rounded-3xl shadow-brutal">
                <div className="text-5xl mb-4">🎁</div>
                <div className="font-display text-4xl">{claimedItems.length}/{registryItems.length}</div>
                <div className="font-bold uppercase text-sm">Gifts Claimed</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white border-[4px] border-black p-8 rounded-3xl shadow-brutal">
                <h3 className="font-display text-3xl uppercase mb-6 text-brutal-blue">Recent RSVPs</h3>
                <div className="space-y-4">
                  {recentRSVPs.map(guest => (
                    <div key={guest.id} className="flex justify-between items-center py-3 border-b border-stone-200">
                      <div>
                        <div className="font-bold">{guest.name}</div>
                        <div className="text-sm text-stone-500">{guest.submittedAt}</div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        guest.attending ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {guest.attending ? 'Accepted' : 'Declined'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border-[4px] border-black p-8 rounded-3xl shadow-brutal">
                <h3 className="font-display text-3xl uppercase mb-6 text-brutal-pink">Registry Activity</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 font-bold text-sm text-stone-500 uppercase border-b pb-2">
                    <div>Person</div>
                    <div>Gift</div>
                    <div>Date</div>
                  </div>
                  {claimedItems.slice(0, 5).map(item => (
                    <div key={item.id} className="grid grid-cols-3 gap-4 py-3 border-b border-stone-200 text-sm">
                      <div className="font-bold">{item.claimedBy}</div>
                      <div className="truncate">{item.name}</div>
                      <div>{item.claimedAt} at 14:20</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'guests' && (
          <div className="space-y-8">
            <header className="flex justify-between items-center">
              <div>
                <h2 className="font-display text-6xl uppercase tracking-tighter text-brutal-blue mb-4">Guest List</h2>
                <p className="font-bold text-xl text-stone-600">Manage wedding attendees</p>
              </div>
              <div className="flex gap-4">
                <button className="bg-brutal-green text-white px-6 py-3 font-bold uppercase text-sm border-[3px] border-black shadow-brutal hover:bg-brutal-yellow hover:text-black transition-all rounded-xl">
                  Download CSV
                </button>
                <button className="bg-brutal-pink text-white px-6 py-3 font-bold uppercase text-sm border-[3px] border-black shadow-brutal hover:bg-brutal-yellow hover:text-black transition-all rounded-xl">
                  Download PDF
                </button>
              </div>
            </header>

            <div className="bg-white border-[4px] border-black rounded-3xl shadow-brutal overflow-hidden">
              <div className="p-6 bg-stone-50 border-b-[3px] border-black">
                <div className="flex gap-4">
                  <button 
                    onClick={() => setGuestFilter('all')}
                    className={`px-4 py-2 font-bold rounded-lg border-2 border-black transition-colors ${
                      guestFilter === 'all' ? 'bg-brutal-blue text-white' : 'bg-white text-black hover:bg-brutal-green hover:text-white'
                    }`}
                  >
                    All ({guests.length})
                  </button>
                  <button 
                    onClick={() => setGuestFilter('attending')}
                    className={`px-4 py-2 font-bold rounded-lg border-2 border-black transition-colors ${
                      guestFilter === 'attending' ? 'bg-brutal-green text-white' : 'bg-white text-black hover:bg-brutal-green hover:text-white'
                    }`}
                  >
                    Attending ({guests.filter(g => g.attending).length})
                  </button>
                  <button 
                    onClick={() => setGuestFilter('not-attending')}
                    className={`px-4 py-2 font-bold rounded-lg border-2 border-black transition-colors ${
                      guestFilter === 'not-attending' ? 'bg-brutal-pink text-white' : 'bg-white text-black hover:bg-brutal-pink hover:text-white'
                    }`}
                  >
                    Not Attending ({guests.filter(g => !g.attending).length})
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-stone-100 border-b-[3px] border-black">
                    <tr>
                      <th className="text-left p-4 font-display uppercase text-sm">Name</th>
                      <th className="text-left p-4 font-display uppercase text-sm">Status</th>
                      <th className="text-left p-4 font-display uppercase text-sm">Plus One</th>
                      <th className="text-left p-4 font-display uppercase text-sm">Meal</th>
                      <th className="text-left p-4 font-display uppercase text-sm">Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guests.filter(guest => {
                      if (guestFilter === 'all') return true;
                      if (guestFilter === 'attending') return guest.attending;
                      if (guestFilter === 'not-attending') return !guest.attending;
                      return true;
                    }).map(guest => (
                      <tr key={guest.id} className="border-b border-stone-200 hover:bg-stone-50">
                        <td className="p-4 font-bold">{guest.name}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            guest.attending ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {guest.attending ? 'Accepted' : 'Declined'}
                          </span>
                        </td>
                        <td className="p-4">{guest.hasPlusOne ? 'Yes' : 'No'}</td>
                        <td className="p-4">{guest.mealPreference}</td>
                        <td className="p-4 text-sm">{guest.submittedAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'registry' && (
          <div className="space-y-8">
            <header className="flex justify-between items-center">
              <div>
                <h2 className="font-display text-6xl uppercase tracking-tighter text-brutal-pink mb-4">Registry</h2>
                <p className="font-bold text-xl text-stone-600">Manage gift registry</p>
              </div>
              <button 
                onClick={() => setShowAddGiftModal(true)}
                className="bg-brutal-pink text-white px-6 py-3 font-bold uppercase text-sm border-[3px] border-black shadow-brutal hover:bg-brutal-yellow hover:text-black transition-all rounded-xl"
              >
                Add New Gift
              </button>
            </header>

            <div className="grid gap-6">
              {registryItems.map(item => (
                <div key={item.id} className="bg-white border-[4px] border-black p-6 rounded-3xl shadow-brutal">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-brutal-yellow border-[3px] border-black rounded-2xl flex items-center justify-center text-3xl">
                        {item.icon || '🎁'}
                      </div>
                      <div>
                        <h4 className="font-display text-2xl uppercase">{item.name}</h4>
                        {item.brand && <p className="font-bold text-stone-600">{item.brand}</p>}
                        {item.modelColor && <p className="text-stone-500">{item.modelColor}</p>}
                        <p className="font-display text-xl text-brutal-orange mt-2">{item.priceRange}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {item.claimedBy ? (
                        <div>
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">Claimed</span>
                          <p className="text-sm mt-2">by {item.claimedBy}</p>
                          <p className="text-xs text-stone-500">{item.claimedAt}</p>
                        </div>
                      ) : (
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">Available</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-8">
            <header>
              <h2 className="font-display text-6xl uppercase tracking-tighter text-brutal-purple mb-4">Content Editor</h2>
              <p className="font-bold text-xl text-stone-600">Manage website images and content</p>
            </header>

            <div className="grid gap-8">
              <div className="bg-white border-[4px] border-black p-8 rounded-3xl shadow-brutal">
                <h3 className="font-display text-3xl uppercase mb-6">Website Content</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Wedding Info */}
                  <div className="border-[3px] border-black rounded-xl p-6 bg-brutal-yellow/10">
                    <h4 className="font-bold text-xl mb-4 text-brutal-blue">Basic Information</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block font-bold mb-2">Wedding Date</label>
                        <input 
                          type="text" 
                          value={content.weddingDate}
                          onChange={(e) => handleContentChange('weddingDate', e.target.value)}
                          className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-2">Ceremony Time</label>
                        <input 
                          type="text" 
                          value={content.ceremonyTime}
                          onChange={(e) => handleContentChange('ceremonyTime', e.target.value)}
                          className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-2">Venue Name</label>
                        <input 
                          type="text" 
                          value={content.venueName}
                          onChange={(e) => handleContentChange('venueName', e.target.value)}
                          className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-2">Venue Location</label>
                        <input 
                          type="text" 
                          value={content.venueLocation}
                          onChange={(e) => handleContentChange('venueLocation', e.target.value)}
                          className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-2">Venue Address</label>
                        <input 
                          type="text" 
                          value={content.venueAddress}
                          onChange={(e) => handleContentChange('venueAddress', e.target.value)}
                          className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Couple Names */}
                  <div className="border-[3px] border-black rounded-xl p-6 bg-brutal-pink/10">
                    <h4 className="font-bold text-xl mb-4 text-brutal-pink">Couple Information</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block font-bold mb-2">Bride Full Name</label>
                        <input 
                          type="text" 
                          value={content.brideFullName}
                          onChange={(e) => handleContentChange('brideFullName', e.target.value)}
                          className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-2">Groom Full Name</label>
                        <input 
                          type="text" 
                          value={content.groomFullName}
                          onChange={(e) => handleContentChange('groomFullName', e.target.value)}
                          className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-2">Bride Display Name</label>
                        <input 
                          type="text" 
                          value={content.brideDisplayName}
                          onChange={(e) => handleContentChange('brideDisplayName', e.target.value)}
                          className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-2">Groom Display Name</label>
                        <input 
                          type="text" 
                          value={content.groomDisplayName}
                          onChange={(e) => handleContentChange('groomDisplayName', e.target.value)}
                          className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Main Quotes & Text */}
                  <div className="border-[3px] border-black rounded-xl p-6 bg-brutal-green/10 md:col-span-2">
                    <h4 className="font-bold text-xl mb-4 text-brutal-green">Quotes & Main Text</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold mb-2">Home Page Main Quote</label>
                        <textarea 
                          value={content.mainQuote}
                          onChange={(e) => handleContentChange('mainQuote', e.target.value)}
                          className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold h-20"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-2">Banner Text</label>
                        <textarea 
                          value={content.bannerText}
                          onChange={(e) => handleContentChange('bannerText', e.target.value)}
                          className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold h-20"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-2">Invitation Opening</label>
                        <textarea 
                          value={content.invitationOpening}
                          onChange={(e) => handleContentChange('invitationOpening', e.target.value)}
                          className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold h-20"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-2">Invitation Closing</label>
                        <textarea 
                          value={content.invitationClosing}
                          onChange={(e) => handleContentChange('invitationClosing', e.target.value)}
                          className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold h-20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Story Content */}
                  <div className="border-[3px] border-black rounded-xl p-6 bg-brutal-blue/10 md:col-span-2">
                    <h4 className="font-bold text-xl mb-4 text-brutal-blue">Our Story Content</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block font-bold mb-2">Story Title</label>
                        <input 
                          type="text" 
                          value={content.storyTitle}
                          onChange={(e) => handleContentChange('storyTitle', e.target.value)}
                          className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-2">Story Subtitle</label>
                        <input 
                          type="text" 
                          value={content.storySubtitle}
                          onChange={(e) => handleContentChange('storySubtitle', e.target.value)}
                          className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-bold mb-2">Story 1 Title</label>
                          <input 
                            type="text" 
                            value={content.story1Title}
                            onChange={(e) => handleContentChange('story1Title', e.target.value)}
                            className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold"
                          />
                          <label className="block font-bold mb-2 mt-3">Story 1 Text</label>
                          <textarea 
                            value={content.story1Text}
                            onChange={(e) => handleContentChange('story1Text', e.target.value)}
                            className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold h-24"
                          />
                        </div>
                        <div>
                          <label className="block font-bold mb-2">Story 2 Title</label>
                          <input 
                            type="text" 
                            value={content.story2Title}
                            onChange={(e) => handleContentChange('story2Title', e.target.value)}
                            className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold"
                          />
                          <label className="block font-bold mb-2 mt-3">Story 2 Text</label>
                          <textarea 
                            value={content.story2Text}
                            onChange={(e) => handleContentChange('story2Text', e.target.value)}
                            className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold h-24"
                          />
                        </div>
                        <div>
                          <label className="block font-bold mb-2">Story 3 Title</label>
                          <input 
                            type="text" 
                            value={content.story3Title}
                            onChange={(e) => handleContentChange('story3Title', e.target.value)}
                            className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold"
                          />
                          <label className="block font-bold mb-2 mt-3">Story 3 Text</label>
                          <textarea 
                            value={content.story3Text}
                            onChange={(e) => handleContentChange('story3Text', e.target.value)}
                            className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold h-24"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-bold mb-2">Final Story Quote</label>
                        <textarea 
                          value={content.finalStoryQuote}
                          onChange={(e) => handleContentChange('finalStoryQuote', e.target.value)}
                          className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold h-20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Schedule & Events */}
                  <div className="border-[3px] border-black rounded-xl p-6 bg-brutal-orange/10">
                    <h4 className="font-bold text-xl mb-4 text-brutal-orange">Wedding Schedule</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold mb-2">Event 1</label>
                          <input type="text" value={content.event1} onChange={(e) => handleContentChange('event1', e.target.value)} className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold" />
                        </div>
                        <div>
                          <label className="block font-bold mb-2">Time 1</label>
                          <input type="text" value={content.time1} onChange={(e) => handleContentChange('time1', e.target.value)} className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold mb-2">Event 2</label>
                          <input type="text" value={content.event2} onChange={(e) => handleContentChange('event2', e.target.value)} className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold" />
                        </div>
                        <div>
                          <label className="block font-bold mb-2">Time 2</label>
                          <input type="text" value={content.time2} onChange={(e) => handleContentChange('time2', e.target.value)} className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold mb-2">Event 3</label>
                          <input type="text" value={content.event3} onChange={(e) => handleContentChange('event3', e.target.value)} className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold" />
                        </div>
                        <div>
                          <label className="block font-bold mb-2">Time 3</label>
                          <input type="text" value={content.time3} onChange={(e) => handleContentChange('time3', e.target.value)} className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold mb-2">Event 4</label>
                          <input type="text" value={content.event4} onChange={(e) => handleContentChange('event4', e.target.value)} className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold" />
                        </div>
                        <div>
                          <label className="block font-bold mb-2">Time 4</label>
                          <input type="text" value={content.time4} onChange={(e) => handleContentChange('time4', e.target.value)} className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Venue Details */}
                  <div className="border-[3px] border-black rounded-xl p-6 bg-brutal-purple/10">
                    <h4 className="font-bold text-xl mb-4 text-brutal-purple">Venue Information</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block font-bold mb-2">Venue Description</label>
                        <textarea 
                          value={content.venueDescription}
                          onChange={(e) => handleContentChange('venueDescription', e.target.value)}
                          className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold h-24"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-2">Parking Instructions</label>
                        <input 
                          type="text" 
                          value={content.parkingInstructions}
                          onChange={(e) => handleContentChange('parkingInstructions', e.target.value)}
                          className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-2">Entrance Instructions</label>
                        <input 
                          type="text" 
                          value={content.entranceInstructions}
                          onChange={(e) => handleContentChange('entranceInstructions', e.target.value)}
                          className="w-full p-3 border-2 border-stone-300 rounded-lg font-bold"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col items-center gap-4">
                  {saveMessage && (
                    <div className={`px-6 py-3 rounded-xl font-bold text-lg border-[3px] border-black ${
                      saveMessage.includes('✅') 
                        ? 'bg-brutal-green text-white' 
                        : 'bg-brutal-orange text-white'
                    }`}>
                      {saveMessage}
                    </div>
                  )}
                  <button 
                    onClick={saveContent}
                    disabled={isSaving}
                    className={`px-8 py-4 font-display text-lg uppercase tracking-widest border-[4px] border-black shadow-brutal transition-all rounded-2xl ${
                      isSaving 
                        ? 'bg-stone-400 text-stone-600 cursor-not-allowed' 
                        : 'bg-brutal-green text-white hover:bg-brutal-yellow hover:text-black'
                    }`}
                  >
                    {isSaving ? 'Saving...' : 'Save All Changes'}
                  </button>
                </div>
              </div>

              <div className="bg-white border-[4px] border-black p-8 rounded-3xl shadow-brutal">
                <h3 className="font-display text-3xl uppercase mb-6">Home Page Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {[
                    { key: 'bride', src: './bride.jpg', label: 'Bride Photo' },
                    { key: 'groom', src: './groom.jpg', label: 'Groom Photo' },
                    { key: 'photo1', src: './photo1.jpg', label: 'Photo 1' },
                    { key: 'photo2', src: './photo2.jpg', label: 'Photo 2' },
                    { key: 'photo3', src: './photo3.jpg', label: 'Photo 3' },
                    { key: 'venue', src: './venue.jpg', label: 'Venue Photo' }
                  ].map(image => (
                    <div key={image.key} className="border-[3px] border-black rounded-xl overflow-hidden">
                      <div className="aspect-square bg-stone-100 relative">
                        <img 
                          src={image.src} 
                          alt={image.label}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = '<div class="w-full h-full flex items-center justify-center"><span class="text-4xl">📷</span></div>';
                            }
                          }}
                        />
                      </div>
                      <div className="p-4 bg-stone-50">
                        <p className="font-bold text-sm">{image.label}</p>
                        <button className="mt-2 bg-brutal-blue text-white px-3 py-1 text-xs font-bold rounded border-2 border-black">
                          Update
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border-[4px] border-black p-8 rounded-3xl shadow-brutal">
                <h3 className="font-display text-3xl uppercase mb-6">Story Page Images</h3>
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { key: 'story1', src: './story1.jpg', label: 'Story 1' },
                    { key: 'story2', src: './story2.jpg', label: 'Story 2' },
                    { key: 'story3', src: './story3.jpg', label: 'Story 3' }
                  ].map(image => (
                    <div key={image.key} className="border-[3px] border-black rounded-xl overflow-hidden">
                      <div className="aspect-square bg-stone-100 relative">
                        <img 
                          src={image.src} 
                          alt={image.label}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = '<div class="w-full h-full flex items-center justify-center"><span class="text-4xl">📖</span></div>';
                            }
                          }}
                        />
                      </div>
                      <div className="p-4 bg-stone-50">
                        <p className="font-bold text-sm">{image.label}</p>
                        <button className="mt-2 bg-brutal-pink text-white px-3 py-1 text-xs font-bold rounded border-2 border-black">
                          Update
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-8">
            <header>
              <h2 className="font-display text-6xl uppercase tracking-tighter text-brutal-orange mb-4">Settings</h2>
              <p className="font-bold text-xl text-stone-600">Account management</p>
            </header>

            <div className="grid gap-6">
              <div className="bg-white border-[4px] border-black p-8 rounded-3xl shadow-brutal">
                <h3 className="font-display text-3xl uppercase mb-6">Account Management</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block font-bold mb-2">Username</label>
                    <input 
                      type="text" 
                      defaultValue="abc"
                      className="w-full p-4 border-[3px] border-black rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-2">Password</label>
                    <input 
                      type="password" 
                      defaultValue="••••••••"
                      className="w-full p-4 border-[3px] border-black rounded-xl font-bold"
                    />
                  </div>
                  <button className="bg-brutal-orange text-white px-6 py-3 font-bold uppercase text-sm border-[3px] border-black shadow-brutal hover:bg-brutal-yellow hover:text-black transition-all rounded-xl">
                    Update Credentials
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Gift Modal */}
        {showAddGiftModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <div className="bg-white border-[6px] border-black shadow-brutal-xl rounded-[3rem] p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-brutal-pink border-[4px] border-black rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🎁</div>
                <h3 className="font-display text-4xl uppercase mb-2">Add New Gift</h3>
                <p className="font-bold text-lg text-stone-600">Create a new registry item</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-bold mb-2">Gift Name *</label>
                  <input 
                    type="text" 
                    value={newGift.name}
                    onChange={(e) => handleNewGiftChange('name', e.target.value)}
                    className="w-full border-[3px] border-black p-3 rounded-xl focus:bg-brutal-yellow outline-none font-bold" 
                    placeholder="e.g. Coffee Maker"
                  />
                </div>
                
                <div>
                  <label className="block font-bold mb-2">Brand *</label>
                  <input 
                    type="text" 
                    value={newGift.brand}
                    onChange={(e) => handleNewGiftChange('brand', e.target.value)}
                    className="w-full border-[3px] border-black p-3 rounded-xl focus:bg-brutal-yellow outline-none font-bold" 
                    placeholder="e.g. KitchenAid"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-2">Model/Color (Optional)</label>
                  <input 
                    type="text" 
                    value={newGift.modelColor}
                    onChange={(e) => handleNewGiftChange('modelColor', e.target.value)}
                    className="w-full border-[3px] border-black p-3 rounded-xl focus:bg-brutal-yellow outline-none font-bold" 
                    placeholder="e.g. Matte Black"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-2">Price Range *</label>
                  <input 
                    type="text" 
                    value={newGift.priceRange}
                    onChange={(e) => handleNewGiftChange('priceRange', e.target.value)}
                    className="w-full border-[3px] border-black p-3 rounded-xl focus:bg-brutal-yellow outline-none font-bold" 
                    placeholder="e.g. $50"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-bold mb-2">Product URL *</label>
                  <input 
                    type="url" 
                    value={newGift.url}
                    onChange={(e) => handleNewGiftChange('url', e.target.value)}
                    className="w-full border-[3px] border-black p-3 rounded-xl focus:bg-brutal-yellow outline-none font-bold" 
                    placeholder="https://..."
                  />
                </div>
              </div>
              
              <div className="flex gap-4 mt-8">
                <button 
                  onClick={addNewGift}
                  disabled={!newGift.name.trim() || !newGift.brand.trim() || !newGift.priceRange.trim() || !newGift.url.trim()}
                  className="flex-grow bg-brutal-pink text-white py-4 font-display text-xl uppercase tracking-widest border-[4px] border-black shadow-brutal hover:bg-brutal-green hover:text-black rounded-2xl disabled:opacity-50 disabled:hover:bg-brutal-pink disabled:hover:text-white transition-all"
                >
                  Add Gift
                </button>
                <button 
                  onClick={() => {
                    setShowAddGiftModal(false);
                    setNewGift({
                      name: '',
                      brand: '',
                      modelColor: '',
                      description: '',
                      priceRange: '',
                      category: 'Home & Living',
                      icon: '🎁',
                      url: ''
                    });
                  }}
                  className="px-8 border-[4px] border-black font-black uppercase text-sm rounded-2xl hover:bg-stone-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;