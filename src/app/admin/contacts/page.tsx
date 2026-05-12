"use client";

import { useEffect, useState } from "react";
import { Trash2, Mail, Calendar, User, MessageSquare } from "lucide-react";
import { DataTable, TableHeader } from "@/components/ui/data-table";
import { getContacts, deleteContact } from "@/actions/contact";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";

const PAGE_SIZE = 10;

// Table Headers
const tableHeaders: TableHeader[] = [
  { key: "userInfo", label: "Sender" },
  { key: "displayEmail", label: "Email Address" },
  { key: "displayMessage", label: "Message Content" },
  { key: "displayDate", label: "Received Date" },
];

export default function ContactsAdminPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContacts = async () => {
    setIsLoading(true);
    const data = await getContacts();
    setContacts(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (row: any) => {
    if (confirm(`Delete message from ${row.name}?`)) {
      const result = await deleteContact(row._id);
      if (result.success) {
        fetchContacts();
      }
    }
  };

  // Formatting Data for DataTable
  const displayData = contacts
    .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
    .map((c) => ({
      ...c,
      userInfo: (
        <div className="flex items-center gap-3 py-2">
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-black border border-purple-100">
            <User size={18} />
          </div>
          <p className="font-semibold text-gray-900">{c.name}</p>
        </div>
      ),
      displayEmail: (
        <div className="flex items-center gap-2 text-gray-500">
          <Mail size={14} />
          <span className="text-sm">{c.email}</span>
        </div>
      ),
      displayMessage: (
        <div className="max-w-[300px]">
          <p className="text-sm text-gray-600 line-clamp-2 italic">
            "{c.message}"
          </p>
        </div>
      ),
      displayDate: (
        <div className="flex items-center gap-2 text-gray-400 text-xs">
          <Calendar size={14} />
          {new Date(c.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      ),
    }));

  const totalPages = Math.ceil(contacts.length / PAGE_SIZE);

  const tableButtons = [
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
        title="Customer Inquiries"
        subtitle="Manage and respond to messages from your contact form."
        badge="INBOX"
        className="mb-0 p-0"
      />

      <motion.div layout className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
            <MessageSquare size={18} className="text-black" />
            Recent Messages ({contacts.length})
          </h3>
        </div>

        <Card variant="light" className="p-0 border-none rounded-xl overflow-hidden shadow-sm">
          <DataTable
            heading="Contact Registry"
            HeaderBgColor="bg-black text-white" 
            TableHeaders={tableHeaders}
            TableData={displayData}
            TableButtons={tableButtons}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalEntries={contacts.length}
            pageSize={PAGE_SIZE}
          />
        </Card>
      </motion.div>
    </div>
  );
}