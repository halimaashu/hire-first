import { redirect } from "next/navigation";
import { Briefcase, Thunderbolt, CircleCheck } from "@gravity-ui/icons";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

import { getUser } from "@/lib/actions/core/session";
import { getAllJobs } from "@/lib/api/job";
import MetricCard from "@/components/dashboard/MetricCard";
import JobsManager from "./JobsManager";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

// Private admin page: keep it out of search results
export const metadata = {
  title: "Manage jobs",
  description: "Review, open and remove job posts on HireLoop.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

// Show fresh data on every visit (an admin needs to see the latest list)
export const dynamic = "force-dynamic";

const REDIRECT_BY_ROLE = {
  seeker: "/dashboard/seeker",
  recruiter: "/dashboard/recruiter",
};

export default async function AdminJobsPage() {
  const user = await getUser();

  // 1. Must be signed in
  if (!user) {
    redirect("/signin?redirect=/dashboard/admin/jobs");
  }

  // 2. Must be an admin
  if (user.role !== "admin") {
    redirect(REDIRECT_BY_ROLE[user.role] ?? "/");
  }

  // 3. Load jobs. Works whether the API returns an array or { data: [...] }
  let jobs = null;
  try {
    const res = await getAllJobs();
    jobs = Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : null;
  } catch {
    jobs = null;
  }

  if (!jobs) {
    return (
      <div
        className={`${body.className} rounded-2xl border border-dashed border-slate-300 px-6 py-14 text-center dark:border-white/15`}
      >
        <h1
          className={`${display.className} text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white`}
        >
          Couldn’t load jobs
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
          Please refresh the page. If this keeps happening, check that the jobs
          API is running.
        </p>
      </div>
    );
  }

  // A job is "expired" when its deadline date has passed (dates look like 2026-07-02)
  const today = new Date().toISOString().slice(0, 10);
  const isExpired = (job) => Boolean(job.deadline && job.deadline < today);
  const isOpen = (job) => (job.status ?? "active") === "active";

  const activeJobs = jobs.filter((job) => isOpen(job) && !isExpired(job)).length;
  const expiredJobs = jobs.filter((job) => isOpen(job) && isExpired(job)).length;

  return (
    <div className={`${body.className} space-y-8`}>
      {/* Header */}
      <div>
        <h1
          className={`${display.className} text-balance text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl`}
        >
          Jobs
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
          Review every job post, open its details, or remove it from the
          platform.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard title="Total jobs" value={String(jobs.length)} icon={Briefcase} />
        <MetricCard title="Active jobs" value={String(activeJobs)} icon={Thunderbolt} />
        <MetricCard
          title="Expired jobs"
          value={String(expiredJobs)}
          icon={CircleCheck}
          hint="Deadline has passed"
        />
      </div>

      {/* Search, filters, details and delete */}
      <JobsManager jobs={jobs} />
    </div>
  );
}