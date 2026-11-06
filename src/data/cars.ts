import { Car } from '../types';

export const CARS_DATA: Car[] = [
  {
    id: 'tesla-model-3',
    brand: 'Tesla',
    model: 'Tesla Model 3',
    subtitle: 'Long Range AWD',
    year: 2024,
    price: 48990,
    category: 'Electric',
    condition: 'New',
    images: [
      '/assets/images/tesla_details_car_1793954345712.jpg',
      '/assets/images/home_hero_car_1793954344385.jpg'
    ],
    mileage: 45,
    fuelType: 'Electric',
    transmission: 'Automatic',
    engine: 'Dual Electric Motor AWD',
    horsepower: 346,
    topSpeed: 233,
    acceleration: 4.4,
    range: 580,
    location: 'San Francisco, CA',
    rating: 4.8,
    reviewCount: 120,
    description: 'The Tesla Model 3 Long Range AWD delivers exhilarating acceleration, cutting-edge autonomous driver assistance, and an estimated 580 km of pure electric range on a single charge. Features a minimalist glass-roof cabin and next-generation acoustic glass.',
    features: [
      'Full Self-Driving Capability hardware',
      'Dual Motor All-Wheel Drive',
      '15-inch Cinematic Touchscreen display',
      'Premium 17-speaker audio with subwoofer',
      'Glass acoustic panoramic roof',
      'Heated seats front and rear',
      'Wireless dual-device charging pad'
    ],
    availableColors: [
      { name: 'Stealth Grey', hex: '#4A5568' },
      { name: 'Pearl White Multi-Coat', hex: '#F7FAFC' },
      { name: 'Deep Blue Metallic', hex: '#1E3A8A' },
      { name: 'Ultra Red', hex: '#DC2626' },
      { name: 'Solid Black', hex: '#111827' }
    ],
    dealer: {
      name: 'Tesla Premier Studio Bay Area',
      phone: '+1 (415) 555-0192',
      email: 'sales@teslastudiobay.com',
      rating: 4.9,
      reviewsCount: 342,
      verified: true,
      address: '999 Van Ness Ave, San Francisco, CA 94109'
    },
    featured: true,
    badge: 'Trending EV'
  },
  {
    id: 'bmw-x5',
    brand: 'BMW',
    model: 'BMW X5',
    subtitle: 'xDrive40i M Sport',
    year: 2024,
    price: 65500,
    category: 'SUV',
    condition: 'New',
    images: [
      '/assets/images/bmw_x5_card_1793954344587.jpg'
    ],
    mileage: 1200,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    engine: '3.0L BMW TwinPower Turbo inline 6-cylinder',
    horsepower: 375,
    topSpeed: 250,
    acceleration: 5.3,
    range: 720,
    location: 'New York, USA',
    rating: 4.9,
    reviewCount: 88,
    description: 'The iconic BMW X5 combines dominating athletic proportions with first-class cabin luxury. Equipped with the M Sport aerodynamic package, 48V mild-hybrid efficiency, and the BMW Curved Display running Operating System 8.5.',
    features: [
      'BMW Curved Display with Navigation Pro',
      'M Sport Aerodynamics Package & 21" Wheels',
      'Panoramic Sky Lounge LED Roof',
      'Harman Kardon Surround Sound System',
      'Driving Assistance Professional Package',
      'Active Blind Spot Detection & Lane Assist'
    ],
    availableColors: [
      { name: 'Black Sapphire Metallic', hex: '#0F172A' },
      { name: 'Mineral White Metallic', hex: '#F1F5F9' },
      { name: 'Marina Bay Blue', hex: '#1D4ED8' },
      { name: 'Dravit Grey Metallic', hex: '#475569' }
    ],
    dealer: {
      name: 'Manhattan BMW Motorwerks',
      phone: '+1 (212) 555-0144',
      email: 'inquiries@bmwmanhattan.com',
      rating: 4.8,
      reviewsCount: 512,
      verified: true,
      address: '555 W 57th St, New York, NY 10019'
    },
    featured: true,
    badge: 'Best Seller'
  },
  {
    id: 'audi-a6',
    brand: 'Audi',
    model: 'Audi A6',
    subtitle: '55 TFSI quattro S Line',
    year: 2023,
    price: 48900,
    category: 'Sedan',
    condition: 'Used',
    images: [
      '/assets/images/audi_a6_card_1793954343855.jpg'
    ],
    mileage: 18500,
    fuelType: 'Gasoline',
    transmission: 'Dual-Clutch',
    engine: '3.0L Turbocharged V6 with MHEV',
    horsepower: 335,
    topSpeed: 250,
    acceleration: 5.1,
    location: 'Chicago, IL',
    rating: 4.7,
    reviewCount: 64,
    description: 'A benchmark in executive elegance. This Audi A6 features legendary quattro all-wheel drive, dual central MMI touchscreens with haptic feedback, and an ultra-quiet acoustic insulation package.',
    features: [
      'Audi Virtual Cockpit Plus 12.3" display',
      'quattro permanent all-wheel drive',
      'Matrix-design LED headlights with DRL',
      'Bang & Olufsen 3D Premium Sound System',
      'Valcona leather ventilated seating',
      'Top view camera system with Virtual 360'
    ],
    availableColors: [
      { name: 'Florett Silver Metallic', hex: '#94A3B8' },
      { name: 'Mythos Black Metallic', hex: '#020617' },
      { name: 'Daytona Gray Pearl', hex: '#334155' }
    ],
    dealer: {
      name: 'Audi Exchange North Shore',
      phone: '+1 (312) 555-0188',
      email: 'concierge@audiexchange.com',
      rating: 4.7,
      reviewsCount: 290,
      verified: true,
      address: '2300 S Michigan Ave, Chicago, IL 60616'
    },
    featured: false,
    badge: 'Certified Pre-Owned'
  },
  {
    id: 'mercedes-c300',
    brand: 'Mercedes-Benz',
    model: 'Mercedes-Benz C-Class',
    subtitle: 'C300 4MATIC AMG Line',
    year: 2024,
    price: 46850,
    category: 'Sedan',
    condition: 'New',
    images: [
      '/assets/images/home_hero_car_1793954344385.jpg'
    ],
    mileage: 50,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    engine: '2.0L Inline-4 Turbo with ISG',
    horsepower: 255,
    topSpeed: 241,
    acceleration: 6.0,
    location: 'Miami, FL',
    rating: 4.8,
    reviewCount: 95,
    description: 'Inspired by the flagship S-Class, the Mercedes-Benz C300 delivers groundbreaking digital luxury with an 11.9-inch portrait touchscreen, 64-color ambient cabin lighting, and refined AMG styling elements.',
    features: [
      '11.9-inch portrait central display',
      'Burmester 3D Surround Sound',
      'AMG Line exterior styling & 19" AMG multi-spoke wheels',
      'Active Distance Assist DISTRONIC',
      'Fingerprint scanner biometric authentication',
      'Sport suspension with selective damping'
    ],
    availableColors: [
      { name: 'Obsidian Black Metallic', hex: '#0B0F19' },
      { name: 'Polar White', hex: '#F8FAFC' },
      { name: 'Spectral Blue Metallic', hex: '#1E40AF' }
    ],
    dealer: {
      name: 'Mercedes-Benz of Coral Gables',
      phone: '+1 (305) 555-0177',
      email: 'vip@mbcoralgables.com',
      rating: 4.9,
      reviewsCount: 420,
      verified: true,
      address: '300 Almeria Ave, Coral Gables, FL 33134'
    },
    featured: true,
    badge: 'Featured'
  },
  {
    id: 'toyota-rav4-prime',
    brand: 'Toyota',
    model: 'Toyota RAV4 Prime',
    subtitle: 'XSE Plug-in Hybrid',
    year: 2023,
    price: 43400,
    category: 'SUV',
    condition: 'Used',
    images: [
      '/assets/images/bmw_x5_card_1793954344587.jpg'
    ],
    mileage: 14200,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    engine: '2.5L 4-Cylinder Plug-in Hybrid AWD',
    horsepower: 302,
    topSpeed: 190,
    acceleration: 5.7,
    range: 680,
    location: 'Denver, CO',
    rating: 4.8,
    reviewCount: 140,
    description: 'The RAV4 Prime offers a thrilling 302 horsepower with an electric-only range of up to 68 km. Perfect for city commutes and rocky mountain adventures with Electronic On-Demand All-Wheel Drive.',
    features: [
      '68 km pure EV electric driving range',
      'Electronic On-Demand All-Wheel Drive',
      '10.5-inch Toyota Audio Multimedia touchscreen',
      'SofTex-trimmed seats with red sport stitching',
      'JBL 11-speaker premium sound system',
      'Panoramic moonroof & hands-free power liftgate'
    ],
    availableColors: [
      { name: 'Supersonic Red Two-Tone', hex: '#B91C1C' },
      { name: 'Magnetic Gray Metallic', hex: '#4B5563' },
      { name: 'Blueprint', hex: '#1E3A8A' }
    ],
    dealer: {
      name: 'Mile High Toyota Boulder',
      phone: '+1 (303) 555-0155',
      email: 'sales@milehightoyota.com',
      rating: 4.8,
      reviewsCount: 610,
      verified: true,
      address: '1800 28th St, Boulder, CO 80301'
    },
    featured: false,
    badge: 'High Efficiency'
  },
  {
    id: 'porsche-taycan-4s',
    brand: 'Porsche',
    model: 'Porsche Taycan 4S',
    subtitle: 'Performance Battery Plus',
    year: 2024,
    price: 113300,
    category: 'Electric',
    condition: 'New',
    images: [
      '/assets/images/onboarding_car_1793954342429.jpg'
    ],
    mileage: 80,
    fuelType: 'Electric',
    transmission: 'Automatic',
    engine: 'Dual Permanent Magnet Synchronous Motors',
    horsepower: 530,
    topSpeed: 250,
    acceleration: 4.0,
    range: 512,
    location: 'Los Angeles, CA',
    rating: 5.0,
    reviewCount: 76,
    description: 'Pure Porsche sports car soul electrified. 800-volt battery architecture enables ultra-fast charging from 5% to 80% in 22.5 minutes. Adaptive air suspension with Porsche Active Suspension Management (PASM).',
    features: [
      '800-Volt Architecture with 270kW Fast Charging',
      'Porsche 4D Chassis Control & Adaptive Air Suspension',
      'Curved 16.8-inch driver digital cockpit',
      'Performance Battery Plus 93.4 kWh',
      'Sport Chrono Package with mode switch',
      'Bose Surround Sound Audio'
    ],
    availableColors: [
      { name: 'Frozen Blue Metallic', hex: '#38BDF8' },
      { name: 'Gentian Blue Metallic', hex: '#1E3A8A' },
      { name: 'Volcano Grey Metallic', hex: '#374151' }
    ],
    dealer: {
      name: 'Porsche Beverly Hills Experience',
      phone: '+1 (310) 555-0199',
      email: 'vip@porschebh.com',
      rating: 5.0,
      reviewsCount: 388,
      verified: true,
      address: '8423 Wilshire Blvd, Beverly Hills, CA 90211'
    },
    featured: true,
    badge: 'Supercar EV'
  },
  {
    id: 'mercedes-amg-gt',
    brand: 'Mercedes-Benz',
    model: 'Mercedes-AMG GT Coupe',
    subtitle: '55 4MATIC+ V8 BiTurbo',
    year: 2024,
    price: 134900,
    category: 'Coupe',
    condition: 'New',
    images: [
      '/assets/images/home_hero_car_1793954344385.jpg'
    ],
    mileage: 210,
    fuelType: 'Gasoline',
    transmission: 'Dual-Clutch',
    engine: 'Handcrafted AMG 4.0L V8 Biturbo',
    horsepower: 469,
    topSpeed: 295,
    acceleration: 3.9,
    location: 'Dallas, TX',
    rating: 4.9,
    reviewCount: 42,
    description: 'The second generation AMG GT Coupe unites supreme race track dynamics with everyday grand touring comfort. Active roll stabilization, rear-axle steering, and fully variable AMG Performance 4MATIC+.',
    features: [
      'Handcrafted AMG 4.0L V8 Biturbo engine',
      'AMG ACTIVE RIDE CONTROL hydraulic roll stabilization',
      'Active rear-axle steering up to 2.5 degrees',
      'AMG SPEEDSHIFT MCT 9-speed sports transmission',
      '2+2 seating configuration with expansive cargo space',
      'Burmester High-End 3D Surround Sound'
    ],
    availableColors: [
      { name: 'MANUFAKTUR Hyper Blue Magno', hex: '#2563EB' },
      { name: 'Obsidian Black', hex: '#0B0F19' },
      { name: 'Selenite Grey Magno', hex: '#4B5563' }
    ],
    dealer: {
      name: 'Park Place Motorcars Dallas',
      phone: '+1 (214) 555-0122',
      email: 'amg@parkplace.com',
      rating: 4.9,
      reviewsCount: 480,
      verified: true,
      address: '6113 Lemmon Ave, Dallas, TX 75209'
    },
    featured: true,
    badge: 'AMG Performance'
  },
  {
    id: 'audi-rs6-avant',
    brand: 'Audi',
    model: 'Audi RS6 Avant',
    subtitle: 'Performance 4.0 TFSI V8',
    year: 2024,
    price: 125800,
    category: 'Hatchback',
    condition: 'New',
    images: [
      '/assets/images/audi_a6_card_1793954343855.jpg'
    ],
    mileage: 400,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    engine: '4.0L Twin-Turbocharged V8 with Mild Hybrid',
    horsepower: 621,
    topSpeed: 305,
    acceleration: 3.4,
    location: 'Seattle, WA',
    rating: 5.0,
    reviewCount: 91,
    description: 'The ultimate super wagon. Blending 621 horsepower, quattro sport differential, dynamic all-wheel steering, and practical hatchback estate utility.',
    features: [
      '621 HP Twin-Turbo V8 with RS Sport exhaust',
      'quattro permanent all-wheel drive with Sport differential',
      'Dynamic all-wheel steering',
      'RS sport suspension plus with Dynamic Ride Control (DRC)',
      'Carbon ceramic braking package',
      'Valcona leather RS sport seats with honeycomb stitching'
    ],
    availableColors: [
      { name: 'Nardo Gray', hex: '#6B7280' },
      { name: 'Sebring Black Crystal', hex: '#111827' },
      { name: 'Ascari Blue Metallic', hex: '#1D4ED8' }
    ],
    dealer: {
      name: 'University Audi Seattle',
      phone: '+1 (206) 555-0133',
      email: 'rs-concierge@universityaudi.com',
      rating: 4.9,
      reviewsCount: 310,
      verified: true,
      address: '4724 Roosevelt Way NE, Seattle, WA 98105'
    },
    featured: false,
    badge: 'Rare Find'
  }
];

export const FEATURED_BRANDS = [
  { id: 'tesla', name: 'Tesla', logoText: 'TESLA', origin: 'USA' },
  { id: 'bmw', name: 'BMW', logoText: 'BMW', origin: 'Germany' },
  { id: 'mercedes', name: 'Mercedes-Benz', logoText: 'MERCEDES', origin: 'Germany' },
  { id: 'audi', name: 'Audi', logoText: 'AUDI', origin: 'Germany' },
  { id: 'toyota', name: 'Toyota', logoText: 'TOYOTA', origin: 'Japan' },
  { id: 'porsche', name: 'Porsche', logoText: 'PORSCHE', origin: 'Germany' }
];

export const CAR_CATEGORIES: { id: string; name: string; icon: string }[] = [
  { id: 'All', name: 'All', icon: 'Sparkles' },
  { id: 'SUV', name: 'SUV', icon: 'Car' },
  { id: 'Sedan', name: 'Sedan', icon: 'Car' },
  { id: 'Hatchback', name: 'Hatchback', icon: 'Car' },
  { id: 'Coupe', name: 'Coupe', icon: 'Flame' },
  { id: 'Electric', name: 'Electric', icon: 'Zap' }
];
