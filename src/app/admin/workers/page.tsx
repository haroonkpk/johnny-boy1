"use client";

import { useEffect, useState } from "react";
import { Trash2, User, Filter, Edit } from "lucide-react";
import { DataTable, TableHeader } from "@/components/ui/data-table";
import { getWorkers, deleteWorker } from "@/actions/admin";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";
import { CreateWorkerForm } from "@/components/admin/CreateWorkerForm";
import { EditWorkerModal } from "@/components/admin/EditWorkerModal";

interface WorkerRow {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

const PAGE_SIZE = 10;

const tableHeaders: TableHeader[] = [
  { key: "workerInfo", label: "Worker Identity" },
  { key: "email", label: "Email Address" },
  { key: "createdAt", label: "Joined Date" },
];

export default function WorkersPage() {
  const [workers, setWorkers] = useState<WorkerRow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [editModal, setEditModal] = useState<{ isOpen: boolean; worker: any | null }>({ isOpen: false, worker: null });

  const fetchWorkers = async () => {
    setIsLoading(true);
    const data = await getWorkers();
    setWorkers(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const handleDelete = async (row: WorkerRow) => {
    const confirmDelete = confirm(`Are you sure you want to delete worker ${row.username}?`);
    if (!confirmDelete) return;

    const result = await deleteWorker(row.id);
    if (result.success) {
      fetchWorkers();
    } else {
      alert(result.error || "Delete failed");
    }
  };

  const displayData = workers
    .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
    .map((w) => ({
      ...w,
      workerInfo: (
        <div className="flex items-center gap-3 py-2">
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-black border border-purple-100">
            <User size={18} />
          </div>
          <p className="font-semibold text-gray-900">{w.username}</p>
        </div>
      ),
    }));

  const totalPages = Math.ceil(workers.length / PAGE_SIZE);

  const tableButtons = [
    {
      icon: <Edit size={16} />,
      text: "Edit",
      className: "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100/50",
      onClick: (row: WorkerRow) => setEditModal({ isOpen: true, worker: row }),
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
      <div className="p-4 md:p-10 space-y-10 animate-pulse">
        <div className="h-20 bg-gray-100 rounded-2xl w-full"></div>
        <div className="h-[500px] bg-gray-50 rounded-2xl w-full"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 space-y-10 min-h-screen">
      <SectionHeading 
        title="Worker Management"
        subtitle="Manage worker accounts and their access."
        badge="ADMIN PANEL"
        className="mb-0 p-0"
      />

      <CreateWorkerForm onSuccess={fetchWorkers} />

      <motion.div layout className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
            <Filter size={18} className="text-black" />
            Worker Registry ({workers.length})
          </h3>
        </div>

        <Card variant="light" className="p-0 border-none rounded-xl overflow-hidden shadow-sm">
          <DataTable<any>
            heading="Master Workers List"
            HeaderBgColor="bg-black"
            HeaderTextColor="text-white"
            TableHeaders={tableHeaders}
            TableData={displayData}
            TableButtons={tableButtons}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalEntries={workers.length}
            pageSize={PAGE_SIZE}
          />
        </Card>
      </motion.div>

      <EditWorkerModal
        isOpen={editModal.isOpen}
        worker={editModal.worker}
        onClose={() => setEditModal({ isOpen: false, worker: null })}
        onSuccess={fetchWorkers}
      />
    </div>
  );
}
