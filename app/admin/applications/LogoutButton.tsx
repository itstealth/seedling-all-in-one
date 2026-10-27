"use client";

/**
 * Signs out via fetch rather than a native form post — posting a form straight
 * at the API route would navigate the staff member to raw JSON.
 */
export default function LogoutButton() {
  async function signOut() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      window.location.href = "/admin/login";
    }
  }
  return (
    <button
      type="button"
      onClick={signOut}
      className="rounded-lg border border-indigo-900/20 px-4 py-2 text-sm font-semibold text-indigo-900 transition-colors hover:bg-white"
    >
      Sign out
    </button>
  );
}
