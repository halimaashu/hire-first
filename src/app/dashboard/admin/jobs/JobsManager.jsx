"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Magnifier, Xmark, ChevronDown } from "@gravity-ui/icons";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import toast from "react-hot-toast";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

// ── YOUR API ───────────────────────────────────────────────────────────
// Change this to your real "delete job" endpoint.
// Expected: DELETE /jobs/:id  ->  200 { message }   (see the backend contract in the reply)
const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "").replace(/\/+$/, "");
const DELETE_JOB_URL = (id) => `${BASE_URL}/jobs/${encodeURIComponent(id)}`;

const PAGE_SIZE = 10;

const CURRENCY_SYMBOLS = { USD: "$", EUR: "€", GBP: "£", BDT: "৳", INR: "₹" };

const CATEGORY_LABELS = {
  engineering: "Engineering & Development",
  design: "Design & UX",
  product: "Product Management",
  marketing: "Marketing & Content",
  sales: "Sales & Business Dev",
  operations: "Operations & Admin",
  data: "Data & Analytics",
  hr: "Human Resources",
  finance: "Finance & Legal",
  "customer-success": "Customer Success",
};

const TYPE_LABELS = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  freelance: "Freelance",
  internship: "Internship",
};

const CATEGORY_FILTERS = [
  { value: "all", label: "All categories" },
  ...Object.entries(CATEGORY_LABELS).map(([value, label]) => ({ value, label })),
];

const STATUS_FILTERS = [
  { value: "all", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "expired", label: "Expired" },
];

const SORTS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "title", label: "Title A to Z" },
];

const fieldBase =
  "w-full h-12 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-500 transition-colors focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 dark:border-white/10 dark:bg-[#0B1530] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:ring-blue-500/30";

const smallBtn =
  "inline-flex h-9 items-center justify-center rounded-lg border px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500";

const detailsBtn = `${smallBtn} border-slate-300 text-slate-900 hover:border-blue-600 hover:text-blue-700 dark:border-white/20 dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300`;

const deleteBtn = `${smallBtn} border-rose-300 text-rose-700 hover:bg-rose-50 focus-visible:ring-rose-500 dark:border-rose-500/30 dark:text-rose-300 dark:hover:bg-rose-500/10`;

const pagerBtn =
  "inline-flex h-10 items-center justify-center rounded-xl border border-slate-300 px-4 text-sm font-semibold text-slate-900 transition-colors hover:border-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-slate-300 disabled:hover:text-slate-900 dark:border-white/20 dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300 dark:disabled:hover:border-white/20 dark:disabled:hover:text-white";

// UTC keeps server and browser output identical, so there is no hydration mismatch
function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatAmount(value) {
  const n = Number(value);
  if (!n || Number.isNaN(n)) return null;
  if (n >= 1000) return `${Number((n / 1000).toFixed(1))}k`;
  return String(n);
}

function salaryOf(job) {
  const min = formatAmount(job.minSalary);
  const max = formatAmount(job.maxSalary);
  if (!min || !max) return "—";
  const symbol = CURRENCY_SYMBOLS[job.currency ?? "USD"] ?? job.currency ?? "";
  return `${symbol}${min} – ${symbol}${max}`;
}

function locationOf(job) {
  const place = [job.jobCity, job.jobCountry].filter(Boolean).join(", ");
  if (job.isRemote) return place ? `${place} (Remote)` : "Remote";
  return place || "—";
}

// "active", "expired", or whatever other status the job has (for example "closed")
function getJobState(job, today) {
  if (job.status && job.status !== "active") return job.status;
  if (job.deadline && job.deadline < today) return "expired";
  return "active";
}

function StatusBadge({ state }) {
  const styles =
    state === "active"
      ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
      : state === "expired"
        ? "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300"
        : "border-slate-300 bg-slate-50 text-slate-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-300";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize ${styles}`}
    >
      {state}
    </span>
  );
}

function SelectBox({ label, value, onChange, options }) {
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

function ConfirmDelete({ job, pending, onCancel, onConfirm }) {
  const cancelRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && !pending) onCancel();
    };
    document.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    cancelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [pending, onCancel]);

  return (
    <div
      className={`${body.className} fixed inset-0 z-[60] flex items-center justify-center p-4`}
    >
      <div
        aria-hidden="true"
        onClick={() => !pending && onCancel()}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
      />

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        aria-describedby="delete-description"
        className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#0B1530]"
      >
        <h2
          id="delete-title"
          className={`${display.className} text-xl font-bold text-slate-950 dark:text-white`}
        >
          Delete this job?
        </h2>
        <p
          id="delete-description"
          className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base"
        >
          “{job.jobTitle}”
          {job.companyName ? ` at ${job.companyName}` : ""} will be removed from
          the platform. This can’t be undone.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            disabled={pending}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 px-5 text-sm font-semibold text-slate-900 transition-colors hover:border-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-60 dark:border-white/20 dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={pending}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-rose-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-70 dark:focus-visible:ring-offset-[#0B1530]"
          >
            {pending ? "Deleting…" : "Delete job"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function JobsManager({ jobs = [] }) {
  const router = useRouter();

  const [items, setItems] = useState(jobs);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [target, setTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Keep the list in sync when the server sends fresh data (after router.refresh)
  useEffect(() => {
    setItems(jobs);
  }, [jobs]);

  const today = new Date().toISOString().slice(0, 10);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const list = items.filter((job) => {
      if (category !== "all" && job.jobCategory !== category) return false;
      if (status !== "all" && getJobState(job, today) !== status) return false;
      if (q) {
        const haystack = `${job.jobTitle ?? ""} ${job.companyName ?? ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    if (sort === "title") {
      return [...list].sort((a, b) =>
        (a.jobTitle ?? "").localeCompare(b.jobTitle ?? "")
      );
    }
    // The API returns oldest first, so "newest" is the reverse
    return sort === "newest" ? [...list].reverse() : list;
  }, [items, query, category, status, sort, today]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  const hasFilters =
    query.trim() !== "" || category !== "all" || status !== "all";

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setStatus("all");
    setPage(1);
  };

  // ── Delete: calls your API directly ──
  const confirmDelete = async () => {
    if (!target) return;
    setDeleting(true);

    try {
      const res = await fetch(DELETE_JOB_URL(target._id), {
        method: "DELETE",
        credentials: "include", // sends the login cookie to your API
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        if (res.status === 401 || res.status === 403) {
          throw new Error("You don’t have permission to delete jobs.");
        }
        throw new Error(data?.message || "Could not delete the job.");
      }

      setItems((prev) => prev.filter((job) => job._id !== target._id));
      toast.success("Job deleted");
      setTarget(null);
      router.refresh(); // reload the server data and the summary cards
    } catch (err) {
      toast.error(err?.message || "Could not delete the job.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className={`${body.className} space-y-4`}>
      {/* Controls */}
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1fr_auto_auto_auto]">
        <div className="relative md:col-span-2 xl:col-span-1">
          <Magnifier
            width={18}
            height={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400"
          />
          <input
            type="search"
            aria-label="Search jobs"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search by job title or company"
            className={`${fieldBase} pl-11 pr-11 [&::-webkit-search-cancel-button]:hidden`}
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setQuery("");
                setPage(1);
              }}
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-400 dark:hover:text-white"
            >
              <Xmark width={16} height={16} aria-hidden="true" />
            </button>
          )}
        </div>

        <SelectBox
          label="Filter by category"
          value={category}
          onChange={(value) => {
            setCategory(value);
            setPage(1);
          }}
          options={CATEGORY_FILTERS}
        />
        <SelectBox
          label="Filter by status"
          value={status}
          onChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
          options={STATUS_FILTERS}
        />
        <SelectBox label="Sort jobs" value={sort} onChange={setSort} options={SORTS} />
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400" aria-live="polite">
        {filtered.length === 0
          ? "No jobs found"
          : `Showing ${start + 1}–${start + visible.length} of ${filtered.length} job${
              filtered.length === 1 ? "" : "s"
            }`}
      </p>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-14 text-center dark:border-white/15">
          <p className="text-sm text-slate-600 dark:text-slate-400 sm:text-base">
            {items.length === 0
              ? "No jobs have been posted yet."
              : "No jobs match your search or filters."}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-[#050B1A]"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0B1530] dark:shadow-none">
          {/* Table (wide screens) */}
          <div className="hidden overflow-x-auto xl:block">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">All posted jobs</caption>
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold text-slate-600 dark:border-white/10 dark:text-slate-400">
                  <th scope="col" className="px-6 py-4">Job</th>
                  <th scope="col" className="px-4 py-4">Category</th>
               
                  <th scope="col" className="px-4 py-4">Deadline</th>
                  <th scope="col" className="px-4 py-4">Status</th>
                  <th scope="col" className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/10">
                {visible.map((job) => (
                  <tr key={job._id}>
                    <td className="max-w-[16rem] px-6 py-4">
                      <p
                        className={`${display.className} truncate text-sm font-bold text-slate-950 dark:text-white`}
                      >
                        {job.jobTitle}
                      </p>
                      <p className="truncate text-xs text-slate-600 dark:text-slate-400">
                        {job.companyName || "Company not set"}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-slate-700 dark:text-slate-300">
                      {CATEGORY_LABELS[job.jobCategory] ?? job.jobCategory ?? "—"}
                    </td>
                   
                    <td className="whitespace-nowrap px-4 py-4 text-slate-700 dark:text-slate-300">
                      {formatDate(job.deadline)}
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge state={getJobState(job, today)} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Link href={`/jobs/${job._id}`} className={detailsBtn}>
                          Details
                          <span className="sr-only"> for {job.jobTitle}</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => setTarget(job)}
                          className={deleteBtn}
                        >
                          Delete
                          <span className="sr-only"> {job.jobTitle}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards (phones, tablets and small laptops) */}
          <ul className="divide-y divide-slate-200 dark:divide-white/10 xl:hidden">
            {visible.map((job) => (
              <li key={job._id} className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p
                      className={`${display.className} text-base font-bold text-slate-950 dark:text-white`}
                    >
                      {job.jobTitle}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {job.companyName || "Company not set"}
                    </p>
                  </div>
                  <StatusBadge state={getJobState(job, today)} />
                </div>

                <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-3">
                  <div>
                    <dt className="text-xs text-slate-500 dark:text-slate-400">Category</dt>
                    <dd className="text-slate-800 dark:text-slate-200">
                      {CATEGORY_LABELS[job.jobCategory] ?? job.jobCategory ?? "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500 dark:text-slate-400">Type</dt>
                    <dd className="text-slate-800 dark:text-slate-200">
                      {TYPE_LABELS[job.jobType] ?? job.jobType ?? "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500 dark:text-slate-400">Location</dt>
                    <dd className="text-slate-800 dark:text-slate-200">{locationOf(job)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500 dark:text-slate-400">Salary</dt>
                    <dd className="text-slate-800 dark:text-slate-200">{salaryOf(job)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500 dark:text-slate-400">Deadline</dt>
                    <dd className="text-slate-800 dark:text-slate-200">
                      {formatDate(job.deadline)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:max-w-xs">
                  <Link href={`/jobs/${job._id}`} className={`${detailsBtn} h-10`}>
                    Details
                    <span className="sr-only"> for {job.jobTitle}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setTarget(job)}
                    className={`${deleteBtn} h-10`}
                  >
                    Delete
                    <span className="sr-only"> {job.jobTitle}</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Jobs pages" className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={pagerBtn}
          >
            Previous
          </button>
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={pagerBtn}
          >
            Next
          </button>
        </nav>
      )}

      {/* Delete confirmation */}
      {target && (
        <ConfirmDelete
          job={target}
          pending={deleting}
          onCancel={() => setTarget(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}