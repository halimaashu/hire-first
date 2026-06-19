import Link from "next/link";
import {  LogoLinkedin, LogoFacebook, LogoGithub } from "@gravity-ui/icons";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Top Section */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
              <div className="text-2xl font-bold">
              <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
            </div>

            <p className="mt-6 max-w-xs text-sm leading-7 text-gray-400">
              The AI-native career platform. Built for people who take
              their work seriously.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-5 text-sm font-semibold text-indigo-400">
              Product
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Job discovery
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Worker AI
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Salary data
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 text-sm font-semibold text-indigo-400">
              Navigations
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Career Library
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-5 text-sm font-semibold text-indigo-400">
              Resources
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Brand Guideline
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Newsroom
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <Link
              href="#"
              className="rounded-lg bg-white/5 p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
            >
              <LogoFacebook className="h-5 w-5" />
            </Link>

            <Link
              href="#"
              className="rounded-lg bg-indigo-600 p-2 text-white"
            >
              <LogoGithub className="h-5 w-5" />
            </Link>

            <Link
              href="#"
              className="rounded-lg bg-white/5 p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
            >
              <LogoLinkedin className="h-5 w-5" />
            </Link>
          </div>

          {/* Copyright */}
          <div className="flex flex-col gap-3 text-sm text-gray-500 md:flex-row md:items-center md:gap-6">
            <span>Copyright 2026 — Hire Loop</span>

            <Link href="#" className="hover:text-white">
              Terms & Policy
            </Link>

            <Link href="#" className="hover:text-white">
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}