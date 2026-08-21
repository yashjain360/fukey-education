"use client";

import React, { useState } from "react";
import { Sparkles, Check, ChevronUp, ChevronDown, Wand2 } from "lucide-react";
import { useFestivalTheme } from "./FestivalThemeContext";
import { FESTIVALS, FestivalType } from "./FestivalConfig";

export default function FestivalThemeSwitcher() {
  const { activeFestival, setFestival, isTrailEnabled, setIsTrailEnabled } = useFestivalTheme();
  const [isOpen, setIsOpen] = useState(false);

  const festivalList: { id: FestivalType; name: string; icon: string }[] = [
    { id: "independence_day", name: "Independence Day (Active)", icon: "🇮🇳" },
    { id: "republic_day", name: "Republic Day", icon: "🏛️" },
    { id: "diwali", name: "Diwali Sparkle", icon: "🪔" },
    { id: "holi", name: "Holi Rangotsav", icon: "🎨" },
    { id: "standard", name: "Standard Theme", icon: "🎓" },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-[99999]">
      {/* Control Popover */}
      {isOpen && (
        <div className="mb-2 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 p-3 space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Wand2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Blinkit Festive Theme Engine</span>
            </div>
          </div>

          <div className="space-y-1">
            {festivalList.map((f) => {
              const isSelected = activeFestival.id === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => {
                    setFestival(f.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors text-left ${
                    isSelected
                      ? "bg-indigo-50 text-[#5751E1]"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{f.icon}</span>
                    <span>{f.name}</span>
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-600 font-medium">Tricolor Mouse Trail</span>
            <button
              onClick={() => setIsTrailEnabled(!isTrailEnabled)}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                isTrailEnabled ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"
              }`}
            >
              {isTrailEnabled ? "ON" : "OFF"}
            </button>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md hover:bg-white text-slate-800 text-xs font-bold shadow-xl border border-slate-200/80 flex items-center gap-2 transition-all hover:scale-105"
      >
        <span className="text-sm">
          {activeFestival.id === "independence_day" ? "🇮🇳" : activeFestival.id === "diwali" ? "🪔" : activeFestival.id === "holi" ? "🎨" : "✨"}
        </span>
        <span className="font-extrabold text-[11px] text-[#050071]">{activeFestival.name}</span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}
