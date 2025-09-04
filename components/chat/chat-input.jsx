"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function ChatInput({ onSend, disabled }) {
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (disabled || !input.trim()) return; // 🚫 Block if not logged in
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
          placeholder={disabled ? "🔒 Sign in to send a message" : "Enter your message here…"}
          disabled={disabled} // 🚫 Disable typing if not logged in
          className="w-full rounded-full bg-white/80 px-5 py-4 pr-14 text-slate-900 
                     placeholder:text-slate-500 shadow-md outline-none ring-0 
                     focus:ring-2 focus:ring-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          aria-label="Send message"
          disabled={disabled} // 🚫 Disable send button too
          className="absolute inset-y-1.5 right-1.5 flex aspect-square items-center 
                     justify-center rounded-full bg-blue-600 text-white shadow-lg 
                     transition-colors hover:bg-blue-700 active:bg-blue-800
                     disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
