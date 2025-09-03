import Link from "next/link"
import { ProfileCard } from "@/components/profile/profile-card"

export default function ProfilePage() {
  return (
    <main className="min-h-dvh bg-gradient-to-b from-slate-900 to-blue-700 text-foreground">
      <section className="mx-auto w-full max-w-xl px-4 py-8">
        {/* Heading */}
        <nav className="mb-4 sticky top-0 z-10 -mx-4 px-4 py-3 bg-slate-900/50 backdrop-blur rounded-b-xl">
          <Link
            href="/"
            aria-label="Back"
            title="Go back"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            {/* left arrow icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M11.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L7.414 9H17a1 1 0 110 2H7.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only sm:not-sr-only">Back</span>
          </Link>
        </nav>

        <header className="mb-6">
          <h1 className="text-balance text-2xl font-semibold text-white">Your Profile</h1>
          <p className="text-sm text-white/70">Manage your picture and basic details.</p>
        </header>

        <ProfileCard />

        <div className="mt-6">
          <Link
            href="/profile/edit"
            className="inline-flex items-center justify-center rounded-full bg-blue-500 px-5 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Edit Profile
          </Link>
        </div>
      </section>
    </main>
  )
}
