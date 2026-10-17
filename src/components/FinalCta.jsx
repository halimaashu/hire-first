import Link from "next/link";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

export default function FinalCta() {
  return (
    <section
      className={`${body.className} bg-white px-4 py-14 dark:bg-[#050B1A] sm:px-6 sm:py-20 lg:px-8`}
    >
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl ring-1 ring-slate-200 dark:ring-white/10 md:grid-cols-2">
        {/* Job seekers */}
        <div className="flex flex-col items-start justify-between gap-10 bg-blue-600 p-8 text-white sm:p-12 lg:p-14">
          <div>
            <h2
              className={`${display.className} text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl`}
            >
              Find the role that fits you
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-blue-100 sm:text-lg">
              Build a profile in three minutes and let the matches come to you.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-6">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-3.5 text-base font-semibold text-blue-700 transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
            >
              Create your profile
            </Link>
            <Link
              href="/jobs"
              className="rounded-md text-center text-base font-semibold text-white underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Browse jobs
            </Link>
          </div>
        </div>

        {/* Recruiters */}
        <div className="flex flex-col items-start justify-between gap-10 bg-[#07122E] p-8 text-white sm:p-12 lg:p-14">
          <div>
            <h2
              className={`${display.className} text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl`}
            >
              Hire your next teammate
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-slate-300 sm:text-lg">
              Post your first jobs for free and reach thousands of job seekers.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-6">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07122E]"
            >
              Post a job
            </Link>
            <Link
              href="/plans"
              className="rounded-md text-center text-base font-semibold text-slate-200 underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              See pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}