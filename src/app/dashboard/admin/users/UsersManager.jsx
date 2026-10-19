"use client";

import { useMemo, useState } from "react";
import { Magnifier, Xmark, ChevronDown } from "@gravity-ui/icons";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

const PAGE_SIZE = 10;

const ROLE_FILTERS = [
  { value: "all", label: "All roles" },
  { value: "seeker", label: "Job seekers" },
  { value: "recruiter", label: "Recruiters" },
  { value: "admin", label: "Admins" },
  { value: "none", label: "No role" },
];

const SORTS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "name", label: "Name A to Z" },
];

const ROLE_LABELS = {
  seeker: "Job seeker",
  recruiter: "Recruiter",
  admin: "Admin",
  none: "No role",
};

const ROLE_STYLES = {
  admin:
    "border-blue-300 bg-blue-50 text-blue-800 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300",
  recruiter:
    "border-sky-300 bg-sky-50 text-sky-800 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-300",
  seeker:
    "border-slate-300 bg-slate-50 text-slate-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-300",
  none: "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300",
};

const fieldBase =
  "w-full h-12 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-500 transition-colors focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 dark:border-white/10 dark:bg-[#0B1530] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:ring-blue-500/30";

const getRoleKey = (user) => user.role || "none";

// UTC keeps the server and browser output identical, so there is no hydration mismatch
function formatDate(value) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function Avatar({ user, size = "h-10 w-10" }) {
  const [failed, setFailed] = useState(false);
  const initial = user.name?.[0]?.toUpperCase() ?? "?";

  return (
    <span
      className={`${size} flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-600 text-sm font-bold text-white`}
    >
      {user.image && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user.image}
          alt=""
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        initial
      )}
    </span>
  );
}

function RoleBadge({ user }) {
  const key = getRoleKey(user);
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${ROLE_STYLES[key]}`}
    >
      {ROLE_LABELS[key]}
    </span>
  );
}

function VerifiedBadge({ verified }) {
  return verified ? (
    <span className="inline-flex items-center rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
      Verified
    </span>
  ) : (
    <span className="inline-flex items-center rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-300">
      Unverified
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

const pagerBtn =
  "inline-flex h-10 items-center justify-center rounded-xl border border-slate-300 px-4 text-sm font-semibold text-slate-900 transition-colors hover:border-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-slate-300 disabled:hover:text-slate-900 dark:border-white/20 dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300 dark:disabled:hover:border-white/20 dark:disabled:hover:text-white";

export default function UsersManager({ users = [] }) {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const list = users.filter((user) => {
      if (roleFilter !== "all" && getRoleKey(user) !== roleFilter) return false;
      if (q) {
        const haystack = `${user.name ?? ""} ${user.email ?? ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    return [...list].sort((a, b) => {
      if (sort === "name") return (a.name ?? "").localeCompare(b.name ?? "");
      const diff = new Date(a.createdAt) - new Date(b.createdAt);
      return sort === "oldest" ? diff : -diff;
    });
  }, [users, query, roleFilter, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  const hasFilters = query.trim() !== "" || roleFilter !== "all";

  const clearFilters = () => {
    setQuery("");
    setRoleFilter("all");
    setPage(1);
  };

  return (
    <div className={`${body.className} space-y-4`}>
      {/* Controls */}
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <Magnifier
            width={18}
            height={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400"
          />
          <input
            type="search"
            aria-label="Search users"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name or email"
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
          label="Filter by role"
          value={roleFilter}
          onChange={(value) => {
            setRoleFilter(value);
            setPage(1);
          }}
          options={ROLE_FILTERS}
        />
        <SelectBox label="Sort users" value={sort} onChange={setSort} options={SORTS} />
      </div>

      <p
        className="text-sm text-slate-600 dark:text-slate-400"
        aria-live="polite"
      >
        {filtered.length === 0
          ? "No users found"
          : `Showing ${start + 1}–${start + visible.length} of ${filtered.length} user${
              filtered.length === 1 ? "" : "s"
            }`}
      </p>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-14 text-center dark:border-white/15">
          <p className="text-sm text-slate-600 dark:text-slate-400 sm:text-base">
            No users match your search or filter.
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
          {/* Table (tablet and up) */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Registered users</caption>
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold text-slate-600 dark:border-white/10 dark:text-slate-400">
                  <th scope="col" className="px-6 py-4">User</th>
                  <th scope="col" className="px-4 py-4">Role</th>
                  <th scope="col" className="px-4 py-4">Email status</th>
                  <th scope="col" className="px-6 py-4">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/10">
                {visible.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar user={user} />
                        <div className="min-w-0">
                          <p
                            className={`${display.className} truncate text-sm font-bold text-slate-950 dark:text-white`}
                          >
                            {user.name}
                          </p>
                          <p className="truncate text-xs text-slate-600 dark:text-slate-400">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <RoleBadge user={user} />
                    </td>
                    <td className="px-4 py-4">
                      <VerifiedBadge verified={user.emailVerified} />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-slate-700 dark:text-slate-300">
                      {formatDate(user.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards (phones) */}
          <ul className="divide-y divide-slate-200 dark:divide-white/10 md:hidden">
            {visible.map((user) => (
              <li key={user._id} className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar user={user} size="h-11 w-11" />
                  <div className="min-w-0">
                    <p
                      className={`${display.className} truncate text-base font-bold text-slate-950 dark:text-white`}
                    >
                      {user.name}
                    </p>
                    <p className="truncate text-sm text-slate-600 dark:text-slate-400">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <RoleBadge user={user} />
                  <VerifiedBadge verified={user.emailVerified} />
                </div>
                <p className="mt-3 text-xs text-slate-600 dark:text-slate-400">
                  Joined {formatDate(user.createdAt)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label="Users pages"
          className="flex items-center justify-between gap-3"
        >
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
    </div>
  );
}