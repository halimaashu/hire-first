import { redirect } from "next/navigation";
import { Persons, Person, Briefcase, Star } from "@gravity-ui/icons";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

import { getUser } from "@/lib/actions/core/session";
import { getAllUsers } from "@/lib/actions/users";
import MetricCard from "@/components/dashboard/MetricCard";
import UsersManager from "./UsersManager";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

// Private admin page: keep it out of search results
export const metadata = {
  title: "Manage users",
  description: "View and manage every registered HireLoop user.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

const REDIRECT_BY_ROLE = {
  seeker: "/dashboard/seeker",
  recruiter: "/dashboard/recruiter",
};

export default async function AdminUsersPage() {
  const currentUser = await getUser();

  // 1. Must be signed in
  if (!currentUser) {
    redirect("/signin?redirect=/dashboard/admin/users");
  }

  // 2. Must be an admin
  if (currentUser.role !== "admin") {
    redirect(REDIRECT_BY_ROLE[currentUser.role] ?? "/");
  }

  // 3. Load users. The API returns { message, data: [...] }
  let users = null;
  try {
    const res = await getAllUsers();
    users = Array.isArray(res?.data) ? res.data : null;
  } catch {
    users = null;
  }

  if (!users) {
    return (
      <div
        className={`${body.className} rounded-2xl border border-dashed border-slate-300 px-6 py-14 text-center dark:border-white/15`}
      >
        <h1
          className={`${display.className} text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white`}
        >
          Couldn’t load users
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
          Please refresh the page. If this keeps happening, check that the users
          API is running.
        </p>
      </div>
    );
  }

  const countRole = (role) => users.filter((u) => u.role === role).length;

  return (
    <div className={`${body.className} space-y-8`}>
      {/* Header */}
      <div>
        <h1
          className={`${display.className} text-balance text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl`}
        >
          Users
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
          Everyone who has registered on the platform.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Total users" value={String(users.length)} icon={Persons} />
        <MetricCard title="Job seekers" value={String(countRole("seeker"))} icon={Person} />
        <MetricCard title="Recruiters" value={String(countRole("recruiter"))} icon={Briefcase} />
        <MetricCard title="Admins" value={String(countRole("admin"))} icon={Star} />
      </div>

      {/* Search, filter and list */}
      <UsersManager users={users} />
    </div>
  );
}