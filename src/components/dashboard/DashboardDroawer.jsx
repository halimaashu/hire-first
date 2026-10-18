"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutSideContent,
  Bell,
  Bookmark,
  Briefcase,
  ChartLine,
  Envelope,
  FolderPlus,
  FolderTree,
  Gear,
  House,
  Magnifier,
  PaperPlane,
  Person,
  Persons,
  TagDollar,
  Xmark,
} from "@gravity-ui/icons";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

import { authClient } from "@/lib/auth-client";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

// Links for each role. Change the paths to match your real routes.
// The first item of each role is its "Overview" page.
const NAV_BY_ROLE = {
  seeker: {
    title: "Job seeker dashboard",
    items: [
      { icon: House, href: "/dashboard/seeker", label: "Overview" },
      { icon: Magnifier, href: "/jobs", label: "Browse jobs" },
      { icon: PaperPlane, href: "/dashboard/seeker/applications", label: "My applications" },
      
      { icon: Person, href: "/dashboard/seeker/profile", label: "My profile" },
      
      { icon: Envelope, href: "/dashboard/seeker/messages", label: "Messages" },
      
    ],
  },
  recruiter: {
    title: "Recruiter dashboard",
    items: [
      { icon: House, href: "/dashboard/recruiter", label: "Overview" },
      { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
      { icon: FolderPlus, href: "/dashboard/recruiter/added-jobs", label: "Post a job" },
      { icon: Person, href: "/dashboard/recruiter/company", label: "Company profile" },
      
      
      
    ],
  },
  admin: {
    title: "Admin dashboard",
    items: [
      { icon: House, href: "/dashboard/admin", label: "Overview" },
      { icon: Persons, href: "/dashboard/admin/users", label: "Users" },
      { icon: Briefcase, href: "/dashboard/admin/jobs", label: "Jobs" },
      { icon: FolderTree, href: "/dashboard/admin/companies", label: "Companies" },
      { icon: TagDollar, href: "/dashboard/admin/payments", label: "Plans and payments" },
      { icon: ChartLine, href: "/dashboard/admin/reports", label: "Reports" },
      { icon: Gear, href: "/dashboard/admin/settings", label: "Settings" },
    ],
  },
};

// The most specific matching link wins, so "Jobs" is not also active on "Post a job"
function getActiveHref(pathname, items) {
  if (!pathname) return null;
  const overviewHref = items[0].href;

  const matches = items.filter((item) =>
    item.href === overviewHref
      ? pathname === item.href
      : pathname === item.href || pathname.startsWith(`${item.href}/`)
  );
  if (matches.length === 0) return null;
  return matches.reduce((a, b) => (b.href.length > a.href.length ? b : a)).href;
}

function NavLinks({ items, activeHref, onNavigate }) {
  return (
    <nav aria-label="Dashboard" className="flex flex-col gap-1">
      {items.map((item) => {
        const active = item.href === activeHref;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              active
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20 dark:bg-blue-500/15 dark:text-blue-300 dark:shadow-none dark:ring-1 dark:ring-blue-500/30"
                : "text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
            }`}
          >
            <item.icon className="size-5 flex-shrink-0" aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

/**
 * Role-based dashboard navigation.
 *
 * With no props it reads the role from the signed-in session.
 * You can also pass it yourself: <DashboardDrawer role="recruiter" />
 */
export function DashboardDrawer({ role: roleProp }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  const role = roleProp ?? session?.user?.role;
  const config = NAV_BY_ROLE[role];
  const activeHref = config ? getActiveHref(pathname, config.items) : null;

  // Close the drawer when the page changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // While open: Escape closes, page scroll is locked, focus moves into the drawer
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Waiting for the session: show a placeholder so the layout doesn't jump
  if (!roleProp && isPending) {
    return (
      <aside
        aria-hidden="true"
        className="hidden w-64 flex-shrink-0 lg:block"
      >
        <div className="h-72 w-full rounded-2xl bg-slate-200 motion-safe:animate-pulse dark:bg-white/10" />
      </aside>
    );
  }

  // Not signed in, or a role with no dashboard
  if (!config) return null;

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`${body.className} hidden w-64 flex-shrink-0 lg:sticky lg:top-24 lg:flex lg:self-start`}
      >
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-[#0B1530] dark:shadow-none">
          <p
            className={`${display.className} px-3 pb-3 pt-2 text-base font-bold text-slate-950 dark:text-white`}
          >
            {config.title}
          </p>
          <NavLinks items={config.items} activeHref={activeHref} />
        </div>
      </aside>

      {/* Mobile and tablet trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`${body.className} inline-flex h-11 items-center gap-2 self-start rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-900 transition-colors hover:border-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/20 dark:bg-[#0B1530] dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300 lg:hidden`}
      >
        <LayoutSideContent className="size-5" aria-hidden="true" />
        Menu
      </button>

      {/* Mobile and tablet drawer */}
      {open && (
        <div className={`${body.className} fixed inset-0 z-[60] lg:hidden`}>
          <div
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label={config.title}
            className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-white p-4 shadow-2xl dark:bg-[#0B1530]"
          >
            <div className="mb-3 flex items-center justify-between gap-2 px-2 pt-1">
              <p
                className={`${display.className} text-lg font-bold text-slate-950 dark:text-white`}
              >
                {config.title}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <Xmark className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="overflow-y-auto">
              <NavLinks
                items={config.items}
                activeHref={activeHref}
                onNavigate={() => setOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}