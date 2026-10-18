"use client";

import { useEffect, useState } from "react";
import { Bars, Xmark } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { ModeToggle } from "./ui/ModeToggle";

const baseLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Contact", href: "/contact" },
  { label: "Pricing", href: "/plans" },
];


const DASHBOARD_BY_ROLE = {
  seeker: "/dashboard/seeker",
  recruiter: "/dashboard/recruiter",
  admin: "/dashboard/admin",
};

const ROLE_LABELS = {
  seeker: "Job seeker",
  recruiter: "Recruiter",
  admin: "Admin",
};

// Shared style tokens: light value first, dark value after `dark:`
const linkBase =
  "rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500";
const linkIdle =
  "text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white";
const linkActive = "text-blue-700 dark:text-blue-400";

const primaryBtn =
  "inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#050B1A]";

const outlineBtn =
  "inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:border-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/20 dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300";

function Avatar({ user, size = "h-8 w-8" }) {
  const [failed, setFailed] = useState(false);
  const initial = user?.name?.[0]?.toUpperCase() ?? "?";

  return (
    <span
      className={`${size} flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-600 text-sm font-bold text-white ring-2 ring-blue-600/20 dark:ring-blue-500/30`}
    >
      {user?.image && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user.image}
          alt=""
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        initial
      )}
    </span>
  );
}

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const roleLabel = user ? ROLE_LABELS[user.role] ?? user.role ?? "Member" : "";
  const dashboardHref = user
    ? DASHBOARD_BY_ROLE[user.role] ?? "/dashboard"
    : null;

  // Dashboard sits with the other links, right after Home
  const links = user
    ? [
        baseLinks[0],
        { label: "Dashboard", href: dashboardHref },
        ...baseLinks.slice(1),
      ]
    : baseLinks;

  // Close the mobile menu when the page changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleLogOut = async () => {
    try {
      await authClient.signOut();
    } finally {
      setOpen(false);
      router.push("/");
      router.refresh();
    }
  };

  const isActive = (href) =>
    href === "/" ? pathname === "/" : !!pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-4">
      <nav className="mx-auto max-w-7xl" aria-label="Main">
        <div className="flex min-h-[4.5rem] items-center justify-between rounded-2xl border border-black/10 bg-white/70 px-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#050B1A]/70 dark:shadow-none xl:px-8">
          {/* Left: logo and links */}
          <div className="flex items-center gap-6 xl:gap-8">
            <Link href="/" className="flex-shrink-0" aria-label="HireLoop home">
              <Image
                src="/images/logo.png"
                alt=""
                width={100}
                height={100}
                priority
                className="h-9 w-auto"
              />
            </Link>

            <div className="hidden h-6 w-px bg-black/10 dark:bg-white/15 lg:block" />

            <div className="hidden items-center gap-5 lg:flex xl:gap-7">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`${linkBase} ${
                    isActive(link.href) ? linkActive : linkIdle
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: theme, account (laptop and desktop) */}
          <div className="ml-auto hidden items-center gap-4 lg:flex xl:gap-5">
            <ModeToggle />

            <div className="h-6 w-px bg-black/10 dark:bg-white/15" />

            {isPending ? (
              <span
                aria-hidden="true"
                className="h-8 w-8 rounded-full bg-slate-200 motion-safe:animate-pulse dark:bg-white/10"
              />
            ) : user ? (
              <>
                {/* Avatar with the role underneath */}
                <div
                  className="flex flex-col items-center gap-0.5"
                  title={user.name}
                >
                  <Avatar user={user} />
                  <span className="text-[11px] font-medium leading-none text-slate-600 dark:text-slate-400">
                    {roleLabel}
                  </span>
                  <span className="sr-only">Signed in as {user.name}</span>
                </div>

                <button
                  type="button"
                  onClick={handleLogOut}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link href="/signin" className={`${linkBase} ${linkIdle}`}>
                  Sign in
                </Link>
                <Link href="/signup" className={primaryBtn}>
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile and tablet toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <ModeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="rounded-lg p-2 text-slate-800 transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-white dark:hover:bg-white/10"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? (
                <Xmark className="h-6 w-6" />
              ) : (
                <Bars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile and tablet menu */}
        <div
          id="mobile-menu"
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            open ? "mt-3 max-h-[34rem]" : "max-h-0"
          }`}
          aria-hidden={!open}
        >
          <div className="rounded-2xl border border-black/10 bg-white/95 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#050B1A]/95 dark:shadow-none">
            <div className="flex flex-col gap-4">
              {user && (
                <>
                  <div className="flex items-center gap-3">
                    <Avatar user={user} size="h-11 w-11" />
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate text-base font-bold text-slate-950 dark:text-white">
                        {user.name}
                      </span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {roleLabel}
                      </span>
                    </div>
                  </div>
                  <div className="h-px bg-black/10 dark:bg-white/10" />
                </>
              )}

              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`${linkBase} text-base ${
                    isActive(link.href) ? linkActive : linkIdle
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="h-px bg-black/10 dark:bg-white/10" />

              {user ? (
                <button
                  type="button"
                  onClick={handleLogOut}
                  tabIndex={open ? 0 : -1}
                  className={`${outlineBtn} w-full py-3`}
                >
                  Log out
                </button>
              ) : (
                <>
                  <Link
                    href="/signin"
                    onClick={() => setOpen(false)}
                    tabIndex={open ? 0 : -1}
                    className={`${linkBase} text-base ${linkIdle}`}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setOpen(false)}
                    tabIndex={open ? 0 : -1}
                    className={`${primaryBtn} w-full py-3`}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}