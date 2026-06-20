"use client";

import { useState } from "react";
import { Bars, Xmark } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";

export default function NavBar() {
  const handelLogOut=async()=>{
    await authClient.signOut();
  }
  const [open, setOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const links = [
    { label: "Home", href: "/" },
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Company", href: "/company" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <header className="w-full px-4 py-4">
      <nav className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl px-5 lg:px-8 py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="text-2xl font-bold">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={100}
                height={100}
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 ml-auto">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-gray-300 transition hover:text-white"
              >
                {link.label}
              </a>
            ))}

            {/* Divider */}
            <div className="h-5 w-px bg-white/20" />

           {
            user?<>
            <h1>H! {user.name}</h1>
            <Button variant="outline" onClick={handelLogOut}>
              Logout
            </Button>
            </>:
             <Link href="/signin">
              <button className="text-sm text-gray-300 hover:text-white transition">
                Sign In
              </button>
            </Link>
           }

            <Link href="/signup">
              {" "}
              <button className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                sign up
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white"
            aria-label="Toggle Menu"
          >
            {open ? (
              <Xmark className="h-6 w-6" />
            ) : (
              <Bars className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            open ? "max-h-96 mt-3" : "max-h-0"
          }`}
        >
          <div className="rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl p-5">
            <div className="flex flex-col gap-5">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-300 hover:text-white"
                >
                  {link.label}
                </a>
              ))}

              <div className="h-px bg-white/10" />

              <Link href="/signin">
                <button className="text-left text-gray-300 hover:text-white">
                  Sign In
                </button>
              </Link>

              <Link href="/signup">
                <button className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 text-white">
                  sign up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
