"use client";

import React, { useState, useRef } from "react";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Code,
  Eye,
  Edit3,
  Sparkles,
  Check
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  label?: string;
  minHeight?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your formatted content here...",
  rows = 6,
  label,
  minHeight = "160px"
}: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertFormat = (before: string, after: string = "", defaultText: string = "text") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end) || defaultText;

    const replacement = `${before}${selected}${after}`;
    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 50);
  };

  const insertBullet = (prefix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end);

    let replacement = "";
    if (selected) {
      replacement = selected
        .split("\n")
        .map((line) => (line.startsWith(prefix) ? line : `${prefix}${line}`))
        .join("\n");
    } else {
      replacement = `${prefix}List item`;
    }

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
    }, 50);
  };

  // Simple Markdown to HTML converter for live preview
  const renderPreview = (markdown: string) => {
    if (!markdown.trim()) {
      return '<p class="text-slate-400 italic">No content to preview</p>';
    }

    let html = markdown
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-base font-extrabold text-slate-900 mt-4 mb-2">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-lg font-black text-[#050071] mt-5 mb-2.5">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-xl font-black text-slate-900 mt-6 mb-3">$1</h1>');

    // Bold & Italic
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-slate-900">$1</strong>');
    html = html.replace(/\*(.*?)\*/gim, '<em class="italic text-slate-700">$1</em>');

    // Quotes
    html = html.replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-indigo-500 bg-indigo-50/60 pl-3 py-1.5 rounded-r-lg my-2 text-indigo-900 font-medium italic">$1</blockquote>');

    // Code
    html = html.replace(/`(.*?)`/gim, '<code class="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded-md font-mono text-xs">$1</code>');

    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener" class="text-indigo-600 font-bold underline hover:text-indigo-800">$1</a>');

    // Lists
    html = html.replace(/^- (.*$)/gim, '<li class="ml-4 list-disc text-slate-700 font-medium my-0.5">$1</li>');
    html = html.replace(/^[0-9]+\. (.*$)/gim, '<li class="ml-4 list-decimal text-slate-700 font-medium my-0.5">$1</li>');

    // Paragraphs / Linebreaks
    html = html.replace(/\n\n/gim, '<div class="h-3"></div>');
    html = html.replace(/\n/gim, '<br/>');

    return html;
  };

  return (
    <div className="space-y-1.5 text-xs">
      {label && <label className="block font-bold text-slate-700">{label}</label>}

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
        {/* Toolbar Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-100 bg-slate-50/80 px-3 py-2 gap-2">
          {/* Action Buttons */}
          <div className="flex items-center flex-wrap gap-1">
            <button
              type="button"
              onClick={() => insertFormat("**", "**", "Bold text")}
              className="p-1.5 rounded-lg hover:bg-white text-slate-700 hover:text-indigo-600 hover:shadow-xs transition-all cursor-pointer"
              title="Bold (**text**)"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormat("*", "*", "Italic text")}
              className="p-1.5 rounded-lg hover:bg-white text-slate-700 hover:text-indigo-600 hover:shadow-xs transition-all cursor-pointer"
              title="Italic (*text*)"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <span className="w-[1px] h-4 bg-slate-200 mx-0.5" />

            <button
              type="button"
              onClick={() => insertFormat("# ", "", "Main Heading")}
              className="p-1.5 rounded-lg hover:bg-white text-slate-700 hover:text-indigo-600 hover:shadow-xs transition-all cursor-pointer"
              title="Heading 1"
            >
              <Heading1 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormat("## ", "", "Subheading")}
              className="p-1.5 rounded-lg hover:bg-white text-slate-700 hover:text-indigo-600 hover:shadow-xs transition-all cursor-pointer"
              title="Heading 2"
            >
              <Heading2 className="w-3.5 h-3.5" />
            </button>
            <span className="w-[1px] h-4 bg-slate-200 mx-0.5" />

            <button
              type="button"
              onClick={() => insertBullet("- ")}
              className="p-1.5 rounded-lg hover:bg-white text-slate-700 hover:text-indigo-600 hover:shadow-xs transition-all cursor-pointer"
              title="Bullet List (- item)"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertBullet("1. ")}
              className="p-1.5 rounded-lg hover:bg-white text-slate-700 hover:text-indigo-600 hover:shadow-xs transition-all cursor-pointer"
              title="Numbered List (1. item)"
            >
              <ListOrdered className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormat("> ", "", "Important highlight or quote")}
              className="p-1.5 rounded-lg hover:bg-white text-slate-700 hover:text-indigo-600 hover:shadow-xs transition-all cursor-pointer"
              title="Highlight Quote (> text)"
            >
              <Quote className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormat("[", "](https://fukeyeducation.com)", "Link Title")}
              className="p-1.5 rounded-lg hover:bg-white text-slate-700 hover:text-indigo-600 hover:shadow-xs transition-all cursor-pointer"
              title="Insert Link [title](url)"
            >
              <LinkIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormat("`", "`", "formula / code")}
              className="p-1.5 rounded-lg hover:bg-white text-slate-700 hover:text-indigo-600 hover:shadow-xs transition-all cursor-pointer"
              title="Inline Formula/Code"
            >
              <Code className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-200/80 p-0.5 rounded-xl text-[11px] font-bold">
            <button
              type="button"
              onClick={() => setActiveTab("write")}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                activeTab === "write" ? "bg-white text-indigo-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Edit3 className="w-3 h-3" />
              <span>Write</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                activeTab === "preview" ? "bg-white text-indigo-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>Preview</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === "write" ? (
          <textarea
            ref={textareaRef}
            rows={rows}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            style={{ minHeight }}
            className="w-full p-3.5 text-xs text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none font-medium resize-y leading-relaxed font-sans"
          />
        ) : (
          <div
            style={{ minHeight }}
            className="w-full p-4 text-xs text-slate-800 bg-slate-50/40 overflow-y-auto leading-relaxed"
            dangerouslySetInnerHTML={{ __html: renderPreview(value) }}
          />
        )}
      </div>
    </div>
  );
}
