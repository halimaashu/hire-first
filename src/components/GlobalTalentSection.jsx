import { Check, Gear } from "@gravity-ui/icons";
import Image from "next/image";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

const candidates = [
  {
    name: "Candidate 1",
    role: "Product Designer",
    avatar: "/images/manCartoon.jpg",
    accent: "bg-sky-500/25",
  },
  {
    name: "Candidate 2",
    role: "UX Designer",
    avatar: "/images/wemanCartoon.jpg",
    accent: "bg-indigo-500/25",
  },
];

const recruiter = {
  name: "Ms. Johnson",
  role: "HR Recruiter",
  avatar: "/images/recruiterCartoon.jpg",
  accent: "bg-blue-500/30",
};

function ProfileCard({ profile, highlight = false }) {
  return (
    <div
      className={`w-36 rounded-2xl border bg-white p-4 text-center shadow-sm transition-transform duration-300 motion-safe:hover:-translate-y-1 dark:bg-[#0B1530] dark:shadow-none sm:w-48 sm:p-5 ${
        highlight
          ? "border-blue-600/40 dark:border-blue-500/50"
          : "border-slate-200 dark:border-white/10"
      }`}
    >
      <div className="relative mx-auto mb-3 w-fit">
        <div
          className={`relative h-20 w-20 rounded-full p-1 sm:h-24 sm:w-24 ${profile.accent}`}
        >
          <div className="relative h-full w-full overflow-hidden rounded-full">
            <Image
              src={profile.avatar}
              alt={`${profile.name}, ${profile.role}`}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Verified badge */}
        <span
          className="absolute right-0 top-0 rounded-full border-2 border-white bg-emerald-500 p-1 text-white dark:border-[#0B1530]"
          title="Verified"
        >
          <Check className="h-3 w-3" aria-hidden="true" />
          <span className="sr-only">Verified</span>
        </span>
      </div>

      <h3
        className={`${display.className} text-sm font-bold text-slate-950 dark:text-white sm:text-base`}
      >
        {profile.name}
      </h3>
      <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
        {profile.role}
      </p>
    </div>
  );
}

export default function GlobalTalentSection() {
  return (
    <section
      className={`${body.className} relative overflow-hidden bg-slate-50 px-4 py-14 text-slate-900 dark:bg-[#050B1A] dark:text-slate-100 sm:px-6 sm:py-20 lg:px-8`}
    >
      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] opacity-40 [background-size:24px_24px] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] dark:opacity-10"
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.03] sm:p-10 lg:p-12">
          {/* Profiles: candidates → connector → recruiter */}
          <div className="mb-10 flex flex-col items-center gap-3 sm:mb-12 md:flex-row md:justify-center md:gap-4">
            <div className="flex gap-3 sm:gap-6">
              {candidates.map((profile) => (
                <ProfileCard key={profile.name} profile={profile} />
              ))}
            </div>

            <div className="flex flex-col items-center gap-2 md:flex-row">
              <span className="h-5 w-px bg-slate-300 dark:bg-white/20 md:h-px md:w-8" />
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-600/30 bg-blue-50 text-blue-600 dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-blue-400">
                <Gear
                  className="h-4 w-4 motion-safe:animate-spin"
                  aria-hidden="true"
                />
              </span>
              <span className="h-5 w-px bg-slate-300 dark:bg-white/20 md:h-px md:w-8" />
            </div>

            <ProfileCard profile={recruiter} highlight />
          </div>

          {/* Heading and description */}
          <div className="mx-auto max-w-xl text-center">
            <h2
              className={`${display.className} text-balance text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl`}
            >
              Find global and multilingual talent
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
              Build and scale your worldwide hiring with direct access to
              vetted candidate profiles across top technical and creative
              fields.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}