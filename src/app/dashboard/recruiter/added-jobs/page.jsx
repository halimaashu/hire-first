import Link from "next/link";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

// This helper uses `next/headers`, so it can only run on the server.
// That is why this file has NO "use client" at the top.
import { getLoggedInRecruiterCompany } from "@/lib/api/companyes";
import JobPostForm from "./JobPostForm";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

export default async function RecruiterJobPostPage() {
  const company = await getLoggedInRecruiterCompany();

  // A job needs a company, so ask the recruiter to create one first
  if (!company) {
    return (
      <div
        className={`${body.className} mx-auto max-w-xl rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center dark:border-white/15 sm:px-10 sm:py-16`}
      >
        <h1
          className={`${display.className} text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-3xl`}
        >
          Create your company profile first
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
          Jobs are linked to a company. Add your company details, then come back
          to post your first job.
        </p>
        <Link
          href="/dashboard/recruiter/company"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:shadow-none dark:focus-visible:ring-offset-[#050B1A]"
        >
          Set up company profile
        </Link>
      </div>
    );
  }

  // Pass only plain values to the client component.
  // Adjust the field names (companyName / name, companyLogo / logo) to your data.
  const plainCompany = {
    _id: String(company._id),
    name: company.companyName ?? company.name ?? "",
    logo: company.companyLogo ?? company.logo ?? "",
  };
  // console.log(json(company),"from recruiter job post form")

  return <JobPostForm company={plainCompany} />;
}