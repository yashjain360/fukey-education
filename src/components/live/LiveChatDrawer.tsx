"use client";

import React, { useState, useEffect } from "react";
import { Send, MessageSquare, Pin, CheckCircle2 } from "lucide-react";

interface Message {
  id: string;
  sender: string;
  isInstructor: boolean;
  text: string;
  time: string;
  isPinned?: boolean;
}

interface LiveChatProps {
  currentUserName: string;
  isInstructor: boolean;
  sendData: (topic: string, payload: unknown) => void;
  onData: (topic: string, handler: (payload: unknown) => void) => () => void;
}

export default function LiveChatDrawer({ currentUserName, isInstructor, sendData, onData }: LiveChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMsg, setInputMsg] = useState("");

  useEffect(() => {
    return onData("chat", (payload) => {
      setMessages((prev) => [...prev, payload as Message]);
    });
  }, [onData]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg: Message = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      sender: currentUserName,
      isInstructor,
      text: inputMsg.trim(),
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    };

    // LiveKit data messages don't loop back to the sender, so the sender's own message is appended
    // locally in addition to being broadcast.
    setMessages((prev) => [...prev, newMsg]);
    sendData("chat", newMsg);
    setInputMsg("");
  };

  const pinnedMsg = messages.find((m) => m.isPinned);

  return (
    <div className="w-full h-full bg-slate-900 border border-indigo-900/60 rounded-3xl p-4 flex flex-col justify-between overflow-hidden shadow-xl text-white">
      {/* Top Chat Header */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#5751E1]" />
          <h4 className="font-black text-sm text-slate-100">Live Lecture Chat</h4>
        </div>
        <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Active</span>
        </span>
      </div>

      {/* Pinned Teacher Notice */}
      {pinnedMsg && (
        <div className="my-2 p-2.5 rounded-xl bg-indigo-950/80 border border-indigo-700/60 text-xs flex items-start gap-2">
          <Pin className="w-3.5 h-3.5 text-amber-300 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="text-[10px] font-black text-amber-300 uppercase">Pinned Announcement</div>
            <p className="text-[11px] text-slate-200 mt-0.5">{pinnedMsg.text}</p>
          </div>
        </div>
      )}

      {/* Chat Messages List */}
      <div className="flex-1 overflow-y-auto space-y-3 py-2 text-xs">
        {messages.length === 0 ? (
          <div className="text-[11px] text-slate-500 text-center py-6">
            No messages yet — say hello to the class.
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-2xl space-y-1 ${
                msg.isInstructor
                  ? "bg-indigo-900/50 border border-indigo-600/40 ml-2"
                  : "bg-slate-800/80 border border-slate-700/50 mr-2"
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className={`font-extrabold flex items-center gap-1 ${msg.isInstructor ? "text-amber-300" : "text-slate-200"}`}>
                  {msg.sender}
                  {msg.isInstructor && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                </span>
                <span>{msg.time}</span>
              </div>
              <p className="text-slate-200 leading-relaxed">{msg.text}</p>
            </div>
          ))
        )}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="pt-2 border-t border-white/10 flex items-center gap-2">
        <input
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          placeholder="Ask faculty a question..."
          className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 font-medium"
        />
        <button
          type="submit"
          className="p-2.5 rounded-xl bg-[#5751E1] hover:bg-indigo-600 text-white transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          title="Send message"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
