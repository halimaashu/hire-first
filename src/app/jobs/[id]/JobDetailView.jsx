"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  CheckDouble,
  Clock,
  ListCheck,
  MapPin,
  PaperPlane,
  ArrowLeft,
  TagDollar,
  Star,
} from "@gravity-ui/icons";
import Link from "next/link";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

const CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  BDT: "৳",
  INR: "₹",
};

const EXPERIENCE_LABELS = {
  entry: "Entry level",
  mid: "Mid level",
  senior: "Senior level",
  lead: "Lead / Principal",
  executive: "Executive",
};

const JOB_TYPE_LABELS = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  freelance: "Freelance",
  internship: "Internship",
};

// Shows 180000 as "180k" and 1500 as "1.5k"; falls back to the raw value
function formatSalary(value) {
  const n = Number(value);
  if (!n || Number.isNaN(n)) return value;
  if (n >= 1000) return `${Number((n / 1000).toFixed(1))}k`;
  return String(n);
}

function formatDeadline(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// Splits a "- bullet\n- bullet" style block into list items.
function parseBullets(text) {
  if (!text) return [];
  return text
    .split("\n")
    .map((line) => line.replace(/^[-•]\s*/, "").trim())
    .filter(Boolean);
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const panel =
  "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0B1530] dark:shadow-none sm:p-7";

const pill =
  "inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300";
const pillIcon = "h-3.5 w-3.5 text-blue-600 dark:text-blue-400";

function DetailSection({ icon: Icon, title, items, tone = "blue" }) {
  if (items.length === 0) return null;

  const iconTone =
    tone === "green"
      ? "bg-emerald-600/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
      : "bg-blue-600/10 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400";
  const dotTone =
    tone === "green"
      ? "bg-emerald-600 dark:bg-emerald-500"
      : "bg-blue-600 dark:bg-blue-500";

  return (
    <motion.section variants={item} className={panel}>
      <div className="mb-4 flex items-center gap-3">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconTone}`}
        >
          <Icon width={18} height={18} aria-hidden="true" />
        </span>
        <h2
          className={`${display.className} text-lg font-bold text-slate-950 dark:text-white`}
        >
          {title}
        </h2>
      </div>
      <ul className="space-y-3">
        {items.map((line, i) => (
          <li
            key={`${i}-${line}`}
            className="flex items-start gap-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base"
          >
            <span
              className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${dotTone}`}
            />
            {line}
          </li>
        ))}
      </ul>
    </motion.section>
  );
}

export default function JobDetailView({ job, id }) {
  const reduceMotion = useReducedMotion();

  const {
    jobTitle,
    minSalary,
    maxSalary,
    currency = "USD",
    deadline,
    responsibilities,
    requirements,
    benefits,
    jobType,
    experienceLevel,
    isRemote,
    companyName,
    companyLogo,
    jobCity,
    jobCountry,
  } = job;

  const symbol = CURRENCY_SYMBOLS[currency] ?? currency;
  const salaryRange =
    minSalary && maxSalary
      ? `${symbol}${formatSalary(minSalary)} – ${symbol}${formatSalary(maxSalary)}`
      : null;

  const place = jobCity
    ? `${jobCity}${jobCountry ? `, ${jobCountry}` : ""}`
    : null;
  const locationLabel = isRemote
    ? place
      ? `${place} (Remote)`
      : "Remote"
    : place ?? "Location not specified";

  const responsibilityItems = parseBullets(responsibilities);
  const requirementItems = parseBullets(requirements);
  const benefitItems = parseBullets(benefits);

  const applyHref = `/jobs/${id}/apply`;

  return (
    <div
      className={`${body.className} min-h-screen bg-slate-50 text-slate-900 dark:bg-[#050B1A] dark:text-slate-100`}
    >
      <motion.div
        variants={container}
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        className="mx-auto max-w-3xl space-y-5 px-4 pb-24 pt-8 sm:space-y-6 sm:px-6 sm:pb-12 sm:pt-12"
      >
        {/* Back link */}
        <motion.div variants={item}>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-slate-600 transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-400 dark:hover:text-blue-300"
          >
            <ArrowLeft width={16} height={16} aria-hidden="true" />
            Back to jobs
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div variants={item} className={panel}>
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5 sm:h-16 sm:w-16">
              {companyLogo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={companyLogo}
                  alt={`${companyName} logo`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span
                  className={`${display.className} text-xl font-bold text-blue-600 dark:text-blue-400`}
                >
                  {companyName?.[0]?.toUpperCase() ?? "?"}
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h1
                className={`${display.className} text-balance text-2xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-3xl`}
              >
                {jobTitle}
              </h1>
              <p className="mt-1.5 text-base font-medium text-slate-700 dark:text-slate-300">
                {companyName}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                <MapPin
                  width={14}
                  height={14}
                  aria-hidden="true"
                  className="shrink-0"
                />
                {locationLabel}
              </p>
            </div>
          </div>

          {/* Quick facts */}
          <div className="mt-6 flex flex-wrap gap-2">
            {salaryRange && (
              <span className={pill}>
                <TagDollar className={pillIcon} aria-hidden="true" />
                {salaryRange}
              </span>
            )}
            {experienceLevel && (
              <span className={pill}>
                <Star className={pillIcon} aria-hidden="true" />
                {EXPERIENCE_LABELS[experienceLevel] ?? experienceLevel}
              </span>
            )}
            {jobType && (
              <span className={pill}>
                <Briefcase className={pillIcon} aria-hidden="true" />
                {JOB_TYPE_LABELS[jobType] ?? jobType}
              </span>
            )}
          </div>

          {/* Apply and deadline */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6 dark:border-white/10">
            {deadline && (
              <span className="inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                <Clock width={16} height={16} aria-hidden="true" />
                Apply before {formatDeadline(deadline)}
              </span>
            )}

            <Link
              href={applyHref}
              className="ml-auto hidden h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:shadow-none dark:focus-visible:ring-offset-[#0B1530] sm:inline-flex"
            >
              <PaperPlane width={16} height={16} aria-hidden="true" />
              Apply now
            </Link>
          </div>
        </motion.div>

        <DetailSection
          icon={ListCheck}
          title="Responsibilities"
          items={responsibilityItems}
        />
        <DetailSection
          icon={CheckDouble}
          title="Requirements"
          items={requirementItems}
        />
        <DetailSection
          icon={Calendar}
          title="Perks and benefits"
          items={benefitItems}
          tone="green"
        />

        {/* Sticky apply button (mobile only) */}
        <motion.div variants={item} className="sticky bottom-4 sm:hidden">
          <Link
            href={applyHref}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-xl shadow-blue-900/30 transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-[#050B1A]"
          >
            <PaperPlane width={16} height={16} aria-hidden="true" />
            Apply now
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}