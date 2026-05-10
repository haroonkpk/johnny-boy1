"use client";

import { useState, type ChangeEvent, type FormEvent, useEffect } from "react";
import { seriesData, Product } from "@/data/products";
import { Trash2, Plus, Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/Button";

export default function AdminPage() {
  const combinedProducts: Product[] = [
    ...seriesData.local.map(item => ({
      ...item,
      price: 2500,
    })),
    ...seriesData.regular.map(item => ({
      ...item,
      price: 2500,
    }))
  ];

  const [products, setProducts] = useState<Product[]>(combinedProducts);

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...product,
      id: Date.now(),
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };


  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Memory cleanup for image preview
  useEffect(() => {
    return () => {
      if (imageUrl.startsWith("blob:")) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (imageUrl.startsWith("blob:")) URL.revokeObjectURL(imageUrl);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const handleAddProduct = (e: FormEvent) => {
    e.preventDefault();

    if (!title || !price || !imageUrl) return;

    addProduct({
      name: title,
      price: parseFloat(price),
      image: imageUrl,
      fruits: "/images/mango-slice.png",
      bg: "/images/bg1.png",
      textBg: "bg-blue-500",
    });

    // reset fields
    setTitle("");
    setPrice("");
    setImageUrl("");

    const input = document.getElementById("image-upload") as HTMLInputElement | null;
    if (input) input.value = "";
  };

  return (
    <div className="min-h-screen bg-[var(--color-cream)] py-12">
      <div className="max-w-[1500px] mx-auto px-4">
        <SectionHeading
          title={<>Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Dashboard</span></>}
          subtitle="Manage your floating product collection."
          badge="Control Panel"
          mode="light"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* FORM SECTION */}
          <div className="md:col-span-1">
            <Card variant="light" className="p-6">
              <div className="flex items-center space-x-2 mb-6 text-gray-900 font-medium">
                <Plus className="w-5 h-5" />
                <h2 className="text-xl font-bold">Add Product</h2>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-4">
                <Input
                  label="Title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                <Input
                  label="Price ($)"
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />

                <Input
                  label="Product Image"
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />

                {imageUrl && (
                  <div className="mt-4 w-full h-32 rounded-lg overflow-hidden bg-white border flex items-center justify-center">
                    <img src={imageUrl} alt="preview" className="h-full object-contain" />
                  </div>
                )}

                <Button type="submit" variant="secondary" className="w-full">
                  Create Product
                </Button>
              </form>
            </Card>
          </div>

          {/* LIST SECTION */}
          <div className="md:col-span-2">
            <Card variant="light" className="p-6 h-full">
              <div className="flex items-center space-x-2 mb-6 text-gray-900 font-medium">
                <Package className="w-5 h-5" />
                <h2 className="text-xl font-bold">Current Products ({products.length})</h2>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {products.length === 0 ? (
                  <p className="text-center text-gray-500">No products yet.</p>
                ) : (
                  products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between bg-white border rounded-2xl p-4">
                      <div className="flex items-center space-x-4">
                        <img src={product.image} alt={product.name} className="w-16 h-16 object-contain" />
                        <div>
                          <h3 className="font-bold">{product.name}</h3>
                          <p className="text-blue-600 font-bold">${(product.price || 0).toFixed(2)}</p>
                        </div>
                      </div>
                      <Button 
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-6 h-6" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}