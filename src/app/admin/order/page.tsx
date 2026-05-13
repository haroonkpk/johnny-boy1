"use client";

import { useEffect, useState } from "react";
import { Trash2, Package, Eye, Clock, User, DollarSign, Filter } from "lucide-react";
import { DataTable, TableHeader } from "@/components/ui/data-table";
import { getOrders, deleteOrder, updateOrderStatus } from "@/actions/order";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion } from "framer-motion"; 

const PAGE_SIZE = 10;

const tableHeaders: TableHeader[] = [
  { key: "orderId", label: "Order ID" },
  { key: "retailer", label: "Customer Details" },
  { key: "displayTotal", label: "Total Amount" },
  { key: "displayStatus", label: "Status" },
  { key: "displayDate", label: "Date Created" },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [isLoading, setIsLoading] = useState(true);

  const fetchAll = async () => {
    setIsLoading(true);
    const data = await getOrders();
    setOrders(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleStatus = async (id: string, status: string) => {
    const res = await updateOrderStatus(id, status);
    if (res.success) fetchAll();
  };

  const displayData = orders
    .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
    .map((o) => ({
      ...o,
      orderId: <span className="font-bold text-xs uppercase">#{o._id.slice(-6)}</span>,
      retailer: (
        <div className="flex flex-col py-1">
          <span className="font-semibold text-gray-900">{o.customerName}</span>
          <span className="text-[10px] text-gray-400">{o.email}</span>
        </div>
      ),
      displayTotal: <span className="font-bold text-emerald-600">${o.totalPrice}</span>,
      displayStatus: (
        <select
          value={o.status}
          onChange={(e) => handleStatus(o._id, e.target.value)}
          className="text-[11px] font-bold border rounded-md px-2 py-1 bg-gray-50 focus:ring-1 ring-black cursor-pointer"
        >
          <option value="pending">PENDING</option>
          <option value="processing">PROCESSING</option>
          <option value="shipped">SHIPPED</option>
          <option value="delivered">DELIVERED</option>
        </select>
      ),
      displayDate: new Date(o.createdAt).toLocaleDateString(),
    }));

  const totalPages = Math.ceil(orders.length / PAGE_SIZE);

  const tableButtons = [
    {
      icon: <Trash2 size={16} />,
      text: "Delete",
      className: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100/50",
      onClick: async (row: any) => {
    
        if (confirm("Are you sure you want to delete this order?")) {
          await deleteOrder(row._id);
          fetchAll();
        }
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="p-4 md:p-10 space-y-10 min-h-screen animate-pulse">
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded-full w-24"></div>
          <div className="h-10 bg-gray-200 rounded-2xl w-64"></div>
        </div>
        <div className="w-full h-[500px] bg-gray-100 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 space-y-10 min-h-screen">
      <SectionHeading 
        title="Wholesale Orders" 
        subtitle="Manage and update retailer order statuses." 
        badge="ADMIN PANEL" 
      />

      <motion.div layout className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
            <Filter size={18} />
            Active Shipments
          </h3>
        </div>

        <Card variant="light" className="p-0 border-none rounded-xl overflow-hidden shadow-sm">
          <DataTable
            heading="Master Order Registry"
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