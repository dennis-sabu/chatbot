"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import ChatApp from "@/components/chat/chat-app";
import { ProfileLink } from "@/components/profile/profile-link";
import Link from "next/link";

export default function Page() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-600 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-600">
      <div className="mx-auto w-full max-w-3xl px-4 py-6 md:py-10">
        {/* Header: Sign up / Sign out and profile */}
        <div className="mb-4 flex items-center justify-end">
          {/* Desktop */}
         <div className="mr-2 flex gap-2">
  {user ? (
    <>
      {/* Mobile only */}
      <span className="flex items-center text-sm text-white/70 mr-3 lg:hidden">
        Welcome, {user.displayName || user.email}!
      </span>

      {/* Desktop only */}
      <span className="hidden lg:flex items-center text-sm text-white/70 mr-3">
        Welcome, {user.displayName || user.email}!
      </span>

      <button
        onClick={handleSignOut}
        className="rounded-full bg-blue-400/90 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
      >
        Sign out
      </button>
    </>
  ) : (
    <>
      {/* Mobile only */}
      <Link
        href="/signup"
        className="rounded-full bg-blue-500/90 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 lg:hidden"
      >
        Sign up
      </Link>

      {/* Desktop only */}
      <Link
        href="/signup"
        className="hidden lg:inline-block rounded-full bg-blue-500/90 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
      >
        Sign up
      </Link>
    </>
  )}
</div>

          <ProfileLink />
        </div>

        {/* Chat App */}
        <ChatApp />
      </div>
    </main>
  );
}