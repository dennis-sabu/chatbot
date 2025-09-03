"use client"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { getStoredProfile } from "@/components/profile/profile-storage"

export function ProfileLink() {
  const [avatar, setAvatar] = useState("/avatars/avatar-1.jpg")
  const pathname = usePathname()

  useEffect(() => {
    const refresh = () => {
      const p = getStoredProfile()
      setAvatar(p?.avatarUrl || "/avatars/avatar-1.jpg")
    }
    refresh()

    window.addEventListener("focus", refresh)
    return () => window.removeEventListener("focus", refresh)
  }, [pathname])

  return null
}
