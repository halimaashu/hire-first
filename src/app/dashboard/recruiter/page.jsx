"use client";

import Link from "next/link";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

import { authClient } from "@/lib/auth-client";
import JobPortalDemo from "@/components/dashboard/JobPortalDemo";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

export default function RecruiterPage() {
  // useSession is the right call in a client component.
  // `getSession` from "better-auth/api" is server-only and returns a promise.
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div className={`${body.className} space-y-10`}>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1
            className={`${display.className} text-balance text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl`}
          >
            Welcome back{user?.name ? `, ${user.name}` : ""}
          </h1>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
            Here’s an overview of your hiring activity.
          </p>
        </div>

        <Link
          href="/dashboard/recruiter/jobs/new"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:shadow-none dark:focus-visible:ring-offset-[#050B1A]"
        >
          Post a job
        </Link>
      </div>

      <JobPortalDemo />
    </div>
  );
}