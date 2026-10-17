import { MapPin, Briefcase, CircleDollar, ArrowRight } from "@gravity-ui/icons";
import Link from "next/link";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

async function getLatestJobs() {
  try {
    const base = (process.env.NEXT_PUBLIC_BASE_URL || "").replace(/\/+$/, "");
    const res = await fetch(`${base}/api/allJobs`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data.slice(-6).reverse() : [];
  } catch {
    return [];
  }
}

const tag =
  "inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300";
const tagIcon = "h-3.5 w-3.5 text-blue-600 dark:text-blue-400";

export default async function SmartJobDiscovery() {
  const jobCards = await getLatestJobs();

  return (
    <section
      className={`${body.className} bg-white px-4 py-14 text-slate-900 dark:bg-[#050B1A] dark:text-slate-100 sm:px-6 sm:py-20 lg:px-8`}
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <h2
          className={`${display.className} mx-auto mb-10 max-w-2xl text-balance text-center text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:mb-14 sm:text-4xl lg:text-5xl`}
        >
          The roles you’d never find by searching
        </h2>

        {/* Cards */}
        {jobCards.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-600 dark:border-white/15 dark:text-slate-400">
            No jobs to show right now. Check back soon.
          </p>
        ) : (
          <div className="mb-12 grid grid-cols-1 gap-5 text-left md:grid-cols-2 lg:grid-cols-3">
            {jobCards.map((job) => (
              <article
                key={job._id}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-blue-600/50 dark:border-white/10 dark:bg-[#0B1530] dark:shadow-none dark:hover:border-blue-500/50"
              >
                <div>
                  <h3
                    className={`${display.className} mb-2 text-xl font-bold text-slate-950 dark:text-white`}
                  >
                    {job.jobTitle}
                  </h3>

                  <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {job.responsibilities}
                  </p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {job.jobCountry && (
                      <span className={tag}>
                        <MapPin className={tagIcon} aria-hidden="true" />
                        {job.jobCountry}
                      </span>
                    )}
                    {job.experienceLevel && (
                      <span className={tag}>
                        <Briefcase className={tagIcon} aria-hidden="true" />
                        {job.experienceLevel}
                      </span>
                    )}
                    {job.maxSalary && (
                      <span className={tag}>
                        <CircleDollar className={tagIcon} aria-hidden="true" />
                        Up to {job.maxSalary}
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  href={`/jobs/${job._id}`}
                  className="inline-flex w-fit items-center rounded-md text-sm font-semibold text-blue-700 transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Apply now
                  <ArrowRight
                    className="ml-1.5 h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* View all */}
        <div className="text-center">
          <Link
            href="/jobs"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#050B1A]"
          >
            View all open jobs
          </Link>
        </div>
      </div>
    </section>
  );
}