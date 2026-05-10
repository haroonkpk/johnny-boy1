"use client";

import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative w-full md:w-1/2 mb-6 mx-auto">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl 
        shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 
        bg-white text-gray-800"
      />
    </div>
  );
}