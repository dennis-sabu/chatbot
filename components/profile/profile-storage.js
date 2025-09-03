// Key used in localStorage
const STORAGE_KEY = "chat-ui.profile"

// Safe JSON parse
function safeParse(json, fallback) {
  try {
    return JSON.parse(json)
  } catch {
    return fallback
  }
}

// Returns { name, avatarUrl } or sensible defaults
export function getProfile() {
  if (typeof window === "undefined") {
    return { name: "You", avatarUrl: "/avatars/avatar-1.jpg" }
  }
  const raw = window.localStorage.getItem(STORAGE_KEY)
  const parsed = safeParse(raw, null)
  if (!parsed || typeof parsed !== "object") {
    return { name: "You", avatarUrl: "/avatars/avatar-1.jpg" }
  }
  return {
    name: typeof parsed.name === "string" && parsed.name.trim() ? parsed.name : "You",
    avatarUrl:
      typeof parsed.avatarUrl === "string" && parsed.avatarUrl.trim() ? parsed.avatarUrl : "/avatars/avatar-1.jpg",
  }
}

// Save a partial profile shape
export function saveProfile(next) {
  if (typeof window === "undefined") return
  const current = getProfile()
  const merged = { ...current, ...(next || {}) }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
  return merged
}

export { getProfile as getStoredProfile, saveProfile as saveStoredProfile }
