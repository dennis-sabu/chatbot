"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { toast } from "react-hot-toast";

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add welcome bot message
  useEffect(() => {
    const botMsg = {
      id: `b-${Date.now()}`,
      role: "bot",
      content: "Hello! 👋I am a ChatBot made by Dennis Sabu, You can askkk me if you need Any Fucking Details  ",
    };
    setMessages([botMsg]);
  }, []);

  // Clean the AI response (remove unwanted tokens)
  const cleanResponse = (text) => {
    if (!text) return "";
    return text
      .replace(/\|start\|.*?\|message\|>/g, "") // remove system markers
      .trim();
  };

  // Send message
  const sendMessage = async (userMessage) => {
    const userMsg = {
      id: `m-${Date.now()}`,
      role: "user",
      content: userMessage,
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();

      const botMsg = {
        id: `b-${Date.now() + 1}`,
        role: "bot",
        content: cleanResponse(data.reply), // ✅ cleaned text
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      toast.error("Error sending message");
    }
  };

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <section
        aria-label="Chat window"
        className="rounded-3xl border border-white/15 bg-white/10 p-4 md:p-6 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex max-h-[62vh] min-h-[52vh] flex-col overflow-y-auto pr-1">
          <div className="flex w-full flex-col gap-2 sm:gap-3 md:gap-5 px-2 sm:px-3 md:px-0 max-w-full overflow-x-hidden mx-auto">
            <AnimatePresence>
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  role={msg.role}
                  content={msg.content}
                />
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </div>
      </section>

      {/* ChatInput with sendMessage */}
      <ChatInput onSend={sendMessage} />
    </div>
  );
}
