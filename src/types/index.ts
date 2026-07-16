export interface Product {
  id: string;
  name: string;
  price: number;
  color: string;
  colorHex: string;
  description: string;
  image: string;
  label?: 'Eng mashhur' | 'Premium' | 'Yangi';
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface OrderFormData {
  fullName: string;
  phone: string;
  institution: string;
  group: string;
  region: string;
  address: string;
  productName: string;
  quantity: number;
  comment?: string;
}
