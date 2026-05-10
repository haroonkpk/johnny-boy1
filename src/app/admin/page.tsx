
"use client";

import AdminLayout from "@/components/admin/adminlayout/page";
import StatCard from "@/components/admin/StatCard/page";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 text-black">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-sm text-black">Welcome back </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-black">
        <StatCard title="Total Products" value={120} color="text-blue-600" />
        <StatCard title="Retailers" value={45} color="text-green-600" />
        <StatCard title="Messages" value={18} color="text-purple-600" />
      </div>

      {/* CONTENT */}
      <div className="bg-white p-6 rounded-xl shadow text-black">
        Recent Activity coming soon...
      </div>
    </AdminLayout>
  );
}