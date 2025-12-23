
import { Guest, RegistryItem } from './types';

export const INITIAL_GUESTS: Guest[] = [
  { id: '1', name: 'Abigail Anderson', attending: true, hasPlusOne: true, mealPreference: 'Standard', submittedAt: '2025-12-15 14:30' },
  { id: '2', name: 'Patrick Mahomes', attending: true, hasPlusOne: true, mealPreference: 'Standard', submittedAt: '2025-12-16 09:15' },
  { id: '3', name: 'Selena Gomez', attending: false, hasPlusOne: false, mealPreference: 'Vegan', submittedAt: '2025-12-16 11:20' },
  { id: '4', name: 'Jason Kelce', attending: true, hasPlusOne: true, mealPreference: 'Standard', submittedAt: '2025-12-17 18:45' },
  { id: '5', name: 'Lana Del Rey', attending: true, hasPlusOne: false, mealPreference: 'Vegetarian', submittedAt: '2025-12-18 10:00' },
  { id: '6', name: 'Kylie Kelce', attending: true, hasPlusOne: false, mealPreference: 'Standard', submittedAt: '2025-12-18 10:05' },
  { id: '7', name: 'Blake Lively', attending: true, hasPlusOne: true, mealPreference: 'Standard', submittedAt: '2025-12-19 12:00' },
  { id: '8', name: 'Ryan Reynolds', attending: false, hasPlusOne: false, mealPreference: 'Standard', submittedAt: '2025-12-19 12:05' },
];

export const INITIAL_REGISTRY: RegistryItem[] = [
  { id: 'r1', brand: 'Audio-Technica', name: 'Vintage Vinyl Player', modelColor: 'Walnut', description: 'Classic aesthetic for our living room.', priceRange: '$30', category: 'Home & Living', icon: '🎵', claimedBy: 'Abigail Anderson', claimedAt: '2025-12-15' },
  { id: 'r2', brand: 'Primacoustic', name: 'Soundproofing Panels', modelColor: 'Grey', description: 'For the Nashville home studio.', priceRange: '$60', category: 'Music Studio Essentials', icon: '🔇' },
  { id: 'r3', brand: 'Four Seasons', name: 'Amalfi Sunset Dinner', description: 'Honeymoon celebration.', priceRange: '$50', category: 'Honeymoon Experiences', icon: '🌅', claimedBy: 'The Mahomes Family', claimedAt: '2025-12-16' },
  { id: 'r4', brand: 'Le Creuset', name: 'Dutch Oven', modelColor: 'Cerise', description: 'For Sunday dinners.', priceRange: '$40', category: 'Home & Living', icon: '🥘' },
  { id: 'r5', brand: 'KitchenAid', name: 'Stand Mixer', modelColor: 'Matte Black', description: 'Baking the best cookies.', priceRange: '$45', category: 'Home & Living', icon: '🍰' },
  { id: 'r6', brand: 'Fender', name: 'Custom Telecaster', modelColor: 'Butterscotch', description: 'A new tool for new songs.', priceRange: '$250', category: 'Music Studio Essentials', icon: '🎸' },
  { id: 'r7', brand: 'Dyson', name: 'V15 Detect', description: 'Keeping the home clean.', priceRange: '$75', category: 'Home & Living', icon: '🧹' },
  { id: 'r8', brand: 'Airbnb', name: 'Tuscany Villa Stay', description: 'Week in the vineyard.', priceRange: '$200', category: 'Honeymoon Experiences', icon: '🏡' },
  { id: 'r9', brand: 'Moog', name: 'Matriarch Synthesizer', description: 'Infinite sound design.', priceRange: '$190', category: 'Music Studio Essentials', icon: '🎹' },
  { id: 'r10', brand: 'Sonos', name: 'Era 300 Speakers', modelColor: 'White', description: 'Spatial audio for the bedroom.', priceRange: '$90', category: 'Home & Living', icon: '🔊' },
  { id: 'r11', brand: 'Rimowa', name: 'Check-In L Suitcase', modelColor: 'Silver', description: 'Tour-ready luggage.', priceRange: '$140', category: 'Home & Living', icon: '🧳' },
  { id: 'r12', brand: 'Focusrite', name: 'Scarlett 18i20', description: 'Studio interface upgrade.', priceRange: '$60', category: 'Music Studio Essentials', icon: '🎚️' },
  { id: 'r13', brand: 'Vespa', name: 'Elettrica Scooter', modelColor: 'Red', description: 'Zipping around Nashville.', priceRange: '$350', category: 'Honeymoon Experiences', icon: '🛵' },
];
