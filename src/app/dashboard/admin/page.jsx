import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Briefcase,
  Thunderbolt,
  FolderTree,
  Persons,
  ChartLine,
  TagDollar,
} from "@gravity-ui/icons";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

import { getUser } from "@/lib/actions/core/session";
import MetricCard from "@/components/dashboard/MetricCard";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

// ── SEO ────────────────────────────────────────────────────────────────
// Private admin pages must never appear in search results.
export const metadata = {
  title: "Admin overview",
  description:
    "Manage users, jobs, companies and payments on the HireLoop platform.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

// ── Data endpoints ─────────────────────────────────────────────────────
// "/api/allJobs" is the one your site already uses. The other two are guesses:
// change them to your real endpoints. If an endpoint is missing or fails, the
// matching card shows "—" instead of breaking the page.
const ENDPOINTS = {
  jobs: "/api/allJobs",
  users: "/api/allUsers",
  companies: "/api/allCompanies",
};

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

const REDIRECT_BY_ROLE = {
  seeker: "/dashboard/seeker",
  recruiter: "/dashboard/recruiter",
};

const quickActions = [
  { label: "Manage users", href: "/dashboard/admin/users", icon: Persons },
  { label: "Manage jobs", href: "/dashboard/admin/jobs", icon: Briefcase },
  { label: "Review companies", href: "/dashboard/admin/companies", icon: FolderTree },
  { label: "Plans and payments", href: "/dashboard/admin/payments", icon: TagDollar },
  { label: "View reports", href: "/dashboard/admin/reports", icon: ChartLine },
];

// Returns an array, or null when the endpoint is unavailable
async function fetchList(path) {
  try {
    const base = (process.env.NEXT_PUBLIC_BASE_URL || "").replace(/\/+$/, "");
    const res = await fetch(`${base}${path}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

const display_ = (value) => (value === null ? "—" : String(value));

export default async function AdminPage() {
  const user = await getUser();

  // 1. Must be signed in
  if (!user) {
    redirect("/signin?redirect=/dashboard/admin");
  }

  // 2. Must be an admin, otherwise send people to their own dashboard
  if (user.role !== "admin") {
    redirect(REDIRECT_BY_ROLE[user.role] ?? "/");
  }

  // 3. Load everything in parallel
  const [jobs, users, companies] = await Promise.all([
    fetchList(ENDPOINTS.jobs),
    fetchList(ENDPOINTS.users),
    fetchList(ENDPOINTS.companies),
  ]);

  // ── Numbers ──
  const totalJobs = jobs ? jobs.length : null;
  const activeJobs = jobs
    ? jobs.filter((job) => (job.status ?? "active") === "active").length
    : null;
  const totalCompanies = companies ? companies.length : null;
  const pendingCompanies = companies
    ? companies.filter((c) => c.status === "Pending")
    : null;
  const totalUsers = users ? users.length : null;
  const recruiterCount = users
    ? users.filter((u) => u.role === "recruiter").length
    : null;
  const seekerCount = users
    ? users.filter((u) => u.role === "seeker").length
    : null;

  // Jobs by category, largest first
  const categoryCounts = jobs
    ? Object.entries(
        jobs.reduce((acc, job) => {
          if (job.jobCategory) {
            acc[job.jobCategory] = (acc[job.jobCategory] || 0) + 1;
          }
          return acc;
        }, {})
      ).sort((a, b) => b[1] - a[1])
    : null;
  const maxCategoryCount = categoryCounts?.[0]?.[1] || 1;

  const latestJobs = jobs ? jobs.slice(-5).reverse() : null;

  return (
    <div className={`${body.className} space-y-10`}>
      {/* Header */}
      <div>
        <h1
          className={`${display.className} text-balance text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl`}
        >
          Admin overview
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
          A snapshot of everything happening on the platform.
        </p>
      </div>

      {/* Overview */}
      <section aria-labelledby="overview-heading">
        <h2
          id="overview-heading"
          className={`${display.className} mb-4 text-xl font-bold text-slate-950 dark:text-white`}
        >
          Overview
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Total users"
            value={display_(totalUsers)}
            icon={Persons}
            hint={
              users
                ? `${seekerCount} seekers, ${recruiterCount} recruiters`
                : "Not connected yet"
            }
          />
          <MetricCard
            title="Total jobs"
            value={display_(totalJobs)}
            icon={Briefcase}
            hint={jobs ? `${activeJobs} active` : "Not connected yet"}
          />
          <MetricCard
            title="Active jobs"
            value={display_(activeJobs)}
            icon={Thunderbolt}
          />
          <MetricCard
            title="Companies"
            value={display_(totalCompanies)}
            icon={FolderTree}
            hint={
              companies
                ? `${pendingCompanies.length} awaiting review`
                : "Not connected yet"
            }
          />
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-2">
        {/* Pending companies */}
        <section
          aria-labelledby="pending-heading"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0B1530] dark:shadow-none sm:p-6"
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2
              id="pending-heading"
              className={`${display.className} text-lg font-bold text-slate-950 dark:text-white`}
            >
              Companies awaiting review
            </h2>
            <Link
              href="/dashboard/admin/companies"
              className="rounded-md text-sm font-semibold text-blue-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400"
            >
              View all
            </Link>
          </div>

          {pendingCompanies === null ? (
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Company data isn’t connected yet.
            </p>
          ) : pendingCompanies.length === 0 ? (
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Nothing to review. You’re all caught up.
            </p>
          ) : (
            <ul className="divide-y divide-slate-200 dark:divide-white/10">
              {pendingCompanies.slice(0, 5).map((company) => (
                <li
                  key={company._id}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">
                      {company.companyName}
                    </p>
                    <p className="truncate text-xs text-slate-600 dark:text-slate-400">
                      {[company.industry, company.location]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </div>
                  <span className="flex-shrink-0 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
                    Pending
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Jobs by category */}
        <section
          aria-labelledby="category-heading"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0B1530] dark:shadow-none sm:p-6"
        >
          <h2
            id="category-heading"
            className={`${display.className} mb-4 text-lg font-bold text-slate-950 dark:text-white`}
          >
            Jobs by category
          </h2>

          {categoryCounts === null ? (
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Job data isn’t available right now.
            </p>
          ) : categoryCounts.length === 0 ? (
            <p className="text-sm text-slate-600 dark:text-slate-400">
              No jobs have been posted yet.
            </p>
          ) : (
            <ul className="space-y-4">
              {categoryCounts.map(([category, count]) => (
                <li key={category}>
                  <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                    <span className="truncate font-medium text-slate-800 dark:text-slate-200">
                      {CATEGORY_LABELS[category] ?? category}
                    </span>
                    <span className="flex-shrink-0 font-semibold text-slate-950 dark:text-white">
                      {count}
                    </span>
                  </div>
                  <div
                    aria-hidden="true"
                    className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"
                  >
                    <div
                      className="h-full rounded-full bg-blue-600 dark:bg-blue-500"
                      style={{ width: `${(count / maxCategoryCount) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Latest jobs */}
      <section
        aria-labelledby="latest-heading"
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0B1530] dark:shadow-none sm:p-6"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2
            id="latest-heading"
            className={`${display.className} text-lg font-bold text-slate-950 dark:text-white`}
          >
            Latest jobs
          </h2>
          <Link
            href="/dashboard/admin/jobs"
            className="rounded-md text-sm font-semibold text-blue-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400"
          >
            Manage jobs
          </Link>
        </div>

        {latestJobs === null || latestJobs.length === 0 ? (
          <p className="text-sm text-slate-600 dark:text-slate-400">
            No jobs to show right now.
          </p>
        ) : (
          <ul className="divide-y divide-slate-200 dark:divide-white/10">
            {latestJobs.map((job) => (
              <li key={job._id}>
                <Link
                  href={`/jobs/${job._id}`}
                  className="flex flex-col gap-1 rounded-lg py-3 transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:text-blue-300 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <span className="truncate text-sm font-semibold text-slate-950 dark:text-white">
                    {job.jobTitle}
                  </span>
                  <span className="truncate text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
                    {[job.companyName, job.jobCountry]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Quick actions */}
      <section aria-labelledby="actions-heading">
        <h2
          id="actions-heading"
          className={`${display.className} mb-4 text-xl font-bold text-slate-950 dark:text-white`}
        >
          Quick actions
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {quickActions.map(({ label, href, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:border-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/10 dark:bg-[#0B1530] dark:text-white dark:shadow-none dark:hover:border-blue-400 dark:hover:text-blue-300"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                  <Icon width={20} height={20} aria-hidden="true" />
                </span>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}