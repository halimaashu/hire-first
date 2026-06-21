"use client";

import { useState } from "react";
import {
  Bookmark,
  BookmarkFill,
  TagDollar,
  Star,
  Flame,
  ArrowUpRightFromSquare,
  PaperPlane,
} from "@gravity-ui/icons";
import Link from "next/link";

const CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  BDT: "৳",
  INR: "₹",
};

// Round to nearest thousand and show as "180k" style, falls back to raw number
function formatSalary(value) {
  const n = Number(value);
  if (!n || Number.isNaN(n)) return value;
  if (n >= 1000) return `${Math.round(n / 1000)}k`;
  return String(n);
}

const EXPERIENCE_LABELS = {
  entry: "Entry",
  mid: "Mid",
  senior: "Senior",
  lead: "Lead",
  executive: "Executive",
};

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
 *   onViewDetails={(job) => router.push(`/jobs/${job._id}`)}
 *   onApply={(job) => router.push(`/jobs/${job._id}/apply`)}
 *   isHot={false} // optional, not in schema — pass your own "hot" logic
 * />
 */
export default function JobCard({
  job,
  saved = false,
  onToggleSave,
  onViewDetails,
  onApply,
  isHot = false,
}) {
  const [isSaved, setIsSaved] = useState(saved);

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
    _id
  } = job;

  const symbol = CURRENCY_SYMBOLS[currency] ?? currency;
  const salaryRange =
    minSalary && maxSalary
      ? `${symbol}${formatSalary(minSalary)} - ${symbol}${formatSalary(maxSalary)}`
      : null;

  const locationLabel = isRemote
    ? jobCity
      ? `${jobCity}${jobCountry ? `, ${jobCountry}` : ""} (Remote)`
      : "Remote"
    : jobCity
    ? `${jobCity}${jobCountry ? `, ${jobCountry}` : ""}`
    : null;

  const handleSaveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !isSaved;
    setIsSaved(next);
    onToggleSave?.(job, next);
  };

 

  const handleApply = (e) => {
    e.preventDefault();
    onApply?.(job);
  };

  return (
    <div
      className="
        group relative w-full rounded-2xl border border-neutral-800/80
        bg-[#121214] p-5 transition-all duration-200
        hover:border-neutral-700 hover:bg-[#16161a]
      "
    >
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="w-12 h-12 rounded-xl bg-[#0f0f11] border border-neutral-800 flex items-center justify-center overflow-hidden shrink-0">
          {companyLogo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={companyLogo}
              alt={`${companyName} logo`}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm font-semibold text-neutral-500">
              {companyName?.[0]?.toUpperCase() ?? "?"}
            </span>
          )}
        </div>

        {/* Title + subtitle */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-white truncate">
            {jobTitle}
          </h3>
          <p className="mt-1 text-sm text-neutral-500 truncate">
            {companyName}
            {locationLabel && <> • {locationLabel}</>}
          </p>
        </div>

        {/* Bookmark */}
        <button
          type="button"
          onClick={handleSaveClick}
          aria-label={isSaved ? "Remove from saved jobs" : "Save job"}
          aria-pressed={isSaved}
          className="shrink-0 text-neutral-500 hover:text-neutral-300 transition-colors duration-150"
        >
          {isSaved ? (
            <BookmarkFill className="w-5 h-5 text-violet-400" />
          ) : (
            <Bookmark className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Pills */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {salaryRange && (
          <span
            className="
              inline-flex items-center gap-1.5 rounded-full border border-neutral-800
              bg-[#0f0f11] px-3 py-1.5 text-xs text-neutral-300
            "
          >
            <TagDollar className="w-3.5 h-3.5 text-neutral-500" />
            {salaryRange}
          </span>
        )}

        {experienceLevel && (
          <span
            className="
              inline-flex items-center gap-1.5 rounded-full border border-neutral-800
              bg-[#0f0f11] px-3 py-1.5 text-xs text-neutral-300
            "
          >
            <Star className="w-3.5 h-3.5 text-neutral-500" />
            {EXPERIENCE_LABELS[experienceLevel] ?? experienceLevel}
          </span>
        )}

        {isHot && (
          <span
            className="
              inline-flex items-center gap-1.5 rounded-full border border-amber-800/60
              bg-amber-950/40 px-3 py-1.5 text-xs font-medium text-amber-400
            "
          >
            <Flame className="w-3.5 h-3.5" />
            Hot Job
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="mt-5 pt-4 border-t border-neutral-800/60 flex items-center gap-2.5">
        <Link
          type="button"
         href={`/jobs/${_id}`}
          className="
            flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg
            border border-neutral-800 h-9 text-xs font-medium text-neutral-300
            hover:text-white hover:border-neutral-600 transition-all duration-200
          "
        >
          <ArrowUpRightFromSquare className="w-3.5 h-3.5" />
          View Details
        </Link>

        <button
          type="button"
          onClick={handleApply}
          className="
            flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg
            bg-violet-600 hover:bg-violet-500 h-9 text-xs font-semibold text-white
            transition-all duration-200
          "
        >
          <PaperPlane className="w-3.5 h-3.5" />
          Apply
        </button>
      </div>
    </div>
  );
}