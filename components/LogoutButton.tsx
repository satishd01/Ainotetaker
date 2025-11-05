"use client"

import { Button } from "@/components/ui/button"

export default function LogoutButton() {
  return (
    <Button
      variant="secondary"
      className="bg-indigo-600 hover:bg-indigo-700 text-white transition-all"
      onClick={() => (window.location.href = "/api/auth/signout")}
    >
      Logout
    </Button>
  )
}
