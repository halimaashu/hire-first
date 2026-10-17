import {
  Magnifier,
  BarsAscendingAlignLeft,
  Bookmark,
  ChartLine,
  LayoutHeaderCursor,
  Circle,
  FolderTree,
  LayoutCells,
} from "@gravity-ui/icons";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

const features = [
  {
    icon: Magnifier,
    title: "Smart search",
    description: "Find your ideal job with advanced filters.",
  },
  {
    icon: BarsAscendingAlignLeft,
    title: "Top companies",
    description: "Apply to vetted companies that are hiring.",
  },
  {
    icon: Bookmark,
    title: "Saved jobs",
    description: "Manage applications and favorites on your dashboard.",
  },
  {
    icon: ChartLine,
    title: "Salary insights",
    description: "Get real salary data to negotiate confidently.",
  },
  {
    icon: LayoutHeaderCursor,
    title: "One-click apply",
    description: "Simplify your job applications for an easier process.",
  },
  {
    icon: Circle,
    title: "Skill-based matching",
    description: "Discover jobs that match your skills and experience.",
  },
  {
    icon: FolderTree,
    title: "Career growth resources",
    description: "Boost your career with quick interview tips.",
  },
  {
    icon: LayoutCells,
    title: "Resume builder",
    description: "Create professional resumes with modern templates.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      className={`${body.className} bg-slate-50 px-4 py-14 text-slate-900 dark:bg-[#050B1A] dark:text-slate-100 sm:px-6 sm:py-20 lg:px-8`}
    >
      <div className="mx-auto max-w-6xl">
        <h2
          className={`${display.className} mx-auto mb-10 max-w-2xl text-balance text-center text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:mb-14 sm:text-4xl lg:text-5xl`}
        >
          Everything you need to succeed
        </h2>

        <ul className="grid grid-cols-1 gap-x-8 gap-y-10 text-left sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <li key={title} className="flex items-start gap-4">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20 dark:bg-blue-500/15 dark:text-blue-400 dark:shadow-none dark:ring-1 dark:ring-blue-500/30">
                <Icon width={22} height={22} aria-hidden="true" />
              </span>

              <div>
                <h3
                  className={`${display.className} text-base font-bold text-slate-950 dark:text-white`}
                >
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}