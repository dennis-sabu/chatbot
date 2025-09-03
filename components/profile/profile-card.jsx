"use client"

import Image from "next/image"
import Link from "next/link"
import { getStoredProfile } from "@/components/profile/profile-storage"

export function ProfileCard() {
  const profile =
    typeof window !== "undefined" ? getStoredProfile() : { name: "You", avatarUrl: "/avatars/avatar-1.jpg" }

  return (
    <section className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <span className="relative block h-16 w-16 overflow-hidden rounded-full ring-2 ring-white/30">
          <Image
            src={profile.avatarUrl || "/placeholder.svg?height=64&width=64&query=avatar"}
            alt="Profile picture"
            fill
            sizes="64px"
            className="object-cover"
          />
        </span>
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-white text-pretty">{profile.name || "You"}</h2>
          <p className="text-sm text-white/70">Manage your details and avatar</p>
        </div>
        <div className="ml-auto">
          <Link
            href="/profile/edit"
            className="rounded-full bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            Edit profile
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProfileCard
