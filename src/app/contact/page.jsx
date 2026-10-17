"use client";

import { useState } from "react";
import Link from "next/link";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

// Replace with your real support email
const CONTACT_EMAIL = "hamila520ashu@gmail.com";

const fieldBase =
  "w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-500 transition-colors focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 dark:border-white/10 dark:bg-[#0B1530] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:ring-blue-500/30";

const labelClass =
  "mb-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-200";

export default function ContactPage() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    setStatus("sending");
    setError("");

    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Something went wrong.");
      }

      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(
        err?.message ||
          "We couldn’t send your message. Please try again or email us directly."
      );
      setStatus("idle");
    }
  };

  return (
    <div
      className={`${body.className} min-h-screen bg-slate-50 px-4 py-12 text-slate-900 dark:bg-[#050B1A] dark:text-slate-100 sm:px-6 sm:py-20 lg:px-8`}
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="max-w-2xl">
          <h1
            className={`${display.className} text-balance text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-5xl`}
          >
            Contact us
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            Have a question about your account, a job posting or our plans?
            Send us a message and we’ll get back to you.
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-14">
          {/* Info */}
          <div className="space-y-8">
            <div>
              <h2
                className={`${display.className} text-lg font-bold text-slate-950 dark:text-white`}
              >
                Email
              </h2>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-1 inline-block rounded-md text-base font-medium text-blue-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400"
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <div>
              <h2
                className={`${display.className} text-lg font-bold text-slate-950 dark:text-white`}
              >
                Response time
              </h2>
              <p className="mt-1 text-base text-slate-600 dark:text-slate-400">
                We usually reply within one business day.
              </p>
            </div>

            <div>
              <h2
                className={`${display.className} text-lg font-bold text-slate-950 dark:text-white`}
              >
                Looking for quick answers?
              </h2>
              <p className="mt-1 text-base text-slate-600 dark:text-slate-400">
                Billing, cancellations and plan limits are covered on the{" "}
                <Link
                  href="/plans"
                  className="rounded-md font-semibold text-blue-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400"
                >
                  pricing page
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#0B1530] dark:shadow-none sm:p-8">
            {status === "sent" ? (
              <div role="status" className="py-8 text-center">
                <h2
                  className={`${display.className} text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white`}
                >
                  Message sent
                </h2>
                <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
                  Thanks for reaching out. We’ll reply to your email soon.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:border-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/20 dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="John Doe"
                    required
                    className={`${fieldBase} h-12`}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="john@example.com"
                    required
                    className={`${fieldBase} h-12`}
                  />
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    minLength={10}
                    placeholder="How can we help?"
                    required
                    className={`${fieldBase} resize-y py-3`}
                  />
                </div>

                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-70 dark:shadow-none dark:focus-visible:ring-offset-[#0B1530]"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}