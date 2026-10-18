import Image from "next/image";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

// SAMPLE CONTENT: replace names, roles and quotes with real stories
// (with permission) before launch. The first story is shown large.
const stories = [
  {
    quote:
      "I built my profile on a Sunday evening and had three relevant matches by Monday morning. Two weeks later I accepted an offer.",
    name: "Candidate 1",
    role: "Product Designer",
    avatar: "/images/manCartoon.jpg",
  },
  {
    quote:
      "The applications we received were a close fit for the role. We filled the position faster than we have before.",
    name: "Ms. Johnson",
    role: "HR Recruiter",
    avatar: "/images/recruiterCartoon.jpg",
  },
  {
    quote:
      "Saving jobs and tracking every application in one place kept my search organized and stress-free.",
    name: "Candidate 2",
    role: "UX Designer",
    avatar: "/images/wemanCartoon.jpg",
  },
];

function Author({ story, onBlue = false }) {
  return (
    <figcaption className="mt-6 flex items-center gap-3">
      <span
        className={`relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full ring-2 ${
          onBlue ? "ring-white/40" : "ring-blue-600/20 dark:ring-blue-500/30"
        }`}
      >
        <Image
          src={story.avatar}
          alt={`${story.name}, ${story.role}`}
          fill
          sizes="48px"
          className="object-cover"
        />
      </span>
      <span>
        <span
          className={`${display.className} block text-base font-bold ${
            onBlue ? "text-white" : "text-slate-950 dark:text-white"
          }`}
        >
          {story.name}
        </span>
        <span
          className={`block text-sm ${
            onBlue ? "text-blue-100" : "text-slate-600 dark:text-slate-400"
          }`}
        >
          {story.role}
        </span>
      </span>
    </figcaption>
  );
}

export default function SuccessStories() {
  const [featured, ...others] = stories;

  return (
    <section
      className={`${body.className} bg-white px-4 py-14 text-slate-900 dark:bg-[#050B1A] dark:text-slate-100 sm:px-6 sm:py-20 lg:px-8`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className={`${display.className} text-balance text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl`}
          >
            Stories from people who found their fit
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 sm:text-lg">
            Job seekers and recruiters share how HireLoop worked for them.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-14 lg:grid-cols-5 lg:gap-6">
          {/* Featured story */}
          <figure className="flex flex-col justify-between rounded-3xl bg-blue-600 p-7 text-white shadow-xl shadow-blue-600/20 dark:shadow-none sm:p-10 lg:col-span-3">
            <blockquote
              className={`${display.className} text-balance text-2xl font-bold leading-snug sm:text-3xl`}
            >
              “{featured.quote}”
            </blockquote>
            <Author story={featured} onBlue />
          </figure>

          {/* Other stories */}
          <div className="grid gap-5 lg:col-span-2 lg:gap-6">
            {others.map((story) => (
              <figure
                key={story.name}
                className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#0B1530] dark:shadow-none sm:p-7"
              >
                <blockquote className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
                  “{story.quote}”
                </blockquote>
                <Author story={story} />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}