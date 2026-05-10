
"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar/page"; 
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";

export default function ContactsPage() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("Messages");

  const contacts = [
    { name: "Ali", email: "ali@gmail.com", message: "Need help with order" },
    { name: "Sara", email: "sara@gmail.com", message: "Inquiry about product" },
    { name: "Ahmed", email: "ahmed@gmail.com", message: "Want to become retailer" },
    { name: "Usman", email: "usman@gmail.com", message: "Shipping issue" },
  ];

  const q = search.toLowerCase().trim();

  const filteredContacts = contacts.filter((c) => {
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.message.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex min-h-screen bg-[var(--color-cream)]">

      {/* SIDEBAR */}
      <Sidebar active={active} setActive={setActive} />

      {/* MAIN CONTENT */}
      <div className="flex-1 py-12 px-6">
        <div className="max-w-[1500px] mx-auto">

          <SectionHeading
            title={
              <>
                Contact{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Requests
                </span>
              </>
            }
            subtitle="Manage all customer messages and inquiries."
            badge="Admin Panel"
            mode="light"
          />

          <Card variant="light" className="p-6">

            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">
                Total: {filteredContacts.length}
              </span>
            </div>

            <SearchBar
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
              placeholder="Search by name, email or message..."
            />

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left">

                <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
                  <tr>
                    <th className="p-4">Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredContacts.length > 0 ? (
                    filteredContacts.map((c, i) => (
                      <tr key={i} className="border-t hover:bg-gray-50 transition">
                        <td className="p-4 font-medium text-gray-800">{c.name}</td>
                        <td className="text-gray-600">{c.email}</td>
                        <td className="text-gray-600">{c.message}</td>
                        <td>
                          <Button variant="secondary" className="text-sm px-3 py-1">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-10 text-gray-500">
                        No contacts found
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>

          </Card>
        </div>
      </div>
    </div>
  );
}