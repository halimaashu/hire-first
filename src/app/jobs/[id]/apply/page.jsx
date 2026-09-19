import { getUser } from "@/lib/actions/core/session";
import { getDetailJob } from "@/lib/api/job";
import { redirect } from "next/navigation";
import React from "react";
import ApplyForm from "./ApplyForm";
import { getApplications } from "@/lib/api/applications";
import Link from "next/link";
import { Button, Card } from "@heroui/react";
import { ArrowLeft } from "@gravity-ui/icons";

const JobApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUser();

  // 1. Authentication Protection
  if (!user) {
    redirect(`/signin?redirect=/jobs/${id}/apply`);
  }

  // 2. Authorization Verification
  if (user.role !== "seeker") {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center p-4">
        <Card className="max-w-md p-6 text-center shadow-md border border-neutral-200 dark:border-neutral-800">
          <Card.Header className="flex flex-col items-center justify-center pb-4">
            <h1 className="text-xl font-bold text-neutral-900 dark:text-white">
              Job Seekers Only
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
              If you want to apply for a job openings, please sign in using a Seeker account.
            </p>
          </Card.Header>
          <Card.Footer className="justify-center">
            <Link href="/jobs">
              <Button size="sm" className="bg-blue-600 text-white font-medium">
                Browse All Jobs
              </Button>
            </Link>
          </Card.Footer>
        </Card>
      </div>
    );
  }

  // 3. Concurrent Data Fetching
  const [jobInfo, applicationData] = await Promise.all([
    getDetailJob(id),
    getApplications(user.id),
  ]);

  const currentCount = applicationData?.length || 0;
  const plan = {
    type: "free",
    maxApplicationLength: 3,
  };

  // Check if they have met or exceeded their limits
  const hasReachedLimit = currentCount >= plan.maxApplicationLength;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-4">
        
        {/* Real-time Usage Banner Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-xl bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 shadow-sm gap-2 text-sm">
          <div className="text-neutral-600 dark:text-neutral-300">
            Monthly Usage Tracker:{" "}
            <span className="font-bold text-neutral-900 dark:text-white">
              {currentCount}
            </span>{" "}
            out of{" "}
            <span className="font-semibold text-neutral-700 dark:text-neutral-400">
              {plan.maxApplicationLength}
            </span>{" "}
            applications submitted.
          </div>
          {hasReachedLimit && (
            <span className="text-xs bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 px-2.5 py-1 rounded-full font-medium self-start sm:self-auto">
              Limit Reached
            </span>
          )}
        </div>

        {/* 4. Conditional Content Rendering Blocks */}
        {hasReachedLimit ? (
          <Card className="p-6 text-center border border-neutral-200 dark:border-neutral-800 shadow-md">
            <Card.Header className="flex flex-col items-center pt-4 pb-2">
              <div className="w-12 h-12 bg-violet-100 dark:bg-violet-950/40 rounded-full flex items-center justify-center mb-3 text-violet-600 dark:text-violet-400">
                ⚡
              </div>
              <Card.Title className="text-xl font-bold text-neutral-900 dark:text-white">
                Upgrade Plan to Continue
              </Card.Title>
              <Card.Description className="max-w-md text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                You have completely used your {plan.maxApplicationLength} free submissions this month. Purchase a tier package to instantly unlock unlimited custom opportunities.
              </Card.Description>
            </Card.Header>
            <Card.Footer className="flex justify-center gap-4 pt-4">
              <Link href="/jobs">
                <Button variant="light" className="text-neutral-500">
                  <ArrowLeft className="mr-1" /> Back
                </Button>
              </Link>
              <Link href="/plans">
                <Button className="bg-violet-600 hover:bg-violet-700 text-white font-semibold">
                  Upgrade Account
                </Button>
              </Link>
            </Card.Footer>
          </Card>
        ) : (
          <ApplyForm applicant={user} jobInfo={jobInfo} />
        )}
      </div>
    </div>
  );
};

export default JobApplyPage;