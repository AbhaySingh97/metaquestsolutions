"use client";

import { useState } from "react";
import { Workshop } from "@/data/workshops";
import confetti from "canvas-confetti";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Calendar,
  CreditCard,
  QrCode,
} from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RegistrationModalProps {
  workshop: Workshop | null;
  onClose: () => void;
}

export default function RegistrationModal({
  workshop,
  onClose,
}: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successTicket, setSuccessTicket] = useState<{
    ticketCode: string;
    paymentId: string;
    attendeeName: string;
    attendeeEmail: string;
    workshopTitle: string;
    date: string;
    amount: number;
  } | null>(null);

  if (!workshop) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {}
  };

  const handleRegisterAndPay = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.email || !formData.phone) {
      setError("Please fill in your name, email, and phone number.");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create Order via Next.js Backend
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workshopId: workshop.id,
          title: workshop.title,
          amount: workshop.discountedPrice,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      const orderData = await res.json();

      if (!res.ok || !orderData.success) {
        throw new Error(orderData.error || "Unable to initiate payment");
      }

      // Step 2: Handle Checkout
      if (typeof window !== "undefined" && window.Razorpay && orderData.isLive) {
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "MetaQuest Solutions",
          description: `Registration for ${workshop.title}`,
          order_id: orderData.orderId,
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: "#06B6D4",
          },
          handler: async function (response: any) {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                workshopId: workshop.id,
                workshopTitle: workshop.title,
                attendeeEmail: formData.email,
                attendeeName: formData.name,
                attendeePhone: formData.phone,
                organization: formData.organization,
                amount: workshop.discountedPrice,
                isSimulation: false,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setSuccessTicket({
                ticketCode: verifyData.ticketCode,
                paymentId: response.razorpay_payment_id,
                attendeeName: formData.name,
                attendeeEmail: formData.email,
                workshopTitle: workshop.title,
                date: workshop.date,
                amount: workshop.discountedPrice,
              });
              triggerConfetti();
            } else {
              setError("Payment verification failed. Please contact support.");
            }
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
            },
          },
        };

        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
      } else {
        // Sandbox Simulation Mode
        setTimeout(async () => {
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: orderData.orderId,
              razorpay_payment_id: `pay_sim_${Date.now()}`,
              razorpay_signature: "simulated_signature",
              workshopId: workshop.id,
              workshopTitle: workshop.title,
              attendeeEmail: formData.email,
              attendeeName: formData.name,
              attendeePhone: formData.phone,
              organization: formData.organization,
              amount: workshop.discountedPrice,
              isSimulation: true,
            }),
          });

          const verifyData = await verifyRes.json();
          setSuccessTicket({
            ticketCode: verifyData.ticketCode,
            paymentId: verifyData.paymentId,
            attendeeName: formData.name,
            attendeeEmail: formData.email,
            workshopTitle: workshop.title,
            date: workshop.date,
            amount: workshop.discountedPrice,
          });
          setLoading(false);
          triggerConfetti();
        }, 1200);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-surface rounded-2xl border border-white/10 shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-[#0B0F19] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Workshop Registration</h3>
              <p className="text-xs text-gray-400">Secure Razorpay Gateway</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!successTicket ? (
          <form onSubmit={handleRegisterAndPay} className="p-6 space-y-4">
            {/* Workshop Summary Card */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                Selected Workshop
              </span>
              <h4 className="text-sm font-bold text-white line-clamp-1 mt-0.5">
                {workshop.title}
              </h4>
              <div className="flex items-center justify-between text-xs text-gray-400 mt-2 pt-2 border-t border-white/5">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  {workshop.date}
                </span>
                <span className="font-extrabold text-white text-sm">
                  ₹{workshop.discountedPrice}{" "}
                  <span className="text-xs font-normal text-gray-500 line-through">
                    ₹{workshop.originalPrice}
                  </span>
                </span>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Inputs */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Dr. Aakash Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Email Address (For Google Meet link & Ticket) *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="aakash@university.edu"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  WhatsApp Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  College / Organization
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="e.g. IIT / Startup"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            {/* Trust and Payment Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-indigo-700 hover:from-cyan-400 hover:to-indigo-600 disabled:opacity-50 transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Secure Gateway...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Pay ₹{workshop.discountedPrice} via Razorpay</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 mt-3">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>UPI, Cards, Netbanking & Wallets Supported • 256-bit SSL</span>
              </div>
            </div>
          </form>
        ) : (
          /* Confirmation Ticket Card */
          <div className="p-6 text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider">
                Registration Confirmed!
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                You're in, {successTicket.attendeeName}!
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                A confirmation receipt and meeting link have been sent to{" "}
                <strong className="text-gray-200">{successTicket.attendeeEmail}</strong>.
              </p>
            </div>

            {/* Visual Digital Ticket */}
            <div className="p-4 rounded-xl bg-black/60 border border-cyan-500/30 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl" />
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <div className="text-[10px] font-mono text-cyan-400 uppercase">
                    MetaQuest Digital Pass
                  </div>
                  <div className="text-sm font-bold text-white leading-tight">
                    {successTicket.workshopTitle}
                  </div>
                </div>
                <QrCode className="w-8 h-8 text-cyan-300" />
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-300 pt-3 border-t border-white/10">
                <div>
                  <span className="text-gray-500 block">TICKET ID</span>
                  <span className="font-mono text-cyan-300 font-semibold">
                    {successTicket.ticketCode}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">PAYMENT REF</span>
                  <span className="font-mono text-gray-300 truncate block">
                    {successTicket.paymentId}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">DATE</span>
                  <span>{successTicket.date}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">AMOUNT PAID</span>
                  <span className="font-semibold text-emerald-400">
                    ₹{successTicket.amount}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl font-bold text-sm text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-400/20"
            >
              Done & Return to Site
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
