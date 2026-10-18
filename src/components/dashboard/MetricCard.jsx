import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

/**
 * MetricCard
 * <MetricCard title="Total Job Posts" value="48" icon={FileText} />
 * `hint` is optional small text under the value.
 */
export default function MetricCard({ title, value, icon: Icon, hint }) {
  return (
    <div
      className={`${body.className} flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0B1530] dark:shadow-none sm:p-6`}
    >
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {title}
        </p>
        <p
          className={`${display.className} mt-2 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl`}
        >
          {value}
        </p>
        {hint && (
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {hint}
          </p>
        )}
      </div>

      {Icon && (
        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
          <Icon width={22} height={22} aria-hidden="true" />
        </span>
      )}
    </div>
  );
}