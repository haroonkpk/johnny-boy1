"use client";

import { useEffect, useState } from "react";
import { Check, X, Clock, ShieldCheck, ShieldX } from "lucide-react";
import { DataTable, TableHeader } from "@/components/ui/data-table";
import { getRetailers, updateRetailerStatus } from "@/actions/admin";

interface RetailerRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  business: string;
  status: string;
  date: string;
}

const PAGE_SIZE = 10;

const tableHeaders: TableHeader[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "business", label: "Business" },
  { key: "statusBadge", label: "Status" },
  { key: "date", label: "Applied" },
];

export default function RetailersPage() {
  const [retailers, setRetailers] = useState<RetailerRow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRetailers = async () => {
    setIsLoading(true);
    const data = await getRetailers();
    setRetailers(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRetailers();
  }, []);

  const handleApprove = async (row: any) => {
    const result = await updateRetailerStatus(row.id, "approved");
    if (result.success) {
      fetchRetailers();
    }
  };

  const handleReject = async (row: any) => {
    const result = await updateRetailerStatus(row.id, "rejected");
    if (result.success) {
      fetchRetailers();
    }
  };

  // Add status badge to each row for display
  const displayData = retailers
    .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
    .map((r) => ({
      ...r,
      statusBadge: (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
            r.status === "approved"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : r.status === "rejected"
              ? "bg-red-50 text-red-700 border border-red-200"
              : "bg-amber-50 text-amber-700 border border-amber-200"
          }`}
        >
          {r.status === "approved" ? (
            <ShieldCheck size={13} />
          ) : r.status === "rejected" ? (
            <ShieldX size={13} />
          ) : (
            <Clock size={13} />
          )}
          {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
        </span>
      ),
    }));

  const totalPages = Math.ceil(retailers.length / PAGE_SIZE);

  const tableButtons = [
    {
      icon: <Check size={16} />,
      text: "Approve",
      className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
      onClick: handleApprove,
    },
    {
      icon: <X size={16} />,
      text: "Reject",
      className: "bg-red-100 text-red-700 hover:bg-red-200",
      onClick: handleReject,
    },
  ];

  if (isLoading) {
    return (
      <div className="p-6 md:p-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="h-64 bg-gray-100 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Retailers
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage retailer applications and account status.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock size={22} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {retailers.filter((r) => r.status === "pending").length}
            </p>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
              Pending
            </p>
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck size={22} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {retailers.filter((r) => r.status === "approved").length}
            </p>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
              Approved
            </p>
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <ShieldX size={22} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {retailers.filter((r) => r.status === "rejected").length}
            </p>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
              Rejected
            </p>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable<RetailerRow & { statusBadge: React.ReactNode }>
        heading="All Retailer Applications"
        TableHeaders={tableHeaders}
        TableData={displayData}
        TableButtons={tableButtons}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalEntries={retailers.length}
        pageSize={PAGE_SIZE}
      />
    </div>
  );
}
