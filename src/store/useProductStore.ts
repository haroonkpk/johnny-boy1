import { create } from "zustand";

export interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  description: string;   
  fruitImage: string;    
}

interface ProductState {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  deleteProduct: (id: string) => void;
}

const initialProducts: Product[] = [
  {
    id: "1",
    title: "Mango Ice Blast",
    price: 2500,
    imageUrl: "/images/vape1.png",
    fruitImage: "/images/mango-slice.png",
    description: "A tropical explosion of sweet mangoes with a refreshing icy finish.",
  },
  {
    id: "2",
    title: "Blueberry Chill",
    price: 2800,
    imageUrl: "/images/vape2.png",
    fruitImage: "/images/blueberries.png",
    description: "Hand-picked mountain blueberries blended with a cool menthol breeze.",
  },
  {
    id: "3",
    title: "Strawberry Dream",
    price: 2400,
    imageUrl: "/images/vape3.png",
    fruitImage: "/images/strawberry.png",
    description: "Creamy strawberry delight that tastes like a summer afternoon.",
  },
  {
    id: "4",
    title: "Double Apple",
    price: 2600,
    imageUrl: "/images/vape4.png",
    fruitImage: "/images/apple-red.png",
    description: "The classic shisha style double apple with a crisp, sweet bite.",
  },
  {
    id: "5",
    title: "Grape Escape",
    price: 2700,
    imageUrl: "/images/vape5.png",
    fruitImage: "/images/grapes.png",
    description: "Rich purple grapes crushed into a smooth, flavorful all-day vape.",
  },
  {
    id: "6",
    title: "Watermelon Lush",
    price: 2500,
    imageUrl: "/images/vape6.png",
    fruitImage: "/images/watermelon.png",
    description: "Juicy watermelon slices with a hint of candy sweetness.",
  },
  {
    id: "7",
    title: "Watermelon Lush",
    price: 2500,
    imageUrl: "/images/vape7.png",
    fruitImage: "/images/watermelon.png",
    description: "Juicy watermelon slices with a hint of candy sweetness.",
  },
  {
    id: "8",
    title: "Watermelon Lush",
    price: 2500,
    imageUrl: "/images/vape8.png",
    fruitImage: "/images/watermelon.png",
    description: "Juicy watermelon slices with a hint of candy sweetness.",
  },
  {
    id: "9",
    title: "Watermelon Lush",
    price: 2500,
    imageUrl: "/images/vape9.png",
    fruitImage: "/images/watermelon.png",
    description: "Juicy watermelon slices with a hint of candy sweetness.",
  },
  {
    id: "10",
    title: "Watermelon Lush",
    price: 2500,
    imageUrl: "/images/vape10.png",
    fruitImage: "/images/watermelon.png",
    description: "Juicy watermelon slices with a hint of candy sweetness.",
  },
];

export const useProductStore = create<ProductState>((set) => ({
  products: initialProducts,

  addProduct: (product) =>
    set((state) => ({
      products: [
        ...state.products,
        { ...product, id: Math.random().toString(36).substring(2, 9) },
      ],
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
}));