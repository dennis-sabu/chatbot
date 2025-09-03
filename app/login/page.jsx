"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      // Demo auth: persist minimal user in localStorage
      const user = { email }
      if (typeof window !== "undefined") {
        localStorage.setItem("demo-auth-user", JSON.stringify(user))
      }
      // Navigate back home
      router.push("/")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-600">
      <div className="mx-auto w-full max-w-md px-4 py-10">
        <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
          <h1 className="mb-1 text-balance text-2xl font-semibold text-white">Log in</h1>
          <p className="mb-6 text-sm text-white/70">Welcome back. Enter your email and password to continue.</p>

          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm text-white/80">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/80 px-3 py-2 text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-400"
                placeholder="you@example.com"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm text-white/80">Password</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/80 px-3 py-2 text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-400"
                placeholder="••••••••"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-500 px-4 py-2.5 font-semibold text-white hover:bg-blue-600 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-white/70">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-white underline decoration-white/50 underline-offset-4 hover:decoration-white"
            >
              Sign up
            </Link>
          </p>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-white/70 underline decoration-white/40 underline-offset-4">
              Back to chat
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
