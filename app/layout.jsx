import { Toaster } from "react-hot-toast";

import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata = {
  title: "CHAT BOT",
  description: "LETS CHAT GUYYYYYS",
  
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased font-sans`}>
      <body>{children}

         <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
