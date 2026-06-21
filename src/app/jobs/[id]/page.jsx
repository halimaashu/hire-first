
import { getDetailJob } from "@/lib/api/job";
import JobDetailView from "./JobDetailView";


const JobDetailPage = async ({ params }) => {
  const { id } = await params;
  const job = await getDetailJob(id);

  if (!job) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="border border-dashed border-neutral-800 rounded-2xl py-16 px-10 text-center max-w-md">
          <p className="text-sm text-neutral-500">
            This job posting could not be found. It may have been removed or
            the link is incorrect.
          </p>
        </div>
      </div>
    );
  }

  return <JobDetailView job={job} />;
};

export default JobDetailPage;