import Link from "next/link";
import { ArrowRight } from "@gravity-ui/icons";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

// Same values as JobPostForm and the jobs page filter
const CATEGORIES = [
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

// Returns { engineering: 12, design: 4, ... } or null if the API is unavailable
async function getCategoryCounts() {
  try {
    const base = (process.env.NEXT_PUBLIC_BASE_URL || "").replace(/\/+$/, "");
    const res = await fetch(`${base}/api/allJobs`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const jobs = await res.json();
    if (!Array.isArray(jobs)) return null;

    return jobs.reduce((counts, job) => {
      if (job.jobCategory) {
        counts[job.jobCategory] = (counts[job.jobCategory] || 0) + 1;
      }
      return counts;
    }, {});
  } catch {
    return null;
  }
}

export default async function BrowseByCategory() {
  const counts = await getCategoryCounts();

  // Show the busiest categories first when we have counts
  const categories = counts
    ? [...CATEGORIES].sort(
        (a, b) => (counts[b.value] || 0) - (counts[a.value] || 0)
      )
    : CATEGORIES;

  return (
    <section
      className={`${body.className} bg-slate-50 px-4 py-14 text-slate-900 dark:bg-[#050B1A] dark:text-slate-100 sm:px-6 sm:py-20 lg:px-8`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className={`${display.className} text-balance text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl`}
          >
            Browse jobs by category
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 sm:text-lg">
            Pick your field and see what’s open right now.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category) => {
            const count = counts?.[category.value];

            return (
              <li key={category.value}>
                <Link
                  href={`/jobs?category=${category.value}`}
                  className="group flex h-full min-h-[8.5rem] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-blue-600 hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:border-white/10 dark:bg-[#0B1530] dark:shadow-none dark:hover:border-blue-500 dark:hover:bg-blue-600 dark:focus-visible:ring-offset-[#050B1A]"
                >
                  <h3
                    className={`${display.className} text-lg font-bold leading-snug text-slate-950 transition-colors group-hover:text-white dark:text-white`}
                  >
                    {category.label}
                  </h3>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-slate-600 transition-colors group-hover:text-blue-100 dark:text-slate-400">
                      {counts
                        ? count
                          ? `${count} open ${count === 1 ? "job" : "jobs"}`
                          : "No open jobs yet"
                        : "Browse jobs"}
                    </span>
                    <ArrowRight
                      width={18}
                      height={18}
                      aria-hidden="true"
                      className="flex-shrink-0 text-blue-600 transition-all group-hover:text-white motion-safe:group-hover:translate-x-1 dark:text-blue-400"
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 text-center sm:mt-12">
          <Link
            href="/jobs"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-7 py-3.5 text-base font-semibold text-slate-900 transition-colors hover:border-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:border-white/20 dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300 dark:focus-visible:ring-offset-[#050B1A]"
          >
            View all jobs
          </Link>
        </div>
      </div>
    </section>
  );
}