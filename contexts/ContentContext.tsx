import React, { createContext, useContext, useState, useEffect } from 'react';

export interface WebsiteContent {
  // Basic Information
  weddingDate: string;
  ceremonyTime: string;
  venueName: string;
  venueLocation: string;
  venueAddress: string;
  
  // Couple Information
  brideFullName: string;
  groomFullName: string;
  brideDisplayName: string;
  groomDisplayName: string;
  
  // Quotes & Main Text
  mainQuote: string;
  bannerText: string;
  invitationOpening: string;
  invitationClosing: string;
  
  // Story Content
  storyTitle: string;
  storySubtitle: string;
  story1Title: string;
  story1Text: string;
  story2Title: string;
  story2Text: string;
  story3Title: string;
  story3Text: string;
  finalStoryQuote: string;
  
  // Wedding Schedule
  event1: string;
  time1: string;
  event2: string;
  time2: string;
  event3: string;
  time3: string;
  event4: string;
  time4: string;
  
  // Venue Information
  venueDescription: string;
  parkingInstructions: string;
  entranceInstructions: string;
}

const defaultContent: WebsiteContent = {
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
};

interface ContentContextType {
  content: WebsiteContent;
  updateContent: (newContent: WebsiteContent) => void;
  refreshContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<WebsiteContent>(defaultContent);

  const refreshContent = () => {
    const savedContent = localStorage.getItem('websiteContent');
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        setContent({ ...defaultContent, ...parsed });
      } catch (error) {
        console.error('Error loading saved content:', error);
        setContent(defaultContent);
      }
    }
  };

  const updateContent = (newContent: WebsiteContent) => {
    setContent(newContent);
  };

  useEffect(() => {
    refreshContent();
    
    // Listen for content updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'websiteContent') {
        refreshContent();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <ContentContext.Provider value={{ content, updateContent, refreshContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};