export type CarCategory = 'SUV' | 'Sedan' | 'Hatchback' | 'Coupe' | 'Electric';

export interface CarDealer {
  name: string;
  phone: string;
  email: string;
  rating: number;
  reviewsCount: number;
  verified: boolean;
  address: string;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  subtitle: string;
  year: number;
  price: number;
  category: CarCategory;
  condition: 'New' | 'Used';
  images: string[];
  mileage: number; // in km
  fuelType: 'Electric' | 'Gasoline' | 'Hybrid' | 'Diesel';
  transmission: 'Automatic' | 'Manual' | 'Dual-Clutch';
  engine: string;
  horsepower: number; // HP
  topSpeed: number; // km/h
  acceleration: number; // 0-100 km/h in sec
  range?: number; // km for EV/Hybrid
  location: string;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  availableColors: { name: string; hex: string }[];
  dealer: CarDealer;
  featured?: boolean;
  badge?: string;
}

export interface FilterState {
  query: string;
  category: string; // 'All' | CarCategory
  brand: string; // 'All' | specific brand
  minPrice: number;
  maxPrice: number;
  minYear: number;
  maxYear: number;
  fuelType: string;
  transmission: string;
  condition: 'All' | 'New' | 'Used';
  sortBy: 'popular' | 'price_asc' | 'price_desc' | 'year_desc' | 'rating';
}

export interface GarageItem {
  id: string;
  carId: string;
  customNickname?: string;
  purchaseDate: string;
  currentMileage: number;
  lastServiceDate: string;
  nextServiceDue: string;
  notes?: string;
  status: 'Active' | 'In Service' | 'Stored';
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  sender: 'user' | 'dealer';
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  dealerName: string;
  dealerVerified: boolean;
  carId: string;
  carName: string;
  carImage: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatarUrl: string;
  memberSince: string;
  notificationsEnabled: boolean;
  currency: string;
}
