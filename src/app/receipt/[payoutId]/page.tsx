"use client";

import React, { use } from "react";
import Link from "next/link";
import { ArrowLeft, Printer, Download, CheckCircle2, ShieldCheck, Award } from "lucide-react";

interface ReceiptPageProps {
  params: Promise<{ payoutId: string }>;
}

export default function ReceiptPage({ params }: ReceiptPageProps) {
  const { payoutId } = use(params);

  const voucherNo = payoutId.toUpperCase();
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

  const isJuly = voucherNo.includes("JUL");
  const grossAmount = isJuly ? "₹55,000.00" : "₹51,000.00";
  const tdsAmount = isJuly ? "₹3,000.00" : "₹2,500.00";
  const netAmount = isJuly ? "₹52,000.00" : "₹48,500.00";
  const netWords = isJuly
    ? "Fifty-Two Thousand Rupees Only"
    : "Forty-Eight Thousand Five Hundred Rupees Only";

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6">
      {/* Top Action Bar (hidden on print) */}
      <div className="max-w-3xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <Link
          href="/instructor/dashboard?tab=earnings"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#050071] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Faculty Dashboard</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-4 py-2 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white font-extrabold text-xs shadow-md transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Statement</span>
          </button>
        </div>
      </div>

      {/* Printable Receipt Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200 print:shadow-none print:border-none print:p-0 print:m-0 print:rounded-none">
        {/* Header */}
        <div className="border-b border-slate-200 pb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-[#050071] tracking-tight">FUKEY EDUCATION</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase">
                Academic Payroll
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Faculty Honorarium &amp; Professional Remuneration Statement
            </p>
            <p className="text-[11px] text-slate-400">
              Jabalpur, Madhya Pradesh - 482003 • PAN: AABCF9425L
            </p>
          </div>

          <div className="text-left sm:text-right space-y-1">
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-[#5751E1] border border-indigo-200 text-xs font-black uppercase tracking-wider">
              Disbursement Slip
            </div>
            <div className="text-xs font-black text-slate-900 pt-1">VOUCHER: {voucherNo}</div>
            <div className="text-[11px] text-slate-500">Date: {currentDate}</div>
          </div>
        </div>

        {/* Faculty Details & Disbursement Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-b border-slate-200 text-xs">
          <div className="space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Disbursed To (Educator)</span>
            <div className="text-sm font-black text-slate-900">Senior Subject Faculty Member</div>
            <div className="text-slate-600">Department of Mathematics &amp; Academic Board Prep</div>
            <div className="text-slate-500">Faculty ID: FK-FAC-2026-08</div>
          </div>

          <div className="space-y-1.5 sm:text-right">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Bank Transfer Details</span>
            <div className="font-bold text-slate-800">Mode: Direct NEFT / IMPS Bank Transfer</div>
            <div className="text-slate-500">UTR Ref: NEFT-HDFC-94251146-{voucherNo.replace(/[^0-9]/g, "") || "2026"}</div>
            <div className="text-emerald-600 font-bold flex items-center sm:justify-end gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Settled &amp; Credited to Bank Account</span>
            </div>
          </div>
        </div>

        {/* Earnings Breakdown Table */}
        <div className="py-8 border-b border-slate-200">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-extrabold">
                <th className="pb-3">Academic Service Breakdown</th>
                <th className="pb-3 text-center">Units / Hours</th>
                <th className="pb-3 text-right">Standard Rate</th>
                <th className="pb-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              <tr>
                <td className="py-3">
                  <div className="font-extrabold text-slate-900">Live Academic Lectures (Classes 9th–12th)</div>
                  <div className="text-[11px] text-slate-400">Scheduled board syllabus teaching &amp; revisions</div>
                </td>
                <td className="py-3 text-center text-slate-500">32 Hours</td>
                <td className="py-3 text-right">₹1,000 / hr</td>
                <td className="py-3 text-right font-bold text-slate-900">₹32,000.00</td>
              </tr>
              <tr>
                <td className="py-3">
                  <div className="font-extrabold text-slate-900">1-on-1 Voice Doubt Clearance &amp; Mentorship</div>
                  <div className="text-[11px] text-slate-400">Live student doubt queues &amp; NCERT problem solutions</div>
                </td>
                <td className="py-3 text-center text-slate-500">14 Hours</td>
                <td className="py-3 text-right">₹1,000 / hr</td>
                <td className="py-3 text-right font-bold text-slate-900">₹14,000.00</td>
              </tr>
              <tr>
                <td className="py-3">
                  <div className="font-extrabold text-slate-900">Board Pattern Chapter Test Paper Setting</div>
                  <div className="text-[11px] text-slate-400">High-yield MCQ &amp; Subjective test design</div>
                </td>
                <td className="py-3 text-center text-slate-500">5 Papers</td>
                <td className="py-3 text-right">₹1,000 / paper</td>
                <td className="py-3 text-right font-bold text-slate-900">{isJuly ? "₹9,000.00" : "₹5,000.00"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Calculations */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-slate-200">
          <div className="text-xs space-y-1 max-w-sm text-slate-500">
            <span className="font-bold text-slate-700">Net Disbursed in Words:</span>
            <p className="italic">{netWords}</p>
          </div>

          <div className="w-full sm:w-64 space-y-2 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Gross Honorarium:</span>
              <span className="font-semibold text-slate-700">{grossAmount}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>TDS u/s 194J (10% Prof.):</span>
              <span className="font-semibold text-rose-600">-{tdsAmount}</span>
            </div>
            <div className="flex justify-between text-sm font-black text-[#050071] pt-2 border-t border-slate-200">
              <span>Net Disbursed:</span>
              <span>{netAmount}</span>
            </div>
          </div>
        </div>

        {/* Footer & Digital Stamp */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-xs">
          <div className="space-y-1 text-slate-400 text-[11px]">
            <p className="font-bold text-slate-600">Administrative Notes:</p>
            <p>1. Form 16A TDS Certificate will be issued at the end of the financial quarter.</p>
            <p>2. For any discrepancies, please contact the Academic Accounts Office.</p>
          </div>

          <div className="text-center sm:text-right space-y-1 border sm:border-0 p-3 sm:p-0 rounded-2xl border-slate-100 bg-slate-50/50 sm:bg-transparent">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Financial Controller &amp; Dean</div>
            <div className="font-black text-[#050071] text-sm">Fukey Education Academy</div>
            <div className="text-[10px] text-emerald-600 font-bold flex items-center justify-center sm:justify-end gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Disbursement Approved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
