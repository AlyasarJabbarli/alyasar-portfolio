"use client";

import { useFormStatus } from "react-dom";
import { Send, Loader2 } from "lucide-react";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-4 w-full py-4 rounded-xl bg-[var(--color-electric-cyan)] text-[var(--color-obsidian)] font-bold flex items-center justify-center gap-2 hover:bg-[var(--color-snow)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      data-interactive="true"
    >
      {pending ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Transmitting...
        </>
      ) : (
        <>
          Send Message
          <Send className="w-4 h-4" />
        </>
      )}
    </button>
  );
}