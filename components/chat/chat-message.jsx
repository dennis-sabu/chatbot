"use client";

import { memo, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

function TypingDots() {
  return (
    <div className="w-64 md:w-80 rounded-3xl px-4 py-3 shadow-md bg-white/85 text-slate-900 break-words whitespace-pre-wrap">
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-slate-500/70"
            initial={{ y: 0, opacity: 0.6 }}
            animate={{ y: [0, -4, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}

export function ChatMessage({ role, content }) {
  const isUser = role === "user";
  const [displayed, setDisplayed] = useState(isUser ? content : "");
  const [isTyping, setIsTyping] = useState(!isUser);
  const itemRef = useRef(null);

  useEffect(() => {
    itemRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [displayed, isTyping]);

  useEffect(() => {
  if (isUser) return;

  setDisplayed("");
  setIsTyping(true);

  const typingTimer = setTimeout(() => {
    const chars = Array.from(content || "");
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayed((prev) => prev + (chars[i] || ""));
      i++;
      if (i >= chars.length) {
        clearInterval(intervalId);
        setIsTyping(false); // ✅ only stop typing after last char
      }
    }, 20);
  }, 700);

  return () => clearTimeout(typingTimer);
}, [content, isUser]);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div ref={itemRef} className={`flex items-end gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        {isUser ? (
          <div className="w-80 md:w-80 rounded-3xl px-4 py-3 shadow-md bg-blue-100/80 text-slate-900 break-words whitespace-pre-wrap">
            <p className="text-sm leading-6">{content}</p>
          </div>
        ) : isTyping ? (
          <TypingDots />
        ) : (
          <div className="max-w-[90%] rounded-3xl px-4 py-5 shadow-md bg-white/85 text-slate-900 break-words whitespace-pre-wrap">
  <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
    { displayed}
  </p>
</div>


        )}
      </div>
    </motion.div>
  );
}

export default memo(ChatMessage);
