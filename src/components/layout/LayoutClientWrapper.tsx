"use client";

import React, { useState } from "react";
import FloatingActions from "@/components/layout/FloatingActions";
import FukeyAiChatbot from "@/components/chat/FukeyAiChatbot";

export default function LayoutClientWrapper() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <FloatingActions onOpenChat={() => setIsChatOpen(true)} />
      <FukeyAiChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
