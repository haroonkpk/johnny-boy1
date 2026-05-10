
"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar/page";

import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";

/* ================= STATUS CONSTANT ================= */
const STATUS = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
} as const;

type StatusType = (typeof STATUS)[keyof typeof STATUS];

/* ================= TYPE ================= */
type RequestType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  businessName: string;
  phone: string;
  status: StatusType;
};

export default function RetailersPage() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("Retailers");

  const [requests, setRequests] = useState<RequestType[]>([
    {
      id: 1,
      firstName: "Ahmed",
      lastName: "Khan",
      email: "ahmed@gmail.com",
      businessName: "Ahmed Store",
      phone: "03001234567",
      status: STATUS.PENDING,
    },
    {
      id: 2,
      firstName: "Sara",
      lastName: "Ali",
      email: "sara@gmail.com",
      businessName: "Fresh Mart",
      phone: "03111234567",
      status: STATUS.APPROVED,
    },
    {
      id: 3,
      firstName: "Usman",
      lastName: "Sheikh",
      email: "usman@gmail.com",
      businessName: "City Shop",
      phone: "03331234567",
      status: STATUS.REJECTED,
    },
  ]);

  /* ================= UPDATE STATUS ================= */
  const updateStatus = (id: number, newStatus: StatusType) => {
    setRequests((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  /* ================= STATUS COLORS ================= */
  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case STATUS.PENDING:
        return "bg-yellow-100 text-yellow-600";
      case STATUS.APPROVED:
        return "bg-green-100 text-green-600";
      case STATUS.REJECTED:
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  /* ================= SAFE SEARCH ================= */
  const query = search.toLowerCase().trim();

  const filteredRequests = requests.filter((r) => {
    return (
      r.firstName.toLowerCase().includes(query) ||
      r.lastName.toLowerCase().includes(query) ||
      r.email.toLowerCase().includes(query) ||
      r.businessName.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex min-h-screen bg-[var(--color-cream)]">

      {/* SIDEBAR */}
      <Sidebar active={active} setActive={setActive} />

      {/* MAIN CONTENT */}
      <div className="flex-1 py-12 px-4">

        <div className="max-w-[1500px] mx-auto">

          {/* HEADER */}
          <SectionHeading
            title={
              <>
                Retailer{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Requests
                </span>
              </>
            }
            subtitle="Manage all retailer applications."
            badge="Admin Panel"
            mode="light"
          />

          <Card className="p-6 bg-white">

            {/* TOP BAR */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">
                Total: {filteredRequests.length}
              </span>
            </div>

            {/* SEARCH */}
            <SearchBar
              value={search}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(event.target.value)
              }
              placeholder="Search by name, email or business..."
            />

            {/* TABLE */}
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left">

                <thead className="bg-gray-100 text-sm uppercase text-gray-600">
                  <tr>
                    <th className="p-4">Name</th>
                    <th>Email</th>
                    <th>Business</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRequests.map((r) => (
                    <tr key={r.id} className="border-t hover:bg-gray-50 text-black">

                      <td className="p-4 font-medium">
                        {r.firstName} {r.lastName}
                      </td>

                      <td className="text-gray-600">{r.email}</td>
                      <td className="text-gray-600">{r.businessName}</td>
                      <td className="text-gray-600">{r.phone}</td>

                      <td>
                        <span
                          className={`px-3 py-1 text-xs rounded-full ${getStatusColor(
                            r.status
                          )}`}
                        >
                          {r.status}
                        </span>
                      </td>

                      <td className="flex gap-2 py-3">

                        <Button
                          className="bg-green-500 text-xs px-3 py-1 text-black"
                          onClick={() =>
                            updateStatus(r.id, STATUS.APPROVED)
                          }
                        >
                          Approve
                        </Button>

                        <Button
                          className="bg-red-500 text-xs px-3 py-1 text-black"
                          onClick={() =>
                            updateStatus(r.id, STATUS.REJECTED)
                          }
                        >
                          Reject
                        </Button>

                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </Card>

        </div>

      </div>
    </div>
  );
}