"use client";

import Image from "next/image";
import Link from "next/link";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { Briefcase, Magnifier, Persons, Star } from "@gravity-ui/icons";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

const stats = [
  { icon: Briefcase, value: "50K", label: "Active jobs" },
  { icon: Magnifier, value: "12K", label: "Companies hiring" },
  { icon: Persons, value: "2M", label: "Job seekers" },
  { icon: Star, value: "97%", label: "Satisfaction rate" },
];

export default function Banner() {
  return (
    <section
      className={`${body.className} relative overflow-hidden bg-white text-slate-900 dark:bg-[#050B1A] dark:text-slate-100`}
    >
      {/* Soft blue wash behind the globe side */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full bg-blue-500/15 blur-3xl dark:bg-blue-600/20"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div className="max-w-xl">
            <h1
              className={`${display.className} text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-950 dark:text-white sm:text-5xl xl:text-6xl`}
            >
              Assisting over 15,000 job seekers find their dream positions.
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
              Thousands of verified employers are hiring right now. Find the
              role that fits you and apply in minutes.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#050B1A]"
              >
                Browse jobs
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-7 py-3.5 text-base font-semibold text-slate-900 transition-colors hover:border-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/20 dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300 dark:focus-visible:ring-offset-[#050B1A]"
              >
                Post a job
              </Link>
            </div>
          </div>

          {/* Globe panel: always deep navy so the image reads in both modes */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-[#07122E] ring-1 ring-blue-500/30 lg:aspect-square">
            <Image
              src="/images/globe.png"
              alt="Globe showing jobs available worldwide"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-tr from-blue-700/30 via-transparent to-transparent"
            />
          </div>
        </div>

        {/* Stats */}
        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 sm:mt-20 lg:grid-cols-4 lg:gap-x-10">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="border-t-2 border-blue-600 pt-4 dark:border-blue-500"
            >
              <dt className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <Icon
                  className="h-4 w-4 text-blue-600 dark:text-blue-400"
                  aria-hidden="true"
                />
                {label}
              </dt>
              <dd
                className={`${display.className} mt-2 text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-5xl`}
              >
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}