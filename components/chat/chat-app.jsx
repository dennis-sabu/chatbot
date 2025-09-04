"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { toast } from "react-hot-toast";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

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
      content: "Hello! 👋 I am a ChatBot made by Dennis Sabu, You can ask me if you need any details!",
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
// Send message
const sendMessage = async (userMessage) => {
  const userMsg = {
    id: `m-${Date.now()}`,
    role: "user",
    content: userMessage,
  };
  setMessages((prev) => [...prev, userMsg]);

  try {
    // 🔑 Get Firebase ID token
    const token = user ? await user.getIdToken() : null;

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        message: userMessage,
        token // ✅ send token, not uid
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.reply || "Request failed");
    }

    const botMsg = {
      id: `b-${Date.now() + 1}`,
      role: "bot",
      content: cleanResponse(data.reply),
    };
    setMessages((prev) => [...prev, botMsg]);
  } catch (err) {
    console.error("Chat error:", err);

    const errorMsg = {
      id: `e-${Date.now()}`,
      role: "bot",
      content: err.message.includes("login") 
        ? " Please login to send a message." 
        : "Sorry, I'm having trouble responding right now. Please try again.",
    };
    setMessages((prev) => [...prev, errorMsg]);

    toast.error(err.message || "Error sending message");
  }
};

  if (loading) {
    return (
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="rounded-3xl border border-white/15 bg-white/10 p-4 md:p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-center min-h-[52vh]">
            <p className="text-white/70">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

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

      {/* ChatInput with sendMessage and user state */}
      <ChatInput 
        onSend={sendMessage} 
        disabled={!user} // Disable if not logged in
      />
      
      {!user && (
        <p className="text-center text-sm text-white/60">
          Please sign in to start chatting
        </p>
      )}
      <footer className="text-center text-xs text-white/50 mt-2">
        <p>ChatBot by Dennis Sabu</p>
      </footer>
    </div>
  );
}