// "use client";

// import { useState } from 'react';
// import { useProductStore } from '@/store/useProductStore';
// import { Trash2, Plus, Package } from 'lucide-react';
// import { Card } from '@/components/ui/card';
// import { SectionHeading } from '@/components/ui/SectionHeading';
// import { Input } from '@/components/ui/input';

// import Button from '@/components/ui/Button';

// export default function AdminPage() {
//   const { products, addProduct, deleteProduct } = useProductStore();
//   const [title, setTitle] = useState('');
//   const [price, setPrice] = useState('');
//   const [imageUrl, setImageUrl] = useState('');

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const url = URL.createObjectURL(file);
//       setImageUrl(url);
//     }
//   };

//   const handleAddProduct = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title || !price || !imageUrl) return;
    
//     addProduct({
//       title,
//       price: parseFloat(price),
//       imageUrl
//     });
    
//     setTitle('');
//     setPrice('');
//     setImageUrl('');
//     const fileInput = document.getElementById('image-upload') as HTMLInputElement;
//     if (fileInput) fileInput.value = '';
//   };
//   return (
//     <div className="min-h-screen bg-[var(--color-cream)] py-12">
//       <div className="max-w-[1500px] mx-auto px-4">
//         <SectionHeading 
//           title={<>Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Dashboard</span></>}
//           subtitle="Manage your floating product collection."
//           badge="Control Panel"
//           mode="light"
//         />

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Add Product Form */}
//         <div className="md:col-span-1">
//           <Card variant="light" className="p-6">
//             <div className="flex items-center space-x-2 mb-6 text-gray-900 font-medium">
//               <Plus className="w-5 h-5" />
//               <h2 className="text-xl font-bold">Add Product</h2>
//             </div>
            
//             <form onSubmit={handleAddProduct} className="space-y-4">
//               <Input 
//                 label="Title"
//                 type="text" 
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="e.g. Minimalist Watch"
//                 required
//               />
              
//               <Input 
//                 label="Price ($)"
//                 type="number" 
//                 step="0.01"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//                 placeholder="e.g. 199.99"
//                 required
//               />
              
//               <div className="space-y-2">
//                 <Input 
//                   label="Product Image"
//                   id="image-upload"
//                   type="file" 
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
//                   required
//                 />
//                 {imageUrl && (
//                   <div className="mt-4 w-full h-32 rounded-lg bg-gray-50 border border-gray-200 overflow-hidden flex items-center justify-center p-2">
//                     <img src={imageUrl} alt="Preview" className="h-full object-contain filter drop-shadow-md" />
//                   </div>
//                 )}
//               </div>
              
//               <Button 
//                 type="submit"
//                 variant="secondary"
//                 className="w-full mt-4"
//               >
//                 Create Product
//               </Button>
//             </form>
//           </Card>
//         </div>

//         {/* Product List */}
//         <div className="md:col-span-2">
//           <Card variant="light" className="p-6 h-full">
//             <div className="flex items-center space-x-2 mb-6 text-gray-900 font-medium">
//               <Package className="w-5 h-5" />
//               <h2 className="text-xl font-bold">Current Products ({products.length})</h2>
//             </div> 
            
//             {products.length === 0 ? (
//               <div className="text-gray-500 text-center py-8">No products found.</div>
//             ) : (
//               <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
//                 {products.map((product) => (
//                   <div key={product.id} className="flex items-center justify-between bg-[var(--color-cream)]  border border-gray-100 rounded-2xl p-4 hover:border-gray-300 transition-all group">
//                     <div className="flex items-center space-x-4">
//                       <div className="w-16 h-16 rounded-xl bg-[var(--color-cream)] overflow-hidden flex-shrink-0 p-2">
//                         <img 
//                           src={product.imageUrl} 
//                           alt={product.title} 
//                           className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
//                         />
//                       </div>
//                       <div>
//                         <h3 className="text-gray-900 font-bold">{product.title}</h3>
//                         <p className="text-blue-600 font-mono font-bold">${product.price.toFixed(2)}</p>
//                       </div>
//                     </div>
//                     <button 
//                       onClick={() => deleteProduct(product.id)}
//                       className="text-red-500 bg-white hover:text-white hover:bg-red-500 p-3 rounded-xl transition-all"
//                       title="Delete Product"
//                     >
//                       <Trash2 className="w-5 h-5" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </Card>
//         </div>
//       </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { useProductStore } from "@/store/useProductStore";
import { Trash2, Plus, Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/Button";

export default function AdminPage() {
  const { products, addProduct, deleteProduct } = useProductStore();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // NEW STATES
  const [description, setDescription] = useState("");
  const [fruitImage, setFruitImage] = useState("");

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImageUrl(url);

      // fruitImage ko bhi same image de di
      setFruitImage(url);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !title ||
      !price ||
      !imageUrl ||
      !description ||
      !fruitImage
    )
      return;

    addProduct({
      title,
      price: parseFloat(price),
      imageUrl,
      description,
      fruitImage,
    });

    // Reset Fields
    setTitle("");
    setPrice("");
    setImageUrl("");
    setDescription("");
    setFruitImage("");

    const fileInput = document.getElementById(
      "image-upload"
    ) as HTMLInputElement;

    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="min-h-screen bg-[var(--color-cream)] py-12">
      <div className="max-w-[1500px] mx-auto px-4">
        <SectionHeading
          title={
            <>
              Admin{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Dashboard
              </span>
            </>
          }
          subtitle="Manage your floating product collection."
          badge="Control Panel"
          mode="light"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Add Product Form */}
          <div className="md:col-span-1">
            <Card variant="light" className="p-6">
              <div className="flex items-center space-x-2 mb-6 text-gray-900 font-medium">
                <Plus className="w-5 h-5" />
                <h2 className="text-xl font-bold">
                  Add Product
                </h2>
              </div>

              <form
                onSubmit={handleAddProduct}
                className="space-y-4"
              >
                <Input
                  label="Title"
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="e.g. Minimalist Watch"
                  required
                />

                <Input
                  label="Price ($)"
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                  placeholder="e.g. 199.99"
                  required
                />

                {/* DESCRIPTION */}
                <Input
                  label="Description"
                  type="text"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  placeholder="Enter product description"
                  required
                />

                <div className="space-y-2">
                  <Input
                    label="Product Image"
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
                    required
                  />

                  {imageUrl && (
                    <div className="mt-4 w-full h-32 rounded-lg bg-gray-50 border border-gray-200 overflow-hidden flex items-center justify-center p-2">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="h-full object-contain filter drop-shadow-md"
                      />
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full mt-4"
                >
                  Create Product
                </Button>
              </form>
            </Card>
          </div>

          {/* Product List */}
          <div className="md:col-span-2">
            <Card variant="light" className="p-6 h-full">
              <div className="flex items-center space-x-2 mb-6 text-gray-900 font-medium">
                <Package className="w-5 h-5" />
                <h2 className="text-xl font-bold">
                  Current Products ({products.length})
                </h2>
              </div>

              {products.length === 0 ? (
                <div className="text-gray-500 text-center py-8">
                  No products found.
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between bg-[var(--color-cream)] border border-gray-100 rounded-2xl p-4 hover:border-gray-300 transition-all group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-xl bg-[var(--color-cream)] overflow-hidden flex-shrink-0 p-2">
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        <div>
                          <h3 className="text-gray-900 font-bold">
                            {product.title}
                          </h3>

                          <p className="text-blue-600 font-mono font-bold">
                            $
                            {product.price.toFixed(2)}
                          </p>

                          {/* DESCRIPTION SHOW */}
                          <p className="text-sm text-gray-500 mt-1">
                            {product.description}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          deleteProduct(product.id)
                        }
                        className="text-red-500 bg-white hover:text-white hover:bg-red-500 p-3 rounded-xl transition-all"
                        title="Delete Product"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
