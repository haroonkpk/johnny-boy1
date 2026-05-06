import { create } from "zustand";

export interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
}

interface ProductState {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  deleteProduct: (id: string) => void;
}

const initialProducts: Product[] = [
  {
    id: "1",
    title: "Minimalist Watch",
    price: 0,
    imageUrl: "/images/vape6.png",
  },
  {
    id: "2",
    title: "Premium Headphones",
    price: 0,
    imageUrl: "/images/vape7.png",
  },
  {
    id: "3",
    title: "Smart Speaker",
    price:0,
    imageUrl: "/images/vape9.png",
  },
  {
    id: "4",
    title: "Mechanical Keyboard",
    price: 0,
    imageUrl: "/images/vape9.png",
  },
  {
    id: "5",
    title: "Ergonomic Mouse",
    price: 0,
    imageUrl: "/images/vape5.png",
  },
  {
    id: "6",
    title: "Leather Wallet",
    price: 0,
    imageUrl: "/images/vape7.png",
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