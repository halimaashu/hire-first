"use client";

import { useState } from "react";
import { Bars, Xmark } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { ModeToggle } from "./ui/ModeToggle";

const links = [
  { label: "Home", href: "/" },
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Contact", href: "/contact" },
  { label: "Pricing", href: "/plans" },
];

// Shared style tokens: light value first, dark value after `dark:`
const linkBase =
  "text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md";
const linkIdle =
  "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white";
const linkActive = "text-zinc-950 dark:text-white";

const primaryBtn =
  "inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogOut = async () => {
    await authClient.signOut();
    setOpen(false);
  };

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-4">
      <nav className="mx-auto max-w-7xl" aria-label="Main">
        <div className="flex items-center justify-between rounded-2xl border border-black/10 bg-white/70 px-5 py-3 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/60 dark:shadow-none lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0" aria-label="Home">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={100}
              height={100}
              priority
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop menu */}
          <div className="ml-auto hidden items-center gap-6 md:flex lg:gap-8">
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

            <div className="h-5 w-px bg-black/10 dark:bg-white/20" />

            <ModeToggle />

            {user ? (
              <>
                <span className="max-w-[10rem] truncate text-sm text-zinc-700 dark:text-zinc-300">
                  Hi, {user.name}
                </span>
                <Button variant="outline" onPress={handleLogOut}>
                  Log out
                </Button>
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

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ModeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="rounded-lg p-2 text-zinc-800 transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-white dark:hover:bg-white/10"
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

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            open ? "mt-3 max-h-[28rem]" : "max-h-0"
          }`}
          aria-hidden={!open}
        >
          <div className="rounded-2xl border border-black/10 bg-white/95 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/90 dark:shadow-none">
            <div className="flex flex-col gap-4">
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
                <>
                  <span className="truncate text-sm text-zinc-700 dark:text-zinc-300">
                    Signed in as {user.name}
                  </span>
                  <Button variant="outline" onPress={handleLogOut}>
                    Log out
                  </Button>
                </>
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