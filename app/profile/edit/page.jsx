"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { AvatarPicker } from "@/components/profile/avatar-picker"
import { getStoredProfile, saveStoredProfile } from "@/components/profile/profile-storage"

export default function EditProfilePage() {
  const [profile, setProfile] = useState({ name: "User", avatarUrl: "/avatars/avatar-1.jpg" })
  const [filePreview, setFilePreview] = useState(null)

  useEffect(() => {
    const stored = getStoredProfile()
    if (stored) setProfile(stored)
  }, [])

  // Revoke object URL when unmounting or changing
  useEffect(() => {
    return () => {
      if (filePreview?.startsWith("blob:")) URL.revokeObjectURL(filePreview)
    }
  }, [filePreview])

  const previewSrc = useMemo(() => filePreview ?? profile.avatarUrl, [filePreview, profile.avatarUrl])

  function onPick(url) {
    setFilePreview(null)
    setProfile((p) => ({ ...p, avatarUrl: url }))
  }

  function onFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setFilePreview(url)
  }

  function handleSave() {
    // If user uploaded, keep blob URL for session; for persistence across reloads, convert to DataURL
    if (filePreview && filePreview.startsWith("blob:")) {
      fetch(filePreview)
        .then((res) => res.blob())
        .then((blob) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            const dataUrl = typeof reader.result === "string" ? reader.result : ""
            const toSave = { ...profile, avatarUrl: dataUrl || profile.avatarUrl }
            saveStoredProfile(toSave)
            setProfile(toSave)
            if (typeof window !== "undefined") window.history.back()
          }
          reader.readAsDataURL(blob)
        })
        .catch(() => {
          // Fallback: just save current profile
          saveStoredProfile(profile)
          if (typeof window !== "undefined") window.history.back()
        })
    } else {
      saveStoredProfile(profile)
      if (typeof window !== "undefined") window.history.back()
    }
  }

  return (
    <main className="min-h-dvh bg-gradient-to-b from-slate-900 to-blue-700 text-foreground">
      <section className="mx-auto w-full max-w-xl px-4 py-8">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-balance text-2xl font-semibold text-white">Edit Profile</h1>
          <Link href="/profile" className="text-sm text-white/80 underline-offset-4 hover:underline">
            Cancel
          </Link>
        </header>

        <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-white/30">
              <Image
                alt="Current profile picture"
                src={previewSrc || "/placeholder.svg?height=80&width=80&query=current%20profile%20picture"}
                fill
                sizes="80px"
                className="object-cover"
                crossOrigin="anonymous"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="name" className="block text-xs font-medium text-white/80">
                Display name
              </label>
              <input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                placeholder="Your name"
                className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="mt-4">
                <label className="block text-xs font-medium text-white/80">Upload a new picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  className="mt-2 block w-full text-white/80 file:mr-4 file:rounded-full file:border-0 file:bg-blue-500 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-600"
                  aria-label="Upload profile image"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-3 text-xs font-medium text-white/80">Or choose from avatars</p>
            <AvatarPicker selected={previewSrc} onSelect={onPick} />
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <Link
              href="/profile"
              className="rounded-full px-4 py-2 text-sm text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              Cancel
            </Link>
            <button
              onClick={handleSave}
              className="rounded-full bg-blue-500 px-5 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Save Changes
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
