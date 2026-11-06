import React, { createContext, useContext, useState, useEffect } from 'react';
import { Car, FilterState, GarageItem, Conversation, UserProfile, ChatMessage } from '../types';
import { CARS_DATA } from '../data/cars';

export type ScreenId =
  | 'onboarding'
  | 'home'
  | 'search'
  | 'details'
  | 'compare'
  | 'favorites'
  | 'garage'
  | 'messages'
  | 'profile'
  | 'auth';

export type ViewLayout = 'device' | 'responsive' | 'reference';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface AppContextType {
  activeScreen: ScreenId;
  setActiveScreen: (screen: ScreenId) => void;
  selectedCarId: string;
  setSelectedCarId: (id: string) => void;
  selectedCar: Car;
  allCars: Car[];
  favorites: string[];
  toggleFavorite: (carId: string) => void;
  isFavorite: (carId: string) => boolean;
  compareList: string[];
  addToCompare: (carId: string) => void;
  removeFromCompare: (carId: string) => void;
  clearCompare: () => void;
  isInCompare: (carId: string) => boolean;
  garage: GarageItem[];
  addToGarage: (item: Omit<GarageItem, 'id'>) => void;
  removeFromGarage: (id: string) => void;
  updateGarageItem: (id: string, updates: Partial<GarageItem>) => void;
  conversations: Conversation[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  sendMessage: (conversationId: string, text: string) => void;
  startDealerInquiry: (car: Car, initialMessage?: string) => void;
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  isFilterModalOpen: boolean;
  setIsFilterModalOpen: (open: boolean) => void;
  isInstallModalOpen: boolean;
  setIsInstallModalOpen: (open: boolean) => void;
  openInstallModal: () => void;
  viewLayout: ViewLayout;
  setViewLayout: (layout: ViewLayout) => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
  filteredCars: Car[];
}

const defaultFilters: FilterState = {
  query: '',
  category: 'All',
  brand: 'All',
  minPrice: 0,
  maxPrice: 200000,
  minYear: 2020,
  maxYear: 2025,
  fuelType: 'All',
  transmission: 'All',
  condition: 'All',
  sortBy: 'popular'
};

const initialUser: UserProfile = {
  id: 'usr-1',
  name: 'Alex Vance',
  email: 'alex.vance@autohub.io',
  phone: '+1 (555) 382-9014',
  location: 'San Francisco, CA',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  memberSince: 'March 2024',
  notificationsEnabled: true,
  currency: 'USD ($)'
};

const initialConversations: Conversation[] = [
  {
    id: 'conv-1',
    dealerName: 'Tesla Premier Studio Bay Area',
    dealerVerified: true,
    carId: 'tesla-model-3',
    carName: 'Tesla Model 3 Long Range AWD',
    carImage: '/assets/images/tesla_details_car_1793954345712.jpg',
    lastMessage: 'Good afternoon Alex! We have a test drive slot open tomorrow at 2:00 PM for the Model 3.',
    lastMessageTime: '10:42 AM',
    unreadCount: 2,
    messages: [
      {
        id: 'm1',
        conversationId: 'conv-1',
        sender: 'user',
        text: 'Hi, is this Model 3 Long Range AWD available for an immediate test drive this week?',
        timestamp: 'Yesterday, 4:15 PM'
      },
      {
        id: 'm2',
        conversationId: 'conv-1',
        sender: 'dealer',
        text: 'Hello Alex! Absolutely. It is in our showroom in Stealth Grey with the 19" Nova wheels.',
        timestamp: 'Yesterday, 4:20 PM'
      },
      {
        id: 'm3',
        conversationId: 'conv-1',
        sender: 'dealer',
        text: 'Good afternoon Alex! We have a test drive slot open tomorrow at 2:00 PM for the Model 3.',
        timestamp: '10:42 AM'
      }
    ]
  },
  {
    id: 'conv-2',
    dealerName: 'Manhattan BMW Motorwerks',
    dealerVerified: true,
    carId: 'bmw-x5',
    carName: 'BMW X5 xDrive40i M Sport',
    carImage: '/assets/images/bmw_x5_card_1793954344587.jpg',
    lastMessage: 'The window sticker and complimentary ceramic coating estimate have been prepared for you.',
    lastMessageTime: 'Nov 4',
    unreadCount: 0,
    messages: [
      {
        id: 'm4',
        conversationId: 'conv-2',
        sender: 'user',
        text: 'Does this X5 include the Executive Package with sky lounge LED roof?',
        timestamp: 'Nov 4, 11:10 AM'
      },
      {
        id: 'm5',
        conversationId: 'conv-2',
        sender: 'dealer',
        text: 'The window sticker and complimentary ceramic coating estimate have been prepared for you.',
        timestamp: 'Nov 4, 11:32 AM'
      }
    ]
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('onboarding');
  const [selectedCarId, setSelectedCarId] = useState<string>('tesla-model-3');
  const [viewLayout, setViewLayout] = useState<ViewLayout>('device');

  // Favorites stored in state & localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('autohub_favorites');
      return saved ? JSON.parse(saved) : ['tesla-model-3', 'bmw-x5'];
    } catch {
      return ['tesla-model-3', 'bmw-x5'];
    }
  });

  // Comparison list (up to 3 cars)
  const [compareList, setCompareList] = useState<string[]>(['tesla-model-3', 'bmw-x5']);

  // Garage stored in state & localStorage
  const [garage, setGarage] = useState<GarageItem[]>(() => {
    try {
      const saved = localStorage.getItem('autohub_garage');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'gar-1',
              carId: 'mercedes-c300',
              customNickname: 'My Daily C300',
              purchaseDate: '2024-01-15',
              currentMileage: 8400,
              lastServiceDate: '2024-07-20',
              nextServiceDue: '2025-01-20',
              notes: 'Tire rotation completed at 7,500 km. Next Service A scheduled.',
              status: 'Active'
            }
          ];
    } catch {
      return [];
    }
  });

  // Conversations
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    try {
      const saved = localStorage.getItem('autohub_conversations');
      return saved ? JSON.parse(saved) : initialConversations;
    } catch {
      return initialConversations;
    }
  });
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  // User Profile
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('autohub_user');
      return saved ? JSON.parse(saved) : initialUser;
    } catch {
      return initialUser;
    }
  });

  // Filter state
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  const openInstallModal = () => setIsInstallModalOpen(true);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('autohub_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('autohub_garage', JSON.stringify(garage));
  }, [garage]);

  useEffect(() => {
    localStorage.setItem('autohub_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('autohub_user', JSON.stringify(user));
  }, [user]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleFavorite = (carId: string) => {
    setFavorites(prev => {
      const exists = prev.includes(carId);
      if (exists) {
        showToast('Removed from favorites', 'info');
        return prev.filter(id => id !== carId);
      } else {
        showToast('Saved to your favorites', 'success');
        return [...prev, carId];
      }
    });
  };

  const isFavorite = (carId: string) => favorites.includes(carId);

  const addToCompare = (carId: string) => {
    if (compareList.includes(carId)) {
      showToast('Car already in comparison', 'info');
      return;
    }
    if (compareList.length >= 3) {
      showToast('Comparison limit reached (max 3 cars)', 'info');
      return;
    }
    setCompareList(prev => [...prev, carId]);
    showToast('Added to comparison tool', 'success');
  };

  const removeFromCompare = (carId: string) => {
    setCompareList(prev => prev.filter(id => id !== carId));
    showToast('Removed from comparison', 'info');
  };

  const clearCompare = () => {
    setCompareList([]);
    showToast('Comparison cleared', 'info');
  };

  const isInCompare = (carId: string) => compareList.includes(carId);

  const addToGarage = (item: Omit<GarageItem, 'id'>) => {
    const newItem: GarageItem = {
      ...item,
      id: `gar-${Date.now()}`
    };
    setGarage(prev => [newItem, ...prev]);
    showToast('Vehicle parked in My Garage!', 'success');
  };

  const removeFromGarage = (id: string) => {
    setGarage(prev => prev.filter(item => item.id !== id));
    showToast('Vehicle removed from garage', 'info');
  };

  const updateGarageItem = (id: string, updates: Partial<GarageItem>) => {
    setGarage(prev => prev.map(item => (item.id === id ? { ...item, ...updates } : item)));
    showToast('Garage vehicle record updated', 'success');
  };

  const sendMessage = (conversationId: string, text: string) => {
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(prev =>
      prev.map(c => {
        if (c.id === conversationId) {
          return {
            ...c,
            lastMessage: text,
            lastMessageTime: 'Just now',
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );

    // Simulated dealer auto-reply after 1.5 seconds for true interactivity
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        conversationId,
        sender: 'dealer',
        text: `Thank you for your inquiry regarding the ${text.length > 25 ? 'vehicle' : 'details'}! Our AutoHub certified specialist has received your request and will provide full inspection records promptly.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setConversations(current =>
        current.map(c => {
          if (c.id === conversationId) {
            return {
              ...c,
              lastMessage: replyMsg.text,
              lastMessageTime: 'Just now',
              messages: [...c.messages, replyMsg]
            };
          }
          return c;
        })
      );
    }, 1500);
  };

  const startDealerInquiry = (car: Car, initialMessage?: string) => {
    const existing = conversations.find(c => c.carId === car.id);
    if (existing) {
      setActiveConversationId(existing.id);
      setActiveScreen('messages');
      if (initialMessage) {
        sendMessage(existing.id, initialMessage);
      }
      return;
    }

    const newConvId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newConvId,
      dealerName: car.dealer.name,
      dealerVerified: car.dealer.verified,
      carId: car.id,
      carName: `${car.model} ${car.subtitle}`,
      carImage: car.images[0],
      lastMessage: initialMessage || `Hello, I'm interested in this ${car.model}.`,
      lastMessageTime: 'Just now',
      unreadCount: 0,
      messages: [
        {
          id: `m-init-${Date.now()}`,
          conversationId: newConvId,
          sender: 'user',
          text: initialMessage || `Hello! I would like to inquire about this ${car.model} (${car.year}). Is it still available for viewing?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };

    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(newConvId);
    setActiveScreen('messages');
    showToast(`Inquiry sent to ${car.dealer.name}`, 'success');

    // Simulate response
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `m-reply-${Date.now()}`,
        conversationId: newConvId,
        sender: 'dealer',
        text: `Hello ${user.name}! Yes, the ${car.model} is currently in our certified showroom inventory. Would you like us to reserve a VIP viewing or arrange home delivery inspection?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setConversations(current =>
        current.map(c => (c.id === newConvId ? { ...c, lastMessage: replyMsg.text, messages: [...c.messages, replyMsg] } : c))
      );
    }, 1200);
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
    showToast('Profile updated successfully', 'success');
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    showToast('Filters reset', 'info');
  };

  const selectedCar = CARS_DATA.find(c => c.id === selectedCarId) || CARS_DATA[0];

  // Dynamic search and filter logic
  const filteredCars = CARS_DATA.filter(car => {
    if (filters.query) {
      const q = filters.query.toLowerCase();
      const matchName = car.model.toLowerCase().includes(q);
      const matchBrand = car.brand.toLowerCase().includes(q);
      const matchCategory = car.category.toLowerCase().includes(q);
      const matchDesc = car.description.toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchCategory && !matchDesc) return false;
    }

    if (filters.category !== 'All' && car.category !== filters.category) {
      return false;
    }

    if (filters.brand !== 'All' && car.brand.toLowerCase() !== filters.brand.toLowerCase()) {
      return false;
    }

    if (car.price < filters.minPrice || car.price > filters.maxPrice) {
      return false;
    }

    if (car.year < filters.minYear || car.year > filters.maxYear) {
      return false;
    }

    if (filters.fuelType !== 'All' && car.fuelType !== filters.fuelType) {
      return false;
    }

    if (filters.transmission !== 'All' && car.transmission !== filters.transmission) {
      return false;
    }

    if (filters.condition !== 'All' && car.condition !== filters.condition) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'price_asc') return a.price - b.price;
    if (filters.sortBy === 'price_desc') return b.price - a.price;
    if (filters.sortBy === 'year_desc') return b.year - a.year;
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    return b.rating * 1000 - a.rating * 1000; // popular
  });

  return (
    <AppContext.Provider
      value={{
        activeScreen,
        setActiveScreen,
        selectedCarId,
        setSelectedCarId,
        selectedCar,
        allCars: CARS_DATA,
        favorites,
        toggleFavorite,
        isFavorite,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        garage,
        addToGarage,
        removeFromGarage,
        updateGarageItem,
        conversations,
        activeConversationId,
        setActiveConversationId,
        sendMessage,
        startDealerInquiry,
        user,
        updateUser,
        filters,
        setFilters,
        resetFilters,
        isFilterModalOpen,
        setIsFilterModalOpen,
        isInstallModalOpen,
        setIsInstallModalOpen,
        openInstallModal,
        viewLayout,
        setViewLayout,
        toasts,
        showToast,
        dismissToast,
        filteredCars
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
