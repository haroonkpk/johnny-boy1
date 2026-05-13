"use client";

import React from "react";
import { X, Clock, ShieldCheck, ShieldX, Eye } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

interface RetailerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  retailer: any;
  actions?: React.ReactNode;
}

export function RetailerDetailsModal({
  isOpen,
  onClose,
  retailer,
  actions,
}: RetailerDetailsModalProps) {
  if (!retailer) return null;

  const statusColors = {
    approved: { bg: "bg-emerald-600", accent: "text-emerald-600", icon: ShieldCheck },
    rejected: { bg: "bg-red-600", accent: "text-red-600", icon: ShieldX },
    pending: { bg: "bg-amber-500", accent: "text-amber-600", icon: Clock },
  }[retailer.status as "approved" | "rejected" | "pending"] || {
    bg: "bg-slate-600",
    accent: "text-slate-600",
    icon: Eye,
  };

  const StatusIcon = statusColors.icon;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showHeader={false}
      className="max-w-xl overflow-hidden bg-white"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div
          className={cn("flex items-center justify-between text-white", statusColors.bg)}
          style={{ padding: "clamp(12px, 2vw, 18px) clamp(16px, 3vw, 24px)" }}
        >
          <div className="flex items-center gap-2">
            <StatusIcon style={{ width: "clamp(16px, 2vw, 20px)", height: "clamp(16px, 2vw, 20px)" }} />
            <span
              className="font-medium uppercase tracking-wider"
              style={{ fontSize: "clamp(12px, 1.5vw, 14px)" }}
            >
              Retailer Profile
            </span>
          </div>
          <button onClick={onClose} className="hover:opacity-80 transition-opacity">
            <X style={{ width: "clamp(18px, 2vw, 22px)", height: "clamp(18px, 2vw, 22px)" }} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-4 md:p-[clamp(20px,4vw,32px)]">
          <div className="space-y-8">
            {/* Title & Status */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={cn("font-bold uppercase tracking-widest", statusColors.accent)}
                  style={{ fontSize: "clamp(10px, 1.2vw, 12px)" }}
                >
                  {retailer.status}
                </span>
                <span className="text-slate-300">•</span>
                <span
                  className="text-slate-400 font-medium"
                  style={{ fontSize: "clamp(10px, 1.2vw, 12px)" }}
                >
                  Applied {retailer.createdAt}
                </span>
              </div>
              <h2
                className="font-bold text-slate-900 leading-tight"
                style={{ fontSize: "clamp(20px, 3vw, 28px)" }}
              >
                {retailer.businessName}
              </h2>
              <p
                className="text-slate-500 font-medium flex items-center gap-2 mt-1"
                style={{ fontSize: "clamp(13px, 1.5vw, 16px)" }}
              >
                Managed by <span className="text-slate-900">{retailer.firstName} {retailer.lastName}</span>
              </p>
            </div>

            {/* Details Grid */}
            <div
              className="grid grid-cols-2 gap-y-6 gap-x-4 bg-slate-50 "
              style={{ padding: "clamp(16px, 3vw, 24px)" }}
            >
              <div className="col-span-1">
                <p
                  className="text-slate-400 font-semibold uppercase tracking-wider mb-1"
                  style={{ fontSize: "clamp(9px, 1vw, 11px)" }}
                >
                  Email Address
                </p>
                <p
                  className="text-slate-900 font-medium break-all"
                  style={{ fontSize: "clamp(12px, 1.3vw, 14px)" }}
                >
                  {retailer.email}
                </p>
              </div>
              <div className="col-span-1">
                <p
                  className="text-slate-400 font-semibold uppercase tracking-wider mb-1"
                  style={{ fontSize: "clamp(9px, 1vw, 11px)" }}
                >
                  Phone Number
                </p>
                <p
                  className="text-slate-900 font-medium"
                  style={{ fontSize: "clamp(12px, 1.3vw, 14px)" }}
                >
                  {retailer.phone}
                </p>
              </div>
              <div className="col-span-2">
                <p
                  className="text-slate-400 font-semibold uppercase tracking-wider mb-1"
                  style={{ fontSize: "clamp(9px, 1vw, 11px)" }}
                >
                  Official Website
                </p>
                {retailer.website ? (
                  <a
                    href={
                      retailer.website.startsWith("http")
                        ? retailer.website
                        : `https://${retailer.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:underline flex items-center gap-1"
                    style={{ fontSize: "clamp(12px, 1.3vw, 14px)" }}
                  >
                    {retailer.website}
                  </a>
                ) : (
                  <p className="text-slate-500" style={{ fontSize: "clamp(12px, 1.3vw, 14px)" }}>
                    N/A
                  </p>
                )}
              </div>
              <div className="col-span-2">
                <p
                  className="text-slate-400 font-semibold uppercase tracking-wider mb-1"
                  style={{ fontSize: "clamp(9px, 1vw, 11px)" }}
                >
                  Store Address
                </p>
                <p
                  className="text-slate-900 font-medium leading-relaxed"
                  style={{ fontSize: "clamp(12px, 1.3vw, 14px)" }}
                >
                  {retailer.storeAddress || "N/A"}
                </p>
              </div>
              <div className="col-span-1">
                <p
                  className="text-slate-400 font-semibold uppercase tracking-wider mb-1"
                  style={{ fontSize: "clamp(9px, 1vw, 11px)" }}
                >
                  Monthly Sales
                </p>
                <p
                  className="text-slate-900 font-bold"
                  style={{ fontSize: "clamp(12px, 1.3vw, 14px)" }}
                >
                  {retailer.monthlyUnitSales || "N/A"}
                </p>
              </div>
            </div>

            {/* Bio/Intro */}
            <div>
              <p
                className="text-slate-400 font-semibold uppercase tracking-wider mb-2"
                style={{ fontSize: "clamp(9px, 1vw, 11px)" }}
              >
                Business Introduction
              </p>
              <div className="bg-slate-50 p-4 ">
                <p className="text-slate-600 " style={{ fontSize: "clamp(12px, 1.3vw, 14px)" }}>
                  {retailer.briefIntro || "No introduction provided by the retailer."}
                </p>
              </div>
            </div>

            {/* Actions */}
            {actions && <div className="pt-2">{actions}</div>}
          </div>
        </div>
      </div>
    </Modal>
  );
}
