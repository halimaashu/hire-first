"use client";

import { useState, useEffect } from "react";
import {
  Bookmark,
  BookmarkFill,
  TagDollar,
  Star,
  Flame,
  MapPin,
  ArrowUpRightFromSquare,
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

// Shows 180000 as "180k" and 1500 as "1.5k"; falls back to the raw value
function formatSalary(value) {
  const n = Number(value);
  if (!n || Number.isNaN(n)) return value;
  if (n >= 1000) return `${Number((n / 1000).toFixed(1))}k`;
  return String(n);
}

const EXPERIENCE_LABELS = {
  entry: "Entry",
  mid: "Mid",
  senior: "Senior",
  lead: "Lead",
  executive: "Executive",
};

const pill =
  "inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300";
const pillIcon = "h-3.5 w-3.5 text-blue-600 dark:text-blue-400";

/**
 * JobCard
 *
 * Maps 1:1 to the job document shape used in jobs_seed.json / MongoDB:
 * {
 *   _id, jobTitle, minSalary, maxSalary, currency, jobCategory, jobType,
 *   experienceLevel, isRemote, status, companyName, companyLogo, companyId,
 *   jobCity, jobCountry, deadline, responsibilities, requirements, benefits,
 *   createDate: { $date }
 * }
 *
 * Usage:
 * <JobCard
 *   job={jobDoc}
 *   saved={savedJobIds.includes(jobDoc._id)}
 *   onToggleSave={(job, nextSaved) => { ... your save/unsave call ... }}
 *   isHot={false} // optional, not in schema — pass your own "hot" logic
 * />
 */
export default function JobCard({
  job,
  saved = false,
  onToggleSave,
  isHot = false,
}) {
  const [isSaved, setIsSaved] = useState(saved);

  // Keep local state in sync if the parent changes `saved`
  useEffect(() => {
    setIsSaved(saved);
  }, [saved]);

  if (!job) return null;

  const {
    jobTitle,
    minSalary,
    maxSalary,
    currency = "USD",
    experienceLevel,
    isRemote,
    companyName,
    companyLogo,
    jobCity,
    jobCountry,
    _id,
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
    : place;

  const handleSaveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !isSaved;
    setIsSaved(next);
    onToggleSave?.(job, next);
  };

  return (
    <article
      className={`${body.className} group relative w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-blue-600/50 dark:border-white/10 dark:bg-[#0B1530] dark:shadow-none dark:hover:border-blue-500/50 sm:p-5`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Logo */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5 sm:h-14 sm:w-14">
          {companyLogo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={companyLogo}
              alt={`${companyName} logo`}
              className="h-full w-full object-cover"
            />
          ) : (
            <span
              className={`${display.className} text-lg font-bold text-blue-600 dark:text-blue-400`}
            >
              {companyName?.[0]?.toUpperCase() ?? "?"}
            </span>
          )}
        </div>

        {/* Title and company */}
        <div className="min-w-0 flex-1">
          <h3
            className={`${display.className} line-clamp-2 text-lg font-bold leading-snug text-slate-950 dark:text-white`}
          >
            {jobTitle}
          </h3>
          <p className="mt-0.5 truncate text-sm font-medium text-slate-700 dark:text-slate-300">
            {companyName}
          </p>
          {locationLabel && (
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
              <MapPin
                width={14}
                height={14}
                aria-hidden="true"
                className="shrink-0"
              />
              <span className="truncate">{locationLabel}</span>
            </p>
          )}
        </div>

        {/* Bookmark */}
        <button
          type="button"
          onClick={handleSaveClick}
          aria-label={isSaved ? "Remove from saved jobs" : "Save job"}
          aria-pressed={isSaved}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
        >
          {isSaved ? (
            <BookmarkFill
              className="h-5 w-5 text-blue-600 dark:text-blue-400"
              aria-hidden="true"
            />
          ) : (
            <Bookmark className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Pills */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
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

        {isHot && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
            <Flame className="h-3.5 w-3.5" aria-hidden="true" />
            Hot job
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="mt-5 flex items-center border-t border-slate-200 pt-4 dark:border-white/10">
        <Link
          href={`/jobs/${_id}`}
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:shadow-none dark:focus-visible:ring-offset-[#0B1530]"
        >
          <ArrowUpRightFromSquare
            className="h-4 w-4"
            aria-hidden="true"
          />
          View details
        </Link>
      </div>
    </article>
  );
}