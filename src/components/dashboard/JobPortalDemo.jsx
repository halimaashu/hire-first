import Link from "next/link";
import {
  FileText,
  Persons,
  Thunderbolt,
  CircleCheck,
  FolderPlus,
  Magnifier,
  Person,
  Envelope,
} from "@gravity-ui/icons";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

import MetricCard from "./MetricCard";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

// SAMPLE DATA: replace these numbers with real values from your API
const recruiterStatsData = [
  { id: "job-posts", title: "Total job posts", value: "48", icon: FileText },
  { id: "applicants", title: "Total applicants", value: "1,284", icon: Persons },
  { id: "active", title: "Active jobs", value: "18", icon: Thunderbolt },
  { id: "closed", title: "Jobs closed", value: "32", icon: CircleCheck },
];

const quickActions = [
  { label: "Post a job", href: "/dashboard/recruiter/jobs/new", icon: FolderPlus },
  { label: "Manage jobs", href: "/dashboard/recruiter/jobs", icon: Magnifier },
  { label: "Company profile", href: "/dashboard/recruiter/company", icon: Person },
  { label: "Messages", href: "/dashboard/recruiter/messages", icon: Envelope },
];

export default function JobPortalDemo() {
  return (
    <div className={`${body.className} space-y-10`}>
      {/* Metrics */}
      <section aria-labelledby="overview-heading">
        <h2
          id="overview-heading"
          className={`${display.className} mb-4 text-xl font-bold text-slate-950 dark:text-white`}
        >
          Overview
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {recruiterStatsData.map((stat) => (
            <MetricCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>
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
                className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:border-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/10 dark:bg-[#0B1530] dark:text-white dark:shadow-none dark:hover:border-blue-400 dark:hover:text-blue-300"
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