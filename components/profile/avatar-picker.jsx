"use client"

import Image from "next/image"

const PRESET_AVATARS = [
  "/avatars/avatar-1.jpg",
  "/avatars/avatar-2.jpg",
  "/avatars/avatar-3.jpg",
  "/avatars/avatar-4.jpg",
  "/avatars/avatar-5.jpg",
  "/avatars/avatar-6.jpg",
  "/avatars/avatar-7.jpg",
  "/avatars/avatar-8.jpg",
]

export function AvatarPicker(props) {
  // Support both APIs: selected/onSelect and value/onChange
  const { selected, onSelect, value, onChange } = props || {}
  const current = selected ?? value
  const emit = (url) => {
    if (typeof onSelect === "function") return onSelect(url)
    if (typeof onChange === "function") return onChange(url)
  }

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => emit(typeof reader.result === "string" ? reader.result : "")
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="relative block h-16 w-16 overflow-hidden rounded-full ring-2 ring-white/30">
          <Image
            src={current || "/placeholder.svg?height=64&width=64&query=selected%20avatar"}
            alt="Selected avatar"
            fill
            sizes="64px"
            className="object-cover"
          />
        </span>

        <label className="cursor-pointer rounded-full bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/40">
          Upload photo
          <input type="file" accept="image/*" className="sr-only" onChange={handleFile} />
        </label>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {PRESET_AVATARS.map((src) => {
          const active = src === current
          return (
            <button
              key={src}
              type="button"
              onClick={() => emit(src)}
              className={`relative aspect-square overflow-hidden rounded-full ring-2 transition ${
                active ? "ring-blue-400" : "ring-white/20 hover:ring-white/40"
              }`}
              aria-pressed={active}
              aria-label="Choose avatar"
            >
              <Image
                src={src || "/placeholder.svg?height=64&width=64&query=avatar%20option"}
                alt="Avatar option"
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default AvatarPicker
