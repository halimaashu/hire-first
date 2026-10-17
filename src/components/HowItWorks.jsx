import Link from "next/link";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

const steps = [
  {
    title: "Create your profile",
    description:
      "Add your skills, experience and the roles you want. It takes about three minutes.",
  },
  {
    title: "Get matched",
    description:
      "We match you with openings that fit your skills, and new matches arrive every morning.",
  },
  {
    title: "Apply in one click",
    description:
      "Send your application in one click and follow every response from your dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <section
      className={`${body.className} bg-white px-4 py-14 text-slate-900 dark:bg-[#050B1A] dark:text-slate-100 sm:px-6 sm:py-20 lg:px-8`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className={`${display.className} text-balance text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl`}
          >
            How it works
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 sm:text-lg">
            Get from sign-up to your first application in three steps.
          </p>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-10 sm:mt-16 lg:grid-cols-3 lg:gap-0">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative pl-16 after:absolute after:bottom-[-2.5rem] after:left-6 after:top-14 after:w-px after:bg-blue-200 last:after:hidden dark:after:bg-blue-500/30 lg:px-6 lg:pl-6 lg:text-center lg:after:bottom-auto lg:after:left-[calc(50%+2.25rem)] lg:after:right-[calc(-50%+2.25rem)] lg:after:top-6 lg:after:h-px lg:after:w-auto"
            >
              <span
                className={`${display.className} absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-extrabold text-white shadow-lg shadow-blue-600/25 dark:bg-blue-500/15 dark:text-blue-300 dark:shadow-none dark:ring-1 dark:ring-blue-500/40 lg:static lg:mx-auto lg:mb-5`}
                aria-hidden="true"
              >
                {index + 1}
              </span>

              <h3
                className={`${display.className} text-xl font-bold text-slate-950 dark:text-white`}
              >
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base lg:mx-auto lg:max-w-xs">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 text-center sm:mt-16">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:shadow-none dark:focus-visible:ring-offset-[#050B1A]"
          >
            Create your profile
          </Link>
        </div>
      </div>
    </section>
  );
}