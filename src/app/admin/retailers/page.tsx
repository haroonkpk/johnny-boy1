"use client";

import { useEffect, useState } from "react";
import { Check, X, Clock, ShieldCheck, ShieldX, Eye } from "lucide-react";
import { DataTable, TableHeader } from "@/components/ui/data-table";
import { getRetailers, updateRetailerStatus } from "@/actions/admin";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface RetailerRow {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  storeAddress?: string;
  monthlyUnitSales?: string;
  website?: string;
  briefIntro?: string;
  status: string;
  createdAt: string;
}

const PAGE_SIZE = 10;

const tableHeaders: TableHeader[] = [
  { key: "fullName", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "businessName", label: "Business" },
  { key: "statusBadge", label: "Status" },
  { key: "createdAt", label: "Applied" },
];

export default function RetailersPage() {
  const [retailers, setRetailers] = useState<RetailerRow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRetailer, setSelectedRetailer] = useState<RetailerRow | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchRetailers = async () => {
    setIsLoading(true);
    const data = await getRetailers();
    setRetailers(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRetailers();
  }, []);

  const handleApprove = async (row: RetailerRow) => {
    const result = await updateRetailerStatus(row.id, "approved");
    if (result.success) {
      fetchRetailers();
    }
  };

  const handleReject = async (row: RetailerRow) => {
    const result = await updateRetailerStatus(row.id, "rejected");
    if (result.success) {
      fetchRetailers();
    }
  };

  const handleView = (row: RetailerRow) => {
    setSelectedRetailer(row);
    setIsModalOpen(true);
  };

  // Add status badge to each row for display
  const displayData = retailers
    .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
    .map((r) => ({
      ...r,
      fullName: `${r.firstName} ${r.lastName}`,
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
    {
      icon: <Eye size={16} />,
      text: "View Details",
      className: "bg-blue-100 text-blue-700 hover:bg-blue-200",
      onClick: handleView,
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
    <div className="p-1 md:p-10 space-y-6">
      {/* Page Header */}
      <SectionHeading 
        title="Retailers"
        subtitle="Manage retailer applications and account status."
        badge="ADMIN PANEL"
        className="mb-0 p-4"
      />
      {/* Data Table */}
      <Card variant="light" className="p-0 rounded-xl">
        <DataTable<RetailerRow & { statusBadge: React.ReactNode }>
          heading="All Retailer Applications"
          HeaderBgColor="bg-black"
          HeaderTextColor="text-white"
          TableHeaders={tableHeaders}
          TableData={displayData}
          TableButtons={tableButtons}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalEntries={retailers.length}
          pageSize={PAGE_SIZE}
        />
      </Card>

      {/* Retailer Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        showHeader={false}
        className="max-w-xl overflow-hidden bg-white"
      >
        {selectedRetailer && (() => {
          const statusColors = {
            approved: { bg: "bg-emerald-600", accent: "text-emerald-600", icon: ShieldCheck },
            rejected: { bg: "bg-red-600", accent: "text-red-600", icon: ShieldX },
            pending: { bg: "bg-amber-500", accent: "text-amber-600", icon: Clock },
          }[selectedRetailer.status as "approved" | "rejected" | "pending"] || { bg: "bg-slate-600", accent: "text-slate-600", icon: Eye };

          const StatusIcon = statusColors.icon;

          return (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div 
                className={cn("flex items-center justify-between text-white", statusColors.bg)}
                style={{ padding: "clamp(12px, 2vw, 18px) clamp(16px, 3vw, 24px)" }}
              >
                <div className="flex items-center gap-2">
                  <StatusIcon style={{ width: "clamp(16px, 2vw, 20px)", height: "clamp(16px, 2vw, 20px)" }} />
                  <span className="font-medium uppercase tracking-wider" style={{ fontSize: "clamp(12px, 1.5vw, 14px)" }}>
                    Retailer Profile
                  </span>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="hover:opacity-80 transition-opacity">
                  <X style={{ width: "clamp(18px, 2vw, 22px)", height: "clamp(18px, 2vw, 22px)" }} />
                </button>
              </div>

              {/* Body */}
              <div className="overflow-y-auto" style={{ padding: "clamp(20px, 4vw, 32px)" }}>
                <div className="space-y-8">
                  {/* Title & Status */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn("font-bold uppercase tracking-widest", statusColors.accent)} style={{ fontSize: "clamp(10px, 1.2vw, 12px)" }}>
                        {selectedRetailer.status}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-400 font-medium" style={{ fontSize: "clamp(10px, 1.2vw, 12px)" }}>
                        Applied {selectedRetailer.createdAt}
                      </span>
                    </div>
                    <h2 className="font-bold text-slate-900 leading-tight" style={{ fontSize: "clamp(20px, 3vw, 28px)" }}>
                      {selectedRetailer.businessName}
                    </h2>
                    <p className="text-slate-500 font-medium flex items-center gap-2 mt-1" style={{ fontSize: "clamp(13px, 1.5vw, 16px)" }}>
                      Managed by <span className="text-slate-900">{selectedRetailer.firstName} {selectedRetailer.lastName}</span>
                    </p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-y-6 gap-x-4 bg-slate-50 rounded-2xl" style={{ padding: "clamp(16px, 3vw, 24px)" }}>
                    <div className="col-span-1">
                      <p className="text-slate-400 font-semibold uppercase tracking-wider mb-1" style={{ fontSize: "clamp(9px, 1vw, 11px)" }}>Email Address</p>
                      <p className="text-slate-900 font-medium break-all" style={{ fontSize: "clamp(12px, 1.3vw, 14px)" }}>{selectedRetailer.email}</p>
                    </div>
                    <div className="col-span-1">
                      <p className="text-slate-400 font-semibold uppercase tracking-wider mb-1" style={{ fontSize: "clamp(9px, 1vw, 11px)" }}>Phone Number</p>
                      <p className="text-slate-900 font-medium" style={{ fontSize: "clamp(12px, 1.3vw, 14px)" }}>{selectedRetailer.phone}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-slate-400 font-semibold uppercase tracking-wider mb-1" style={{ fontSize: "clamp(9px, 1vw, 11px)" }}>Official Website</p>
                      {selectedRetailer.website ? (
                        <a 
                          href={selectedRetailer.website.startsWith('http') ? selectedRetailer.website : `https://${selectedRetailer.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-600 font-medium hover:underline flex items-center gap-1"
                          style={{ fontSize: "clamp(12px, 1.3vw, 14px)" }}
                        >
                          {selectedRetailer.website}
                        </a>
                      ) : <p className="text-slate-500" style={{ fontSize: "clamp(12px, 1.3vw, 14px)" }}>N/A</p>}
                    </div>
                    <div className="col-span-2">
                      <p className="text-slate-400 font-semibold uppercase tracking-wider mb-1" style={{ fontSize: "clamp(9px, 1vw, 11px)" }}>Store Address</p>
                      <p className="text-slate-900 font-medium leading-relaxed" style={{ fontSize: "clamp(12px, 1.3vw, 14px)" }}>{selectedRetailer.storeAddress || "N/A"}</p>
                    </div>
                    <div className="col-span-1">
                      <p className="text-slate-400 font-semibold uppercase tracking-wider mb-1" style={{ fontSize: "clamp(9px, 1vw, 11px)" }}>Monthly Sales</p>
                      <p className="text-slate-900 font-bold" style={{ fontSize: "clamp(12px, 1.3vw, 14px)" }}>{selectedRetailer.monthlyUnitSales || "N/A"}</p>
                    </div>
                  </div>

                  {/* Bio/Intro */}
                  <div>
                    <p className="text-slate-400 font-semibold uppercase tracking-wider mb-2" style={{ fontSize: "clamp(9px, 1vw, 11px)" }}>Business Introduction</p>
                    <div className="bg-slate-50 p-4 rounded-r-xl">
                      <p className="text-slate-600 " style={{ fontSize: "clamp(12px, 1.3vw, 14px)" }}>
                        {selectedRetailer.briefIntro || "No introduction provided by the retailer."}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })()}
      </Modal>

    </div>
  );
}
