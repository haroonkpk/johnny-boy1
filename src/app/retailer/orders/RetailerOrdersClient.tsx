"use client";

import { useEffect, useState } from "react";
import { Eye, Clock, Package, Filter, Calendar } from "lucide-react";
import { DataTable, TableHeader } from "@/components/ui/data-table";
import { getRetailerOrders } from "@/actions/order";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion } from "framer-motion"; 
import { OrderDetailsModal } from "@/components/admin/OrderDetailsModal";
import { useSession } from "next-auth/react";

const PAGE_SIZE = 10;

const tableHeaders: TableHeader[] = [
  { key: "orderId", label: "Order ID" },
  { key: "displayDate", label: "Date" },
  { key: "displayTotal", label: "Total Price" },
  { key: "displayStatus", label: "Status" },
];

export default function RetailerOrdersClient() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal state
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAll = async () => {
    if (!session?.user?.email) return;
    setIsLoading(true);
    const data = await getRetailerOrders(session.user.email);
    setOrders(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchAll();
    }
  }, [session]);

  const openOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const statusColors: any = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    processing: "bg-blue-50 text-blue-700 border-blue-200",
    shipped: "bg-purple-50 text-purple-700 border-purple-200",
    delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  const displayData = orders
    .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
    .map((o) => ({
      ...o,
      orderId: <span className="font-bold text-xs uppercase text-slate-500">#{o._id.slice(-6)}</span>,
      displayTotal: <span className="font-bold text-slate-900">${o.totalPrice}</span>,
      displayStatus: (
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${statusColors[o.status] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
          {o.status}
        </span>
      ),
      displayDate: (
        <div className="flex items-center gap-1.5 text-slate-500">
           <Calendar size={12} />
           <span className="text-[11px] font-medium">{new Date(o.createdAt).toLocaleDateString()}</span>
        </div>
      ),
    }));

  const totalPages = Math.ceil(orders.length / PAGE_SIZE);

  const tableButtons = [
    {
      icon: <Eye size={16} />,
      text: "View Details",
      className: "bg-black text-white hover:bg-gray-800 border border-black",
      onClick: (row: any) => openOrderDetails(row),
    }
  ];

  if (isLoading) {
    return (
      <div className="p-4 md:p-10 space-y-10 min-h-screen animate-pulse">
        <div className="space-y-3 text-center">
          <div className="h-4 bg-gray-200 rounded-full w-24 mx-auto"></div>
          <div className="h-10 bg-gray-200 rounded-2xl w-64 mx-auto"></div>
        </div>
        <div className="w-full h-[500px] bg-gray-100 rounded-xl max-w-5xl mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 space-y-10 min-h-screen max-w-[1500px] mx-auto w-full">
      <SectionHeading 
        title="My Orders" 
        subtitle="Track your order status and view purchase history." 
        badge="RETAILER PANEL" 
      />

      <motion.div layout className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 uppercase tracking-tight">
            <Package size={20} className="text-black" />
            Order History
          </h3>
        </div>

        <Card variant="light" className="p-0 overflow-hidden">
          <DataTable
            heading="Past Shipments"
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

      <OrderDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
}
