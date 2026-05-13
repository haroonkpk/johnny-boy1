"use client";

import { useEffect, useState } from "react";
import { Check, X, Clock, ShieldCheck, ShieldX, Eye } from "lucide-react";
import { DataTable, TableHeader } from "@/components/ui/data-table";
import { getRetailers, updateRetailerStatus } from "@/actions/admin";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RetailerDetailsModal } from "@/components/shared/RetailerDetailsModal";
import Button from "@/components/ui/Button";

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

export default function WorkerRetailersPage() {
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
      text: "View",
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
      <SectionHeading 
        title="Retailer Requests"
        subtitle="Review and manage reseller applications."
        badge="WORKER PANEL"
        className="mb-0 p-4"
      />
      <Card variant="light" className="p-0 rounded-xl">
        <DataTable<RetailerRow & { statusBadge: React.ReactNode }>
          heading="All Requests"
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

      <RetailerDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        retailer={selectedRetailer}
        actions={
          <div className="flex gap-3 pt-2">
            <Button
              onClick={() => {
                handleApprove(selectedRetailer!);
                setIsModalOpen(false);
              }}
              className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 h-12"
            >
              Accept Request
            </Button>
            <Button
              onClick={() => {
                handleReject(selectedRetailer!);
                setIsModalOpen(false);
              }}
              className="flex-1 bg-red-600 text-white hover:bg-red-700 h-12"
            >
              Reject Request
            </Button>
          </div>
        }
      />
    </div>
  );
}
