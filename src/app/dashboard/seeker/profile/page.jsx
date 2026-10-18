import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Person, Envelope, ShieldCheck, Calendar, ArrowRight, Gear } from "@gravity-ui/icons";

// --- NEXT.JS SEO METADATA ---
export const metadata = {
  title: "My Profile | Hire Loop",
  description: "Manage your seeker profile settings and account information on Hire Loop.",
  robots: {
    index: false,
    follow: false,
  },
};

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  // Format creation date safely
  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 md:p-10 transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Profile Hero Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 dark:from-blue-700 dark:via-blue-800 dark:to-indigo-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl border border-blue-500/20">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
            {/* User Avatar */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 border-white/20 shadow-lg bg-blue-900 shrink-0">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "Profile Avatar"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-800 text-white text-3xl font-bold">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "S"}
                </div>
              )}
            </div>

            {/* User Info Overview */}
            <div className="text-center sm:text-left space-y-2 flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-blue-100">
                <span>Role: {user?.role || "Seeker"}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {user?.name || "Job Seeker"}
              </h1>
              <p className="text-blue-100 text-sm flex items-center justify-center sm:justify-start gap-2">
                <Envelope width={16} height={16} aria-hidden="true" />
                {user?.email || "No email provided"}
              </p>
            </div>

            {/* Quick Action Button */}
            <Link
              href="/seeker/applications"
              className="self-center sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-semibold text-sm shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>My Applications</span>
              <ArrowRight width={16} height={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Account Details Card */}
          <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Person width={20} height={20} className="text-blue-600 dark:text-blue-400" />
                Account Information
              </h2>
              <span className="text-xs text-slate-400 font-mono">ID: {user?.id}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Full Name</p>
                <p className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-1">{user?.name || "N/A"}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Address</p>
                <p className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-1">{user?.email || "N/A"}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Account Role</p>
                <p className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-1 capitalize">{user?.role || "Seeker"}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Member Since</p>
                <p className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-1 flex items-center gap-1.5">
                  <Calendar width={16} height={16} className="text-slate-400" />
                  {formattedDate}
                </p>
              </div>
            </div>
          </div>

          {/* Account Verification & Status Sidebar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <ShieldCheck width={20} height={20} className="text-blue-600 dark:text-blue-400" />
                Security Status
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Email Verified</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    user?.emailVerified 
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800" 
                      : "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
                  }`}>
                    {user?.emailVerified ? "Verified" : "Unverified"}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-400 text-center">
                Need to change your credentials? Contact HireLoop support or settings.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default page;