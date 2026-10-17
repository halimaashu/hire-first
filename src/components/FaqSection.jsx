import Link from "next/link";
import { ChevronDown } from "@gravity-ui/icons";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

const faqs = [
  {
    q: "Is HireLoop free to use?",
    a: "Yes. The free plan lets job seekers save up to 10 jobs and apply to 3 jobs per month. Recruiters can post up to 3 active jobs for free. Paid plans unlock higher limits and extra tools.",
  },
  {
    q: "How does job matching work?",
    a: "We compare the skills and experience in your profile with open roles, then send you the ones that fit. New matches arrive every morning.",
  },
  {
    q: "How do I apply for a job?",
    a: "Open any job, select Apply now and complete the short form. You need to be signed in with a job seeker account to apply.",
  },
  {
    q: "How do I post a job?",
    a: "Create an account as a recruiter, then add your job details and publish. The free plan includes up to 3 active job posts.",
  },
  {
    q: "Are the companies on HireLoop verified?",
    a: "We list vetted companies that are actively hiring, so you can apply with confidence.",
  },
  {
    q: "Can I change or cancel my plan?",
    a: "Yes. You can upgrade, downgrade or cancel at any time. If you cancel, you keep your plan features until the end of the billing period.",
  },
];

export default function FaqSection() {
  return (
    <section
      className={`${body.className} bg-slate-50 px-4 py-14 text-slate-900 dark:bg-[#050B1A] dark:text-slate-100 sm:px-6 sm:py-20 lg:px-8`}
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
        {/* Heading */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h2
            className={`${display.className} text-balance text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl`}
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            Quick answers about plans, matching, applying and posting jobs.
          </p>
          <Link
            href="/plans"
            className="mt-6 inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:border-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:border-white/20 dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300 dark:focus-visible:ring-offset-[#050B1A]"
          >
            See pricing plans
          </Link>
        </div>

        {/* Questions */}
        <div className="space-y-3">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-slate-200 bg-white px-5 shadow-sm open:border-blue-600/40 dark:border-white/10 dark:bg-[#0B1530] dark:shadow-none dark:open:border-blue-500/40 sm:px-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 [&::-webkit-details-marker]:hidden">
                <span
                  className={`${display.className} text-base font-bold text-slate-950 dark:text-white sm:text-lg`}
                >
                  {item.q}
                </span>
                <ChevronDown
                  width={18}
                  height={18}
                  aria-hidden="true"
                  className="flex-shrink-0 text-blue-600 transition-transform group-open:rotate-180 dark:text-blue-400"
                />
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}