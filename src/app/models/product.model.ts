export interface ProductVariant {
  color?: string;
  size?: string;
  additionalPrice?: number;
  id?: number;
  stock?: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  imageUrl: string;
  images?: string[];
  featured: boolean;
  isNew: boolean;
  rating?: number;
  category: string;
  stock: number;
  variants?: ProductVariant[];
  specifications?: { [key: string]: string };
}