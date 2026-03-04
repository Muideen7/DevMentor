"use client"

import { Toaster as Sonner } from "sonner"

export const Toaster = () => {
  return (
    <Sonner
      position="bottom-left"
      toastOptions={{
        style: {
          background: "white",
          color: "#1A1A1A",
          border: "1px solid #E0E0E0",
          borderRadius: "12px",
          fontFamily: "var(--font-space-grotesk)",
        },
        className: "font-display",
      }}
    />
  )
}
