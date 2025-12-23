
export interface Guest {
  id: string;
  name: string;
  attending: boolean; // Simplified: Accepted or Declined
  hasPlusOne: boolean;
  mealPreference: 'Standard' | 'Vegetarian' | 'Vegan' | 'Gluten-Free';
  submittedAt: string; // Timestamp for recent activity
}

export interface RegistryItem {
  id: string;
  name: string;
  brand?: string;
  modelColor?: string;
  description: string;
  priceRange: string;
  category: 'Home & Living' | 'Music Studio Essentials' | 'Honeymoon Experiences';
  url?: string;
  imageUrl?: string;
  icon?: string; // Emoji icon for the product
  claimedBy?: string;
  claimedAt?: string;
}

export interface WeddingContent {
  homeHeroTitle: string;
  homeHeroSubtitle: string;
  invitationText: string;
  ceremonyTime: string;
  ceremonyLocation: string;
  receptionDetails: string;
  couplePhotos: string[];
}
