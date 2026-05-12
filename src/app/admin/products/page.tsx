"use client";

import { useEffect, useState } from "react";
import { Edit, Trash2, Filter, Search } from "lucide-react";
import { DataTable, TableHeader } from "@/components/ui/data-table";
import { getProducts, deleteProduct } from "@/actions/product";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CreateProductForm } from "@/components/admin/CreateProductForm";
import { UpdateProductForm } from "@/components/admin/UpdateProductForm";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 10;

const tableHeaders: TableHeader[] = [
  { key: "productInfo", label: "Product Identity" },
  { key: "displaySeries", label: "Collection" },
  { key: "displayDescription", label: "Description" },
  { key: "displayPrice", label: "Price" },
  { key: "statusBadge", label: "Status" },
  { key: "imagesPreview", label: "Assets" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    const data = await getProducts();
    setProducts(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (row: any) => {
    if (confirm(`Are you sure you want to delete ${row.name}?`)) {
      const result = await deleteProduct(row._id);
      if (result.success) {
        fetchProducts();
      }
    }
  };

  const displayData = products
    .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
    .map((p) => ({
      ...p,
      productInfo: (
        <div className="flex items-center gap-[clamp(0.5rem,1.5vw,1rem)] py-2">
          <div className="w-[clamp(2.5rem,5vw,3.5rem)] h-[clamp(2.5rem,5vw,3.5rem)] flex items-center justify-center overflow-hidden bg-gray-50 rounded-lg">
            <Image src={p.image} alt={p.name} width={40} height={40} className="object-contain" />
          </div>
          <div>
            <p className="font-black text-gray-900 leading-tight tracking-tight text-[clamp(0.875rem,1.2vw,1rem)]">{p.name}</p>
          </div>
        </div>
      ),
      statusBadge: (
        <span
          className={cn(
            "inline-flex items-center gap-[clamp(0.25rem,0.5vw,0.4rem)] px-[clamp(0.5rem,1vw,0.75rem)] py-[clamp(0.2rem,0.5vw,0.3rem)] rounded-full text-[clamp(9px,0.8vw,10px)] font-black tracking-widest uppercase",
            p.comingSoon
              ? "bg-amber-50 text-amber-600 border border-amber-100"
              : "bg-emerald-50 text-emerald-600 border border-emerald-100"
          )}
        >
          <div className={cn("w-[clamp(4px,0.5vw,6px)] h-[clamp(4px,0.5vw,6px)] rounded-full", p.comingSoon ? "bg-amber-600 animate-pulse" : "bg-emerald-600")} />
          {p.comingSoon ? "Coming Soon" : "In Stock"}
        </span>
      ),
      imagesPreview: (
        <div className="flex -space-x-[clamp(0.25rem,0.5vw,0.5rem)]">
          {[p.fruits, p.bg].map((src, i) => (
            <div key={i} className="w-[clamp(1.5rem,3vw,2rem)] h-[clamp(1.5rem,3vw,2rem)] bg-white overflow-hidden z-[1] hover:z-[10] transition-all hover:scale-110 rounded-full border border-gray-100">
              <Image src={src} alt="asset" width={32} height={32} className="object-cover" />
            </div>
          ))}
        </div>
      ),
      displayPrice: <span className="font-black text-gray-900 text-[clamp(0.875rem,1.1vw,1rem)]">${p.price?.toFixed(2) || "0.00"}</span>,
      displaySeries: (
        <span className="capitalize font-bold text-gray-500 text-[clamp(10px,0.9vw,11px)] px-[clamp(0.5rem,1vw,0.75rem)] py-[clamp(0.2rem,0.5vw,0.3rem)] bg-gray-50 rounded-lg border border-gray-100">
          {p.series}
        </span>
      ),
      displayDescription: (
        <span className="text-[clamp(10px,0.9vw,11px)] text-gray-400 max-w-[150px] truncate block">
          {p.description || "No description"}
        </span>
      ),
    }));

  const totalPages = Math.ceil(products.length / PAGE_SIZE);

  const tableButtons = [
    {
      icon: <Edit size={16} />,
      text: "Edit",
      className: "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100/50",
      onClick: (row: any) => setEditingProduct(row),
    },
    {
      icon: <Trash2 size={16} />,
      text: "Delete",
      className: "bg-red-50 text-red-700 hover:bg-red-100 border border-red-100/50",
      onClick: handleDelete,
    },
  ];

  if (isLoading) {
    return (
      <div className="p-4 md:p-10 space-y-10 min-h-screen animate-pulse">
        {/* Heading Skeleton */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded-full w-24"></div>
          <div className="h-10 bg-gray-200 rounded-2xl w-64"></div>
          <div className="h-4 bg-gray-200 rounded-full w-80"></div>
        </div>

        {/* Form Toggle Skeleton */}
        <div className="w-full h-20 bg-gray-100 rounded-xl"></div>

        {/* Table Section Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="h-6 bg-gray-200 rounded-full w-40"></div>
          </div>
          <div className="w-full h-[500px] bg-gray-100 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 space-y-10 min-h-screen">

      <SectionHeading
        title="Product Inventory"
        subtitle="Manage your products and visual assets."
        badge="MASTER DASHBOARD"
        className="mb-0 p-0"
      />

      <CreateProductForm
        onSuccess={() => fetchProducts()}
      />

      {/* Data Table Section */}
      <motion.div layout className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-black text-gray-900 text-lg flex items-center gap-2">
            <Filter size={18} />
            Product Registry
          </h3>
        </div>

        <Card variant="light" className="p-0 border-none rounded-xl overflow-hidden">
          <DataTable
            heading="Master Inventory"
            HeaderBgColor="bg-black"
            HeaderTextColor="text-white"
            TableHeaders={tableHeaders}
            TableData={displayData}
            TableButtons={tableButtons}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalEntries={products.length}
            pageSize={PAGE_SIZE}
          />
        </Card>
      </motion.div>

      {/* Update Modal */}
      <Modal
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        showHeader={false}
        className="max-w-2xl bg-white p-0 overflow-hidden"
      >
        <div className="max-h-[90vh] overflow-y-auto scrollbar-hide">
          <UpdateProductForm
            key={editingProduct?._id || editingProduct?.id}
            product={editingProduct}
            onSuccess={() => {
              setEditingProduct(null);
              fetchProducts();
            }}
            onCancel={() => setEditingProduct(null)}
          />
        </div>
      </Modal>
    </div>
  );
}