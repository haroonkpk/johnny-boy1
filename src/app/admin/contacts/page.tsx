"use client";

import { useEffect, useState } from "react";
import { Trash2, Mail, Calendar, User, MessageSquare, Reply, UserCheck, Send, Clock } from "lucide-react";
import { DataTable, TableHeader } from "@/components/ui/data-table";
import { getContacts, deleteContact, replyContact } from "@/actions/contact";
import { getWorkers, assignContact } from "@/actions/admin";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import { Textarea } from "@/components/ui/textarea";

const PAGE_SIZE = 10;

// Table Headers
const tableHeaders: TableHeader[] = [
  { key: "userInfo", label: "Sender" },
  { key: "displayEmail", label: "Email Address" },
  { key: "displayMessage", label: "Message Content" },
  { key: "displayStatus", label: "Status" },
  { key: "displayDate", label: "Received Date" },
];

export default function ContactsAdminPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [workers, setWorkers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [replyModal, setReplyModal] = useState<{ isOpen: boolean; contact: any | null }>({ isOpen: false, contact: null });
  const [assignModal, setAssignModal] = useState<{ isOpen: boolean; contact: any | null }>({ isOpen: false, contact: null });
  
  // Action states
  const [replyText, setReplyText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const [contactData, workerData] = await Promise.all([
      getContacts(),
      getWorkers()
    ]);
    setContacts(contactData || []);
    setWorkers(workerData || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (row: any) => {
    if (confirm(`Delete message from ${row.name}?`)) {
      const result = await deleteContact(row._id);
      if (result.success) {
        fetchData();
      }
    }
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyModal.contact) return;
    setIsSubmitting(true);
    const result = await replyContact(replyModal.contact._id, replyText);
    if (result.success) {
      setReplyModal({ isOpen: false, contact: null });
      setReplyText("");
      fetchData();
    } else {
      alert(result.error || "Failed to send reply");
    }
    setIsSubmitting(false);
  };

  const handleAssign = async (workerId: string) => {
    if (!assignModal.contact) return;
    setIsSubmitting(true);
    const result = await assignContact(assignModal.contact._id, workerId);
    if (result.success) {
      setAssignModal({ isOpen: false, contact: null });
      fetchData();
    } else {
      alert(result.error || "Failed to assign");
    }
    setIsSubmitting(false);
  };

  // Formatting Data for DataTable
  const displayData = contacts
    .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
    .map((c) => {
      const assignedWorker = workers.find(w => w.id === c.assignedTo);
      return {
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
          <div className="max-w-[250px]">
            <p className="text-sm text-gray-600 line-clamp-2 italic">
              "{c.message}"
            </p>
          </div>
        ),
        displayStatus: (
          <div className="flex flex-col gap-1">
             {c.isReplied ? (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  <Send size={10} /> Replied
                </span>
             ) : (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                  <Clock size={10} /> Pending
                </span>
             )}
             {assignedWorker && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                  <UserCheck size={10} /> {assignedWorker.username}
                </span>
             )}
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
      };
    });

  const totalPages = Math.ceil(contacts.length / PAGE_SIZE);

  const tableButtons = [
    {
      icon: <Reply size={16} />,
      text: "Reply",
      className: "bg-black text-white hover:bg-gray-800",
      onClick: (row: any) => setReplyModal({ isOpen: true, contact: row }),
    },
    {
      icon: <UserCheck size={16} />,
      text: "Assign",
      className: "bg-blue-100 text-blue-700 hover:bg-blue-200",
      onClick: (row: any) => setAssignModal({ isOpen: true, contact: row }),
    },
    {
      icon: <Trash2 size={16} />,
      text: "Delete",
      className: "bg-red-50 text-red-700 hover:bg-red-100",
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

      {/* Reply Modal */}
      <Modal
        isOpen={replyModal.isOpen}
        onClose={() => setReplyModal({ isOpen: false, contact: null })}
        title="Reply to Message"
        className="max-w-lg bg-white"
      >
        <div className="md:p-6 space-y-6">
          
          {replyModal.contact && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Original Message from {replyModal.contact.name}</p>
              <div className="max-h-24 overflow-y-auto pr-2 custom-scrollbar">
                <p className="text-gray-700 italic">"{replyModal.contact.message}"</p>
              </div>
            </div>
          )}

          <form onSubmit={handleReply} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Your Response
              </label>
              <Textarea
                required
                rows={5}
                placeholder="Type your reply here..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              variant="secondary"
              disabled={isSubmitting || !replyText.trim()}
              className="w-full h-12 flex items-center justify-center gap-2"
            >
              <Send size={18} />
              {isSubmitting ? "Sending..." : "Send Reply via Email"}
            </Button>
          </form>
        </div>
      </Modal>

      {/* Assign Modal */}
      <Modal
        isOpen={assignModal.isOpen}
        onClose={() => setAssignModal({ isOpen: false, contact: null })}
        title="Assign to Worker"
        className="max-w-md bg-white"
      >
        <div className="p-6 space-y-6">

          <div className="space-y-3">
            {workers.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No workers found. Please add workers first.</p>
            ) : (
              workers.map(worker => (
                <button
                  key={worker.id}
                  onClick={() => handleAssign(worker.id)}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                      {worker.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-gray-900">{worker.username}</p>
                      <p className="text-xs text-gray-500">{worker.email}</p>
                    </div>
                  </div>
                  <UserCheck size={18} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
                </button>
              ))
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}