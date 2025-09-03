import ChatApp from "@/components/chat/chat-app"
import { ProfileLink } from "@/components/profile/profile-link"
import Link from "next/link"

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-600">
      <div className="mx-auto w-full max-w-3xl px-4 py-6 md:py-10">
        <div className="mb-4 flex items-center justify-end">
          <div className="mr-2 hidden gap-2 md:flex">
            {/* (was: <Link href="/login" ...>Log in</Link>) */}
            <Link
              href="/signup"
              className="rounded-full bg-blue-500/90 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Sign up
            </Link>
          </div>
          {/* Mobile: stacked into a menu row */}
          <div className="mr-2 flex gap-2 md:hidden">
            
            <Link href="/signup" className="rounded-full bg-blue-500/90 px-3 py-1.5 text-xs font-semibold text-white">
              Sign up
            </Link>
          </div>
          <ProfileLink />
        </div>
        {/* rest of code here */}
        <ChatApp />
      </div>
    </main>
  )
}
