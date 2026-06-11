"use client";

import { Send } from "lucide-react";
import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("success");
      setMessage("Message sent successfully. We will get back to you soon.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage(
        "Something went wrong. Please try again or contact us directly.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
      <label className="space-y-2 text-sm font-normal text-[#1a3a52] ">
        Your Name
        <input
          name="name"
          type="text"
          required
          placeholder="Enter your full name"
          className="h-12 w-full rounded-[8px] border border-[#e2e8f0] bg-[#f8f9fb] px-4 text-sm outline-none transition-colors focus:border-[#dc2626]"
        />
      </label>
      <label className="space-y-2 text-sm font-normal text-[#1a3a52]">
        Phone Number
        <input
          name="phone"
          type="tel"
          required
          placeholder="Enter your phone number"
          className="h-12 w-full rounded-[8px] border border-[#e2e8f0] bg-[#f8f9fb] px-4 text-sm outline-none transition-colors focus:border-[#dc2626]"
        />
      </label>
      <label className="space-y-2 text-sm font-normal text-[#1a3a52]">
        Email Address
        <input
          name="email"
          type="email"
          required
          placeholder="Enter your email"
          className="h-12 w-full rounded-[8px] border border-[#e2e8f0] bg-[#f8f9fb] px-4 text-sm outline-none transition-colors focus:border-[#dc2626]"
        />
      </label>
      <label className="space-y-2 text-sm font-normal text-[#1a3a52]">
        Product / Subject
        <input
          name="subject"
          type="text"
          required
          placeholder="MCB, circuit breaker, bulk order..."
          className="h-12 w-full rounded-[8px] border border-[#e2e8f0] bg-[#f8f9fb] px-4 text-sm outline-none transition-colors focus:border-[#dc2626]"
        />
      </label>
      <label className="space-y-2 text-sm font-normal text-[#1a3a52] md:col-span-2">
        Message
        <textarea
          name="message"
          required
          placeholder="Share quantity, model, rating, or project details..."
          rows={6}
          className="w-full resize-none rounded-[8px] border border-[#e2e8f0] bg-[#f8f9fb] px-4 py-3 text-sm outline-none transition-colors focus:border-[#dc2626]"
        />
      </label>

      {message && (
        <p
          className={`md:col-span-2 text-sm ${
            status === "success"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#dc2626] px-7 text-sm font-normal text-white transition-colors hover:bg-[#b91c1c] disabled:opacity-60 md:col-span-2 md:w-fit"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
        <Send className="size-4" />
      </button>
    </form>
  );
}
