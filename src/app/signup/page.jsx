"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

const fieldBase =
  "w-full h-12 rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-500 transition-colors focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 dark:border-white/10 dark:bg-[#0B1530] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:ring-blue-500/30";

const labelClass =
  "mb-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-200";

const roles = [
  {
    value: "seeker",
    title: "Job seeker",
    description: "Includes 200 messages per month",
  },
  {
    value: "recruiter",
    title: "Recruiter",
    description: "Includes 100 messages per month",
  },
];

function SignupContent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const videoRef = useRef(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Force muted autoplay: React doesn't always set `muted` on the DOM element
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, []);

  // Only allow internal paths, so the redirect can't send people to another site
  const rawRedirect = searchParams.get("redirect");
  const redirectTo =
    rawRedirect && rawRedirect.startsWith("/") && !rawRedirect.startsWith("//")
      ? rawRedirect
      : "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const photoURL = formData.get("photoURL");
    const role = formData.get("role");

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        role,
        // Only send an image when the user entered one
        ...(photoURL ? { image: photoURL } : {}),
      });

      if (error) {
        setError(error.message || "Something went wrong. Please try again.");
      } else if (data) {
        toast.success("Account created successfully!");
        router.push(redirectTo);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className={`${body.className} grid min-h-screen bg-white text-slate-900 dark:bg-[#050B1A] dark:text-slate-100 lg:grid-cols-2`}
    >
      {/* Left: video panel (desktop only) */}
      <div className="relative hidden overflow-hidden bg-[#050B1A] lg:block">
        <video
  ref={videoRef}
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  aria-hidden="true"
  className="absolute inset-0 h-full w-full object-cover"
  onLoadedData={() => console.log("VIDEO: loaded")}
  onPlaying={() => console.log("VIDEO: playing")}
  onError={(e) =>
    console.log("VIDEO ERROR:", e.currentTarget.error?.code, e.currentTarget.error?.message)
  }
  src="/video/bg-video.mp4"
/>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#050B1A]/80 via-blue-950/50 to-[#050B1A]/90"
        />

        <div className="relative z-10 flex h-full flex-col justify-between p-12 xl:p-16">
          <Link
            href="/"
            className={`${display.className} w-fit rounded-md text-2xl font-extrabold tracking-tight text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white`}
          >
            HireLoop
          </Link>

          <div className="max-w-md">
            <p
              className={`${display.className} text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-white xl:text-5xl`}
            >
              Build a profile in three minutes.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-200 xl:text-lg">
              The matches start arriving tomorrow morning.
            </p>
          </div>
        </div>
      </div>

      {/* Right: sign-up form */}
      <div className="flex flex-col justify-center px-4 py-10 sm:px-8 lg:px-12 xl:px-20">
        <div className="mx-auto w-full max-w-sm">
          {/* Brand shown on mobile, where the video panel is hidden */}
          <Link
            href="/"
            className={`${display.className} mb-10 inline-block rounded-md text-2xl font-extrabold tracking-tight text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400 lg:hidden`}
          >
            HireLoop
          </Link>

          <h1
            className={`${display.className} text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl`}
          >
            Create your account
          </h1>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
            Join HireLoop today.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                className={fieldBase}
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
                className={fieldBase}
              />
            </div>

            <div>
              <label htmlFor="password" className={labelClass}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a password"
                  minLength={8}
                  required
                  aria-describedby="password-hint"
                  className={`${fieldBase} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-400 dark:hover:text-white"
                >
                  {showPassword ? (
                    <EyeSlash width={18} height={18} aria-hidden="true" />
                  ) : (
                    <Eye width={18} height={18} aria-hidden="true" />
                  )}
                </button>
              </div>
              <p
                id="password-hint"
                className="mt-1.5 text-xs text-slate-600 dark:text-slate-400"
              >
                Use at least 8 characters.
              </p>
            </div>

            <div>
              <label htmlFor="photoURL" className={labelClass}>
                Photo URL{" "}
                <span className="font-normal text-slate-500 dark:text-slate-400">
                  (optional)
                </span>
              </label>
              <input
                id="photoURL"
                name="photoURL"
                type="url"
                autoComplete="photo"
                placeholder="https://example.com/photo.jpg"
                className={fieldBase}
              />
            </div>

            {/* Role */}
            <fieldset>
              <legend className={labelClass}>I am a</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {roles.map((role) => (
                  <label key={role.value} className="relative block cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      defaultChecked={role.value === "seeker"}
                      className="peer sr-only"
                    />
                    <span className="block h-full rounded-xl border border-slate-300 bg-white p-4 transition-colors peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 dark:border-white/10 dark:bg-[#0B1530] dark:peer-checked:border-blue-500 dark:peer-checked:bg-blue-500/10">
                      <span
                        className={`${display.className} block text-base font-bold text-slate-950 dark:text-white`}
                      >
                        {role.title}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                        {role.description}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

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
              disabled={loading}
              className="h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-70 dark:shadow-none dark:focus-visible:ring-offset-[#050B1A]"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              href={`/signin?redirect=${encodeURIComponent(redirectTo)}`}
              className="rounded-md font-semibold text-blue-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div
          className={`${body.className} flex min-h-screen items-center justify-center bg-white text-slate-600 dark:bg-[#050B1A] dark:text-slate-400`}
        >
          Loading…
        </div>
      }
    >
      <SignupContent />
    </Suspense>
  );
}