import { create } from 'zustand';

export interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
}

interface ProductState {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: string) => void;
}

const initialProducts: Product[] = [
  {
    id: '1',
    title: 'Minimalist Watch',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Premium Headphones',
    price: 299.0,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Smart Speaker',
    price: 149.50,
    imageUrl: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Mechanical Keyboard',
    price: 249.99,
    imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '5',
    title: 'Ergonomic Mouse',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '6',
    title: 'Leather Wallet',
    price: 59.0,
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop',
  }
];

export const useProductStore = create<ProductState>((set) => ({
  products: initialProducts,
  addProduct: (product) => set((state) => ({
    products: [
      ...state.products,
      { ...product, id: Math.random().toString(36).substring(2, 9) }
    ]
  })),
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter(p => p.id !== id)
  })),
}));
