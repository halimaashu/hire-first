"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Magnifier, Xmark, ChevronDown } from "@gravity-ui/icons";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import JobCard from "@/components/job/JobCard";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

// ── Option sets — kept identical to JobPostForm.jsx so labels match ────────
const JOB_CATEGORIES = [
  { value: "all", label: "All categories" },
  { value: "engineering", label: "Engineering & Development" },
  { value: "design", label: "Design & UX" },
  { value: "product", label: "Product Management" },
  { value: "marketing", label: "Marketing & Content" },
  { value: "sales", label: "Sales & Business Dev" },
  { value: "operations", label: "Operations & Admin" },
  { value: "data", label: "Data & Analytics" },
  { value: "hr", label: "Human Resources" },
  { value: "finance", label: "Finance & Legal" },
  { value: "customer-success", label: "Customer Success" },
];

const JOB_TYPES = [
  { value: "all", label: "All types" },
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "freelance", label: "Freelance" },
  { value: "internship", label: "Internship" },
];

const REMOTE_OPTIONS = [
  { value: "all", label: "Any location" },
  { value: "remote", label: "Remote" },
  { value: "onsite", label: "On-site" },
];

const fieldBase =
  "w-full h-12 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 transition-colors focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 dark:border-white/10 dark:bg-[#0B1530] dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500/30";

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div className="relative">
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${fieldBase} cursor-pointer appearance-none pl-4 pr-10`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        width={16}
        height={16}
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400"
      />
    </div>
  );
}

export default function JobsTrialPage({ allJob = [] }) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [jobType, setJobType] = useState("all");
  const [remote, setRemote] = useState("all");
  const [savedIds, setSavedIds] = useState([]);

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return allJob.filter((job) => {
      if (query) {
        const matchesSearch =
          job.jobTitle?.toLowerCase().includes(query) ||
          job.companyName?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      if (category !== "all" && job.jobCategory !== category) return false;
      if (jobType !== "all" && job.jobType !== jobType) return false;

      if (remote === "remote" && !job.isRemote) return false;
      if (remote === "onsite" && job.isRemote) return false;

      return true;
    });
  }, [allJob, search, category, jobType, remote]);

  const activeFilterCount =
    (category !== "all" ? 1 : 0) +
    (jobType !== "all" ? 1 : 0) +
    (remote !== "all" ? 1 : 0);

  const hasAnyFilter = activeFilterCount > 0 || search.trim() !== "";

  const handleClearFilters = () => {
    setSearch("");
    setCategory("all");
    setJobType("all");
    setRemote("all");
  };

  const handleToggleSave = (job, nextSaved) => {
    setSavedIds((prev) =>
      nextSaved ? [...prev, job._id] : prev.filter((id) => id !== job._id)
    );
    // TODO: call your save/unsave API here
  };

  return (
    <div
      className={`${body.className} min-h-screen bg-slate-50 px-4 py-10 text-slate-900 dark:bg-[#050B1A] dark:text-slate-100 sm:px-6 sm:py-14 lg:px-8`}
    >
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div>
          <h1
            className={`${display.className} text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl`}
          >
            Browse all jobs
          </h1>
          <p
            className="mt-2 text-sm text-slate-600 dark:text-slate-400 sm:text-base"
            aria-live="polite"
          >
            Showing {filteredJobs.length} of {allJob.length} job
            {allJob.length === 1 ? "" : "s"}
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Magnifier
            width={18}
            height={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400"
          />
          <input
            type="search"
            aria-label="Search jobs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by job title or company"
            className={`${fieldBase} pl-11 pr-11 placeholder:text-slate-500 dark:placeholder:text-slate-500 [&::-webkit-search-cancel-button]:hidden`}
          />
          {search && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-400 dark:hover:text-white"
            >
              <Xmark width={16} height={16} aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <FilterSelect
              label="Category"
              value={category}
              onChange={setCategory}
              options={JOB_CATEGORIES}
            />
            <FilterSelect
              label="Job type"
              value={jobType}
              onChange={setJobType}
              options={JOB_TYPES}
            />
            <FilterSelect
              label="Location"
              value={remote}
              onChange={setRemote}
              options={REMOTE_OPTIONS}
            />
          </div>

          {hasAnyFilter && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="rounded-md text-sm font-semibold text-blue-700 transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Clear filters
              {activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
            </button>
          )}
        </div>

        {/* Results */}
        {filteredJobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-16 text-center dark:border-white/15">
            <p className="text-sm text-slate-600 dark:text-slate-400 sm:text-base">
              No jobs match your search or filters.
            </p>
            {hasAnyFilter && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="mt-4 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-[#050B1A]"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                saved={savedIds.includes(job._id)}
                onToggleSave={handleToggleSave}
                onViewDetails={(j) => router.push(`/jobs/${j._id}`)}
                onApply={(j) => router.push(`/jobs/${j._id}/apply`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}