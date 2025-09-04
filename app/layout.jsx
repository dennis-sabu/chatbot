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

          <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: '#4aed88',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
