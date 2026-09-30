export type Currency = 'TZS' | 'USD';

export interface MenuItem {
  id: string;
  name: string;
  category: 'starters' | 'mains' | 'desserts' | 'cocktails';
  priceTZS: number;
  priceUSD: number;
  description: string;
  image: string;
  dietary: string[];
  rating: number;
}

export interface Chef {
  id: string;
  name: string;
  role: string;
  experience: string;
  image: string;
  specialty: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  avatar: string;
}
