
"use client";

import { useEffect, useState } from "react";
import { Package, Eye, Filter, Search, ShoppingBag } from "lucide-react";
import { DataTable, TableHeader } from "@/components/ui/data-table";
import { getOrders } from "@/actions/order"; 
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion } from "framer-motion"; 

const PAGE_SIZE = 10;


const tableHeaders: TableHeader[] = [
  { key: "orderId", label: "Order ID" },
  { key: "displayTotal", label: "Total Amount" },
  { key: "displayStatus", label: "Status" },
  { key: "displayDate", label: "Date Placed" },
];

export default function RetailerOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [isLoading, setIsLoading] = useState(true);

  const fetchMyOrders = async () => {
    setIsLoading(true);

    const data = await getOrders();
    setOrders(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const displayData = orders
    .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
    .map((o) => ({
      ...o,
      orderId: <span className="font-bold text-xs uppercase tracking-tighter">#{o._id.slice(-6)}</span>,
      displayTotal: <span className="font-bold text-emerald-600">${o.totalPrice}</span>,
      displayStatus: (
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
          o.status === 'delivered' ? 'bg-green-50 text-green-600 border-green-100' : 
          o.status === 'pending' ? 'bg-orange-50 text-orange-600 border-orange-100' : 
          'bg-blue-50 text-blue-600 border-blue-100'
        }`}>
          {o.status.toUpperCase()}
        </div>
      ),
      displayDate: new Date(o.createdAt).toLocaleDateString(),
    }));

  const totalPages = Math.ceil(orders.length / PAGE_SIZE);

  const tableButtons = [
    {
      icon: <Eye size={16} />,
      text: "View Details",
      className: "bg-gray-50 text-gray-600 hover:bg-gray-200 border border-gray-200",
      onClick: (row: any) => {
        console.log("View order details:", row._id);

      },
    },
  ];

  if (isLoading) {
    return (
      <div className="p-4 md:p-10 space-y-10 min-h-screen animate-pulse bg-[var(--color-cream)]">
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded-full w-24"></div>
          <div className="h-10 bg-gray-200 rounded-2xl w-64"></div>
        </div>
        <div className="w-full h-[500px] bg-gray-100/50 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 space-y-10 min-h-screen bg-[var(--color-cream)]">
      <SectionHeading 
        title="My Purchase Orders" 
        subtitle="Track and manage your inventory shipments." 
        badge="RETAILER HUB" 
      />

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between px-2">
          <h3 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
            <ShoppingBag size={18} className="text-gray-500" />
            Recent Orders
          </h3>
        </div>

        <Card variant="light" className="p-0 border-none rounded-xl overflow-hidden  bg-white">
          <DataTable
            heading="Order History"
            HeaderBgColor="bg-black"
            HeaderTextColor="text-white"
            TableHeaders={tableHeaders}
            TableData={displayData}
            TableButtons={tableButtons}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalEntries={orders.length}
            pageSize={PAGE_SIZE}
          />
        </Card>
      </motion.div>
    </div>
  );
}