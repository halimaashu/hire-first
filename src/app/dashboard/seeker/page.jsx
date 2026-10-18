import Link from "next/link";
import { redirect } from "next/navigation";
import {
  PaperPlane,
  Thunderbolt,
  Star,
  Magnifier,
  Bookmark,
  Person,
} from "@gravity-ui/icons";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

import { getUser } from "@/lib/actions/core/session";
import { getApplications } from "@/lib/api/applications";
import MetricCard from "@/components/dashboard/MetricCard";
import JobCard from "@/components/job/JobCard";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

// ── SEO ────────────────────────────────────────────────────────────────
// A private dashboard should never appear in search results, so it is set to
// "noindex". If your root layout has a title template such as "%s | HireLoop",
// this title becomes "Job seeker dashboard | HireLoop".
export const metadata = {
  title: "Job seeker dashboard",
  description:
    "Track your applications, discover new jobs and manage your HireLoop profile.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

// Same limit as the apply page. Move it to one shared file when you have plans in the database.
const PLAN = { name: "Free", maxApplications: 3 };

const DASHBOARD_BY_ROLE = {
  recruiter: "/dashboard/recruiter",
  admin: "/dashboard/admin",
};

const quickActions = [
  { label: "Browse jobs", href: "/jobs", icon: Magnifier },
  { label: "My applications", href: "/dashboard/seeker/applications", icon: PaperPlane },
  { label: "Saved jobs", href: "/dashboard/seeker/saved", icon: Bookmark },
  { label: "My profile", href: "/dashboard/seeker/profile", icon: Person },
];

async function getLatestJobs() {
  try {
    const base = (process.env.NEXT_PUBLIC_BASE_URL || "").replace(/\/+$/, "");
    const res = await fetch(`${base}/api/allJobs`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data.slice(-4).reverse() : [];
  } catch {
    return [];
  }
}

async function getMyApplications(userId) {
  try {
    const data = await getApplications(userId);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function SeekerPage() {
  const user = await getUser();

  // 1. Must be signed in
  if (!user) {
    redirect("/signin?redirect=/dashboard/seeker");
  }

  // 2. Must be a seeker, otherwise send people to their own dashboard
  if (user.role !== "seeker") {
    redirect(DASHBOARD_BY_ROLE[user.role] ?? "/");
  }

  // 3. Load data in parallel
  const [applications, latestJobs] = await Promise.all([
    getMyApplications(user.id),
    getLatestJobs(),
  ]);

  const applicationCount = applications.length;
  const applicationsLeft = Math.max(0, PLAN.maxApplications - applicationCount);
  const firstName = user.name?.split(" ")[0];

  return (
    <div className={`${body.className} space-y-10`}>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1
            className={`${display.className} text-balance text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl`}
          >
            Welcome back{firstName ? `, ${firstName}` : ""}
          </h1>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
            Here’s where your job search stands today.
          </p>
        </div>

        <Link
          href="/jobs"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:shadow-none dark:focus-visible:ring-offset-[#050B1A]"
        >
          Browse jobs
        </Link>
      </div>

      {/* Upgrade notice when the free limit is used up */}
      {applicationsLeft === 0 && (
        <div
          role="status"
          className="flex flex-col gap-4 rounded-2xl border border-amber-300 bg-amber-50 p-5 dark:border-amber-500/30 dark:bg-amber-500/10 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm leading-relaxed text-amber-900 dark:text-amber-200 sm:text-base">
            You’ve used all {PLAN.maxApplications} free applications. Upgrade to
            keep applying.
          </p>
          <Link
            href="/plans"
            className="inline-flex h-11 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-amber-50 dark:focus-visible:ring-offset-[#050B1A]"
          >
            See plans
          </Link>
        </div>
      )}

      {/* Overview */}
      <section aria-labelledby="overview-heading">
        <h2
          id="overview-heading"
          className={`${display.className} mb-4 text-xl font-bold text-slate-950 dark:text-white`}
        >
          Overview
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <MetricCard
            title="Applications submitted"
            value={String(applicationCount)}
            icon={PaperPlane}
          />
          <MetricCard
            title="Applications left"
            value={String(applicationsLeft)}
            icon={Thunderbolt}
            hint={`of ${PLAN.maxApplications} on the ${PLAN.name} plan`}
          />
          <MetricCard title="Current plan" value={PLAN.name} icon={Star} />
        </div>
      </section>

      {/* Latest jobs */}
      <section aria-labelledby="latest-heading">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2
            id="latest-heading"
            className={`${display.className} text-xl font-bold text-slate-950 dark:text-white`}
          >
            Latest jobs
          </h2>
          <Link
            href="/jobs"
            className="rounded-md text-sm font-semibold text-blue-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400"
          >
            View all jobs
          </Link>
        </div>

        {latestJobs.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-300 px-4 py-12 text-center text-sm text-slate-600 dark:border-white/15 dark:text-slate-400 sm:text-base">
            No jobs to show right now. Check back soon.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {latestJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
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
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
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