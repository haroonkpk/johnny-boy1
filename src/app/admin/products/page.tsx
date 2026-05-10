
// "use client";

// import {
//   useState,
//   type ChangeEvent,
//   type FormEvent,
//   useEffect,
// } from "react";

// import { useProductStore } from "@/store/useProductStore";
// import { Trash2, Plus, Package } from "lucide-react";

// import { Card } from "@/components/ui/card";
// import { SectionHeading } from "@/components/ui/SectionHeading";
// import { Input } from "@/components/ui/input";
// import Button from "@/components/ui/Button";
// import SearchBar from "@/components/ui/SearchBar";

// export default function ProductPage() {
//   const { products, addProduct, deleteProduct } = useProductStore();

//   const [search, setSearch] = useState("");

//   const [title, setTitle] = useState("");
//   const [price, setPrice] = useState("");
//   const [imageUrl, setImageUrl] = useState("");


//   useEffect(() => {
//     return () => {
//       if (imageUrl?.startsWith("blob:")) {
//         URL.revokeObjectURL(imageUrl);
//       }
//     };
//   }, [imageUrl]);

//   // 📸 IMAGE HANDLER (SAFE TYPE)
//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (imageUrl?.startsWith("blob:")) {
//       URL.revokeObjectURL(imageUrl);
//     }

//     const url = URL.createObjectURL(file);
//     setImageUrl(url);
//   };

//   // ➕ ADD PRODUCT
//   const handleAddProduct = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!title || !price || !imageUrl) return;

//     addProduct({
//       title,
//       price: Number(price),
//       imageUrl,
//       fruitImage: "/images/mango-slice.png",
//     });

//     setTitle("");
//     setPrice("");
//     setImageUrl("");

//     const input = document.getElementById(
//       "image-upload"
//     ) as HTMLInputElement | null;

//     if (input) input.value = "";
//   };

//   // 🔍 SEARCH (SAFE)
//   const query = search.toLowerCase().trim();

//   const filteredProducts = products.filter((p) =>
//     p.title.toLowerCase().includes(query)
//   );

//   return (
//     <div className="min-h-screen bg-[var(--color-cream)] py-12">
//       <div className="max-w-[1500px] mx-auto px-4">

//         {/* HEADER */}
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

//               <div className="flex items-center space-x-2 mb-6 font-medium">
//                 <Plus className="w-5 h-5" />
//                 <h2 className="text-xl font-bold">Add Product</h2>
//               </div>

//               <form onSubmit={handleAddProduct} className="space-y-4">

//                 <Input
//                   label="Title"
//                   value={title}
//                   onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                     setTitle(e.target.value)
//                   }
//                   required
//                 />

//                 <Input
//                   label="Price ($)"
//                   type="number"
//                   step="0.01"
//                   value={price}
//                   onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                     setPrice(e.target.value)
//                   }
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
//                   <div className="mt-4 w-full h-32 rounded-lg overflow-hidden bg-white border flex items-center justify-center">
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

//           {/* LIST */}
//           <div className="md:col-span-2">
//             <Card variant="light" className="p-6 h-full">

//               <div className="flex items-center space-x-2 mb-4 font-medium">
//                 <Package className="w-5 h-5" />
//                 <h2 className="text-xl font-bold">
//                   Current Products ({filteredProducts.length})
//                 </h2>
//               </div>

//               {/* SEARCH */}
//               <SearchBar
//                 value={search}
//                 onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                   setSearch(e.target.value)
//                 }
//                 placeholder="Search products by title..."
//               />

//               <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">

//                 {filteredProducts.length === 0 ? (
//                   <p className="text-center text-gray-500">
//                     No products found 
//                   </p>
//                 ) : (
//                   filteredProducts.map((product) => (
//                     <div
//                       key={product.id}
//                       className="flex items-center justify-between bg-white border rounded-2xl p-4"
//                     >
//                       <div className="flex items-center space-x-4">

//                         <img
//                           src={product.imageUrl}
//                           alt={product.title}
//                           className="w-16 h-16 object-contain"
//                         />

//                         <div>
//                           <h3 className="font-bold">{product.title}</h3>
//                           <p className="text-blue-600 font-bold">
//                             ${product.price.toFixed(2)}
//                           </p>
//                         </div>

//                       </div>

//                       <Button
//                         onClick={() => deleteProduct(product.id)}
//                         className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
//                       >
//                         <Trash2 className="w-6 h-6" />
//                       </Button>

//                     </div>
//                   ))
//                 )}

//               </div>
//             </Card>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
  useEffect,
} from "react";

import Sidebar from "@/components/admin/Sidebar/page";
import { useProductStore } from "@/store/useProductStore";
import { Trash2, Plus, Package } from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";

export default function ProductPage() {
  const { products, addProduct, deleteProduct } = useProductStore();

  const [active, setActive] = useState("Products");

  const [search, setSearch] = useState("");

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    return () => {
      if (imageUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  // 📸 IMAGE HANDLER
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (imageUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(imageUrl);
    }

    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  // ➕ ADD PRODUCT
  const handleAddProduct = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !price || !imageUrl) return;

    addProduct({
      title,
      price: Number(price),
      imageUrl,
      fruitImage: "/images/mango-slice.png",
    });

    setTitle("");
    setPrice("");
    setImageUrl("");

    const input = document.getElementById(
      "image-upload"
    ) as HTMLInputElement | null;

    if (input) input.value = "";
  };

  // 🔍 SEARCH
  const query = search.toLowerCase().trim();

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(query)
  );

  return (
    <div className="flex min-h-screen bg-[var(--color-cream)]">

      {/* SIDEBAR */}
      <Sidebar active={active} setActive={setActive} />

      {/* MAIN CONTENT */}
      <div className="flex-1 py-12 px-4">

        <div className="max-w-[1500px] mx-auto">

          {/* HEADER */}
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

                <div className="flex items-center space-x-2 mb-6 font-medium">
                  <Plus className="w-5 h-5" />
                  <h2 className="text-xl font-bold">Add Product</h2>
                </div>

                <form onSubmit={handleAddProduct} className="space-y-4">

                  <Input
                    label="Title"
                    value={title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setTitle(e.target.value)
                    }
                    required
                  />

                  <Input
                    label="Price ($)"
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPrice(e.target.value)
                    }
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
                      <img
                        src={imageUrl}
                        alt="preview"
                        className="h-full object-contain"
                      />
                    </div>
                  )}

                  <Button type="submit" variant="secondary" className="w-full">
                    Create Product
                  </Button>

                </form>

              </Card>
            </div>

            {/* PRODUCT LIST */}
            <div className="md:col-span-2">
              <Card variant="light" className="p-6 h-full">

                <div className="flex items-center space-x-2 mb-4 font-medium">
                  <Package className="w-5 h-5" />
                  <h2 className="text-xl font-bold">
                    Current Products ({filteredProducts.length})
                  </h2>
                </div>

                {/* SEARCH */}
                <SearchBar
                  value={search}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search products by title..."
                />

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 mt-4">

                  {filteredProducts.length === 0 ? (
                    <p className="text-center text-gray-500">
                      No products found
                    </p>
                  ) : (
                    filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between bg-white border rounded-2xl p-4"
                      >

                        <div className="flex items-center space-x-4">

                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="w-16 h-16 object-contain"
                          />

                          <div>
                            <h3 className="font-bold">{product.title}</h3>
                            <p className="text-blue-600 font-bold">
                              ${product.price.toFixed(2)}
                            </p>
                          </div>

                        </div>

                        <Button
                          onClick={() => deleteProduct(product.id)}
                          className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
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
    </div>
  );
}