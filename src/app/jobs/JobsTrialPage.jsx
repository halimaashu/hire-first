"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

import { Magnifier, Xmark } from "@gravity-ui/icons";
import JobCard from "@/components/job/JobCard";

// ── Option sets — kept identical to JobPostForm.jsx so labels match ────────
const JOB_CATEGORIES = [
  { value: "all", label: "All Categories" },
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
  { value: "all", label: "All Types" },
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "freelance", label: "Freelance" },
  { value: "internship", label: "Internship" },
];

const REMOTE_OPTIONS = [
  { value: "all", label: "Any Location" },
  { value: "remote", label: "Remote" },
  { value: "onsite", label: "On-site" },
];

function FilterSelect({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        bg-[#121214] border border-neutral-800 rounded-lg h-11 px-3 text-sm text-white
        focus:outline-none focus:ring-2 focus:ring-neutral-600/20 focus:border-neutral-600
        cursor-pointer transition-all duration-200
      "
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
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
    <div className="min-h-screen bg-black px-4 py-10">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-white">Browse All Jobs</h1>
          <p className="text-sm text-neutral-500 mt-1">
            {filteredJobs.length} of {allJob.length} job
            {allJob.length === 1 ? "" : "s"}
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <Magnifier className="w-4 h-4 text-neutral-500" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by job title or company"
            className="
              w-full bg-[#121214] border border-neutral-800 rounded-lg h-11 pl-9 pr-9
              text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2
              focus:border-neutral-600 focus:ring-neutral-600/20 transition-all duration-200
            "
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute inset-y-0 right-3 flex items-center text-neutral-500 hover:text-neutral-300"
            >
              <Xmark className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          <FilterSelect value={category} onChange={setCategory} options={JOB_CATEGORIES} />
          <FilterSelect value={jobType} onChange={setJobType} options={JOB_TYPES} />
          <FilterSelect value={remote} onChange={setRemote} options={REMOTE_OPTIONS} />

          {activeFilterCount > 0 && (
            <button
              onClick={handleClearFilters}
              className="text-xs text-violet-400 hover:text-violet-300 transition-colors ml-1"
            >
              Clear filters ({activeFilterCount})
            </button>
          )}
        </div>

        {/* Results */}
        {filteredJobs.length === 0 ? (
          <div className="border border-dashed border-neutral-800 rounded-2xl py-16 text-center">
            <p className="text-sm text-neutral-500">
              No jobs match your search or filters.
            </p>
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