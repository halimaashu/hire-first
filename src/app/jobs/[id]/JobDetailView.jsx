"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
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

const CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  BDT: "৳",
  INR: "₹",
};

const EXPERIENCE_LABELS = {
  entry: "Entry Level",
  mid: "Mid Level",
  senior: "Senior Level",
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

function formatSalary(value) {
  const n = Number(value);
  if (!n || Number.isNaN(n)) return value;
  if (n >= 1000) return `${Math.round(n / 1000)}k`;
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
// Falls back to rendering as plain paragraphs if there are no bullets.
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

export default function JobDetailView({ job }) {
  const router = useRouter();

  const {
    _id,
    jobTitle,
    minSalary,
    maxSalary,
    currency = "USD",
    deadline,
    responsibilities,
    requirements,
    benefits,
    jobCategory,
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
      ? `${symbol}${formatSalary(minSalary)} - ${symbol}${formatSalary(maxSalary)}`
      : null;

  const locationLabel = isRemote
    ? jobCity
      ? `${jobCity}${jobCountry ? `, ${jobCountry}` : ""} (Remote)`
      : "Remote"
    : jobCity
    ? `${jobCity}${jobCountry ? `, ${jobCountry}` : ""}`
    : "Location not specified";

  const responsibilityItems = parseBullets(responsibilities);
  const requirementItems = parseBullets(requirements);
  const benefitItems = parseBullets(benefits);

  const handleApply = () => {
    // TODO: wire to your real apply flow, e.g.
    // router.push(`/jobs/${_id}/apply`)
    console.log("Apply clicked for job:", _id);
  };

  return (
    <div className="min-h-screen bg-black">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto px-4 py-10 space-y-6"
      >
        {/* Back link */}
        <motion.button
          variants={item}
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-300 transition-colors duration-150"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to jobs
        </motion.button>

        {/* Header card */}
        <motion.div
          variants={item}
          className="bg-[#121214] border border-neutral-800/80 rounded-2xl p-7"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#0f0f11] border border-neutral-800 flex items-center justify-center overflow-hidden shrink-0">
              {companyLogo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={companyLogo}
                  alt={`${companyName} logo`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-base font-semibold text-neutral-500">
                  {companyName?.[0]?.toUpperCase() ?? "?"}
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-white leading-snug">
                {jobTitle}
              </h1>
              <p className="mt-1.5 text-sm text-neutral-400">
                {companyName}
                <span className="text-neutral-600"> • </span>
                {locationLabel}
              </p>
            </div>
          </div>

          {/* Quick facts row */}
          <div className="mt-6 flex flex-wrap gap-2">
            {salaryRange && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-[#0f0f11] px-3 py-1.5 text-xs text-neutral-300">
                <TagDollar className="w-3.5 h-3.5 text-neutral-500" />
                {salaryRange}
              </span>
            )}
            {experienceLevel && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-[#0f0f11] px-3 py-1.5 text-xs text-neutral-300">
                <Star className="w-3.5 h-3.5 text-neutral-500" />
                {EXPERIENCE_LABELS[experienceLevel] ?? experienceLevel}
              </span>
            )}
            {jobType && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-[#0f0f11] px-3 py-1.5 text-xs text-neutral-300">
                <Briefcase className="w-3.5 h-3.5 text-neutral-500" />
                {JOB_TYPE_LABELS[jobType] ?? jobType}
              </span>
            )}
            {locationLabel && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-[#0f0f11] px-3 py-1.5 text-xs text-neutral-300">
                <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                {locationLabel}
              </span>
            )}
          </div>

          {/* Apply button + deadline */}
          <div className="mt-7 pt-6 border-t border-neutral-800/60 flex items-center justify-between flex-wrap gap-3">
            {deadline && (
              <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500">
                <Clock className="w-3.5 h-3.5" />
                Apply before {formatDeadline(deadline)}
              </span>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleApply}
              className="
                ml-auto inline-flex items-center gap-2 rounded-lg bg-violet-600
                hover:bg-violet-500 h-11 px-6 text-sm font-semibold text-white
                transition-colors duration-200
              "
            >
              <PaperPlane className="w-4 h-4" />
              Apply Now
            </motion.button>
          </div>
        </motion.div>

        {/* Responsibilities */}
        {responsibilityItems.length > 0 && (
          <motion.section
            variants={item}
            className="bg-[#121214] border border-neutral-800/80 rounded-2xl p-7"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-violet-600/15 border border-violet-500/20 flex items-center justify-center shrink-0">
                <ListCheck className="w-3.5 h-3.5 text-violet-400" />
              </div>
              <h2 className="text-sm font-semibold text-neutral-100">
                Responsibilities
              </h2>
            </div>
            <ul className="space-y-2.5">
              {responsibilityItems.map((line, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-neutral-400 leading-relaxed"
                >
                  <span className="mt-2 w-1 h-1 rounded-full bg-neutral-600 shrink-0" />
                  {line}
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Requirements */}
        {requirementItems.length > 0 && (
          <motion.section
            variants={item}
            className="bg-[#121214] border border-neutral-800/80 rounded-2xl p-7"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-violet-600/15 border border-violet-500/20 flex items-center justify-center shrink-0">
                <CheckDouble className="w-3.5 h-3.5 text-violet-400" />
              </div>
              <h2 className="text-sm font-semibold text-neutral-100">
                Requirements
              </h2>
            </div>
            <ul className="space-y-2.5">
              {requirementItems.map((line, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-neutral-400 leading-relaxed"
                >
                  <span className="mt-2 w-1 h-1 rounded-full bg-neutral-600 shrink-0" />
                  {line}
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Benefits */}
        {benefitItems.length > 0 && (
          <motion.section
            variants={item}
            className="bg-[#121214] border border-neutral-800/80 rounded-2xl p-7"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-emerald-600/15 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <h2 className="text-sm font-semibold text-neutral-100">
                Perks & Benefits
              </h2>
            </div>
            <ul className="space-y-2.5">
              {benefitItems.map((line, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-neutral-400 leading-relaxed"
                >
                  <span className="mt-2 w-1 h-1 rounded-full bg-emerald-700 shrink-0" />
                  {line}
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Sticky apply footer for mobile */}
        <motion.div
          variants={item}
          className="sm:hidden sticky bottom-4 mt-2"
        >
          <button
            onClick={handleApply}
            className="
              w-full inline-flex items-center justify-center gap-2 rounded-xl
              bg-violet-600 hover:bg-violet-500 h-12 text-sm font-semibold text-white
              shadow-2xl shadow-violet-950/50 transition-colors duration-200
            "
          >
            <PaperPlane className="w-4 h-4" />
            Apply Now
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}