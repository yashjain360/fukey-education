"use client";

import React, { use } from "react";
import Link from "next/link";
import { ArrowLeft, Printer, Download, CheckCircle2, ShieldCheck, HelpCircle } from "lucide-react";

interface InvoicePageProps {
  params: Promise<{ orderId: string }>;
}

export default function InvoicePage({ params }: InvoicePageProps) {
  const { orderId } = use(params);

  // Derive realistic dynamic data for this order
  const invoiceNo = orderId.startsWith("INV") ? orderId : `INV-2026-${orderId.toUpperCase()}`;
  const currentDate = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6">
      {/* Top Action Bar (hidden on print) */}
      <div className="max-w-3xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <Link
          href="/dashboard?tab=orders"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#050071] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Invoice</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-4 py-2 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white font-extrabold text-xs shadow-md transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Invoice Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200 print:shadow-none print:border-none print:p-0 print:m-0 print:rounded-none">
        {/* Header */}
        <div className="border-b border-slate-200 pb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-[#050071] tracking-tight">FUKEY EDUCATION</span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-[#5751E1] text-[10px] font-black uppercase">
                ISO 9001:2015
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Premier Live Board Coaching &amp; Academic Learning Management Portal
            </p>
            <p className="text-[11px] text-slate-400">
              Jabalpur, Madhya Pradesh - 482003 • GSTIN: 23AABCF9425L1Z8
            </p>
          </div>

          <div className="text-left sm:text-right space-y-1">
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-black uppercase tracking-wider">
              Tax Invoice (Paid)
            </div>
            <div className="text-xs font-black text-slate-900 pt-1">{invoiceNo}</div>
            <div className="text-[11px] text-slate-500">Date: {currentDate}</div>
          </div>
        </div>

        {/* Bill To & Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-b border-slate-200 text-xs">
          <div className="space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Billed To (Student)</span>
            <div className="text-sm font-black text-slate-900">Enrolled Student Candidate</div>
            <div className="text-slate-600">Candidate Student Portal Account</div>
            <div className="text-slate-500">Place of Supply: Madhya Pradesh (23)</div>
          </div>

          <div className="space-y-1.5 sm:text-right">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Payment Summary</span>
            <div className="font-bold text-slate-800">Mode: Online Razorpay / UPI Gateway</div>
            <div className="text-slate-500">Ref: TXN-FK-{orderId.toUpperCase().slice(-6)}</div>
            <div className="text-emerald-600 font-bold flex items-center sm:justify-end gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Payment Verified &amp; Settled</span>
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="py-8 border-b border-slate-200">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-extrabold">
                <th className="pb-3">Course Batch Description</th>
                <th className="pb-3 text-center">SAC Code</th>
                <th className="pb-3 text-right">Price</th>
                <th className="pb-3 text-right">GST (18%)</th>
                <th className="pb-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              <tr>
                <td className="py-4">
                  <div className="font-extrabold text-slate-900 text-sm">
                    Class 10th Complete Mathematics Board Batch
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Live Lectures + Handwritten Formula PDF Notes + Chapter Tests
                  </div>
                </td>
                <td className="py-4 text-center text-slate-500">999293</td>
                <td className="py-4 text-right">₹1,270.34</td>
                <td className="py-4 text-right">₹228.66</td>
                <td className="py-4 text-right font-black text-slate-900">₹1,499.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Calculations */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-slate-200">
          <div className="text-xs space-y-1 max-w-sm text-slate-500">
            <span className="font-bold text-slate-700">Amount in Words:</span>
            <p className="italic">One Thousand Four Hundred Ninety-Nine Rupees Only</p>
          </div>

          <div className="w-full sm:w-64 space-y-2 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Taxable Value:</span>
              <span className="font-semibold text-slate-700">₹1,270.34</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>CGST (9%):</span>
              <span className="font-semibold text-slate-700">₹114.33</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>SGST (9%):</span>
              <span className="font-semibold text-slate-700">₹114.33</span>
            </div>
            <div className="flex justify-between text-sm font-black text-[#050071] pt-2 border-t border-slate-200">
              <span>Total Paid:</span>
              <span>₹1,499.00</span>
            </div>
          </div>
        </div>

        {/* Footer & Digital Stamp */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-xs">
          <div className="space-y-1 text-slate-400 text-[11px]">
            <p className="font-bold text-slate-600">Terms &amp; Notes:</p>
            <p>1. This is a computer-generated tax invoice and requires no physical signature.</p>
            <p>2. Course access is active 24x7 till the completion of academic board exams.</p>
          </div>

          <div className="text-center sm:text-right space-y-1 border sm:border-0 p-3 sm:p-0 rounded-2xl border-slate-100 bg-slate-50/50 sm:bg-transparent">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Authorized Signatory</div>
            <div className="font-black text-[#050071] text-sm">Fukey Education Academy</div>
            <div className="text-[10px] text-emerald-600 font-bold flex items-center justify-center sm:justify-end gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Digitally Verified &amp; Certified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
