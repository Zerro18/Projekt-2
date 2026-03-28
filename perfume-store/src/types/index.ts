export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  description: string;
  longDescription: string;
  category: "women" | "men" | "unisex";
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  sizes: { ml: number; price: number }[];
  images: string[];
  rating: number;
  reviews: number;
  badge?: "new" | "bestseller" | "sale";
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: { ml: number; price: number };
}
