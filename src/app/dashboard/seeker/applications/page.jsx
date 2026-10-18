import { getApplicationByApplicantID } from "@/lib/actions/application";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";
import { Table } from "@heroui/react";

// --- NEXT.JS SEO METADATA ---
export const metadata = {
  title: "My Applications | Hire Loop",
  description:
    "Track and manage all your submitted job applications on Hire Loop. View status updates, applied roles, and submission dates.",
  robots: {
    index: false, // Prevents search engines from indexing private user dashboards
    follow: false,
  },
  openGraph: {
    title: "My Job Applications | Hire Loop",
    description: "Manage and track your job applications on Hire Loop.",
    siteName: "Hire Loop",
    type: "website",
  },
};

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const applications = await getApplicationByApplicantID(session?.user?.id);
  const appList = applications || [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 md:p-10 transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Eye-Catching Banner (Works in both Light & Dark modes) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 dark:from-blue-700 dark:via-blue-800 dark:to-indigo-900 p-6 rounded-2xl text-white shadow-xl border border-blue-500/20">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              My Job Applications
            </h1>
            <p className="text-blue-100 text-sm mt-1">
              Track the status and history of all the positions youve applied for on Hire Loop.
            </p>
          </div>
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-sm font-semibold self-start sm:self-auto shrink-0">
            Total Submitted: <span className="text-blue-200 font-bold">{appList.length}</span>
          </div>
        </div>

        {/* Responsive Table Container with Dark Mode Styling */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-200">
          <Table aria-label="My Applied Jobs">
            <Table.ScrollContainer>
              <Table.Content className="min-w-[700px]">
                {/* Table Header */}
                <Table.Header className="bg-slate-100/70 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
                  <Table.Column isRowHeader className="py-4 font-bold text-slate-800 dark:text-slate-200">
                    Company Name
                  </Table.Column>
                  <Table.Column className="py-4 font-bold text-slate-800 dark:text-slate-200">
                    Job Title / Role
                  </Table.Column>
                  <Table.Column className="py-4 font-bold text-slate-800 dark:text-slate-200">
                    Applied Date
                  </Table.Column>
                  <Table.Column className="py-4 font-bold text-slate-800 dark:text-slate-200">
                    Contact Email
                  </Table.Column>
                  <Table.Column className="py-4 font-bold text-slate-800 dark:text-slate-200">
                    Resume Link
                  </Table.Column>
                </Table.Header>

                {/* Table Body */}
                <Table.Body>
                  {appList.length > 0 ? (
                    appList.map((app) => (
                      <Table.Row
                        key={app._id}
                        className="hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-colors border-b border-slate-100 dark:border-slate-800/70 last:border-none"
                      >
                        {/* Company Name */}
                        <Table.Cell className="py-4 font-medium text-slate-900 dark:text-slate-100">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-base shadow-inner shrink-0 border border-blue-200 dark:border-blue-800">
                              {app.companyName ? app.companyName.charAt(0).toUpperCase() : "C"}
                            </div>
                            <span className="font-semibold text-slate-900 dark:text-slate-100">
                              {app.companyName || "N/A"}
                            </span>
                          </div>
                        </Table.Cell>

                        {/* Job Title */}
                        <Table.Cell className="py-4 text-slate-700 dark:text-slate-300 font-medium">
                          {app.jobTitle || "N/A"}
                        </Table.Cell>

                        {/* Application Date */}
                        <Table.Cell className="py-4 text-slate-500 dark:text-slate-400 text-sm">
                          {app.applicationDate
                            ? new Date(app.applicationDate).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : "N/A"}
                        </Table.Cell>

                        {/* Contact Email */}
                        <Table.Cell className="py-4 text-slate-600 dark:text-slate-400 text-sm">
                          {app.email || "N/A"}
                        </Table.Cell>

                        {/* Resume Link Button */}
                        <Table.Cell className="py-4">
                          {app.resumeLink ? (
                            <a
                              href={app.resumeLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 font-medium text-xs transition-colors border border-blue-200 dark:border-blue-800/80"
                            >
                              View Resume
                            </a>
                          ) : (
                            <span className="text-slate-400 dark:text-slate-600 text-xs">
                              Not Provided
                            </span>
                          )}
                        </Table.Cell>
                      </Table.Row>
                    ))
                  ) : (
                    <Table.Row>
                      <Table.Cell colSpan={5} className="text-center py-12 text-slate-400 dark:text-slate-500">
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
                            No applications submitted yet
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Explore available jobs and start applying on Hire Loop.
                          </p>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>

      </div>
    </div>
  );
};

export default page;