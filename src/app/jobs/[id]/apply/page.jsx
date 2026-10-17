import { getUser } from "@/lib/actions/core/session";
import { getDetailJob } from "@/lib/api/job";
import { redirect } from "next/navigation";
import React from "react";
import ApplyForm from "./ApplyForm";
import { getApplications } from "@/lib/api/applications";
import Link from "next/link";
import { ArrowLeft, Flame } from "@gravity-ui/icons";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

const pageBg =
  "min-h-screen bg-slate-50 text-slate-900 dark:bg-[#050B1A] dark:text-slate-100";
const panel =
  "rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0B1530] dark:shadow-none";
const primaryLink =
  "inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:shadow-none dark:focus-visible:ring-offset-[#0B1530]";
const ghostLink =
  "inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 text-sm font-semibold text-slate-800 transition-colors hover:border-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/20 dark:text-slate-200 dark:hover:border-blue-400 dark:hover:text-blue-300";

const JobApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUser();

  // 1. Authentication protection
  if (!user) {
    redirect(`/signin?redirect=/jobs/${id}/apply`);
  }

  // 2. Authorization verification
  if (user.role !== "seeker") {
    return (
      <div
        className={`${body.className} ${pageBg} flex items-center justify-center p-4`}
      >
        <div className={`${panel} w-full max-w-md p-8 text-center`}>
          <h1
            className={`${display.className} text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white`}
          >
            Job seekers only
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
            To apply for a job, please sign in with a seeker account.
          </p>
          <div className="mt-6 flex justify-center">
            <Link href="/jobs" className={primaryLink}>
              Browse all jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Concurrent data fetching
  const [jobInfo, applicationData] = await Promise.all([
    getDetailJob(id),
    getApplications(user.id),
  ]);

  const currentCount = applicationData?.length || 0;
  const plan = {
    type: "free",
    maxApplicationLength: 3,
  };

  const hasReachedLimit = currentCount >= plan.maxApplicationLength;
  const usagePercent = Math.min(
    100,
    Math.round((currentCount / plan.maxApplicationLength) * 100)
  );

  return (
    <div
      className={`${body.className} ${pageBg} px-4 py-8 sm:px-6 sm:py-12 lg:px-8`}
    >
      <div className="mx-auto max-w-3xl space-y-5">
        {/* Usage counter */}
        <div className={`${panel} p-4 sm:p-5`}>
          <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-slate-600 dark:text-slate-300">
              Applications submitted:{" "}
              <span className="font-bold text-slate-950 dark:text-white">
                {currentCount}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {plan.maxApplicationLength}
              </span>
            </p>
            {hasReachedLimit && (
              <span className="self-start rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300 sm:self-auto">
                Limit reached
              </span>
            )}
          </div>

          <div
            role="progressbar"
            aria-label="Applications used"
            aria-valuemin={0}
            aria-valuemax={plan.maxApplicationLength}
            aria-valuenow={Math.min(currentCount, plan.maxApplicationLength)}
            className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"
          >
            <div
              className={`h-full rounded-full ${
                hasReachedLimit ? "bg-amber-500" : "bg-blue-600 dark:bg-blue-500"
              }`}
              style={{ width: `${usagePercent}%` }}
            />
          </div>
        </div>

        {/* 4. Conditional content */}
        {hasReachedLimit ? (
          <div className={`${panel} p-6 text-center sm:p-10`}>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
              <Flame width={26} height={26} aria-hidden="true" />
            </div>
            <h1
              className={`${display.className} text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-3xl`}
            >
              Upgrade your plan to continue
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
              You’ve used all {plan.maxApplicationLength} free applications.
              Choose a plan to keep applying.
            </p>
            <div className="mt-8 flex flex-col-reverse justify-center gap-3 sm:flex-row sm:gap-4">
              <Link href="/jobs" className={ghostLink}>
                <ArrowLeft width={16} height={16} aria-hidden="true" />
                Back to jobs
              </Link>
              <Link href="/plans" className={primaryLink}>
                Upgrade account
              </Link>
            </div>
          </div>
        ) : (
          <ApplyForm applicant={user} jobInfo={jobInfo} />
        )}
      </div>
    </div>
  );
};

export default JobApplyPage;