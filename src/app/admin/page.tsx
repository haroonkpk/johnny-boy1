"use client";

import { useState } from 'react';
import { useProductStore } from '@/store/useProductStore';
import { Trash2, Plus, Package } from 'lucide-react';

export default function AdminPage() {
  const { products, addProduct, deleteProduct } = useProductStore();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !imageUrl) return;
    
    addProduct({
      title,
      price: parseFloat(price),
      imageUrl
    });
    
    setTitle('');
    setPrice('');
    setImageUrl('');
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">Manage your floating product collection.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Add Product Form */}
        <div className="md:col-span-1">
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center space-x-2 mb-6 text-white font-medium">
              <Plus className="w-5 h-5" />
              <h2>Add Product</h2>
            </div>
            
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="e.g. Minimalist Watch"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Price ($)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="e.g. 199.99"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Product Image</label>
                <input 
                  id="image-upload"
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-gray-400 focus:outline-none focus:border-white/30 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-200 cursor-pointer"
                  required
                />
                {imageUrl && (
                  <div className="mt-4 w-full h-32 rounded-lg bg-black/50 border border-white/10 overflow-hidden flex items-center justify-center p-2">
                    <img src={imageUrl} alt="Preview" className="h-full object-contain filter drop-shadow-lg" />
                  </div>
                )}
              </div>
              
              <button 
                type="submit"
                className="w-full bg-white text-black font-medium py-2 rounded-lg hover:bg-gray-200 transition-colors mt-4"
              >
                Create Product
              </button>
            </form>
          </div>
        </div>

        {/* Product List */}
        <div className="md:col-span-2">
          <div className="glass-card p-6 rounded-2xl h-full">
            <div className="flex items-center space-x-2 mb-6 text-white font-medium">
              <Package className="w-5 h-5" />
              <h2>Current Products ({products.length})</h2>
            </div>
            
            {products.length === 0 ? (
              <div className="text-gray-500 text-center py-8">No products found.</div>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between bg-black/30 border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-md bg-white/10 overflow-hidden flex-shrink-0">
                        <img 
                          src={product.imageUrl} 
                          alt={product.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{product.title}</h3>
                        <p className="text-gray-400 text-sm">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteProduct(product.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 rounded-lg transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
