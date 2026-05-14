"use client";

import { X, Clock, Package, CheckCircle2, Truck, Timer } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

export function OrderDetailsModal({
  isOpen,
  onClose,
  order,
}: OrderDetailsModalProps) {
  if (!order) return null;

  const statusConfig = {
    pending: { bg: "bg-amber-500", accent: "text-amber-600", icon: Timer, label: "Pending" },
    processing: { bg: "bg-blue-500", accent: "text-blue-600", icon: Package, label: "Processing" },
    shipped: { bg: "bg-purple-500", accent: "text-purple-600", icon: Truck, label: "Shipped" },
    delivered: { bg: "bg-emerald-600", accent: "text-emerald-600", icon: CheckCircle2, label: "Delivered" },
  }[order.status as 'pending' | 'processing' | 'shipped' | 'delivered'] || {
    bg: "bg-slate-600",
    accent: "text-slate-600",
    icon: Clock,
    label: order.status
  };

  const StatusIcon = statusConfig.icon;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showHeader={false}
      className="max-w-2xl overflow-hidden bg-white"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div
          className={cn("flex items-center justify-between text-white", statusConfig.bg)}
          style={{ padding: "clamp(12px, 2vw, 18px) clamp(16px, 3vw, 24px)" }}
        >
          <div className="flex items-center gap-2">
            <StatusIcon style={{ width: "clamp(16px, 2vw, 20px)", height: "clamp(16px, 2vw, 20px)" }} />
            <span
              className="font-medium uppercase tracking-wider"
              style={{ fontSize: "clamp(12px, 1.5vw, 14px)" }}
            >
              Order Details
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
                  className={cn("font-bold uppercase tracking-widest", statusConfig.accent)}
                  style={{ fontSize: "clamp(10px, 1.2vw, 12px)" }}
                >
                  {order.status}
                </span>
                <span className="text-slate-300">•</span>
                <span
                  className="text-slate-400 font-medium"
                  style={{ fontSize: "clamp(10px, 1.2vw, 12px)" }}
                >
                  Placed {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h2
                className="font-bold text-slate-900 leading-tight"
                style={{ fontSize: "clamp(20px, 3vw, 28px)" }}
              >
                #{order._id.slice(-6).toUpperCase()}
              </h2>
              <p
                className="text-slate-500 font-medium flex items-center gap-2 mt-1"
                style={{ fontSize: "clamp(13px, 1.5vw, 16px)" }}
              >
                Customer <span className="text-slate-900">{order.customerName}</span>
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
                  {order.email}
                </p>
              </div>
              <div className="col-span-1">
                <p
                  className="text-slate-400 font-semibold uppercase tracking-wider mb-1"
                  style={{ fontSize: "clamp(9px, 1vw, 11px)" }}
                >
                  Total Price
                </p>
                <p
                  className="text-emerald-600 font-bold"
                  style={{ fontSize: "clamp(16px, 1.3vw, 18px)" }}
                >
                  ${order.totalPrice}
                </p>
              </div>
              <div className="col-span-2">
                <p
                  className="text-slate-400 font-semibold uppercase tracking-wider mb-1"
                  style={{ fontSize: "clamp(9px, 1vw, 11px)" }}
                >
                  Order Items ({order.items.length})
                </p>
                <div className="space-y-3 mt-2">
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 bg-white p-2 rounded-lg border border-slate-200">
                       <div className="relative w-12 h-12 rounded bg-slate-100 overflow-hidden flex-shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                       </div>
                       <div className="flex-grow min-w-0">
                          <p className="text-slate-900 font-bold text-sm truncate">{item.name}</p>
                          <p className="text-slate-500 text-xs font-medium">Qty: {item.quantity} × ${item.price}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-slate-900 font-bold text-sm">${item.quantity * item.price}</p>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
