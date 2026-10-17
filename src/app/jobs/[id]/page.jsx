import { getDetailJob } from "@/lib/api/job";
import Link from "next/link";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import JobDetailView from "./JobDetailView";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

const JobDetailPage = async ({ params }) => {
  const { id } = await params;
  const job = await getDetailJob(id);

  if (!job) {
    return (
      <div
        className={`${body.className} flex min-h-screen items-center justify-center bg-slate-50 px-4 text-slate-900 dark:bg-[#050B1A] dark:text-slate-100`}
      >
        <div className="w-full max-w-md rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center dark:border-white/15 sm:px-10 sm:py-16">
          <h1
            className={`${display.className} text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-3xl`}
          >
            Job not found
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
            This job posting could not be found. It may have been removed, or
            the link may be incorrect.
          </p>
          <Link
            href="/jobs"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:shadow-none dark:focus-visible:ring-offset-[#050B1A]"
          >
            Browse all jobs
          </Link>
        </div>
      </div>
    );
  }

  return <JobDetailView job={job} id={id} />;
};

export default JobDetailPage;