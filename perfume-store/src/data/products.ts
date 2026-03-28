import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Rose Noir",
    brand: "Maison Élite",
    price: 189,
    description: "A dark, mysterious rose with smoky vetiver undertones.",
    longDescription:
      "Rose Noir is an intoxicating journey into the darker side of floral perfumery. Opening with a burst of Bulgarian rose absolute, it unfolds into a rich heart of oud and jasmine before settling into a deep, woody base of vetiver and musk. A scent for those who dare to be different.",
    category: "women",
    notes: {
      top: ["Bulgarian Rose", "Black Pepper", "Bergamot"],
      heart: ["Oud", "Jasmine", "Iris"],
      base: ["Vetiver", "Musk", "Sandalwood"],
    },
    sizes: [
      { ml: 30, price: 129 },
      { ml: 50, price: 189 },
      { ml: 100, price: 269 },
    ],
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80",
    ],
    rating: 4.9,
    reviews: 284,
    badge: "bestseller",
    featured: true,
  },
  {
    id: "2",
    name: "Aqua Lumière",
    brand: "Maison Élite",
    price: 165,
    description: "Fresh marine accord with sparkling citrus and white musk.",
    longDescription:
      "Aqua Lumière captures the essence of a sunlit Mediterranean morning. Crisp sea breeze notes blend with vibrant citrus in the opening, while the heart reveals delicate white florals and cool aquatic accords. The dry down is clean, sensual, and effortlessly sophisticated.",
    category: "unisex",
    notes: {
      top: ["Sea Salt", "Bergamot", "Lemon"],
      heart: ["White Tea", "Aquatic Accord", "Iris"],
      base: ["White Musk", "Cedarwood", "Ambergris"],
    },
    sizes: [
      { ml: 30, price: 115 },
      { ml: 50, price: 165 },
      { ml: 100, price: 235 },
    ],
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80",
    ],
    rating: 4.7,
    reviews: 196,
    badge: "new",
    featured: true,
  },
  {
    id: "3",
    name: "Bois Sacré",
    brand: "Atelier Noir",
    price: 245,
    description: "Sacred woods and amber resin create an opulent, warm embrace.",
    longDescription:
      "Bois Sacré is an ode to the ancient forests. Rich Indian sandalwood meets the warmth of amber resin and the smoky depth of frankincense. A meditative, deeply comforting fragrance that evolves beautifully on the skin throughout the day.",
    category: "men",
    notes: {
      top: ["Frankincense", "Black Cardamom", "Pink Pepper"],
      heart: ["Sandalwood", "Labdanum", "Birch"],
      base: ["Amber", "Benzoin", "Oakmoss"],
    },
    sizes: [
      { ml: 30, price: 165 },
      { ml: 50, price: 245 },
      { ml: 100, price: 345 },
    ],
    images: [
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80",
      "https://images.unsplash.com/photo-1600612253971-1b4a31c3e96e?w=600&q=80",
    ],
    rating: 4.8,
    reviews: 142,
    featured: true,
  },
  {
    id: "4",
    name: "Velvet Oud",
    brand: "Atelier Noir",
    price: 320,
    originalPrice: 380,
    description: "Precious oud wrapped in rose petals and dark spices.",
    longDescription:
      "Velvet Oud is a masterpiece of oriental perfumery. At its core lies the most precious oud sourced from the forests of Laos, surrounded by layers of Taif rose, saffron, and dark spices. A statement fragrance for the connoisseur.",
    category: "unisex",
    notes: {
      top: ["Saffron", "Rose de Taif", "Cinnamon"],
      heart: ["Oud", "Patchouli", "Geranium"],
      base: ["Leather", "Amber", "Vanilla"],
    },
    sizes: [
      { ml: 30, price: 210 },
      { ml: 50, price: 320 },
      { ml: 100, price: 450 },
    ],
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    ],
    rating: 4.9,
    reviews: 89,
    badge: "sale",
    featured: true,
  },
  {
    id: "5",
    name: "Jardin Blanc",
    brand: "Fleur Parisienne",
    price: 145,
    description: "A sun-drenched white floral garden in full bloom.",
    longDescription:
      "Jardin Blanc is the embodiment of a French garden on a warm summer afternoon. White gardenia, tuberose, and muguet create a lush floral bouquet that feels both opulent and effortlessly wearable. Soft musks and cedarwood anchor this beautifully feminine fragrance.",
    category: "women",
    notes: {
      top: ["Aldehydes", "Peach", "Green Leaves"],
      heart: ["Gardenia", "Tuberose", "Lily of the Valley"],
      base: ["White Musk", "Cedarwood", "Tonka Bean"],
    },
    sizes: [
      { ml: 30, price: 99 },
      { ml: 50, price: 145 },
      { ml: 100, price: 205 },
    ],
    images: [
      "https://images.unsplash.com/photo-1532887560-f3a1a38e2e0e?w=600&q=80",
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80",
    ],
    rating: 4.6,
    reviews: 231,
    featured: false,
  },
  {
    id: "6",
    name: "Cuir Intense",
    brand: "Atelier Noir",
    price: 275,
    description: "Supple leather and tobacco with a touch of dark berries.",
    longDescription:
      "Cuir Intense is an unapologetically bold fragrance celebrating the art of leather. Fine birch tar and labdanum create a supple leather accord, enriched by tobacco blossom and cassis. A powerful, memorable statement for those who command attention.",
    category: "men",
    notes: {
      top: ["Cassis", "Tobacco Blossom", "Rum"],
      heart: ["Leather", "Labdanum", "Violet"],
      base: ["Birch Tar", "Vetiver", "Tonka Bean"],
    },
    sizes: [
      { ml: 30, price: 185 },
      { ml: 50, price: 275 },
      { ml: 100, price: 385 },
    ],
    images: [
      "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?w=600&q=80",
      "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=600&q=80",
    ],
    rating: 4.7,
    reviews: 118,
    badge: "new",
    featured: false,
  },
  {
    id: "7",
    name: "Poudre Douce",
    brand: "Fleur Parisienne",
    price: 135,
    description: "Soft powder and iris with warm vanilla and heliotrope.",
    longDescription:
      "Poudre Douce is a tender, nostalgic fragrance that recalls the timeless elegance of classic powdery perfumes. Iris root and violet blend with the sweet softness of heliotrope and vanilla, creating a scent that is at once vintage and contemporary.",
    category: "women",
    notes: {
      top: ["Heliotrope", "Violet", "Lemon"],
      heart: ["Iris Root", "Rose", "Jasmine"],
      base: ["Vanilla", "Sandalwood", "Musk"],
    },
    sizes: [
      { ml: 30, price: 89 },
      { ml: 50, price: 135 },
      { ml: 100, price: 195 },
    ],
    images: [
      "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=600&q=80",
      "https://images.unsplash.com/photo-1590156206657-aec5e7a2aa75?w=600&q=80",
    ],
    rating: 4.5,
    reviews: 167,
    featured: false,
  },
  {
    id: "8",
    name: "Atlas Cedar",
    brand: "Maison Élite",
    price: 195,
    description: "Bold Moroccan cedar with green herbs and cool mint.",
    longDescription:
      "Atlas Cedar pays tribute to the majestic cedar forests of the Atlas Mountains. Fresh herbs and mint create an invigorating opening before the heart of powerful cedarwood takes over. A refined, masculine fragrance that balances nature and elegance.",
    category: "men",
    notes: {
      top: ["Mint", "Rosemary", "Grapefruit"],
      heart: ["Atlas Cedar", "Juniper", "Lavender"],
      base: ["Vetiver", "Amber", "White Musk"],
    },
    sizes: [
      { ml: 30, price: 135 },
      { ml: 50, price: 195 },
      { ml: 100, price: 275 },
    ],
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80",
      "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=600&q=80",
    ],
    rating: 4.6,
    reviews: 203,
    featured: false,
  },
];

export const brands = ["All", "Maison Élite", "Atelier Noir", "Fleur Parisienne"];
export const categories = ["All", "Women", "Men", "Unisex"];
