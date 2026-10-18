"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { ArrowLeft, ArrowRotateLeft } from "@gravity-ui/icons";
import Image from "next/image";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

export default function NotFound() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay fallback silently handled
      });
    }
  }, []);

  return (
    <section
      className={`${body.className} relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050B1A] px-4 py-12 text-center text-white`}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        src="/video/bg-video.mp4"
      />

      {/* Dark Navy Overlay Gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#050B1A]/85 via-blue-950/70 to-[#050B1A]/95"
      />

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-2xl">
        {/* Brand Header */}
        <Link
          href="/"
          className={`${display.className} inline-block text-3xl font-extrabold tracking-tight text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
        >
         <Image src={"/images/logo.png"}  height={100} width={100} alt="logo"/>
        </Link>
        <br />

        {/* Eye-catching 404 Badge */}
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-400 backdrop-blur-md">
          <span>Error 404</span>
          <span className="h-1 w-1 rounded-full bg-blue-400" />
          <span>Page Not Found</span>
        </div>

        {/* Hero Heading */}
        <h1
          className={`${display.className} mt-6 text-balance text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl`}
        >
          Looks like you&apos;ve looped out of bounds.
        </h1>

        {/* Strong Copy Content */}
        <p className="mt-6 text-balance text-base leading-relaxed text-slate-300 sm:text-lg">
          The page or job listing you are looking for might have been moved, removed, or never existed in the first place. Let&apos;s get you back on track to your career destination.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-4">
          {/* Primary Home Button */}
          <Link
            href="/"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050B1A] sm:w-auto"
          >
            <ArrowLeft width={18} height={18} aria-hidden="true" />
            Back to Homepage
          </Link>

          {/* Secondary Action */}
          <button
            onClick={() => window.history.back()}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 sm:w-auto"
          >
            <ArrowRotateLeft width={18} height={18} aria-hidden="true" />
            Previous Page
          </button>
        </div>
      </div>

      {/* Footer copyright snippet */}
      <footer className="absolute bottom-6 left-0 right-0 z-10 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} HireLoop. All rights reserved.
      </footer>
    </section>
  );
}