"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

export default function Advertisement() {
  const videoRef = useRef(null);

  // React doesn't always set `muted` on the DOM element, and browsers block
  // autoplay for unmuted video. Force it, then start playback.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked; the navy background stays visible
      });
    }
  }, []);

  return (
    <section
      className={`${body.className} relative isolate flex min-h-[34rem] w-full items-center justify-center overflow-hidden bg-[#050B1A] px-4 py-20 sm:px-6 md:h-[85svh]`}
    >
      {/* Background video (hidden for reduced-motion users, who see the navy fallback) */}
     <video
  ref={videoRef}
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  aria-hidden="true"
  className="absolute inset-0 h-full w-full object-cover -z-10"
  onLoadedData={() => console.log("VIDEO: loaded")}
  onPlaying={() => console.log("VIDEO: playing")}
  onError={(e) =>
    console.log("VIDEO ERROR:", e.currentTarget.error?.code, e.currentTarget.error?.message)
  }
  src="/video/bg-video.mp4"
/>

      {/* Navy-blue overlay keeps the text readable in light and dark mode */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#050B1A]/80 via-blue-950/65 to-[#050B1A]/85"
      />

      {/* Content */}
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h1
          className={`${display.className} text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl`}
        >
          Your next role is already looking for you.
        </h1>

        <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-slate-200 sm:text-lg">
          Build a profile in three minutes. The matches start arriving
          tomorrow morning.
        </p>

        <div className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <Link
            href="/signup"
            className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/30 transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050B1A] sm:w-auto"
          >
            Get started
          </Link>
          <Link
            href="/plans"
            className="inline-flex w-full items-center justify-center rounded-xl border border-white/30 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050B1A] sm:w-auto"
          >
            View pricing
          </Link>
        </div>

        <p className="mt-8 text-sm text-slate-300">
          Join 2M job seekers already on the platform.
        </p>
      </div>
    </section>
  );
}