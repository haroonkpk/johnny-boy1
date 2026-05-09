
// "use client";

// import { useState, type ChangeEvent, type FormEvent } from "react";
// import { useProductStore } from "@/store/useProductStore";
// import { Trash2, Plus, Package } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import { SectionHeading } from "@/components/ui/SectionHeading";
// import { Input } from "@/components/ui/input";
// import Button from "@/components/ui/Button";

// export default function AdminPage() {
//   const { products, addProduct, deleteProduct } = useProductStore();

//   const [title, setTitle] = useState("");
//   const [price, setPrice] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [description, setDescription] = useState("");

//   // Image handler
//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const url = URL.createObjectURL(file);
//       setImageUrl(url);
//     }
//   };

//   // Submit handler
//   const handleAddProduct = (e: FormEvent) => {
//     e.preventDefault();

//     if (!title || !price || !imageUrl || !description) return;

//     addProduct({
//       title,
//       price: parseFloat(price),
//       imageUrl,
//       description,
//     });

//     // Reset fields
//     setTitle("");
//     setPrice("");
//     setImageUrl("");
//     setDescription("");

//     const fileInput = document.getElementById(
//       "image-upload"
//     ) as HTMLInputElement;

//     if (fileInput) fileInput.value = "";
//   };

//   return (
//     <div className="min-h-screen bg-[var(--color-cream)] py-12">
//       <div className="max-w-[1500px] mx-auto px-4">
//         <SectionHeading
//           title={
//             <>
//               Admin{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
//                 Dashboard
//               </span>
//             </>
//           }
//           subtitle="Manage your floating product collection."
//           badge="Control Panel"
//           mode="light"
//         />

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* FORM */}
//           <div className="md:col-span-1">
//             <Card variant="light" className="p-6">
//               <div className="flex items-center space-x-2 mb-6 text-gray-900 font-medium">
//                 <Plus className="w-5 h-5" />
//                 <h2 className="text-xl font-bold">Add Product</h2>
//               </div>

//               <form onSubmit={handleAddProduct} className="space-y-4">
//                 <Input
//                   label="Title"
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                 />

//                 <Input
//                   label="Price ($)"
//                   type="number"
//                   step="0.01"
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                   required
//                 />

//                 <Input
//                   label="Description"
//                   type="text"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   required
//                 />

//                 <Input
//                   label="Product Image"
//                   id="image-upload"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   required
//                 />

//                 {imageUrl && (
//                   <div className="mt-4 w-full h-32 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
//                     <img
//                       src={imageUrl}
//                       alt="preview"
//                       className="h-full object-contain"
//                     />
//                   </div>
//                 )}

//                 <Button type="submit" variant="secondary" className="w-full">
//                   Create Product
//                 </Button>
//               </form>
//             </Card>
//           </div>

//           {/* PRODUCT LIST */}
//           <div className="md:col-span-2">
//             <Card variant="light" className="p-6 h-full">
//               <div className="flex items-center space-x-2 mb-6 text-gray-900 font-medium">
//                 <Package className="w-5 h-5" />
//                 <h2 className="text-xl font-bold">
//                   Current Products ({products.length})
//                 </h2>
//               </div>

//               {products.length === 0 ? (
//                 <div className="text-gray-500 text-center py-8">
//                   No products found.
//                 </div>
//               ) : (
//                 <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
//                   {products.map((product) => (
//                     <div
//                       key={product.id}
//                       className="flex items-center justify-between bg-[var(--color-cream)] border rounded-2xl p-4"
//                     >
//                       <div className="flex items-center space-x-4">
//                         <div className="w-16 h-16 overflow-hidden rounded-xl">
//                           <img
//                             src={product.imageUrl}
//                             alt={product.title}
//                             className="w-full h-full object-contain"
//                           />
//                         </div>

//                         <div>
//                           <h3 className="font-bold text-gray-900">
//                             {product.title}
//                           </h3>

//                           <p className="text-blue-600 font-mono font-bold">
//                             ${product.price.toFixed(2)}
//                           </p>

//                           <p className="text-sm text-gray-500">
//                             {product.description}
//                           </p>
//                         </div>
//                       </div>

//                       <button
//                         onClick={() => deleteProduct(product.id)}
//                         className="text-red-500 p-3 rounded-xl hover:bg-red-500 hover:text-white transition-all"
//                       >
//                         <Trash2 className="w-5 h-5" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
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
  const [description, setDescription] = useState("");

  // IMAGE CHANGE
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  // SUBMIT
  const handleAddProduct = (e: FormEvent) => {
    e.preventDefault();

    if (!title || !price || !imageUrl || !description) return;

    addProduct({
      title,
      price: Number(price),
      imageUrl,
      description,
    });

    // reset
    setTitle("");
    setPrice("");
    setImageUrl("");
    setDescription("");

    const input = document.getElementById(
      "image-upload"
    ) as HTMLInputElement | null;

    if (input) input.value = "";
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

          {/* FORM */}
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
                  label="Description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  <div className="mt-4 w-full h-32 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                    <img
                      src={imageUrl}
                      alt="preview"
                      className="h-full object-contain"
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full"
                >
                  Create Product
                </Button>

              </form>
            </Card>
          </div>

          {/* PRODUCT LIST */}
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
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">

                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between bg-[var(--color-cream)] border rounded-2xl p-4"
                    >

                      <div className="flex items-center space-x-4">

                        <div className="w-16 h-16 rounded-xl overflow-hidden">
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div>
                          <h3 className="font-bold text-gray-900">
                            {product.title}
                          </h3>

                          <p className="text-blue-600 font-mono font-bold">
                            ${product.price.toFixed(2)}
                          </p>

                          <p className="text-sm text-gray-500">
                            {product.description}
                          </p>
                        </div>

                      </div>

                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-500 p-3 rounded-xl hover:bg-red-500 hover:text-white transition-all"
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