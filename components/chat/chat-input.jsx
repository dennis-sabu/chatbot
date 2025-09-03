"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function ChatInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSend} className="w-full">
      <label htmlFor="message" className="sr-only">
        Enter your message
      </label>
      <div className="relative flex items-center">
        <input
          id="message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your message here…"
          className="w-full rounded-full bg-white/80 px-5 py-4 pr-14 text-slate-900 placeholder:text-slate-500 shadow-md outline-none ring-0 focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          aria-label="Send message"
          className="absolute inset-y-1.5 right-1.5 flex aspect-square items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-colors hover:bg-blue-700 active:bg-blue-800"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
